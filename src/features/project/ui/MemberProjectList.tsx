'use client';
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import { SearchBar } from 'shared/ui/searchbar';
import { Project, useProjectByMember } from 'entities/project';
import { MemberAddProjectForm, MemberEditProjectForm, DeleteProjectButton, ProjectStatusToggle } from './ProjectListButton';
import { AppStore, GooglePlay, WebLink } from 'entities/link';

export const MemberProjectList = () => {
  const { data } = useProjectByMember();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <SearchBar placeholder="프로젝트 이름으로 검색하세요..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <MemberAddProjectForm />
      </div>

      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-92">프로젝트 정보</TableHeaderCell>
          <TableHeaderCell>플랫폼 링크</TableHeaderCell>
          <TableHeaderCell className="w-36">상태</TableHeaderCell>
          <TableHeaderCell className="w-36">게시일</TableHeaderCell>
          <TableHeaderCell className="w-36">앱 활성화 관리</TableHeaderCell>
          <TableHeaderCell className="w-24">작업</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {filteredData.map((project) => (
            <Item key={project.id} data={project} />
          ))}
          {filteredData.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </>
  );
};

const Item = ({ data }: { data: Project }) => {
  const thumbnail = data.images && Object.values(data.images).length > 0 ? (Object.values(data.images)[0] as string) : null;

  return (
    <tr className="group transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-5 text-center text-sm text-slate-400">#{data.id}</td>

      <td className="px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            {thumbnail ? (
              <img src={thumbnail} alt={data.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-50 font-bold text-slate-400">{data.title.charAt(0)}</div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900">{data.title}</p>
            <p className="mt-1 line-clamp-2 text-xs text-slate-500" title={data.subTitle}>
              {data.subTitle || '설명 없음'}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex flex-row gap-2">
          {data.androidStoreLink && <GooglePlay href={data.androidStoreLink} className="h-8" />}
          {data.appleStoreLink && <AppStore href={data.appleStoreLink} className="h-8" />}
          {data.websiteLink && <WebLink href={data.websiteLink} className="h-8" />}
          {!data.androidStoreLink && !data.appleStoreLink && !data.websiteLink && <span className="text-xs text-slate-400">등록된 링크 없음</span>}
        </div>
      </td>

      <td className="px-6 py-5">
        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
            data.isActive ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 'bg-slate-50 text-slate-500 ring-slate-500/10'
          }`}
        >
          <span className="relative flex h-2 w-2">
            {data.isActive && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${data.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
          </span>
          <span>{data.isActive ? '운영 중' : '운영 종료'}</span>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar size={12} />
            <span>{new Date(data.createdDate).toLocaleDateString('ko-KR')}</span>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <ProjectStatusToggle projectId={data.id} isActive={data.isActive} />
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          <MemberEditProjectForm project={data} />
          <DeleteProjectButton projectId={data.id} />
        </div>
      </td>
    </tr>
  );
};
