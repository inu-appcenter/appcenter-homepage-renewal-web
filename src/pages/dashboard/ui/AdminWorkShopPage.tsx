import { AdminWorkShopList } from 'features/workshop';
import { PageTitle } from './Components';
import { Suspense } from 'react';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';

export const AdminWorkShopPage = () => {
  return (
    <>
      <PageTitle title="워크숍 게시판 관리" description="동아리 워크숍 게시물을 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminWorkShopList />
      </Suspense>
    </>
  );
};
