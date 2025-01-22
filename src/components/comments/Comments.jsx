import { useEffect } from "react";
import useCommentsStore from "@/store/useCommentsStore";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading";
import { ErrorInline } from "@/components/ui/error";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default function Comments({ videoId }) {
  const { comments, isLoading, error, sortBy, fetchComments, setSortBy } =
    useCommentsStore();

  useEffect(() => {
    fetchComments(videoId);
  }, [videoId, fetchComments]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4">
        <ErrorInline
          message="Failed to load comments"
          retry={() => fetchComments(videoId)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CommentForm videoId={videoId} />

      {comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
}
