'use client';
import { usePathname } from 'next/navigation';
import { useUsersList } from '@/lib/hooks/useUserModuleData';
import { getTabPath } from '@/components/utils/breadcrumb';
import { emptyUser } from '@/constants/emptyUser';
import ListView from '@/components/shared/crud/ListView';

export default function ViewCom () {

  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { users, isLoadingUsers: isLoading } = useUsersList();

  return (
    <ListView
      title='Users List'
      data={users}
      isLoading={isLoading}
      emptyRecord={emptyUser}
      tabPath={tabPath}
      hidden={["profile_picture", "enable_otp"]}
    />
  );
};