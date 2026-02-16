import { http } from 'shared/utils/http';
import { LoginRequest, SignUpRequest } from '../types';

export const signApi = {
  login: (data: LoginRequest) => {
    return http.post('/sign-in', data);
  },
  logout: () => {
    return http.post('/sign-out', {});
  },
  signup: (data: SignUpRequest) => {
    return http.post('/sign/sign-up', data);
  }
};
