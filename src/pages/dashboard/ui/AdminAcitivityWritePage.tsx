import { activityApi } from 'entities/activity';
import { ActivityForm } from 'features/activity';

export async function AdminActivityWritePage({ params }: { params: Promise<{ id?: number }> }) {
  const { id } = await params;
  const initialData = id ? await activityApi.getById(id) : undefined;

  return <ActivityForm initialData={initialData} />;
}
