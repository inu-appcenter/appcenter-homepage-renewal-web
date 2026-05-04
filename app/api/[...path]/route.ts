import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { refreshTokens } from 'features/sign';

type RouteParams = { params: Promise<{ path: string[] }> };
export const GET = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));
export const POST = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));
export const PATCH = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));
export const DELETE = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));
export const PUT = (req: NextRequest, { params }: RouteParams) => params.then((p) => handleProxy(req, p));

async function handleUnauthorized() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  return NextResponse.json({ message: '세션이 만료되었습니다. 다시 로그인해주세요.' }, { status: 401 });
}

async function handleProxy(req: NextRequest, { path: pathSegments }: { path: string[] }) {
  const path = pathSegments?.join('/') || '';
  const searchParams = req.nextUrl.search;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const headers = new Headers();
  const contentType = req.headers.get('content-type');

  if (contentType) {
    headers.set('content-type', contentType);
  }
  headers.set('Authorization', `Bearer ${accessToken}`);
  headers.set('Accept', 'application/json');

  try {
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: headers
    };

    if (!['GET', 'HEAD'].includes(req.method)) {
      fetchOptions.body = req.body;
      (fetchOptions as any).duplex = 'half';
    }

    let response = await fetch(`${process.env.API_URL}/${path}${searchParams}`, fetchOptions);

    if (response.status === 401) {
      const refreshToken = cookieStore.get('refreshToken')?.value;
      if (!refreshToken) return handleUnauthorized();

      const newTokens = await refreshTokens(refreshToken);
      if (!newTokens) return handleUnauthorized();

      const cookieOptions = { httpOnly: true, sameSite: 'strict' as const, secure: true, path: '/' };
      cookieStore.set('accessToken', newTokens.accessToken, { ...cookieOptions, maxAge: 30 * 60 });
      cookieStore.set('refreshToken', newTokens.refreshToken, { ...cookieOptions, maxAge: 14 * 24 * 60 * 60 });

      headers.set('Authorization', `Bearer ${newTokens.accessToken}`);
      fetchOptions.headers = headers;

      response = await fetch(`${process.env.API_URL}/${path}${searchParams}`, fetchOptions);
      return NextResponse.json(await response.json(), { status: response.status });
    }

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ message: errorData }, { status: response.status });
    }

    if (response.status === 204) return new NextResponse(null, { status: 204 });

    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error('BFF Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
