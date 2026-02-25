import { Suspense } from 'react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { AdminProjectList } from 'features/project';

export const AdminProjectPage = () => {
  return (
    <>
      <PageTitle title="프로젝트 관리" description="참여 중인 프로젝트의 내용과 상태를 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminProjectList />
      </Suspense>
    </>
  );
};
