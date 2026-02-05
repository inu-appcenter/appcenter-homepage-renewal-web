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
  isRecruiting: boolean;
  forceClosed: boolean;
  dday: number;
  fields: Array<{
    id: number;
    name: string;
  }>;
};

export type RecruitmentList = Pick<Recruitment, 'id' | 'title' | 'thumbnail' | 'isRecruiting' | 'dday'> & { fieldNames: string[] };

export type RecruitmentMetaData = Pick<Recruitment, 'title' | 'body' | 'startDate' | 'endDate' | 'capacity' | 'targetAudience' | 'applyLink'> & {
  fieldIds: number[];
};
