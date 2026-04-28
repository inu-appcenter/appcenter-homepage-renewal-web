import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ERROR_TYPES } from 'shared/constants/auth';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin';
  const isMemberRoute = pathname.startsWith('/member') && pathname !== '/member';

  if (!isAdminRoute && !isMemberRoute) return NextResponse.next();

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const role = request.cookies.get('role')?.value;

  const response = NextResponse.next();

  const isAuthenticated = await (async () => {
    if (accessToken) return true; // accessToken이 있는지 확인, 있으면 인증된 상태로 간주
    if (!refreshToken) return false; // refreshToken이 없으면 새로 로그인 필요

    try {
      // accessToken이 만료된 경우 refreshToken으로 토큰 재발급 시도
      const refreshRes = await fetch(`${process.env.API_URL}/sign/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });

      if (refreshRes.ok) {
        const newData = await refreshRes.json();
        const cookieOptions = { httpOnly: true, sameSite: 'strict' as const, secure: true, path: '/' };

        response.cookies.set('accessToken', newData.accessToken, { ...cookieOptions, maxAge: 30 * 60 });
        response.cookies.set('refreshToken', newData.refreshToken, { ...cookieOptions, maxAge: 14 * 24 * 60 * 60 });
        return true;
      }
      return false;
    } catch {
      console.error('Middleware Token Refresh Error:');
      return false;
    }
  })();

  if (!isAuthenticated) {
    const errorParam = AUTH_ERROR_TYPES.AUTH_EXPIRED;
    const cookieStore = await cookies();
    cookieStore.delete('refreshToken');
    cookieStore.delete('role');
    return NextResponse.redirect(new URL(`/login?error=${errorParam}`, origin));
  }

  // 4. 인가(Authorization) 검사, error 쿼리스트링을 붙여서 로그인 페이지로 리다이렉트
  if (isAdminRoute && role !== 'admin') {
    const errorParam = AUTH_ERROR_TYPES.ADMIN_REQUIRED;
    return NextResponse.redirect(new URL(`/login?error=${errorParam}`, origin));
  }
  if (isMemberRoute && role !== 'member') {
    const errorParam = AUTH_ERROR_TYPES.MEMBER_REQUIRED;
    return NextResponse.redirect(new URL(`/login?error=${errorParam}`, origin));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/member/:path*', '/admin']
};
