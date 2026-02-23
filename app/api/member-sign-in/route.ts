import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface SignResponse {
  accessToken: string;
  refreshToken: string;
}
export async function POST(request: Request) {
  const { id, password } = await request.json();

  // 서버로 부터 토큰 발급 받기
  const res = await fetch(`${process.env.API_URL}/sign/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password })
  });

  const data: SignResponse = await res.json();

  if (res.ok) {
    const cookieStore = await cookies();
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 30 * 60 * 1000), // 30분
      secure: true,
      path: '/'
    });

    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14일 (서버 확인 필요)
      secure: true,
      path: '/'
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
