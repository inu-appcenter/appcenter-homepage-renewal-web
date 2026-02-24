import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 보호할 경로인지 확인
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin';
  const isMemberRoute = pathname.startsWith('/member') && pathname !== '/member';

  if (!isAdminRoute && !isMemberRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // 1. accessToken이 있으면 일단 통과시킵니다.
  // (만약 만료된 토큰이라면 이후 BFF나 API 단에서 401을 내뱉고 갱신하게 됩니다)
  if (accessToken) {
    return NextResponse.next();
  }

  // 2. accessToken은 없는데 refreshToken이 있다면 재발급을 시도합니다.
  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await fetch(`${process.env.API_URL}/sign/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken })
      });

      if (refreshRes.ok) {
        const newData = await refreshRes.json();

        // 요청한 페이지로 그대로 통과시키는 응답 객체 생성
        const response = NextResponse.next();

        // 새로 발급받은 토큰을 브라우저 쿠키에 구워줍니다.
        response.cookies.set('accessToken', newData.accessToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 30 * 60 // 30분 (초 단위)
        });

        if (newData.refreshToken) {
          response.cookies.set('refreshToken', newData.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 14 * 24 * 60 * 60 // 14일 (초 단위)
          });
        }

        return response; // 성공적으로 재발급 후 페이지 진입 허용
      }
    } catch (error) {
      console.error('Middleware Token Refresh Error:', error);
      // 에러가 나면 아래의 리다이렉트 로직으로 자연스럽게 넘어갑니다.
    }
  }

  // 3. 토큰이 모두 없거나, 재발급에 실패한 경우 로그인 페이지로 쫓아냅니다.
  if (isAdminRoute) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (isMemberRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/member/:path*']
};
