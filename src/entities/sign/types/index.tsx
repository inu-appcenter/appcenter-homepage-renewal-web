export interface LoginRequest {
  id: string;
  password: string;
}

export interface SignUpRequest {
  registrationCode: string; // 필수
  uid: string; // 필수
  password: string; // 필수
  name: string; // 필수
  email: string; // 필수
  phoneNumber: string; // 필수
  studentNumber: string; // 필수
  description?: string | null; // 선택
  profileImage?: string | null; // 선택
  blogLink?: string | null; // 선택
  gitRepositoryLink?: string | null; // 선택
  behanceLink?: string | null; // 선택
  department?: string | null; // 선택
}
