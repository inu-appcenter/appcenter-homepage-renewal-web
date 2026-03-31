'use server';
import { revalidateTag as NextRevalidateTag } from 'next/cache';

export async function revalidateTag(tag: string) {
  try {
    NextRevalidateTag(tag, 'default');
    console.log(`[Cache Debug] Successfully requested revalidation for: ${tag}`);
  } catch (error) {
    console.error(`[Cache Error] Failed to revalidate tag ${tag}:`, error);
  }
}
