export interface Member extends MemberForm {
  readonly member_id: number;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
}

export interface MemberForm {
  name: string;
  description: string | null;
  profileImage: string | null;
  blogLink: string | null;
  email: string | null;
  gitRepositoryLink: string | null;
  behanceLink: string | null;
  phoneNumber: string | null;
  studentNumber: string | null;
  department: string | null;
}

export interface MemberStats {
  totalMemberCount: number;
  currentYear: number;
  partCount: number;
  leaderCount: number;
  projectCount: number;
}
