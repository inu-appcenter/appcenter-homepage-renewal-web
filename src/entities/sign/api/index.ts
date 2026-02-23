import { http } from 'shared/utils/http';
import { LoginRequest, SignUpRequest } from '../types';

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
  }
};
