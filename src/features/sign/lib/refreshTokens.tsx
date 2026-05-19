export async function refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const refreshRes = await fetch(`${process.env.API_URL}/sign/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!refreshRes.ok) return null;

    const newData = await refreshRes.json();
    return {
      accessToken: newData.accessToken,
      refreshToken: newData.refreshToken
    };
  } catch {
    console.error('Token Refresh Error:');
    return null;
  }
}
