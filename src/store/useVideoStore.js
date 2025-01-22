import { create } from "zustand";

const useVideoStore = create((set) => ({
  currentVideo: null,
  isPlaying: false,
  volume: 1,
  quality: "auto",
  playbackSpeed: 1,
  captions: false,
  loading: false,
  error: null,
  relatedVideos: [],
  comments: [],

  setCurrentVideo: (video) => set({ currentVideo: video }),

  setPlaybackState: (isPlaying) => set({ isPlaying }),

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  setQuality: (quality) => set({ quality }),

  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  toggleCaptions: () => set((state) => ({ captions: !state.captions })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setRelatedVideos: (videos) => set({ relatedVideos: videos }),

  addComment: (comment) =>
    set((state) => ({
      comments: [comment, ...state.comments],
    })),

  removeComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== commentId),
    })),

  updateComment: (commentId, updatedContent) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: updatedContent }
          : comment
      ),
    })),
}));

export default useVideoStore;
