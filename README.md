<div align="center">

<h1 style="border-bottom: none;">앱센터 홈페이지 리뉴얼</h1>

  <img src="public/ogImage.png" alt="INU AppCenter Renewal" width="100%" />

</div>

<br/>

## 만든 사람

<table align="start">
  <tr>
    <td align="center">
      <a href="https://github.com/optshj">
        <img src="https://github.com/optshj.png" width="120px;" alt="optshj" style="border-radius:20px;"/><br />
        <b>@optshj</b>
      </a><br />
      <p>Frontend</p>
    </td>
  </tr>
</table>

<br/>

## 개요

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 기반으로 구축되었습니다.

| Category      | Stack                                                                                                                  | Key Benefit                                             |
| :------------ | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| **Framework** | <img src="https://img.shields.io/badge/Next.js v16-000000?style=for-the-badge&logo=next.js&logoColor=white">           | 최신 리액트 기능을 활용한 고성능 SSR 및 최적화된 라우팅 |
| **Library**   | <img src="https://img.shields.io/badge/React v19-61DAFB?style=for-the-badge&logo=react&logoColor=black">               | 복잡한 상태 관리                                        |
| **State**     | <img src="https://img.shields.io/badge/TanStack_Query v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white"> | 서버 데이터 페칭, 캐싱, 동기화 및 에러 핸들링의 자동화  |
| **Styling**   | <img src="https://img.shields.io/badge/Tailwind_CSS v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">  | 디자인 구현                                             |
| **Animation** | Motion (Framer Motion)                                                                                                 | 선언적 API를 활용한 복잡한 애니메이션 구현              |
| **Admin**     | React Grid Layout                                                                                                      | 프로젝트 페이지 레이아웃의 유연한 배치 구현             |

<br/>

## 유지보수 가이드라인

운영 중 자주 발생하는 유지보수 이슈에 대한 가이드입니다.

| Category             | Description                        | Path                                 |
| :------------------- | :--------------------------------- | :----------------------------------- |
| **🎨 Part & Color**  | 파트(Part) 목록 및 고유 색상 관리  | `src/shared/constants/part.tsx`      |
| **🛡️ 어드민 메뉴**   | 관리자 페이지 사이드바 메뉴 관리   | `src/shared/constants/adminMenu.tsx` |
| **🌐 API 프록시**    | 백엔드 API 통신 및 BFF 프록시 설정 | `app/api/[...path]/route.ts`         |
| **🔐 인증 미들웨어** | 관리자 인증 및 토큰 검증 로직      | `proxy.ts`                           |

<br/>

## 아키텍쳐 및 폴더 구조

프로젝트는 **Feature-Sliced Design (FSD)** 패턴을 따르며, 역할에 따라 6개의 계층(Layer)으로 구분됩니다.

| Layer          | Responsibility                                                  | Example                             |
| :------------- | :-------------------------------------------------------------- | :---------------------------------- |
| **`app`**      | **App Layer**<br/>애플리케이션의 진입점, 라우팅, 전역 설정      | `layout.tsx`, `global.css`          |
| **`pages`**    | **Page Layer**<br/>각 페이지의 조합 및 컨텍스트 주입            | `(home)/page.tsx`, `admin/page.tsx` |
| **`widgets`**  | **Widget Layer**<br/>독립적인 기능을 가진 대형 UI 블록          | `Header`, `Sidebar`, `Footer`       |
| **`features`** | **Feature Layer**<br/>사용자의 비즈니스 액션 및 기능 단위       | `Auth(Login)`, `SearchProject`      |
| **`entities`** | **Entity Layer**<br/>비즈니스 도메인 모델 및 핵심 데이터        | `Member`, `Project`, `Activity`     |
| **`shared`**   | **Shared Layer**<br/>재사용 가능한 기본 UI 컴포넌트 및 유틸리티 | `Button`, `Input`, `api/client`     |

<br/>

📂 <b>구조 자세히 보기 (Folder Structure)</b>
<br/>

```javascript
📂 app/               # Next.js App Router (Layout, Provider)
📂 pages/             # Next.js와 FSD 호환을 위한 더미 폴더
📂 public/            # font, images, videos 관리
📄 proxy.ts           # 어드민 페이지 접근 차단
🔐 .env               # 환경변수
📂 src/
├── 📂 app/           # 애플리케이션의 진입점, 라우팅 (Layout, Provider)
├── 📂 pages/         # 페이지 단위 컴포넌트 (Page Composition)
├── 📂 widgets/       # 페이지 공통 위젯 (Header, Footer, Sidebar)
├── 📂 features/      # 사용자 기능 단위 (Login, Filter, Search)
├── 📂 entities/      # 도메인 모델 (User, Project, Activity)
└── 📂 shared/        # 공통 모듈
    |
    ├── 📂 error/     # 에러 처리 관련 로직 (AsyncBoundary)
    ├── 📂 icon/      # 벡터 아이콘 관리
    ├── 📂 image/     # 성능저하가 발생하는 벡터는 별도 관리
    ├── 📂 ui/        # 공통 UI 컴포넌트 (Button, Input)
    ├── 📂 types/     # 공통 타입 (part, skillCategory)
    ├── 📂 utils/     # 유틸리티 함수 (cn, http)
    └── 📂 constants/ # 상수 (Part, AdminMenu)
```

<br/>

## 환경변수 가이드라인

프로젝트를 위해 다음 환경변수 설정이 필요합니다.

관리자 또는 만든 사람에게 문의하십시오.
