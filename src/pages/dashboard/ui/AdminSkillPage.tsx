import { Suspense } from 'react';
import { PageTitle } from './Components';
import { TableSkeleton } from 'shared/skeleton/TableSkeleton';
import { AdminSkillList } from 'features/skill-stack';

export const AdminSkillPage = () => {
  return (
    <>
      <PageTitle title="기술 아이콘 관리" description="프로젝트에 사용되는 기술 스택 아이콘을 관리합니다." />
      <Suspense fallback={<TableSkeleton />}>
        <AdminSkillList />
      </Suspense>
    </>
  );
};
