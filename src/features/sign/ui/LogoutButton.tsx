import { Loader2, LogOut } from 'lucide-react';
import { useSignActions } from 'entities/sign';

export const AdminLogoutButton = ({ isCollapsed }: { isCollapsed?: boolean }) => {
  const { adminLogoutMutation } = useSignActions();

  const handleLogout = () => {
    adminLogoutMutation.mutate();
  };

  if (isCollapsed) return <CollapsedLogoutButton onClick={handleLogout} isLoading={adminLogoutMutation.isPending} />;
  return <ExpandedLogoutButton onClick={handleLogout} isLoading={adminLogoutMutation.isPending} />;
};

const CollapsedLogoutButton = ({ onClick, isLoading }: { onClick: () => void; isLoading: boolean }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    title="로그아웃"
    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-red-500 transition-all hover:bg-red-50 disabled:opacity-50"
  >
    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
  </button>
);

const ExpandedLogoutButton = ({ onClick, isLoading }: { onClick: () => void; isLoading: boolean }) => (
  <button onClick={onClick} disabled={isLoading} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50">
    {isLoading ? (
      <>
        <Loader2 size={18} className="animate-spin" />
        <span className="truncate">로그아웃 중</span>
      </>
    ) : (
      <>
        <LogOut size={18} />
        <span className="truncate">로그아웃</span>
      </>
    )}
  </button>
);
