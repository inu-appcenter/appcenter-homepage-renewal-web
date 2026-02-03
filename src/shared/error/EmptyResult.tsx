import { SearchX } from 'lucide-react';

export const EmptyResult = ({ message }: { message?: string }) => {
  return (
    <tr className="border-none hover:bg-transparent">
      <td colSpan={6} className="px-6 py-24 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <SearchX size={40} className="text-slate-200" />
          <p className="text-sm whitespace-pre-line text-slate-400">{message ?? '검색 결과가 없습니다.\n필터를 변경하거나 데이터를 추가해보세요.'}</p>
        </div>
      </td>
    </tr>
  );
};
