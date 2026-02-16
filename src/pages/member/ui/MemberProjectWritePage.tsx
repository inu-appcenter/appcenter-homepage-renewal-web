import { projectApi } from 'entities/project';
import { MemberProjectForm } from 'features/project';

export async function MemberProjectWritePage({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  const initialData = id ? await projectApi.getById(Number(id)) : undefined;

  return <MemberProjectForm initialData={initialData} />;
}
