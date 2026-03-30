import { NextRequest, NextResponse } from 'next/server';

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  const urlPath = path?.join('/') || '';
  console.log('Cache Proxy Request for:', urlPath);
  const searchParams = req.nextUrl.search;

  // 1. 클라이언트가 보낸 헤더에서 태그 이름 꺼내기
  const cacheTag = req.headers.get('x-cache-tag');

  // 2. 백엔드로 보낼 Fetch 옵션 (Next.js 캐시 강제 적용)
  const fetchOptions: RequestInit = {
    method: 'GET',
    cache: 'force-cache', // 동적 라우트라도 무조건 캐시하라고 지시!
    ...(cacheTag && { next: { tags: [cacheTag] } }) // 태그가 있으면 달아줌
  };

  try {
    const response = await fetch(`${process.env.API_URL}/${urlPath}${searchParams}`, fetchOptions);

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(errorData, { status: response.status });
    }

    if (response.status === 204) return new NextResponse(null, { status: 204 });

    const data = await response.json();

    // 3. 브라우저(클라이언트)가 하드디스크에 캐시하지 못하게 방어막 치기
    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    console.error('Global Cache Proxy Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
