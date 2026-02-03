'use client';
import { useState, useMemo } from 'react';
import { useFAQs } from 'entities/faq';

import { PART, PART_COLORS } from 'shared/constants/part';
import { Part } from 'shared/types/part';
import { SearchBar } from 'shared/ui/searchbar';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';

import { AddFAQForm, DeleteFAQButton, EditFAQForm } from './FAQForm';

export const AdminFAQList = () => {
  const { data } = useFAQs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<Part | 'All'>('All');

  const filterOptions: Array<Part | 'All'> = ['All', ...PART];

  const filteredFaqs = useMemo(() => {
    return data.filter((faq) => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPart = selectedPart === 'All' || faq.part === selectedPart;
      return matchesSearch && matchesPart;
    });
  }, [searchTerm, selectedPart, data]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 rounded-xl bg-slate-50 p-1">
          {filterOptions.map((part) => (
            <button
              key={part}
              onClick={() => setSelectedPart(part)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${selectedPart === part ? `${PART_COLORS[part].bg} ${PART_COLORS[part].text} shadow-sm` : 'text-slate-400'}`}
            >
              {part}
            </button>
          ))}
        </div>
        <SearchBar placeholder="질문 또는 답변 입력..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <AddFAQForm />
      </div>

      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-30">파트명</TableHeaderCell>
          <TableHeaderCell className="px-6">질문 및 답변</TableHeaderCell>
          <TableHeaderCell className="w-24">작업</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {filteredFaqs.map((faq) => (
            <Item key={faq.id} data={faq} />
          ))}
          {filteredFaqs.length === 0 && <EmptyResult />}
        </TableBody>
      </Table>
    </>
  );
};

const Item = ({ data }: { data: ReturnType<typeof useFAQs>['data'][number] }) => {
  return (
    <tr key={data.id} className="group transition-colors hover:bg-slate-50/80">
      <td className="px-6 py-5 text-slate-400">#{data.id}</td>
      <td className="px-6 py-5">
        <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ${PART_COLORS[data.part].bg} ${PART_COLORS[data.part].text}`}>{data.part}</span>
      </td>
      <td className="px-6 py-5">
        <p className="font-bold text-slate-900">{data.question}</p>
        <p className="mt-1 text-xs text-slate-400">{data.answer}</p>
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditFAQForm data={data} />
          <DeleteFAQButton faqId={data.id} />
        </div>
      </td>
    </tr>
  );
};
