const getBaseUrl = () => {
  // BFF 서버 주소
  if (typeof window !== 'undefined') {
    return `${process.env.NEXT_PUBLIC_API_URL}/api`;
  }

  return process.env.API_URL;
};

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const baseUrl = getBaseUrl();
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
    cache: options?.cache || 'no-store',
    headers: {
      ...headers
    }
  };

  const res = await fetch(`${baseUrl}${url}`, config);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.msg || '요청 처리 중 에러가 발생했습니다.');
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
