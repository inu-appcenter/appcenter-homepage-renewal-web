import { Project } from 'entities/project';

export type ProjectImage = { id: number; url: string; file?: never } | { id: number; url: string; file: File };

export type ProjectFormType = Omit<Project, 'id' | 'createdDate' | 'lastModifiedDate' | 'images' | 'stacks' | 'groups' | 'websiteLink'> & {
  images: ProjectImage[];
  stacks: number[];
  groups: number[];
  webSiteLink: string;
};

export type StepType = 'main' | 'introduce' | 'grid';

export type GridItemType = 'image' | 'text';

export interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: GridItemType;
  content: string;
}

export interface SectionData {
  id: string;
  items: GridItem[];
}
