import { Layout, LucideIcon, Zap, UserSearch, Component, User } from 'lucide-react';

/* 
기능이 추가로 생기면 아래에 넣어주세요.
사이드바와 홈에 연동됩니다.
🚨 경로명은 반드시 /member/기능명 이어야 합니다.
하위로 들어가는 기능이 있을 경우 subMenu에 작성해주세요.
{
  group: '기능 이름',
  tag: '기능 태그 home에서 보이는 이름',
  description: '기능 설명',
  subMenu: [ // 서브메뉴가 있을 경우
    { name: '서브메뉴 이름', href: '/member/서브메뉴 경로', icon: 아이콘 },
  ],
  }
*/

interface MemberMenuType {
  group: string;
  tag: string;
  description: string;
  path: `/member/${string}`;
  icon: LucideIcon;
  subMenu?: Array<{ name: string; href: `/member/${string}`; icon: LucideIcon }>;
}
export const MEMBER_MENU: MemberMenuType[] = [
  {
    group: '프로젝트 관리',
    tag: 'project',
    description: '동아리에서 진행한 프로젝트 관리',
    path: '/member/project',
    icon: Layout,
    subMenu: [
      { name: '프로젝트 관리', href: '/member/project', icon: Layout },
      { name: '기술 아이콘 관리', href: '/member/skill', icon: Zap }
    ]
  },
  {
    group: '모집 관리',
    tag: 'recruit',
    description: '동아리원 모집 공고 관리',
    icon: UserSearch,
    path: '/member/recruitment',
    subMenu: [
      {
        name: '모집 공고 관리',
        href: '/member/recruitment',
        icon: UserSearch
      },
      { name: '모집 분야 관리', href: '/member/recruitment-field', icon: Component }
    ]
  },
  {
    group: '회원 정보',
    tag: 'info',
    description: '회원 정보 관리',
    path: '/member/info',
    icon: User
  }
];
