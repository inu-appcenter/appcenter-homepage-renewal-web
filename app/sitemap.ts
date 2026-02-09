import { MetadataRoute } from 'next';
import { projectApi } from 'entities/project/api';
import { activityApi } from 'entities/activity/api';
import { recruitmentApi } from 'entities/recruitment/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://inuappcenter.kr';

  const staticRoutes = ['', '/joinus', '/ourteam', '/project', '/activity'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await projectApi.getAll();
    projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/project/${project.id}`,
      lastModified: new Date(project.lastModifiedDate || project.createdDate || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }));
  } catch (error) {
    console.error('Failed to fetch projects for sitemap:', error);
  }

  let activityRoutes: MetadataRoute.Sitemap = [];
  try {
    const activities = await activityApi.getAll();
    activityRoutes = activities.map((activity) => ({
      url: `${baseUrl}/activity/${activity.id}`,
      lastModified: new Date(activity.lastModifiedDate || activity.createdDate || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }));
  } catch (error) {
    console.error('Failed to fetch activities for sitemap:', error);
  }

  let recruitmentRoutes: MetadataRoute.Sitemap = [];
  try {
    const recruitments = await recruitmentApi.getAll();
    recruitmentRoutes = recruitments.map((recruitment) => ({
      url: `${baseUrl}/joinus/${recruitment.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }));
  } catch (error) {
    console.error('Failed to fetch recruitments for sitemap:', error);
  }

  return [...staticRoutes, ...projectRoutes, ...activityRoutes, ...recruitmentRoutes];
}
