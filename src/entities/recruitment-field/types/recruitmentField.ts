export type RecruitmentField = {
  id: number;
  name: string;
};

export type RecruitmentFieldForm = Pick<RecruitmentField, 'name'>;
