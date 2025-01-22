import { Link } from "react-router-dom";

export function VideoCard({ video }) {
  return (
    <Link to={`/video/${video.id}`} className="group">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs">
          {video.duration}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-medium line-clamp-2 text-sm">{video.title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <span>{video.views.toLocaleString()} views</span>
          <span>•</span>
          <span>{video.timestamp}</span>
        </div>
      </div>
    </Link>
  );
}
