import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  MoreVertical,
  Pencil,
  Trash,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCommentsStore from "@/store/useCommentsStore";
import { useAuth } from "@/contexts/AuthContext";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function Comment({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const { editComment, deleteComment, toggleReaction } = useCommentsStore();
  const { user } = useAuth();

  const isAuthor = user?.id === comment.userId;
  const hasReplies = comment.replies?.length > 0;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    deleteComment(comment.id);
  };

  const handleLike = () => {
    toggleReaction(comment.id, "likes");
  };

  const handleDislike = () => {
    toggleReaction(comment.id, "dislikes");
  };

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  return (
    <div className="group">
      <div className="flex gap-4">
        <Avatar>
          {comment.userAvatar ? (
            <img
              src={comment.userAvatar}
              alt={comment.userName}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{comment.userName}</p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
                {comment.isEdited && (
                  <span className="ml-2 text-muted-foreground">(edited)</span>
                )}
              </p>
            </div>
            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-destructive"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {isEditing ? (
            <CommentForm
              videoId={comment.videoId}
              initialContent={comment.content}
              onCancel={handleCancelEdit}
              onSubmit={(content) => {
                editComment(comment.id, content);
                setIsEditing(false);
              }}
            />
          ) : (
            <p className="text-sm">{comment.content}</p>
          )}

          <div className="flex items-center gap-4 text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {comment.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleDislike}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              {comment.dislikes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleReply}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Reply
            </Button>
          </div>

          {isReplying && (
            <CommentForm
              videoId={comment.videoId}
              parentId={comment.id}
              onCancel={handleCancelReply}
            />
          )}

          {hasReplies && <CommentList comments={comment.replies} isNested />}
        </div>
      </div>
    </div>
  );
}
