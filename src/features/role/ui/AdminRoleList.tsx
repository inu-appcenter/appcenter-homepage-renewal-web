'use client';
import { Calendar } from 'lucide-react';
import { useRoles } from 'entities/role';
import { AddRoleForm, DeleteRoleButton, EditRoleForm } from './RoleForm';

import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';

export const AdminRoleList = () => {
  const { data } = useRoles();

  return (
    <div className="flex flex-col items-end gap-6">
      <AddRoleForm />
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">id</TableHeaderCell>
          <TableHeaderCell>역할명</TableHeaderCell>
          <TableHeaderCell className="w-80">업데이트 일자</TableHeaderCell>
          <TableHeaderCell className="w-24">작업</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {data.map((role) => (
            <Item key={role.roleId} data={role} />
          ))}
          {data.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </div>
  );
};

const Item = ({ data }: { data: ReturnType<typeof useRoles>['data'][number] }) => {
  return (
    <tr key={data.roleId} className="group transition-colors hover:bg-slate-50/80">
      <td className="px-6 py-5 text-slate-400">#{data.roleId}</td>
      <td className="px-6 py-5 font-bold text-slate-800">{data.roleName}</td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar size={14} className="text-slate-300" />
          <span className="text-xs font-medium">{new Date(data.lastModifiedDate).toLocaleDateString()}</span>
        </div>
      </td>
      <td className="px-8 py-5 text-right">
        <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <EditRoleForm data={data} />
          <DeleteRoleButton roleId={data.roleId} />
        </div>
      </td>
    </tr>
  );
};
