import { Suspense } from 'react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { AdminRecruitmentList } from 'features/recruitment';

export const AdminRecruitmentPage = () => {
  return (
    <>
      <PageTitle title="모집 공고 관리" description="동아리의 모집 공고를 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminRecruitmentList />
      </Suspense>
    </>
  );
};
