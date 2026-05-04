import { NextRequest, NextResponse } from 'next/server';

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  const urlPath = path?.join('/') || '';
  const searchParams = req.nextUrl.search;

  // 1. 클라이언트가 보낸 헤더에서 태그 이름 꺼내기
  const cacheTag = req.headers.get('x-cache-tag');

  // 2. 백엔드로 보낼 Fetch 옵션 (Next.js 캐시 적용)
  const fetchOptions: RequestInit = {
    method: 'GET',
    cache: 'force-cache',
    ...(cacheTag && { next: { tags: [cacheTag] } })
  };

  try {
    const response = await fetch(`${process.env.API_URL}/${urlPath}${searchParams}`, fetchOptions);

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(errorData, { status: response.status });
    }

    if (response.status === 204) return new NextResponse(null, { status: 204 });

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200
    });
  } catch (error) {
    console.error('Global Cache Proxy Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
