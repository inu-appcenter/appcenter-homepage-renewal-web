'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Github, Palette, Phone, Mail, ExternalLink, NotebookPen } from 'lucide-react';
import { useMember } from 'entities/member';
import { AddMemberForm, EditMemberForm, DeleteMemberButton } from './MemberForm';

import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import { SearchBar } from 'shared/ui/searchbar';

export const AdminMemberList = () => {
  const { data } = useMember();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = useMemo(() => {
    return data.filter((m) => {
      const searchStr = `${m.name}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, data]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <SearchBar placeholder="이름으로 멤버를 검색하세요..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <AddMemberForm />
      </div>

      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-68">기본 정보</TableHeaderCell>
          <TableHeaderCell className="w-48">학과/학번</TableHeaderCell>
          <TableHeaderCell>등록된 링크</TableHeaderCell>
          <TableHeaderCell className="w-24">작업</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {filteredMembers.map((member) => (
            <MemberItem key={member.member_id} data={member} />
          ))}
          {filteredMembers.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </>
  );
};

const MemberItem = ({ data }: { data: ReturnType<typeof useMember>['data'][number] }) => {
  return (
    <tr className="group transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-5 text-center text-sm text-slate-400">#{data.member_id}</td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
            {data.profileImage ? (
              <img src={data.profileImage} alt={data.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xl text-slate-400">{data.name.charAt(0)}</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900">{data.name}</p>
            <p className="mt-1 flex items-center gap-1 truncate text-sm text-slate-400">
              <Mail size={10} /> {data.email || '이메일 없음'}
            </p>
            <p className="mt-1 flex items-center gap-1 truncate text-sm text-slate-400">
              <Phone size={12} className="text-slate-300" />
              {data.phoneNumber || '연락처 없음'}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="space-y-1.5 text-xs">
          <div className="flex flex-col gap-0.5 text-sm text-slate-400">
            <span className="font-medium text-slate-500">{data.department || '학과 미입력'}</span>
            <span>{data.studentNumber || '학번 미입력'}</span>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex flex-col gap-1.5">
          {data.gitRepositoryLink && (
            <Link href={data.gitRepositoryLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900">
              <Github size={14} className="text-slate-400" />
              <span className="truncate">GitHub : {data.gitRepositoryLink}</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-40" />
            </Link>
          )}
          {data.behanceLink && (
            <Link href={data.behanceLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-[#0057ff]">
              <Palette size={14} className="text-slate-400" />
              <span className="truncate">Behance : {data.behanceLink}</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-40" />
            </Link>
          )}
          {data.blogLink && (
            <Link href={data.blogLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-indigo-500">
              <NotebookPen size={14} className="text-slate-400" />
              <span className="truncate">Blog : {data.blogLink}</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-40" />
            </Link>
          )}
          {!data.gitRepositoryLink && !data.behanceLink && !data.blogLink && <span className="text-slate-400">등록된 링크 없음</span>}
        </div>
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditMemberForm member={data} />
          <DeleteMemberButton memberId={data.member_id} />
        </div>
      </td>
    </tr>
  );
};
