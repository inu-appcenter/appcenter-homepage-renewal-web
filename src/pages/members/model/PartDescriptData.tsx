import { Design } from 'shared/icon/Design';
import { Dev } from 'shared/icon/Dev';
import { Basic } from 'shared/icon/Basic';
import { PM } from 'shared/icon/PM';

interface PartDescription {
  partName: string;
  description: string;
  techStack: string[];
  icon: React.ReactNode;
}
export const PartDescriptData: Record<string, PartDescription> = {
  Dev: {
    partName: '데브',
    description: `서비스를 개발하고,\n유지보수합니다.`,
    techStack: ['Spring Boot', 'React'],
    icon: (
      <div className="absolute -right-4 -bottom-10 sm:-right-20 sm:-bottom-40">
        <Dev className="w-36 sm:w-160" />
      </div>
    )
  },
  Design: {
    partName: '디자인',
    description: `앱을 디자인하고,\n서비스를 설계합니다.`,
    techStack: ['Figma'],
    icon: (
      <div className="absolute -right-8 -bottom-2 sm:-right-20 sm:bottom-0">
        <Design className="w-36 sm:w-120" />
      </div>
    )
  },
  Basic: {
    partName: '베이직',
    description: `개발 기초에 대해\n학습합니다.`,
    techStack: ['React', 'Java'],
    icon: (
      <div className="absolute -right-8 bottom-2 sm:-right-32 sm:bottom-0">
        <Basic className="w-44 sm:w-160" />
      </div>
    )
  },
  PM: {
    partName: 'PM',
    description: `프로젝트를 관리하고,\n팀을 이끕니다.`,
    techStack: ['Notion', 'Slack'],
    icon: (
      <div className="absolute -right-4 -bottom-8 sm:-right-20 sm:-bottom-20">
        <PM className="w-48 sm:w-140" />
      </div>
    )
  }
};
