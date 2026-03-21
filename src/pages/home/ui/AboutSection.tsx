import { memberApi } from 'entities/member/api';
import { SectionTitle, ShuffleItem } from './Components';

export async function AboutSection() {
  const data = await memberApi.getStats();

  const aboutData = [
    { title: '창립 연도', subNumber: new Date().getFullYear() - Math.trunc(data.currentYear) },
    { title: '누적 멤버 수', subNumber: data.totalMemberCount, smallSubtitle: '+' },
    { title: '출시한 서비스 수', subNumber: data.projectCount, smallSubtitle: '+' },
    { title: '취업동아리 수상', subNumber: 3, smallSubtitle: '년 연속' }
  ];

  return (
    <section id="about" className="relative flex h-[45vh] flex-col justify-end gap-4 sm:h-screen sm:justify-center sm:gap-8">
      <SectionTitle title="about" description="서로의 영감이 되어주는 견고한 네트워크" />
      <ul className="grid grid-cols-2 justify-between gap-4 sm:mt-25 sm:flex sm:flex-row sm:gap-20">
        {aboutData.map((data, index) => (
          <ShuffleItem key={index} title={data.title} subNumber={data.subNumber} smallSubtitle={data.smallSubtitle} index={index} />
        ))}
      </ul>
    </section>
  );
}
