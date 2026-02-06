import { SectionTitle } from './Components';
import { FAQList } from 'features/faq';
import { faqApi } from 'entities/faq';

export const FAQSection = async () => {
  const faqData = await faqApi.getAll();

  if (faqData.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="flex h-screen flex-col gap-8 py-20">
      <SectionTitle title="faq" description="자주 묻는 질문" />
      <FAQList data={faqData} />
    </section>
  );
};
