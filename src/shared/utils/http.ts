const getBaseUrl = () => {
  // BFF 서버 주소
  if (typeof window !== 'undefined') {
    return `/api`;
  }

  return process.env.API_URL;
};

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const baseUrl = getBaseUrl();

  const isServer = typeof window === 'undefined';
  const isCacheRequest = url.startsWith('/cache');
  const actualUrl = isCacheRequest ? url.replace(/^\/cache/, '') : url;

  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>)
  };

  if (!(options?.body instanceof FormData)) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
  }

  const config: RequestInit = {
    ...options,
    headers: { ...headers }
  };

  // 서버에서 캐시 요청인 경우, Next.js의 캐시 시스템을 활용하도록 옵션 조정
  if (isServer && isCacheRequest) {
    config.cache = 'force-cache';
    const cacheTag = headers['x-cache-tag'];
    if (cacheTag) {
      config.next = { tags: [cacheTag] };
    }
  }

  const res = await fetch(`${baseUrl}${actualUrl}`, config);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw errorData;
  }

  return res.json();
}

export const http = {
  get: <T>(url: string, options?: RequestInit) => request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body: unknown, options?: RequestInit) => request<T>(url, { ...options, method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }),
  patch: <T>(url: string, body: unknown, options?: RequestInit) => request<T>(url, { ...options, method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: <T>(url: string, body: unknown, options?: RequestInit) => request<T>(url, { ...options, method: 'PUT', body: body instanceof FormData ? body : JSON.stringify(body) }),
  delete: <T>(url: string, options?: RequestInit) => request<T>(url, { ...options, method: 'DELETE' })
};
