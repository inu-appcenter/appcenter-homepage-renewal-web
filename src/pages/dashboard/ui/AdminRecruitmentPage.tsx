import { Suspense } from 'react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { AdminRecruitmentList } from 'features/recruitment';

export const AdminRecruitmentPage = () => {
  return (
    <>
      <PageTitle title="모집 공고 관리" description="신입 부원 모집부터 프로젝트 팀원 구성까지, 모집 공고를 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminRecruitmentList />
      </Suspense>
    </>
  );
};
