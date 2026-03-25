import { ChangePasswordForm } from 'features/sign';
import { PageTitle } from './Components';

export function MemberChangePasswordPage() {
  return (
    <>
      <PageTitle title="비밀번호 변경" description="비밀번호를 변경하실 수 있습니다." />
      <ChangePasswordForm />
    </>
  );
}
