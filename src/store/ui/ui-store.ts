import { create } from 'zustand'


interface State {
  isSideMenuOpen: boolean;
  isCategoryMenuOpen: boolean;
  isPaymentsMenuOpen: boolean;

  openSideMenu: () => void;
  closeSideMenu: () => void;

  openCategoryMenu: () => void;
  closeCategoryMenu: () => void;

  openPaymentsMenu: () => void;
  closePaymentsMenu: () => void;
}

export const useUIStore = create<State>((set) => ({
  isSideMenuOpen: false,
  isCategoryMenuOpen: false,
  isPaymentsMenuOpen: false,
  

  openCategoryMenu: () => set({ isCategoryMenuOpen: true }),
  closeCategoryMenu: () => set({ isCategoryMenuOpen: false }),

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),

  openPaymentsMenu: () => set({ isPaymentsMenuOpen: true }),
  closePaymentsMenu: () => set({ isPaymentsMenuOpen: false }),
}))