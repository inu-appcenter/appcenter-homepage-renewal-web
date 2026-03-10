'use client';
import Link from 'next/link';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import { AddSkillForm, DeleteSkillButton, EditSkillForm } from './SkillForm';
import { useSkillStack } from 'entities/skill-stack';
import { useMemo } from 'react';

export const AdminSkillList = () => {
  const { data } = useSkillStack();
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.id - a.id);
  }, [data]);

  return (
    <div className="flex flex-col items-end gap-6">
      <AddSkillForm />
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-60">기술 스택명</TableHeaderCell>
          <TableHeaderCell className="w-60">카테고리</TableHeaderCell>
          <TableHeaderCell>이미지</TableHeaderCell>
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

const Item = ({ data }: { data: ReturnType<typeof useSkillStack>['data'][number] }) => {
  return (
    <tr className="group transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-5 text-center text-sm text-slate-500">#{data.id}</td>
      <td className="px-6 py-5 text-sm font-medium text-slate-500">{data.name || '내용 없음'}</td>
      <td className="px-6 py-5 text-sm font-medium text-slate-500">{data.category || '내용 없음'}</td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <div key={data.id} className="relative h-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 transition-transform hover:scale-105">
            <Link href={data.icon} target="_blank" rel="noreferrer" className="block h-full w-full cursor-zoom-in">
              <img src={data.icon} alt={`image-${data.id}`} className="h-full w-full object-cover" />
            </Link>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditSkillForm data={data} />
          <DeleteSkillButton skillId={data.id} />
        </div>
      </td>
    </tr>
  );
};
