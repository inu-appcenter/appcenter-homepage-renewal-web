import { Cog, Clock, Ban, Check } from 'lucide-react';

export const STATUS_CONFIG = [
  { value: 'AUTO', label: '자동', Icon: Cog, activeColor: 'text-indigo-600' },
  { value: 'WAITING', label: '대기중', Icon: Clock, activeColor: 'text-amber-600' },
  { value: 'RECRUITING', label: '모집중', Icon: Check, activeColor: 'text-emerald-600' },
  { value: 'CLOSED', label: '마감', Icon: Ban, activeColor: 'text-rose-600' }
] as const;
