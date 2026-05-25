import { ListButton, SectionTitle, ShuffleItem } from './Components';
import { memberApi } from 'entities/member';

export async function AboutSection() {
  const data = await memberApi.getStats();

  const ABOUT = [
    { title: '창립연도', subNumber: new Date().getFullYear() - Math.trunc(data.currentYear) },
    { title: '누적 멤버 수', subNumber: data.totalMemberCount, smallSubtitle: '+' },
    { title: '출시한 서비스 수', subNumber: data.projectCount, smallSubtitle: '+' },
    { title: '전공취업동아리 수상', subNumber: 3, smallSubtitle: '년 연속' }
  ];

  return (
    <section id="about" className="relative flex h-[45vh] flex-col justify-end gap-8 sm:h-screen sm:justify-center sm:gap-16">
      <div className="flex w-full justify-between">
        <SectionTitle title="about" />
        <ListButton href="/members" text="멤버 목록" />
      </div>
      <ul className="grid grid-cols-2 justify-between gap-4 sm:grid-cols-4 sm:gap-20">
        {ABOUT.map((data, index) => (
          <ShuffleItem key={index} index={index} title={data.title} subNumber={data.subNumber} smallSubtitle={data.smallSubtitle} />
        ))}
      </ul>
    </section>
  );
}
