import type { Recruitment } from 'entities/recruitment';

export type RecruitmentForm = Pick<Recruitment, 'title' | 'body' | 'startDate' | 'endDate' | 'capacity' | 'targetAudience' | 'applyLink'> & {
  thumbnail: File | string;
  fieldIds: number[];
};
