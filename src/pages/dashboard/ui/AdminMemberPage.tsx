import { Suspense } from 'react';
import { AdminMemberList } from 'features/member';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';

export const AdminMemberPage = () => {
  return (
    <>
      <PageTitle title="동아리원 관리" description="동아리원의 정보를 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminMemberList />
      </Suspense>
    </>
  );
};
