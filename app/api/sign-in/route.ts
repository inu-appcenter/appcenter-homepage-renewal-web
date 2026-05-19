import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface SignResponse {
  accessToken: string;
  refreshToken: string;
}
export async function POST(request: Request) {
  const { id, password } = await request.json();

  const res = await fetch(`${process.env.API_URL}/sign/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password })
  });

  const data: SignResponse = await res.json();

  if (!res.ok) return NextResponse.json({ success: false }, { status: 401 });

  // 어드민인 경우 admin, 멤버인 경우 member로 role 설정
  const userRole = id === process.env.ADMIN_KEY ? 'admin' : 'member';

  const cookieStore = await cookies();
  const cookieOptions = { httpOnly: true, sameSite: 'strict' as const, secure: true, path: '/' };
  cookieStore.set('accessToken', data.accessToken, { ...cookieOptions, maxAge: 30 * 60 });
  cookieStore.set('refreshToken', data.refreshToken, { ...cookieOptions, maxAge: 14 * 24 * 60 * 60 });
  cookieStore.set('role', userRole, { ...cookieOptions, maxAge: 14 * 24 * 60 * 60 });

  return NextResponse.json({ success: true });
}
