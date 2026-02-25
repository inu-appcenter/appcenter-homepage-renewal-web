import { AdminGenerationList } from 'features/generation';
import { PageTitle } from './Components';
import { Suspense } from 'react';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';

export const AdminGenerationPage = () => {
  return (
    <>
      <PageTitle title="기수 관리" description="동아리원의 기수, 파트, 역할을 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminGenerationList />
      </Suspense>
    </>
  );
};
