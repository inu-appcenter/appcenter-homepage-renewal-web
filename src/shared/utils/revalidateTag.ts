'use server';
import { revalidateTag as NextRevalidateTag } from 'next/cache';

export async function revalidateTag(tag: string) {
  NextRevalidateTag(tag, 'default');
}
