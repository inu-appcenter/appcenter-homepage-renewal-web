import { recruitmentApi } from 'entities/recruitment';
import { RecruitmentForm } from 'features/recruitment';

export async function AdminRecruitmentWritePage({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  const initialData = id ? await recruitmentApi.getById(Number(id)) : undefined;

  return <RecruitmentForm initialData={initialData} />;
}
