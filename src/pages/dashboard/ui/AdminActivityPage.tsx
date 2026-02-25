import { PageTitle } from './Components';
import { Suspense } from 'react';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { AdminActivityList } from 'features/activity';

export const AdminActivityPage = () => {
  return (
    <>
      <PageTitle title="활동 게시판 관리" description="동아리 활동 게시물을 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminActivityList />
      </Suspense>
    </>
  );
};
