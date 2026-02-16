import { Suspense } from 'react';
import { Info } from 'lucide-react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { MemberRecruitmentList } from 'features/recruitment';

export const MemberRecruitmentPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageTitle title="모집 공고 관리" description="동아리의 모집 공고를 관리합니다." />
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 shadow-sm">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-blue-900">상태 자동화 안내</h3>
          <p className="text-sm leading-relaxed text-blue-800">
            모집 상태를 <strong className="font-semibold">자동</strong>으로 설정해 두면, 설정하신 <strong className="font-semibold">모집 시작일과 종료일</strong>에 맞춰 시스템이 알아서
            <span className="mx-1 inline-flex items-center rounded-md bg-white px-1.5 py-0.5 text-[11px] font-bold text-amber-600 shadow-sm">대기중</span>
            <span className="mx-1 inline-flex items-center rounded-md bg-white px-1.5 py-0.5 text-[11px] font-bold text-emerald-600 shadow-sm">모집중</span>
            <span className="mx-1 inline-flex items-center rounded-md bg-white px-1.5 py-0.5 text-[11px] font-bold text-rose-600 shadow-sm">마감</span>
            으로 상태를 변경합니다.
          </p>
        </div>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <MemberRecruitmentList />
      </Suspense>
    </div>
  );
};
