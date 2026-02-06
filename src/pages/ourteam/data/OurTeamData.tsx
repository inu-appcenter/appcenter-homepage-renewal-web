import { Android } from 'shared/icon/Android';
import { OurTeam } from '../types/ourteam';
import { Ios } from 'shared/icon/Ios';
import { Design } from 'shared/icon/Design';
import { Server } from 'shared/icon/Server';
import { Basic } from 'shared/icon/Basic';
import { Web } from 'shared/icon/Web';

export const OurTeamData: OurTeam[] = [
  {
    title: 'Android',
    partName: '안드로이드',
    description: `안드로이드 운영체제에서\n작동하는 앱을 구현합니다.`,
    techStack: ['Android Studio', 'Kotlin'],
    icon: <Android />,
    motionProps: {
      x: ['0vw', '4vw'],
      y: ['0vh', '90vh'],
      scale: [0.8, 0.7]
    }
  },
  {
    title: 'Design',
    partName: '디자인',
    description: `앱을 디자인하고,\n서비스를 설계합니다.`,
    techStack: ['Figma'],
    icon: <Design />,
    motionProps: {
      x: ['0vw', '14vw'],
      y: ['0vh', '80vh'],
      scale: [0.8, 0.6],
      rotate: [7, 0]
    }
  },
  {
    title: 'iOS',
    partName: 'iOS',
    description: `iOS 운영체제에서\n 작동하는 앱을 구현합니다.`,
    techStack: ['Xcode', 'Swift'],
    icon: <Ios />,
    motionProps: {
      x: ['0vw', '12vw'],
      y: ['0vh', '85vh'],
      scale: [1, 0.8]
    }
  },
  {
    title: 'Server',
    partName: '서버',
    description: `서버를 구현합니다.`,
    techStack: ['Java', 'Spring Boot'],
    icon: <Server />,
    motionProps: {
      x: ['0vw', '12vw'],
      y: ['0vw', '90vh'],
      scale: [1, 0.7]
    }
  },
  {
    title: 'Web',
    partName: '웹',
    description: `웹환경에 맞춘 서비스를\n구현합니다.`,
    techStack: ['React', 'TypeScript'],
    icon: <Web />,
    motionProps: {
      x: ['0vw', '4vw'],
      y: ['0vh', '84vh'],
      scale: [1, 0.7],
      rotate: [0, 0]
    }
  },
  {
    title: 'Basic',
    partName: '베이직',
    description: `개발 기초에 대해\n학습합니다.`,
    techStack: ['React', 'TypeScript'],
    icon: <Basic />,
    motionProps: {
      x: ['0vw', '16vw'],
      y: ['0vh', '80vh'],
      scale: [1, 0.8],
      rotate: [-12, 0]
    }
  }
];
