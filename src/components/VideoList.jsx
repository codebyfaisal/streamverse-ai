import { Link } from "react-router-dom";
import {
  formatDuration,
  formatTimeAgo,
  formatViews,
  randomizeArray,
} from "@/lib/format"; 

function VideoList({ videos = [], layout = "vertical" }) {
  const displayVideos = randomizeArray(videos);

  return (
    <div className="space-y-4">
      {displayVideos.map((video) => (
        <div
          key={video.id}
          className={`group flex gap-4 ${
            layout === "horizontal" ? "flex-row" : "flex-col"
          }`}
        >
          {/* Thumbnail */}
          <div className="relative flex-shrink-0">
            <Link to={`/video/${video.id}`}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className={`rounded-lg object-cover ${
                  layout === "horizontal" ? "w-40 h-24" : "w-full aspect-video"
                }`}
              />
              {video.duration && (
                <div className="absolute bottom-1 right-1 bg-background px-1 py-0.5 rounded text-xs">
                  {formatDuration(video.duration)}
                </div>
              )}
            </Link>
          </div>

          {/* Info */}
          <div className="flex-grow min-w-0">
            <Link
              to={`/video/${video.id}`}
              className="font-medium line-clamp-2 hover:text-primary"
            >
              {video.title}
            </Link>
            <Link
              to={`/channel/${video.id}`}
              className="text-sm text-muted-foreground hover:text-primary mt-1 block"
            >
              {video.channel}
            </Link>
            <div className="text-sm text-muted-foreground">
              {video.views && (
                <span>
                  {formatViews(video.views)}
                  {" • "}
                </span>
              )}
              {video.createdAt && <span>{formatTimeAgo(video.createdAt)}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
