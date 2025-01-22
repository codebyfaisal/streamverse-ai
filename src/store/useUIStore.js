import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUIStore = create(
  persist(
    (set) => ({
      theme: "system",
      sidebarOpen: true,
      notifications: [],
      searchHistory: [],
      modal: {
        isOpen: false,
        type: null,
        data: null,
      },

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            { id: Date.now(), ...notification },
            ...state.notifications,
          ],
        })),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),

      addToSearchHistory: (query) =>
        set((state) => ({
          searchHistory: [
            query,
            ...state.searchHistory.filter((q) => q !== query).slice(0, 9),
          ],
        })),

      clearSearchHistory: () => set({ searchHistory: [] }),

      openModal: (type, data) => set({ modal: { isOpen: true, type, data } }),

      closeModal: () =>
        set({ modal: { isOpen: false, type: null, data: null } }),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({
        theme: state.theme,
        searchHistory: state.searchHistory,
      }),
    }
  )
);

export default useUIStore;
