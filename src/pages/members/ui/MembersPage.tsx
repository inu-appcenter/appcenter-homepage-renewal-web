import { memberApi } from 'entities/member/api';
import { MemberWithGeneration } from 'entities/member/types/member';
import { ChevronDown, Dot } from 'lucide-react';
import { ScrambleText } from 'shared/animation/ScrambleText';

export async function MembersPage() {
  const data = await memberApi.getStats();
  const memberData = await memberApi.getMembersInfo();

  const aboutData = [
    { title: 'TOTAL MEMBERS', subNumber: data.totalMemberCount },
    { title: 'CUREENT GEN', subNumber: `${data.currentYear}TH` },
    { title: 'PARTS', subNumber: data.projectCount },
    { title: 'LEADERS', subNumber: 3 }
  ];

  return (
    <>
      <section className="flex h-screen flex-col justify-end gap-10">
        <h1 aria-label="APP CENTER" className="text-custom-gray-100 font-product-design pl-2 text-[40px] whitespace-nowrap uppercase sm:text-[120px]">
          <span className="text-brand-primary-light">
            <ScrambleText text="M" />
          </span>
          <ScrambleText text="EMBERS" />
        </h1>
        <div className="mb-10 flex flex-row gap-20 pl-2">
          {aboutData.map((data, index) => (
            <div key={index} className="flex flex-col gap-6 text-[20px]">
              <span className="text-brand-primary-light font-tokyo text-[120px]/25 font-bold">
                <ScrambleText text={data.subNumber.toString()} />
              </span>
              <span className="text-custom-gray-600 text-[32px]">{data.title}</span>
            </div>
          ))}
        </div>
        <div className="border-border flex justify-between border-y py-10">
          <div className="flex items-center gap-10">
            <span className="text-custom-gray-600 text-[32px]">PART</span>
            <div>
              {['ALL', 'Dev', 'Basic', 'Design', 'PM'].map((part) => (
                <button key={part} className="border-border text-custom-gray-600 border-2 px-10 py-7 text-[32px] font-medium">
                  {part}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <span className="text-custom-gray-600 text-[32px]">기수</span>
            <button className="border-custom-gray-600 text-custom-gray-100 flex w-42.5 items-center justify-between border-2 px-8 py-7 text-[32px] font-medium">
              18기
              <ChevronDown />
            </button>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="flex flex-col">
          <div className="flex items-center py-10">
            <span className="text-custom-gray-600 shrink-0 px-10 py-8 text-[32px]">운영진</span>
            <span className="text-brand-primary-cta border-brand-primary-cta border p-4 text-[32px]/8 font-medium">6</span>
            <hr className="text-border w-full" />
          </div>
          <div className="grid grid-cols-3 gap-10">
            {memberData.map((member) => (
              <Item key={member.memberId} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const Item = ({ member }: { member: MemberWithGeneration }) => {
  // group 배열에 첫번째를 우선시함. 페이지에서 따로 필터링 시 필터링 정보로 변환 필요함
  const groupData = member.groups[0];
  const isLeader = groupData.role === '파트장' || groupData.role === '센터장';

  return (
    <div className={`border-brand-primary-cta group space-y-9 border-l-4 bg-[#191E1C] p-10 transition-all hover:shadow-[inset_0_-4px_0_0_#57ff85] part-${groupData.part.toLowerCase() || 'default'}`}>
      <div className="flex flex-row justify-between">
        <div className="group bg-custom-gray-500 relative h-35 w-35 overflow-hidden">
          {member.profileImage ? (
            <img src={member.profileImage} alt={`${member.name}'s profile picture`} width={140} height={140} className="h-full w-full object-cover" />
          ) : (
            <div className="bg-background border-border flex h-full w-full items-center justify-center border-2">
              <span className="text-custom-gray-400 text-[32px] font-medium">{member.name.substring(1, 3)}</span>
            </div>
          )}

          <div className="absolute top-0 bottom-0 left-0 w-1 bg-linear-to-b from-[#232B28] to-[#57FF95] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r from-[#57FF95] to-[#232B28] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="flex flex-col items-end gap-4">
          {isLeader && <span className="text-brand-primary-cta border-brand-primary-cta border-2 bg-[#08341F] p-4 text-[1.5rem]/6 font-medium">{groupData.role || 'N/A'}</span>}
          <span className="border-2 border-(--part-color) p-4 text-[24px]/6 font-medium text-(--part-color)">{groupData?.part || 'N/A'}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[40px]/10 font-semibold text-white">{member.name}</span>
        <div className="text-custom-gray-600 flex items-center text-[1.5rem]/6">
          {member.department && (
            <>
              {member.department}
              <Dot />
            </>
          )}
          <span className="text-brand-primary-cta">{groupData?.year || 'N/A'}기</span>
        </div>
      </div>
      <div className="mt-3 flex flex-row gap-3">
        {member.projects.map((project, index) => (
          <img src={project.mainImage} alt={project.title} key={index} className="h-8.75 w-8.75 rounded-sm" />
        ))}
      </div>
    </div>
  );
};
