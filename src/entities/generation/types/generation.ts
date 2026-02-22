export interface Generation {
  readonly group_id: number;
  readonly role: string;
  readonly part: string;
  readonly year: number;
  readonly member: string;
  readonly profileImage: string | null;
  readonly email: string | null;
  readonly blogLink: string | null;
  readonly gitRepositoryLink: string | null;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
}

export interface GenerationForm {
  id: number;
  year: number;
  part: string;
  role_id: number;
}
