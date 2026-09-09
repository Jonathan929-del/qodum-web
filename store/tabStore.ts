import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Tab {
  path: string;
  label: string;
  activePath: string;
}

interface TabsState {
  openTabs: Tab[];
  hasHydrated: boolean;
  openTab: (tab: Tab) => void;
  closeTab: (path: string) => void;
  setHasHydrated: (state: boolean) => void;
  closeAllTabs: (moduleSlug: string) => void;
}

export const useTabsStore = create<TabsState>()(
  persist(
    (set, get) => ({
      openTabs: [],
      hasHydrated: false,
      openTab: (tab) =>
        set((s) => {
          const existing = s.openTabs.find((t) => t.path === tab.path);
          if (!existing) return { openTabs: [...s.openTabs, tab] };
          if (existing.activePath === tab.activePath) return s;
          return {
            openTabs: s.openTabs.map((t) =>
              t.path === tab.path ? { ...t, activePath: tab.activePath } : t
            ),
          };
        }),
      closeTab: (path) =>
        set((s) => ({ openTabs: s.openTabs.filter((t) => t.path !== path) })),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      closeAllTabs: (moduleSlug: string) =>   set((s) => ({
        openTabs: s.openTabs.filter((t) => !t.path.startsWith(`/${moduleSlug}/`)),
      })),
    }),
    {
      name: 'qodum-open-tabs',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);