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

export interface MemberWithGeneration {
  readonly memberId: number;
  name: string;
  description: string | null;
  profileImage: string | null;
  email: string | null;
  blogLink: string | null;
  gitRepositoryLink: string | null;
  behanceLink: string | null;
  department: string | null;
  groups: Array<{ groupId: number; role: string; year: number; part: string }>;
  projects: Array<{ id: number; title: string; mainImage: string }>;
}
