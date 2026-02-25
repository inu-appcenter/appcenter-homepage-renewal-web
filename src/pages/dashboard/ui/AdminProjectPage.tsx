import { Suspense } from 'react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { AdminProjectList } from 'features/project';

export const AdminProjectPage = () => {
  return (
    <>
      <PageTitle title="프로젝트 관리" description="앱센터에서 진행한 프로젝트를 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminProjectList />
      </Suspense>
    </>
  );
};
