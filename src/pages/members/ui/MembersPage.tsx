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
    { title: 'PARTS', subNumber: data.partCount },
    { title: 'LEADERS', subNumber: data.leaderCount }
  ];

  return (
    <>
      <section className="flex flex-col justify-end gap-10 pt-40 pb-16 sm:h-[65vh] sm:pt-0">
        <h1 aria-label="APP CENTER" className="text-custom-gray-100 font-product-design pl-2 text-[40px] whitespace-nowrap uppercase sm:text-[6rem]/24">
          <span className="text-brand-primary-light">
            <ScrambleText text="M" />
          </span>
          <ScrambleText text="EMBERS" />
        </h1>
        <div className="flex flex-row gap-5 pl-2 sm:gap-20">
          {aboutData.map((item, index) => (
            <div key={index} className="flex flex-col gap-6 text-[20px]">
              <span className="text-brand-primary-light font-tokyo text-[2rem]/8 font-bold sm:text-[100px]/25">
                <ScrambleText text={item.subNumber.toString()} />
              </span>
              <span className="text-custom-gray-600 text-[0.75rem]/3 sm:text-[1.5rem]/6">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      <MembersList initialMembers={memberData} generationData={generationData.yearList} />
    </>
  );
}
