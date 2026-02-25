import { activityApi } from 'entities/activity';
import { ActivityForm } from 'features/activity';

export async function AdminActivityWritePage({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  const initialData = id ? await activityApi.getById(Number(id)) : undefined;

  return <ActivityForm initialData={initialData} />;
}
