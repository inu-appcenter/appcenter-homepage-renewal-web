import { memberApi } from 'entities/member';
import { ScrambleText } from 'shared/animation/ScrambleText';
import { MembersList } from './MembersList';
import { generationApi } from 'entities/generation/api';

export async function MembersPage() {
  const data = await memberApi.getStats();
  const memberData = await memberApi.getMembersInfo();
  const generationData = await generationApi.getGroupYears();

  const aboutData = [
    { title: 'TOTAL MEMBERS', subNumber: data.totalMemberCount },
    { title: 'CURRENT GEN', subNumber: `${data.currentYear}TH` },
    { title: 'PARTS', subNumber: data.projectCount },
    { title: 'LEADERS', subNumber: 3 }
  ];

  return (
    <>
      <section className="flex h-[75vh] flex-col justify-end gap-10 pb-20">
        <h1 aria-label="APP CENTER" className="text-custom-gray-100 font-product-design pl-2 text-[40px] whitespace-nowrap uppercase sm:text-[120px]">
          <span className="text-brand-primary-light">
            <ScrambleText text="M" />
          </span>
          <ScrambleText text="EMBERS" />
        </h1>
        <div className="flex flex-row gap-20 pl-2">
          {aboutData.map((item, index) => (
            <div key={index} className="flex flex-col gap-6 text-[20px]">
              <span className="text-brand-primary-light font-tokyo text-[120px]/25 font-bold">
                <ScrambleText text={item.subNumber.toString()} />
              </span>
              <span className="text-custom-gray-600 text-[32px]">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      <MembersList initialMembers={memberData} generationData={generationData.yearList} />
    </>
  );
}
