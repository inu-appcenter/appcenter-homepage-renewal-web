import { Suspense } from 'react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { MemberInfoForm } from 'features/member';

export function MemberInfoPage() {
  return (
    <>
      <PageTitle title="회원 정보 관리" description="회원의 개인정보를 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <MemberInfoForm />
      </Suspense>
    </>
  );
}
