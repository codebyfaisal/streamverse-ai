import Comment from "./Comment";

export default function CommentList({ comments, isNested = false }) {
  return (
    <div className={`space-y-6 ${isNested ? "ml-12 mt-4" : ""}`}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
