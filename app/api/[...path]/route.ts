import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return handleProxy(req, path);
}

async function handleProxy(req: NextRequest, pathSegments: string[]) {
  const path = pathSegments?.join('/') || '';
  const searchParams = req.nextUrl.search;

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const headers = new Headers();
  const contentType = req.headers.get('content-type');

  if (contentType) {
    headers.set('content-type', contentType);
  }
  headers.set('Authorization', `Bearer ${token || ''}`);
  headers.set('Accept', 'application/json');

  try {
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: headers
    };

    if (!['GET', 'HEAD'].includes(req.method)) {
      const arrayBuffer = await req.arrayBuffer();
      fetchOptions.body = arrayBuffer;
    }

    let response = await fetch(`${process.env.API_URL}/${path}${searchParams}`, fetchOptions);

    // 인증이 만료된 경우 access_token 재발급 시도
    if (response.status === 401) {
      const refreshToken = cookieStore.get('refreshToken')?.value;

      if (refreshToken) {
        const refreshRes = await fetch(`${process.env.API_URL}/sign/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: refreshToken })
        });

        if (refreshRes.ok) {
          const newData = await refreshRes.json();

          cookieStore.set('accessToken', newData.accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            path: '/',
            expires: new Date(Date.now() + 30 * 60 * 1000)
          });

          if (newData.refreshToken) {
            cookieStore.set('refreshToken', newData.refreshToken, {
              httpOnly: true,
              sameSite: 'strict',
              secure: true,
              path: '/',
              expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            });
          }

          headers.set('Authorization', `Bearer ${newData.accessToken}`);
          fetchOptions.headers = headers;

          response = await fetch(`${process.env.API_URL}/${path}${searchParams}`, fetchOptions);
        } else {
          // 재발급 실패 (refreshToken 마저 만료됨) -> 로그아웃 처리
          cookieStore.delete('accessToken');
          cookieStore.delete('refreshToken');
          return NextResponse.json({ message: 'Session expired' }, { status: 401 });
        }
      } else {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.log('BFF Error Response:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    if (response.status === 204) return new NextResponse(null, { status: 204 });

    const resData = await response.json();
    return NextResponse.json(resData, { status: response.status });
  } catch (error) {
    console.error('BFF Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
