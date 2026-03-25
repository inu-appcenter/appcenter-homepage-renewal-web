import { memberApi } from 'entities/member/api';
import { ChevronDown, Dot } from 'lucide-react';
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
            <Item />
            <Item />
            <Item />
            <Item />
          </div>
        </div>
      </section>
    </>
  );
}

export const Item = () => {
  return (
    <div className="border-brand-primary-cta group space-y-9 border-l-4 bg-[#191E1C] p-10 transition-all hover:shadow-[inset_0_-4px_0_0_#57ff85]">
      <div className="flex flex-row justify-between">
        <div className="group bg-custom-gray-500 relative h-35 w-35">
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-linear-to-b from-[#232B28] to-[#57FF95] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          <div className="absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r from-[#57FF95] to-[#232B28] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <span className="text-brand-primary-cta border-brand-primary-cta border-2 bg-[#08341F] p-4 text-[24px]/6 font-medium">파트장</span>
          <span className="text-brand-primary border-brand-primary border-2 p-4 text-[24px]/6 font-medium">Dev</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[40px]/10 font-semibold text-white">누구죠</span>
        <div className="text-custom-gray-600 flex items-center text-[24px]/6">
          컴퓨터공학부
          <Dot />
          <span className="text-brand-primary-cta">18기</span>
        </div>
      </div>
      <div className="mt-3 flex flex-row gap-3">
        <div className="bg-custom-gray-500 h-8.75 w-8.75 rounded-sm" />
        <div className="bg-custom-gray-500 h-8.75 w-8.75 rounded-sm" />
        <div className="bg-custom-gray-500 h-8.75 w-8.75 rounded-sm" />
      </div>
    </div>
  );
};
