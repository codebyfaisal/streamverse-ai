import { create } from "zustand";

// Mock comments data
const MOCK_COMMENTS = [
  {
    id: "1",
    content: "This is an amazing video! The editing is top-notch 🎬",
    userId: "user1",
    userName: "John Doe",
    userAvatar: "https://picsum.photos/seed/user1/40/40",
    likes: 245,
    dislikes: 2,
    replies: [
      {
        id: "1-1",
        content: "Totally agree! The production quality is amazing 👏",
        userId: "user2",
        userName: "Jane Smith",
        userAvatar: "https://picsum.photos/seed/user2/40/40",
        likes: 23,
        dislikes: 0,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isEdited: false,
        mentions: [],
      },
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isEdited: false,
    mentions: [],
  },
  {
    id: "2",
    content:
      "Very informative content! Looking forward to more videos like this 🙌",
    userId: "user3",
    userName: "Alex Johnson",
    userAvatar: "https://picsum.photos/seed/user3/40/40",
    likes: 123,
    dislikes: 1,
    replies: [],
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    isEdited: false,
    mentions: [],
  },
  {
    id: "3",
    content:
      "Great explanation! Could you make a follow-up video about advanced techniques? 🤔",
    userId: "user4",
    userName: "Sarah Wilson",
    userAvatar: "https://picsum.photos/seed/user4/40/40",
    likes: 89,
    dislikes: 0,
    replies: [],
    createdAt: new Date(Date.now() - 21600000).toISOString(),
    isEdited: false,
    mentions: [],
  },
];

const useCommentsStore = create((set, get) => ({
  comments: [],
  isLoading: false,
  error: null,
  sortBy: "newest", // newest, oldest, popular

  // Fetch comments
  fetchComments: async (videoId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ comments: MOCK_COMMENTS, isLoading: false });
    } catch (error) {
      set({ error: "Failed to load comments", isLoading: false });
    }
  },

  // Add comment
  addComment: (videoId, content, parentId = null) => {
    const newComment = {
      id: Date.now().toString(),
      content,
      parentId,
      userId: "currentUser",
      userName: "Current User",
      userAvatar: "https://picsum.photos/seed/currentuser/40/40",
      likes: 0,
      dislikes: 0,
      replies: [],
      createdAt: new Date().toISOString(),
      mentions: [],
      isEdited: false,
    };

    set((state) => {
      if (parentId) {
        // Add reply to parent comment
        const updatedComments = state.comments.map((comment) => {
          if (comment.id === parentId) {
            return { ...comment, replies: [...comment.replies, newComment] };
          }
          return comment;
        });
        return { comments: updatedComments };
      }
      // Add new top-level comment
      return { comments: [newComment, ...state.comments] };
    });
  },

  // Edit comment
  editComment: (commentId, content) => {
    set((state) => ({
      comments: state.comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, content, isEdited: true };
        }
        // Check in replies
        if (comment.replies?.length) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? { ...reply, content, isEdited: true }
                : reply
            ),
          };
        }
        return comment;
      }),
    }));
  },

  // Delete comment
  deleteComment: (commentId) => {
    set((state) => ({
      comments: state.comments.filter((comment) => {
        if (comment.id === commentId) return false;
        if (comment.replies?.length) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== commentId),
          };
        }
        return true;
      }),
    }));
  },

  // Like/Dislike comment
  toggleReaction: (commentId, reactionType) => {
    set((state) => ({
      comments: state.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            [reactionType]: comment[reactionType] + 1,
          };
        }
        // Check in replies
        if (comment.replies?.length) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? { ...reply, [reactionType]: reply[reactionType] + 1 }
                : reply
            ),
          };
        }
        return comment;
      }),
    }));
  },

  // Sort comments
  setSortBy: (sortType) => {
    set({ sortBy: sortType });
    const { comments } = get();

    const sortedComments = [...comments].sort((a, b) => {
      switch (sortType) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "popular":
          return b.likes - b.dislikes - (a.likes - a.dislikes);
        default:
          return 0;
      }
    });

    set({ comments: sortedComments });
  },
}));

export default useCommentsStore;
