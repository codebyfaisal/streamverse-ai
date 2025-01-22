import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      preferences: {
        theme: "system",
        autoplay: true,
        quality: "auto",
        notifications: true,
      },
      watchHistory: [],
      playlists: [],
      subscriptions: [],

      setUser: (user) => set({ user }),
      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),

      addToWatchHistory: (video) =>
        set((state) => ({
          watchHistory: [video, ...state.watchHistory.slice(0, 49)], // Keep last 50 videos
        })),

      clearWatchHistory: () => set({ watchHistory: [] }),

      addToPlaylist: (playlistId, video) =>
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, videos: [...playlist.videos, video] }
              : playlist
          ),
        })),

      createPlaylist: (playlist) =>
        set((state) => ({
          playlists: [...state.playlists, { ...playlist, videos: [] }],
        })),

      removeFromPlaylist: (playlistId, videoId) =>
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  videos: playlist.videos.filter((v) => v.id !== videoId),
                }
              : playlist
          ),
        })),

      subscribe: (channel) =>
        set((state) => ({
          subscriptions: [...state.subscriptions, channel],
        })),

      unsubscribe: (channelId) =>
        set((state) => ({
          subscriptions: state.subscriptions.filter(
            (sub) => sub.id !== channelId
          ),
        })),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
        watchHistory: state.watchHistory,
        playlists: state.playlists,
        subscriptions: state.subscriptions,
      }),
    }
  )
);

export default useUserStore;
