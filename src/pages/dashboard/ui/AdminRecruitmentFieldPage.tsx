import { Suspense } from 'react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { AdminRecruitmentFieldList } from 'features/recruitment-field';

export const AdminRecruitmentFieldPage = () => {
  return (
    <>
      <PageTitle title="모집 분야 관리" description="동아리의 모집 공고에 들어가는 분야를 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminRecruitmentFieldList />
      </Suspense>
    </>
  );
};
