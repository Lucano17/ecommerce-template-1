import { create } from 'zustand'


interface State {
  isSideMenuOpen: boolean;
  isCategoryMenuOpen: boolean

  openSideMenu: () => void;
  closeSideMenu: () => void;

  openCategoryMenu: () => void;
  closeCategoryMenu: () => void;
}

export const useUIStore = create<State>((set) => ({
  isSideMenuOpen: false,
  isCategoryMenuOpen: false,

  openCategoryMenu: () => set({ isCategoryMenuOpen: true }),
  closeCategoryMenu: () => set({ isCategoryMenuOpen: false }),

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
}))