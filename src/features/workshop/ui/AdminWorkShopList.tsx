'use client';
import Link from 'next/link';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import { useWorkShop } from 'entities/workshop';
import { AddWorkShopForm, DeleteWorkShopButton, EditWorkShopForm } from './WorkShopForm';

export const AdminWorkShopList = () => {
  const { data } = useWorkShop();
  const sortedData = [...data].sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-col items-end gap-6">
      <AddWorkShopForm />
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-60">워크숍 제목</TableHeaderCell>
          <TableHeaderCell>이미지</TableHeaderCell>
          <TableHeaderCell className="w-48">활동일</TableHeaderCell>
          <TableHeaderCell className="w-24">작업</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {sortedData.map((item) => (
            <Item key={item.id} data={item} />
          ))}
          {sortedData.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </div>
  );
};

const Item = ({ data }: { data: ReturnType<typeof useWorkShop>['data'][number] }) => {
  return (
    <tr className="group transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-5 text-center text-sm text-slate-400">#{data.id}</td>
      <td className="px-6 py-5 text-sm font-medium text-slate-900">{data.title || '내용 없음'}</td>
      <td className="px-6 py-5">
        <div className="flex max-w-75 items-center gap-2 overflow-x-auto pb-2">
          {data.imageUrl ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 transition-transform hover:scale-105">
              <Link href={data.imageUrl} target="_blank" rel="noreferrer" className="block h-full w-full cursor-zoom-in">
                <img src={data.imageUrl} alt={`image-0`} className="h-full w-full object-cover" />
              </Link>
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">이미지 없음</div>
          )}
        </div>
      </td>
      <td className="px-6 py-5 text-sm text-slate-500">{new Date(data.eventDate).toLocaleDateString()}</td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditWorkShopForm workshop={data} />
          <DeleteWorkShopButton workshopId={data.id} />
        </div>
      </td>
    </tr>
  );
};
