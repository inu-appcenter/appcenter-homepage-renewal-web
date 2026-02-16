'use client';
import { Calendar } from 'lucide-react';
import { useRecruitmentEmail } from 'entities/recruitment';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';

export const AdminRecruitmentEmailList = () => {
  const { data } = useRecruitmentEmail();

  return (
    <div className="flex flex-col items-center gap-6">
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-48">이메일</TableHeaderCell>
          <TableHeaderCell className="w-48">등록일</TableHeaderCell>
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
const Item = ({ data }: { data: ReturnType<typeof useRecruitmentEmail>['data'][number] }) => {
  return (
    <tr key={data.id} className="group transition-colors hover:bg-slate-50/80">
      <td className="px-6 py-5 text-slate-400">#{data.id}</td>
      <td className="px-6 py-5 font-bold text-slate-800">{data.email}</td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar size={14} className="text-slate-300" />
          <span className="text-xs font-medium">{new Date(data.createdDate).toLocaleDateString()}</span>
        </div>
      </td>
    </tr>
  );
};
