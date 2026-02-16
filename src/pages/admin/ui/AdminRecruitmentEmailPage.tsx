import { Suspense } from 'react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { AdminRecruitmentFieldList } from 'features/recruitment-field';

export const AdminRecruitmentEmailPage = () => {
  return (
    <>
      <PageTitle title="모집 대기 이메일 관리" description="동아리의 모집 대기 이메일을 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminRecruitmentFieldList />
      </Suspense>
    </>
  );
};
