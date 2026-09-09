import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { resolvePermissionKey } from '@/components/utils/breadcrumb';

const emptyPermission = { add: false, modify: false, delete: false, print: false, read_only: false };

export const usePermission = (user: any) => {
  const pathname = usePathname();
  const [permissions, setPermissions] = useState(emptyPermission);

  useEffect(() => {
    const key = resolvePermissionKey(pathname);
    const found = key && user?.permissions
      ?.find((p: any) => p.name === key.moduleName)
      ?.permissions?.find((pp: any) => pp.sub_menu === key.subMenu);
    setPermissions(found ?? emptyPermission);
  }, [user, pathname]);

  return permissions;
};