'use client';
import { ImageIcon } from 'lucide-react';
import { AddRecruitmentButton, DeleteRecruitmentButton, EditRecruitmentButton, RecruitmentStatusGrid } from './RecruitmentListButton';
import { useRecruitment } from 'entities/recruitment';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import Link from 'next/link';
import { STATUS_CONFIG } from '../config/statusConfig';

export const AdminRecruitmentList = () => {
  const { data } = useRecruitment();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-row justify-end">
        <AddRecruitmentButton />
      </div>
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-48">제목</TableHeaderCell>
          <TableHeaderCell className="w-32">썸네일</TableHeaderCell>
          <TableHeaderCell className="w-40">모집상태</TableHeaderCell>
          <TableHeaderCell>모집분야</TableHeaderCell>
          <TableHeaderCell className="w-60">모집 상태 관리</TableHeaderCell>
          <TableHeaderCell className="w-24">관리</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <Item key={item.id} data={item} />
          ))}
          {data.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </div>
  );
};
const Item = ({ data }: { data: ReturnType<typeof useRecruitment>['data'][number] }) => {
  return (
    <tr className="group transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-5 text-sm text-slate-400">#{data.id}</td>

      <td className="px-6 py-5">
        <div className="flex flex-col gap-1">
          <span className="line-clamp-1 text-sm font-bold text-slate-900">{data.title}</span>
        </div>
      </td>

      <td className="px-6 py-5">
        {data.thumbnail ? (
          <div className="aspect-video w-24 overflow-hidden rounded-md border border-slate-200 shadow-sm">
            <Link href={data.thumbnail} target="_blank" rel="noopener noreferrer">
              <img src={data.thumbnail} alt="thumb" className="h-full w-full object-cover" />
            </Link>
          </div>
        ) : (
          <div className="flex aspect-video w-24 items-center justify-center rounded-md bg-slate-100 text-slate-300">
            <ImageIcon size={18} />
          </div>
        )}
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2.5">
          {STATUS_CONFIG.filter((config) => config.value === data.status).map(({ value, label, activeColor }) => (
            <span key={value} className={`text-sm font-bold ${activeColor}`}>
              {label}
            </span>
          ))}

          {(data.status === 'WAITING' || data.status === 'RECRUITING') && data.dday !== undefined && (
            <span className="inline-flex items-center justify-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold tracking-wide text-slate-500">
              {data.dday === 0 ? 'D-Day' : `D-${data.dday}`}
            </span>
          )}
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-1.5">
          {data.fieldNames && data.fieldNames.length > 0 ? (
            data.fieldNames.map((name: string, idx: number) => (
              <span key={idx} className="inline-flex items-center gap-1 rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                {name}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-300">미지정</span>
          )}
        </div>
      </td>

      <td className="px-6 py-5">
        <RecruitmentStatusGrid id={data.id} currentStatus={data.status} />
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditRecruitmentButton id={data.id} />
          <DeleteRecruitmentButton recruitmentId={data.id} />
        </div>
      </td>
    </tr>
  );
};
