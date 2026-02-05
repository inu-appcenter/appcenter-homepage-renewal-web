'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Github, NotebookPen, ExternalLink, RotateCcw, Mail } from 'lucide-react';

import { DeleteGenerationButton, AddGenerationForm, EditGenerationForm } from './GenerationForm';

import { useGeneration, useGroupYear, usePart } from 'entities/generation';

import { EmptyResult } from 'shared/error/EmptyResult';
import { PART_COLORS } from 'shared/constants/part';
import { Part } from 'shared/types/part';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import { SearchBar } from 'shared/ui/searchbar';

export const AdminGenerationList = () => {
  const { data } = useGeneration();
  const { data: yearList } = useGroupYear();
  const { data: parts } = usePart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<'All' | Part>('All');
  const [selectedYear, setSelectedYear] = useState<'All' | number>('All');

  const partOptions: Array<Part | 'All'> = ['All', ...parts.parts];

  const yearOptions: Array<number | 'All'> = useMemo(() => {
    if (!yearList) return ['All'];
    return ['All', ...[...yearList.yearList].sort((a, b) => b - a)];
  }, [yearList]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedPart('All');
    setSelectedYear('All');
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.member.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPart = selectedPart === 'All' || item.part === selectedPart;
      const matchesYear = selectedYear === 'All' || item.year === selectedYear;

      return matchesSearch && matchesPart && matchesYear;
    });
  }, [searchTerm, selectedPart, selectedYear, data]);

  return (
    <>
      {/* 상단 헤더 & 컨트롤 */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={resetFilters} className="flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-indigo-500">
            <RotateCcw size={12} />
            필터 초기화
          </button>
          <div className="flex items-center gap-4">
            <AddGenerationForm />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="px-1 text-[11px] font-bold tracking-widest text-slate-400">기수</span>
            <div className="flex flex-wrap gap-1.5">
              {yearOptions.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                    selectedYear === year ? 'scale-105 bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {year === 'All' ? '전체' : `${year}기`}
                </button>
              ))}
            </div>
          </div>

          {/* 파트 선택 */}
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="px-1 text-xs font-bold tracking-widest text-slate-400">파트</span>
            <div className="flex flex-wrap gap-1.5">
              {partOptions.map((part) => (
                <button
                  key={part}
                  onClick={() => setSelectedPart(part)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                    selectedPart === part ? `${PART_COLORS[part].bg || 'bg-slate-900'} ${PART_COLORS[part].text || 'text-white'} ` : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {part}
                </button>
              ))}
            </div>
          </div>
        </div>

        <SearchBar placeholder="이름으로 검색하세요..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-32">기수</TableHeaderCell>
          <TableHeaderCell className="w-72">멤버 정보</TableHeaderCell>
          <TableHeaderCell className="w-40">역할 / 파트</TableHeaderCell>
          <TableHeaderCell>등록된 링크</TableHeaderCell>
          <TableHeaderCell className="w-24">작업</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {filteredData.map((gen) => (
            <Item key={gen.group_id} data={gen} />
          ))}
          {filteredData.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </>
  );
};

const Item = ({ data }: { data: ReturnType<typeof useGeneration>['data'][number] }) => {
  const partStyle = PART_COLORS[data.part] || { bg: 'bg-slate-100', text: 'text-slate-700' };

  return (
    <tr key={data.group_id} className="group transition-colors hover:bg-slate-50/80">
      <td className="px-6 py-5 text-slate-400">#{data.group_id}</td>
      <td className="px-6 py-5 font-bold text-slate-600">{data.year}기</td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
            {data.profileImage ? (
              <img src={data.profileImage} alt={data.member} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xl text-slate-400">{data.member.charAt(0)}</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900">{data.member}</p>
            <p className="mt-1 flex items-center gap-1 truncate text-sm text-slate-400">
              <Mail size={10} /> {data.email || '이메일 없음'}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-1.5 font-bold text-slate-700">{data.role}</span>
          <span className={`inline-flex w-fit items-center rounded-md px-2 py-0.5 text-xs font-bold ${partStyle.bg} ${partStyle.text}`}>{data.part}</span>
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
          {data.blogLink && (
            <Link href={data.blogLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-indigo-500">
              <NotebookPen size={14} className="text-slate-400" />
              <span className="truncate">Blog : {data.blogLink}</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-40" />
            </Link>
          )}
          {!data.gitRepositoryLink && !data.blogLink && <span className="text-slate-400">등록된 링크 없음</span>}
        </div>
      </td>
      <td className="px-8 py-5 text-right">
        <div className="flex justify-end gap-1.5 opacity-0 transition-all group-hover:opacity-100">
          <EditGenerationForm data={data} />
          <DeleteGenerationButton generationId={data.group_id} />
        </div>
      </td>
    </tr>
  );
};
