import { http } from 'shared/utils/http';
import type { Faq, FAQForm } from 'entities/faq';

export const faqApi = {
  getAll: () => {
    return http.get<Faq[]>('/faqs/public/all-faq-boards', { next: { revalidate: 3600 } });
  },

  create: (newFaq: FAQForm) => {
    return http.post<Faq>('/faqs', newFaq);
  },

  update: ({ id, data }: { id: number; data: FAQForm }) => {
    return http.patch<Faq>(`/faqs?id=${id}`, data);
  },

  delete: (id: number) => {
    return http.delete<{ success: boolean }>(`/faqs/${id}`);
  }
};
