'use client';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';

import { useRecruitmentField } from 'entities/recruitment-field';
import { AddRecruitmentFieldForm, DeleteRecruitmentFieldButton, EditRecruitmentFieldForm } from './RecruitmentFiledForm';

export const AdminRecruitmentFieldList = () => {
  const { data } = useRecruitmentField();

  return (
    <div className="flex flex-col items-end gap-6">
      <AddRecruitmentFieldForm />

      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="px-6">모집 분야 명</TableHeaderCell>
          <TableHeaderCell className="w-24">작업</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {data.map((recruitmentField) => (
            <Item key={recruitmentField.id} data={recruitmentField} />
          ))}
          {data.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </div>
  );
};

const Item = ({ data }: { data: ReturnType<typeof useRecruitmentField>['data'][number] }) => {
  return (
    <tr key={data.id} className="group transition-colors hover:bg-slate-50/80">
      <td className="px-6 py-5 text-slate-400">#{data.id}</td>
      <td className="px-6 py-5 font-bold text-slate-800">{data.name}</td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditRecruitmentFieldForm data={data} />
          <DeleteRecruitmentFieldButton recruitmentFieldId={data.id} />
        </div>
      </td>
    </tr>
  );
};
