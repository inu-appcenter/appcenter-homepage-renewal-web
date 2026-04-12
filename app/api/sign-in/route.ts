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

  const cookieStore = await cookies();

  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: 30 * 60 // 30분
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: 14 * 24 * 60 * 60 // 14일
  });

  // 어드민인 경우 admin, 멤버인 경우 member로 role 설정
  const userRole = id === process.env.ADMIN_KEY ? 'admin' : 'member';
  cookieStore.set('role', userRole, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: 14 * 24 * 60 * 60 // 14일
  });

  return NextResponse.json({ success: true });
}
