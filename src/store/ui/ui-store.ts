import { create } from 'zustand'


interface State {
  isSideMenuOpen: boolean;
  isCategoryMenuOpen: boolean;
  isPaymentMenuOpen: boolean;

  openSideMenu: () => void;
  closeSideMenu: () => void;

  openCategoryMenu: () => void;
  closeCategoryMenu: () => void;

  openPaymentMenu: () => void;
  closePaymentMenu: () => void;
}

export const useUIStore = create<State>((set) => ({
  isSideMenuOpen: false,
  isCategoryMenuOpen: false,
  isPaymentMenuOpen: false,
  

  openCategoryMenu: () => set({ isCategoryMenuOpen: true }),
  closeCategoryMenu: () => set({ isCategoryMenuOpen: false }),

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),

  openPaymentMenu: () => set({ isPaymentMenuOpen: true }),
  closePaymentMenu: () => set({ isPaymentMenuOpen: false }),
}))