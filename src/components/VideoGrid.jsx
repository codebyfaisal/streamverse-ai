import { Link } from "react-router-dom";
import { formatDuration, formatTimeAgo, formatViews } from "@/lib/format";

function VideoGrid({
  videos = [],
  columns = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) {
  return (
    <div className={`grid ${columns} gap-4`}>
      {videos.map((video) => (
        <div key={video.id} className="group">
          {/* Thumbnail */}
          <div className="relative aspect-video mb-2">
            <Link to={`/video/${video.id}`}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="rounded-lg object-cover w-full h-full"
              />
              {video.duration && (
                <div className="absolute bottom-1 right-1 bg-background/80 px-1 rounded text-xs">
                  {formatDuration(video.duration)}
                </div>
              )}
            </Link>
          </div>

          {/* Info */}
          <div className="flex gap-2">
            {/* Channel Avatar */}
            <Link
              to={`/channel/${video.channel.id}`}
              className="flex-shrink-0 mt-1"
            >
              <img
                src={video.channel.avatar}
                alt={video.channel.name}
                className="w-8 h-8 rounded-full"
              />
            </Link>

            {/* Video Details */}
            <div className="flex-grow min-w-0">
              <Link
                to={`/video/${video.id}`}
                className="font-medium line-clamp-2 hover:text-primary"
              >
                {video.title}
              </Link>
              <Link
                to={`/channel/${video.channel.id}`}
                className="text-sm text-muted-foreground hover:text-primary block"
              >
                {video.channel.name}
              </Link>
              <div className="text-sm text-muted-foreground">
                {video.views && (
                  <span>
                    {formatViews(video.views)}
                    {" • "}
                  </span>
                )}
                {video.createdAt && (
                  <span>{formatTimeAgo(video.createdAt)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VideoGrid;
