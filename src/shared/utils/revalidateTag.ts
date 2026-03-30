'use server';
import { revalidateTag as NextRevalidateTag } from 'next/cache';

export async function revalidateTag(tag: string) {
  console.log(`[Cache] Revalidating tag: ${tag}`);
  NextRevalidateTag('workshops', 'default');
}
