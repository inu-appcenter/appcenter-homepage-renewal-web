import { Users, Layout, Image as ImageIcon, MessageCircle, Activity, LucideIcon, Building2, Zap, Presentation, UserSearch } from 'lucide-react';

/* 
기능이 추가로 생기면 아래에 넣어주세요.
사이드바와 홈에 연동됩니다.
🚨 경로명은 반드시 /admin/기능명 이어야 합니다.
하위로 들어가는 기능이 있을 경우 subMenu에 작성해주세요.
{
  group: '기능 이름',
  tag: '기능 태그 home에서 보이는 이름',
  description: '기능 설명',
  subMenu: [ // 서브메뉴가 있을 경우
    { name: '서브메뉴 이름', href: '/admin/서브메뉴 경로', icon: 아이콘 },
  ],
  }
*/

interface AdminMenuType {
  group: string;
  tag: string;
  description: string;
  path: `/admin/${string}`;
  icon: LucideIcon;
  subMenu?: Array<{ name: string; href: `/admin/${string}`; icon: LucideIcon }>;
}
export const ADMIN_MENU: AdminMenuType[] = [
  {
    group: '동아리 관리',
    tag: 'club',
    description: '구성원 정보, 기수 및 권한 체계 관리',
    path: '/admin/member',
    icon: Users,
    subMenu: [
      { name: '동아리원 관리', href: '/admin/member', icon: Users },
      { name: '기수 관리', href: '/admin/generation', icon: Activity },
      { name: '역할 관리', href: '/admin/role', icon: Building2 }
    ]
  },
  {
    group: '프로젝트 관리',
    tag: 'project',
    description: '동아리에서 진행한 프로젝트 관리',
    path: '/admin/project',
    icon: Layout,
    subMenu: [
      { name: '프로젝트 관리', href: '/admin/project', icon: Layout },
      { name: '기술 아이콘 관리', href: '/admin/skill', icon: Zap }
    ]
  },
  {
    group: '게시판 관리',
    tag: 'image',
    description: '동아리 활동 업로드 및 관리',
    icon: ImageIcon,
    path: '/admin/activity',
    subMenu: [
      { name: '활동 게시판 관리', href: '/admin/activity', icon: Presentation },
      { name: '워크숍 게시판 관리', href: '/admin/workshop', icon: ImageIcon }
    ]
  },
  {
    group: '모집 관리',
    tag: 'recruit',
    description: '동아리 활동 업로드 및 관리',
    icon: ImageIcon,
    path: '/admin/recruit',
    subMenu: [
      {
        name: '모집 공고 관리',
        href: '/admin/recruit',
        icon: UserSearch
      },
      { name: '모집 분야 관리', href: '/admin/recruit-field', icon: ImageIcon }
    ]
  },
  {
    group: '질문 관리(FAQ)',
    tag: 'faq',
    description: '자주 묻는 질문 관리',
    icon: MessageCircle,
    path: '/admin/faq'
  }
];
