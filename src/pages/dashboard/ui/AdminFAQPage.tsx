'use client';
import { AdminFAQList } from 'features/faq';
import { PageTitle } from './Components';
import { Suspense } from 'react';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';

export function AdminFAQPage() {
  return (
    <>
      <PageTitle title="질문 관리(FAQ)" description="홈페이지에 표시할 FAQ를 추가,수정,삭제 할 수 있습니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminFAQList />
      </Suspense>
    </>
  );
}
