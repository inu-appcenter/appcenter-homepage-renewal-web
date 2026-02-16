import { http } from 'shared/utils/http';
import { RegistrationCode } from '../types/code';

export const registrationApi = {
  get: () => {
    return http.get<RegistrationCode>('/admin/registration-code');
  },

  update: (code: string) => {
    return http.put('/admin/registration-code', { code });
  }
};
