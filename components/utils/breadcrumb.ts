import modules from '@/constants/modules';

export interface Crumb {
  label: string;
  href?: string;
}

export const slugify = (label: string) =>
  label.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');


export const getModuleRoot = (pathname: string) => {
  const [moduleSlug] = pathname.split('/').filter(Boolean);
  return moduleSlug ? `/${moduleSlug}` : '/';
};

export const getModuleSlug = (pathname: string) => {
  const [moduleSlug] = pathname.split('/').filter(Boolean);
  return moduleSlug ?? '';
};

export const resolveBreadcrumb = (pathname: string): Crumb[] => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return [];

  const [moduleSlug, leafSlug] = segments;
  const currentModule = (modules as any[]).find((m) => slugify(m.moduleName) === moduleSlug);
  if (!currentModule) return [];

  const moduleCrumb: Crumb = { label: currentModule.moduleName, href: `/${moduleSlug}` };

  for (const page of currentModule.pages ?? []) {
    for (const subPage of page.subPages ?? []) {
      if (slugify(subPage.subPageName) === leafSlug) {
        return [moduleCrumb, { label: page.pageName }, { label: subPage.subPageName }];
      }
      for (const thread of subPage.threads ?? []) {
        if (slugify(thread) === leafSlug) {
          return [
            moduleCrumb,
            { label: page.pageName },
            { label: subPage.subPageName },
            { label: thread },
          ];
        }
      }
    }
  }

  return [moduleCrumb];
};

export const getTabPath = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length >= 2 ? `/${segments[0]}/${segments[1]}` : pathname;
};

export const resolvePermissionKey = (pathname: string) => {
  const [moduleSlug, leafSlug] = pathname.split('/').filter(Boolean);
  const currentModule = (modules as any[]).find((m) => slugify(m.moduleName) === moduleSlug);
  if (!currentModule) return null;

  for (const page of currentModule.pages ?? []) {
    for (const subPage of page.subPages ?? []) {
      const isMatch = slugify(subPage.subPageName) === leafSlug
        || subPage.threads?.some((t: string) => slugify(t) === leafSlug);
      if (isMatch) return { moduleName: currentModule.moduleName, subMenu: subPage.subPageName };
    }
  }
  return null;
};