<div align="center">

<h1 style="border-bottom: none;">앱센터 홈페이지 리뉴얼</h1>

  <img src="public/ogImage.png" alt="INU AppCenter Renewal" width="100%" />

</div>

<br/>

## 만든 사람

<table align="start">
  <tr>
    <td align="center">
        <img src="public/images/readme.png" width="120px;" alt="양서린" style="border-radius:12px;"/><br />
        <b>양서린</b>
        <br/>
        <b>Design</b>
    </td>
    <td align="center">
        <img src="public/images/readme.png" width="120px;" alt="임진희" style="border-radius:12px;"/><br />
        <b>임진희</b>
      <br />
      <b>Design</b>
    </td>
    <td align="center">
        <img src="public/images/readme.png" width="120px;" alt="남궁민정" style="border-radius:12px;"/><br />
        <b>남궁민정</b>
      <br />
      <b>Design</b>
    </td>
    <td align="center">
      <a href="https://github.com/@82everywin">
        <img src="https://github.com/82everywin.png" width="120px;" alt="한현승" style="border-radius:12px;"/><br/> 
        <b>한현승</b>
      </a><br />
      <b>Server</b>
    </td>
    <td align="center">
      <a href="https://github.com/optshj">
        <img src="https://github.com/optshj.png" width="120px;" alt="이성빈" style="border-radius:12px;"/><br />
        <b>이성빈</b>
      </a><br/>
      <b>Web</b>
    </td>
  </tr>
</table>

<br/>

## 기술 스택

| Category      | Stack                                                                                                                       | Key Benefit                                            |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| **Framework** | <img src="https://img.shields.io/badge/Next.js 16-000000?style=for-the-badge&logo=next.js&logoColor=white">                | SSR / App Router 기반 고성능 렌더링                    |
| **Library**   | <img src="https://img.shields.io/badge/React 19-61DAFB?style=for-the-badge&logo=react&logoColor=black">                    | 최신 React 기능 활용                                   |
| **State**     | <img src="https://img.shields.io/badge/TanStack_Query v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white">     | 서버 데이터 페칭·캐싱·동기화 자동화 (`staleTime: 10분`) |
| **Styling**   | <img src="https://img.shields.io/badge/Tailwind_CSS v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">      | 유틸리티 퍼스트 디자인 구현                            |
| **Animation** | Motion (Framer Motion)                                                                                                      | 선언적 API 기반 애니메이션                             |
| **Editor**    | Tiptap v3                                                                                                                   | 어드민 리치 텍스트 에디터                              |
| **Deploy**    | Cloudflare Workers (OpenNext)                                                                                               | 엣지 배포                                              |
| **Analytics** | Mixpanel                                                                                                                    | 사용자 행동 트래킹                                     |

<br/>

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (localhost:3000)
pnpm dev

# 프로덕션 빌드
pnpm build

# Cloudflare Workers 로컬 프리뷰
pnpm preview

# Cloudflare Workers 배포
pnpm deploy

