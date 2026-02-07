import { MainSection } from './MainSection';
import { DesktopPartDescriptionSection, MobilePartDescriptionSection } from './Components';
import { OurTeamData } from '../data/OurTeamData';
import { FloatingButton } from './FloatingButton';
import { IntroduceSection } from './IntroduceSection';
import { OurTeamDataMobile } from '../data/OurTemaDataMobile';

export const OurTeamPage = () => {
  return (
    <>
      <MainSection />
      <IntroduceSection />
      {OurTeamData.map((part) => (
        <DesktopPartDescriptionSection key={part.title} {...part} />
      ))}
      {OurTeamDataMobile.map((part) => (
        <MobilePartDescriptionSection key={part.title} {...part} />
      ))}
      <FloatingButton />
    </>
  );
};
