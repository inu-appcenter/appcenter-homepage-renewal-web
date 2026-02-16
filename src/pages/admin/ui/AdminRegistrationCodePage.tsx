import { Suspense } from 'react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { AdminRecruitmentFieldList } from 'features/recruitment-field';

export const AdminRegistrationCodePage = () => {
  return (
    <>
      <PageTitle title="멤버 인증 코드" description="동아리의 멤버 인증 코드를 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminRecruitmentFieldList />
      </Suspense>
    </>
  );
};
