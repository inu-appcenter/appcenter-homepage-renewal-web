import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { refreshTokens } from 'features/sign';
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

  let isAuthenticated = false;

  if (accessToken) {
    isAuthenticated = true;
  } else if (refreshToken) {
    const newTokens = await refreshTokens(refreshToken);

    if (newTokens) {
      const cookieOptions = { httpOnly: true, sameSite: 'strict' as const, secure: true, path: '/' };
      response.cookies.set('accessToken', newTokens.accessToken, { ...cookieOptions, maxAge: 30 * 60 });
      response.cookies.set('refreshToken', newTokens.refreshToken, { ...cookieOptions, maxAge: 14 * 24 * 60 * 60 });
      isAuthenticated = true;
    }
  }

  // 토큰 만료 또는 토큰 재발급 실패 시 로그인 페이지로 리디렉션
  if (!isAuthenticated) {
    const errorParam = AUTH_ERROR_TYPES.AUTH_EXPIRED;
    const cookieStore = await cookies();
    cookieStore.delete('refreshToken');
    cookieStore.delete('role');
    return NextResponse.redirect(new URL(`/login?error=${errorParam}`, origin));
  }

  // 역할 기반 접근 제어
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
