'use client';
import Link from 'next/link';
import { User, ImageIcon, FileText } from 'lucide-react';
import { EmptyResult } from 'shared/error/EmptyResult';
import { Table, TableBody, TableHeader, TableHeaderCell } from 'shared/ui/table';
import { useActivities } from 'entities/activity';
import { AddActivityButton, DeleteActivityButton, EditActivityButton } from './ActivityListButton';

export const AdminActivityList = () => {
  const { data } = useActivities();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-row justify-end">
        <AddActivityButton />
      </div>
      <Table>
        <TableHeader>
          <TableHeaderCell className="w-16">ID</TableHeaderCell>
          <TableHeaderCell className="w-36">기본 정보</TableHeaderCell>
          <TableHeaderCell className="w-60">본문 내용</TableHeaderCell>
          <TableHeaderCell className="w-32">썸네일</TableHeaderCell>
          <TableHeaderCell>상세 컨텐츠</TableHeaderCell>
          <TableHeaderCell className="w-32">등록일</TableHeaderCell>
          <TableHeaderCell className="w-20">관리</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <Item key={item.id} data={item} />
          ))}
          {(!data || data.length === 0) && <EmptyResult />}
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
            <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
              <User size={10} className="text-slate-400" />
              <span>{data.author || '익명'}</span>
            </div>
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
              <div key={content.id} className="relative flex gap-3 rounded-lg border border-slate-100 bg-slate-50/50 p-2.5">
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 truncate text-xs font-bold text-slate-700">{content.subTitle}</h4>
                  <p className="line-clamp-2 text-[11px] text-slate-500">{content.text}</p>
                </div>

                {content.imageUrls && content.imageUrls.length > 0 && (
                  <div className="flex shrink-0 gap-1">
                    {content.imageUrls.map((url, idx) => (
                      <Link key={idx} href={url} target="_blank" rel="noreferrer" className="h-10 w-10 overflow-hidden rounded border border-slate-200">
                        <img src={url} alt="sub" className="h-full w-full object-cover" />
                      </Link>
                    ))}
                    {content.imageUrls.length > 2 && (
                      <div className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-slate-100 text-[10px] text-slate-500">+{content.imageUrls.length - 2}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <span className="flex items-center gap-1 text-xs text-slate-300">
            <FileText size={12} /> 상세 컨텐츠 없음
          </span>
        )}
      </td>

      <td className="px-6 py-5 text-sm text-slate-500">{new Date(data.createdDate).toLocaleDateString()}</td>
      <td className="px-6 py-5 text-center align-middle">
        <div className="flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <EditActivityButton id={data.id} />
          <DeleteActivityButton imageId={data.id} />
        </div>
      </td>
    </tr>
  );
};
