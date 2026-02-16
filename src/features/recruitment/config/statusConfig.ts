import { Bot, Hourglass, CheckCircle2, Ban } from 'lucide-react';

export const STATUS_CONFIG = [
  { value: 'AUTO', label: '자동', Icon: Bot, activeColor: 'text-indigo-600' },
  { value: 'WAITING', label: '대기중', Icon: Hourglass, activeColor: 'text-amber-600' },
  { value: 'RECRUITING', label: '모집중', Icon: CheckCircle2, activeColor: 'text-emerald-600' },
  { value: 'CLOSED', label: '마감', Icon: Ban, activeColor: 'text-rose-600' }
] as const;
