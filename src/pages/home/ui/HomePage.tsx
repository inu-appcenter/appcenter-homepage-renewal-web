import { LandingSection } from './LandingSection';
import { AboutSection } from './AboutSection';
import { ProjectSection } from './ProjectSection';
import { WorkshopSection } from './WorkshopSection';
import { ActivitiesSection } from './ActivitiesSection';
import { FAQSection } from './FAQSection';
import { LocationSection } from './LocationSection';

export const HomePage = async () => {
  return (
    <>
      <LandingSection />
      <AboutSection />
      <ProjectSection />
      <ActivitiesSection />
      <WorkshopSection />
      <FAQSection />
      <LocationSection />
    </>
  );
};
