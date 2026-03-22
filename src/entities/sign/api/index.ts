import { http } from 'shared/utils/http';
import { FindIdRequest, LoginRequest, ResetPasswordRequest, SignUpRequest } from '../types';

export const signApi = {
  adminLogin: (data: LoginRequest) => {
    return http.post('/admin-sign-in', data);
  },
  memberLogin: (data: LoginRequest) => {
    return http.post('/member-sign-in', data);
  },
  logout: () => {
    return http.post('/sign-out', {});
  },
  signup: (data: SignUpRequest) => {
    return http.post('/sign/sign-up', data);
  },
  findId: (data: FindIdRequest): Promise<{ msg: string }> => {
    return http.post('/sign/find-id', data);
  },
  changePassword: () => {
    return http.post('/sign/change-password', {});
  },
  resetPassword: (data: ResetPasswordRequest) => {
    return http.post('/sign/reset-password', data);
  }
};
