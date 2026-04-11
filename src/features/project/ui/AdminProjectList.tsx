'use client';
import { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { UserMode, useRoleContext } from 'entities/sign';
import { Project, useProject, useProjectByMember } from 'entities/project';
import { AppStore, GooglePlay, WebLink } from 'entities/link';

import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import { SearchBar } from 'shared/ui/searchbar';

import { AddProjectForm, EditProjectForm, DeleteProjectButton, ProjectStatusToggle } from './ProjectListButton';

export const AdminProjectList = () => {
  const { mode } = useRoleContext();

  switch (mode) {
    case 'admin':
      return <AdminProjectFetcher mode={mode} />;
    case 'member':
      return <MemberProjectFetcher mode={mode} />;
    default:
      return <div>알 수 없는 권한입니다.</div>;
  }
};

const AdminProjectFetcher = ({ mode }: { mode: UserMode }) => {
  const { data } = useProject();
  return <ProjectListUI data={data} mode={mode} />;
};

const MemberProjectFetcher = ({ mode }: { mode: UserMode }) => {
  const { data } = useProjectByMember();
  return <ProjectListUI data={data} mode={mode} />;
};

const ProjectListUI = ({ data, mode }: { data: Project[]; mode: UserMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.id - a.id);
  }, [data]);
  const filteredData = sortedData.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <SearchBar placeholder="프로젝트 이름으로 검색하세요" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <AddProjectForm mode={mode} />
      </div>

      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-92">프로젝트 정보</TableHeaderCell>
          <TableHeaderCell>플랫폼 링크</TableHeaderCell>
          <TableHeaderCell className="w-40">앱 활성화 상태</TableHeaderCell>
          <TableHeaderCell className="w-32">게시일</TableHeaderCell>
          <TableHeaderCell className="w-40">작업</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {filteredData.map((project) => (
            <Item key={project.id} data={project} mode={mode} />
          ))}
          {filteredData.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </>
  );
};
const Item = ({ data, mode }: { data: Project; mode: UserMode }) => {
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
          {!data.androidStoreLink && !data.appleStoreLink && !data.websiteLink && <span className="text-xs text-slate-400">링크 없음</span>}
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          {/* 심플한 점 + 텍스트 */}
          <div className="flex w-16 items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              {data.isActive && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${data.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
            </span>
            <span className={`text-xs font-medium ${data.isActive ? 'text-emerald-700' : 'text-slate-500'}`}>{data.isActive ? '운영 중' : '종료'}</span>
          </div>

          {/* 토글 버튼 */}
          <ProjectStatusToggle projectId={data.id} isActive={data.isActive} />
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>{new Date(data.createdDate).toLocaleDateString('ko-KR')}</span>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          <Link
            href={`/project/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
            title="사용자 페이지에서 보기"
          >
            <ExternalLink size={18} />
          </Link>
          <EditProjectForm project={data} mode={mode} />
          <DeleteProjectButton projectId={data.id} />
        </div>
      </td>
    </tr>
  );
};
