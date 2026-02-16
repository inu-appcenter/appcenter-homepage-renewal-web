export const RECRUITMENT_STATUS = ['AUTO', 'WAITING', 'RECRUITING', 'CLOSED'] as const;

export type Recruitment = {
  readonly id: number;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
  title: string;
  body: string;
  startDate: string;
  endDate: string;
  capacity: number;
  targetAudience: string;
  applyLink: string;
  thumbnail: string;
  status: (typeof RECRUITMENT_STATUS)[number];
  forceClosed: boolean;
  dday: number;
  fields: Array<{
    id: number;
    name: string;
  }>;
};

export type RecruitmentList = Pick<Recruitment, 'id' | 'title' | 'thumbnail' | 'status' | 'dday'> & { fieldNames: string[] };

export type RecruitmentMetaData = Pick<Recruitment, 'title' | 'body' | 'startDate' | 'endDate' | 'capacity' | 'targetAudience' | 'applyLink'> & {
  fieldIds: number[];
};

export type Email = {
  readonly id: number;
  readonly email: string;
  readonly createdDate: string;
};
