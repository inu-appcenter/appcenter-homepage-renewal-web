import { SectionTitle } from './Components';
import { FAQList } from 'features/faq';
import { faqApi } from 'entities/faq';

export const FAQSection = async () => {
  const faqData = await faqApi.getAll();

  if (faqData.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="flex min-h-150 flex-col gap-8 py-30 sm:h-screen">
      <SectionTitle title="faq" />
      <FAQList data={faqData} />
    </section>
  );
};