# ESLint 실행
pnpm lint
```

> 패키지 매니저로 **pnpm**을 사용합니다. `npm`이나 `yarn` 사용 시 lockfile 충돌이 발생할 수 있습니다.

<br/>

## 환경변수

`.env.local` 파일을 프로젝트 루트에 생성하고 아래 값을 채워주세요. 값은 관리자에게 문의하세요.

```env
NEXT_PUBLIC_KAKAO_MAP_KEY=   # 카카오맵 API 키 (멤버 페이지 지도)
NEXT_PUBLIC_MIXPANEL_TOKEN=  # Mixpanel 토큰 (사용자 행동 분석)
ADMIN_KEY=                   # 어드민 페이지 접근 키 (proxy.ts에서 검증)
API_URL=                     # 백엔드 서버 URL (예: https://server.inuappcenter.kr)
```

<br/>

## 아키텍처

### Feature-Sliced Design (FSD)

프로젝트는 6개의 레이어로 구성되며, **상위 레이어는 하위 레이어만 import 가능**합니다 (역방향 참조 금지).

```
app → pages → widgets → features → entities → shared
```

| Layer          | 역할                                                            | 예시                                        |
| :------------- | :-------------------------------------------------------------- | :------------------------------------------ |
| **`app`**      | 레이아웃, 프로바이더, 전역 스타일                               | `layout.tsx`, `globals.css`, `QueryProvider` |
| **`pages`**    | 페이지 단위 컴포넌트 조합 (실제 라우팅은 루트 `app/`에서)       | `HomPage`, `MembersPage`, `AdminProjectPage` |
| **`widgets`**  | 독립적인 기능을 가진 페이지 공통 블록                           | `Header`, `Footer`, `Sidebar`, `ScrollButton` |
| **`features`** | 사용자 액션 단위 기능                                           | `Auth(Login)`, `SearchProject`, `FilterMember` |
| **`entities`** | 도메인 모델별 API, hooks, types                                 | `Member`, `Project`, `Activity`, `Recruitment` |
| **`shared`**   | 재사용 가능한 UI 컴포넌트, 유틸리티, 상수                       | `Button`, `Input`, `http`, `cn`              |

<br/>

### 데이터 페칭 패턴

각 entity는 `api/queries.ts`에 TanStack Query 옵션을 정의합니다.

```ts
// entities/{domain}/api/queries.ts
export const projectOptions = {
  list: () => queryOptions({ queryKey: ['projects'], queryFn: ... })
};
```

뮤테이션은 `features/{domain}` 훅으로 제공합니다.

```ts
// features/{domain}/use{Domain}Actions.ts
const { addMutation, editMutation, deleteMutation } = useProjectActions();
```

### HTTP 클라이언트 (`src/shared/utils/http.ts`)

| 환경              | 방식                                          |
| :---------------- | :-------------------------------------------- |
| **서버 컴포넌트** | `API_URL` 환경변수로 백엔드 직접 호출         |
| **클라이언트**    | `/api/*` BFF 프록시 경유 (`app/api/[...path]/route.ts`) |

### 인증 흐름

| 파일              | 역할                                                    |
| :---------------- | :------------------------------------------------------ |
| `middleware.ts`   | 요청마다 토큰 갱신 + 역할(role) 기반 접근 제어          |
| `proxy.ts`        | `ADMIN_KEY` 검증으로 어드민 페이지 접근 차단            |

토큰(`accessToken`, `refreshToken`, `role`)은 **httpOnly 쿠키**로 관리됩니다.

<br/>

## 폴더 구조

```
📂 app/                          # Next.js App Router (실제 라우팅)
├── 📂 (user)/                   # 일반 유저 페이지 그룹
│   ├── 📂 (scroll-animation)/   # 스크롤 애니메이션 있는 페이지 (홈)
│   └── 📂 (no-scroll-animation)/# 그 외 유저 페이지 (members, project, joinus 등)
├── 📂 (dashboard)/              # 어드민/멤버 대시보드 그룹
│   ├── 📂 admin/                # 어드민 관리 페이지
│   └── 📂 member/               # 멤버 마이페이지
└── 📂 api/                      # BFF API 라우트 (프록시, 인증)

📂 src/
├── 📂 app/                      # FSD App Layer
│   ├── 📂 layout/               # 레이아웃 컴포넌트
│   ├── 📂 metadata/             # Next.js 메타데이터
│   ├── 📂 provider/             # QueryProvider 등 전역 프로바이더
│   └── 📂 style/                # globals.css (part-* Tailwind 클래스 포함)
│
├── 📂 pages/                    # FSD Pages Layer (페이지 UI 구현)
│   ├── 📂 home/                 # 홈페이지
│   ├── 📂 members/              # 멤버 목록 페이지
│   ├── 📂 project/              # 프로젝트 페이지
│   ├── 📂 workshop/             # 워크샵 페이지
│   ├── 📂 activity/             # 활동 페이지
│   ├── 📂 joinus/               # 지원하기 페이지
│   ├── 📂 sign/                 # 로그인/회원가입/찾기
│   └── 📂 dashboard/            # 어드민/멤버 대시보드 페이지
│
├── 📂 widgets/                  # FSD Widgets Layer
│   ├── 📂 header/               # 공통 헤더
│   ├── 📂 footer/               # 공통 푸터
│   ├── 📂 sidebar/              # 대시보드 사이드바
│   └── 📂 scroll/               # 스크롤 버튼 위젯
│
├── 📂 features/                 # FSD Features Layer
│   ├── 📂 activity/             # 활동 CRUD 액션
│   ├── 📂 faq/                  # FAQ 관리
│   ├── 📂 generation/           # 기수 관리
│   ├── 📂 member/               # 멤버 관련 액션
│   ├── 📂 project/              # 프로젝트 CRUD
│   ├── 📂 recruitment/          # 모집 지원 액션
│   ├── 📂 recruitment-field/    # 모집 분야 관리
│   ├── 📂 registration/         # 회원가입 코드 관리
│   ├── 📂 role/                 # 역할 관리
│   ├── 📂 sign/                 # 로그인/로그아웃
│   ├── 📂 skill-stack/          # 기술 스택 관리
│   └── 📂 workshop/             # 워크샵 관리
│
├── 📂 entities/                 # FSD Entities Layer (도메인 모델)
│   ├── 📂 activity/             # 활동 API, hooks, types
│   ├── 📂 faq/                  # FAQ
│   ├── 📂 generation/           # 기수
│   ├── 📂 link/                 # 앱스토어/플레이스토어 링크 UI
│   ├── 📂 member/               # 멤버
│   ├── 📂 project/              # 프로젝트
│   ├── 📂 recruitment/          # 모집
│   ├── 📂 recruitment-field/    # 모집 분야
│   ├── 📂 registraion/          # 회원가입 코드
│   ├── 📂 role/                 # 역할(파트)
│   ├── 📂 scroll/               # 스크롤 Context
│   ├── 📂 sign/                 # 인증 (토큰, 세션)
│   ├── 📂 skill-stack/          # 기술 스택
│   └── 📂 workshop/             # 워크샵
│
└── 📂 shared/                   # FSD Shared Layer
    ├── 📂 animation/            # 공통 애니메이션 variants
    ├── 📂 constants/            # 상수 (part, adminMenu, dashBoard, userMode)
    ├── 📂 error/                # AsyncBoundary, EmptyResult
    ├── 📂 hooks/                # 공통 커스텀 훅
    ├── 📂 icon/                 # SVG 아이콘 컴포넌트
    ├── 📂 image/                # 고용량 이미지 컴포넌트
    ├── 📂 skeleton/             # 스켈레톤 로딩 UI
    ├── 📂 types/                # 공통 타입 (part, skillCategory)
    ├── 📂 ui/                   # 공통 UI 컴포넌트 (Button, Input, Table 등)
    └── 📂 utils/                # 유틸 함수 (http, cn, phoneNumber 등)

📄 middleware.ts                 # 토큰 갱신 + 역할 기반 접근 제어
📄 proxy.ts                      # 어드민 페이지 접근 차단
🔐 .env.local                    # 환경변수 (git 제외)
```

<br/>

## 유지보수 포인트

자주 수정되는 설정 파일 목록입니다.

| 항목                          | 파일                                    | 비고                                    |
| :---------------------------- | :-------------------------------------- | :-------------------------------------- |
| **파트 목록 및 색상**         | `src/shared/constants/part.tsx`         | 파트 추가·변경 시 함께 수정             |
| **파트별 Tailwind 색상**      | `src/app/style/globals.css`             | `.part-*` CSS 클래스 정의               |
| **어드민 사이드바 메뉴**      | `src/shared/constants/adminMenu.tsx`    | 어드민 메뉴 항목 추가·제거 시           |
| **대시보드 공통 상수**        | `src/shared/constants/dashBoard.tsx`    |                                         |
| **API 프록시 (BFF)**          | `app/api/[...path]/route.ts`            | 백엔드 URL 변경 시                      |
| **인증 미들웨어**             | `middleware.ts`                         | 접근 제어 경로 수정 시                  |
| **어드민 접근 차단**          | `proxy.ts`                              | `ADMIN_KEY` 검증 로직                   |
