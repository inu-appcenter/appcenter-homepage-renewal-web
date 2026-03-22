import { memberApi } from 'entities/member/api';
import { ScrambleText } from 'shared/animation/ScrambleText';

export async function MembersPage() {
  const data = await memberApi.getStats();

  const aboutData = [
    { title: 'TOTAL MEMBERS', subNumber: data.totalMemberCount },
    { title: 'CUREENT GEN', subNumber: `${data.currentYear}TH` },
    { title: 'PARTS', subNumber: data.projectCount },
    { title: 'LEADERS', subNumber: 3 }
  ];

  return (
    <>
      <section className="flex h-screen flex-col justify-center gap-20">
        <h1 aria-label="APP CENTER" className="text-custom-gray-100 font-product-design pl-2 text-[40px] whitespace-nowrap uppercase sm:text-[120px]">
          <span className="text-brand-primary-light">
            <ScrambleText text="M" />
          </span>
          <ScrambleText text="EMBERS" />
        </h1>
        <div className="mb-10 flex flex-row gap-20 pl-2">
          {aboutData.map((data, index) => (
            <div key={index} className="flex flex-col gap-6 text-[20px]">
              <span className="text-brand-primary-light font-tokyo text-[120px]/25 font-bold">{data.subNumber}</span>
              <span className="text-custom-gray-600 text-[32px]">{data.title}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
