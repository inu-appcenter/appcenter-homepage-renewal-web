import { projectApi } from 'entities/project';
import { ProjectForm } from 'features/project';

export async function AdminProjectWritePage({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  const initialData = id ? await projectApi.getById(Number(id)) : undefined;

  return <ProjectForm initialData={initialData} />;
}
