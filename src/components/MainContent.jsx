import { Link } from "react-router-dom";
import videos from "@/store/videos";
import { formatTimeAgo, formatViews, randomizeArray } from "@/lib/format";

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-video overflow-hidden rounded-lg bg-secondary relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute bottom-1 right-1 rounded bg-background px-2 py-1 text-xs">
            {video.duration}
          </div>
        </div>
        <div className="mt-3 flex">
          <img
            src={video.thumbnail}
            alt={video.channel}
            className="h-9 w-9 rounded-full"
          />
          <div className="ml-3 space-y-1.5">
            <h3 className="line-clamp-2 text-sm font-medium leading-tight">
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground">{video.channel}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{formatViews(video.views)} views</span>
              <span> • </span>
              <span>{formatTimeAgo(video.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function MainContent() {
  const displayVideos = randomizeArray(videos);

  return (
    <div className="container py-3 px-4">      
      <h2 className="mb-6 text-2xl font-semibold">Recommended Videos</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default MainContent;
