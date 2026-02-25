import { Suspense } from 'react';
import { PageTitle } from './Components';
import { AdminRoleList } from 'features/role';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';

export const AdminRolePage = () => {
  return (
    <>
      <PageTitle title="역할 관리" description="동아리의 역할을 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminRoleList />
      </Suspense>
    </>
  );
};
