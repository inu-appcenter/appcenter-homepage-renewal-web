'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ImageIcon, FileText } from 'lucide-react';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import { useActivities } from 'entities/activity';
import { AddActivityButton, DeleteActivityButton, EditActivityButton } from './ActivityListButton';

export const AdminActivityList = () => {
  const { data } = useActivities();
  const sortedData = [...data].sort((a, b) => b.createdDate.localeCompare(a.createdDate));

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-row justify-end">
        <AddActivityButton />
      </div>
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-40">기본 정보</TableHeaderCell>
          <TableHeaderCell className="w-60">본문 내용</TableHeaderCell>
          <TableHeaderCell className="w-32">썸네일</TableHeaderCell>
          <TableHeaderCell>상세 내용</TableHeaderCell>
          <TableHeaderCell className="w-40">등록일</TableHeaderCell>
          <TableHeaderCell className="w-24">관리</TableHeaderCell>
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

const Item = ({ data }: { data: ReturnType<typeof useActivities>['data'][number] }) => {
  return (
    <tr className="group transition-colors hover:bg-slate-50/80">
      <td className="px-6 py-5 text-slate-400">#{data.id}</td>

      <td className="px-6 py-5">
        <div className="flex flex-col gap-1.5">
          <span className="line-clamp-2 text-sm leading-snug font-semibold text-slate-900">{data.title}</span>
          <span className="text-xs text-slate-400"> {data.titleEng}</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="line-clamp-1 flex items-center gap-1 truncate rounded-full bg-slate-100 px-2 py-0.5">{data.author}</span>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <p className="text-xs leading-relaxed text-slate-600">{data.body || <span className="text-slate-300">내용 없음</span>}</p>
      </td>

      <td className="px-6 py-5">
        {data.thumbnail ? (
          <Link
            href={data.thumbnail}
            target="_blank"
            rel="noreferrer"
            className="block aspect-video w-full overflow-hidden rounded-md border border-slate-200 transition-all hover:ring-2 hover:ring-blue-500 hover:ring-offset-1"
          >
            <img src={data.thumbnail} alt={`thumb-${data.id}`} className="h-full w-full object-cover" />
          </Link>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-md bg-slate-100 text-slate-300">
            <ImageIcon size={20} />
          </div>
        )}
      </td>

      <td className="px-6 py-5">
        {data.contents && data.contents.length > 0 ? (
          <div className="flex flex-col gap-3">
            {data.contents.map((content) => (
              <ContentItem key={content.id} content={content} />
            ))}
          </div>
        ) : (
          <span className="flex items-center gap-1 text-xs text-slate-300">
            <FileText size={12} /> 상세 컨텐츠 없음
          </span>
        )}
      </td>

      <td className="px-6 py-5 text-sm text-slate-500">{new Date(data.createdDate).toLocaleDateString()}</td>
      <td className="px-6 py-5">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditActivityButton id={data.id} />
          <DeleteActivityButton imageId={data.id} />
        </div>
      </td>
    </tr>
  );
};

// 상세 이미지를 추후 다운받아야할 수도 있음.
// 레이지로딩을 위해 접어두었다가 버튼 클릭 시 보여주는 방식으로 구현
const ContentItem = ({ content }: { content: { subTitle: string; text: string; imageUrls?: string[] } }) => {
  const [showImages, setShowImages] = useState(false);

  return (
    <div className="relative flex flex-col gap-2 rounded-lg border border-slate-100 bg-slate-50/50 p-2.5">
      <div className="min-w-0 flex-1">
        <h4 className="mb-1 truncate text-xs font-bold text-slate-700">{content.subTitle}</h4>
        <p className="line-clamp-2 text-[11px] text-slate-500">{content.text}</p>
      </div>

      {content.imageUrls && content.imageUrls.length > 0 && (
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={() => setShowImages(!showImages)}
            className="w-max rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            {showImages ? '이미지 닫기' : `상세 이미지 보기 (${content.imageUrls.length}장)`}
          </button>

          {showImages && (
            <div className="flex shrink-0 flex-wrap gap-1">
              {content.imageUrls.map((url: string, idx: number) => (
                <Link key={idx} href={url} target="_blank" rel="noreferrer" className="h-10 w-10 overflow-hidden rounded border border-slate-200 hover:ring-2 hover:ring-blue-500">
                  <img src={url} alt="sub" className="h-full w-full object-cover" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
