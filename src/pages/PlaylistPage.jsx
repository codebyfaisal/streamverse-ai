import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Play,
  PlaySquare,
  Shuffle,
  ListVideo,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function PlaylistVideo({ video, index, isActive }) {
  return (
    <Link
      to={`/video/${video.id}`}
      className={cn(
        "flex gap-4 p-2 hover:bg-muted/50 rounded-lg group",
        isActive && "bg-muted"
      )}
    >
      <div className="flex-shrink-0 w-6 text-sm text-muted-foreground self-center">
        {isActive ? (
          <Play className="h-4 w-4 text-primary" />
        ) : (
          <span>{index + 1}</span>
        )}
      </div>
      <div className="relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-1 right-1 bg-background/90 px-1 rounded text-xs">
          {video.duration}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{video.channel}</p>
      </div>
    </Link>
  );
}

function PlaylistPage() {
  const playlist = {
    title: "Best Anime Episodes of All Time",
    description:
      "A curated collection of the most epic and memorable anime episodes that you absolutely must watch. From intense battles to emotional moments, this playlist has it all.",
    thumbnail: "https://picsum.photos/seed/100/640/360",
    videos: Array(20)
      .fill(null)
      .map((_, i) => ({
        id: i,
        title:
          i % 2 === 0
            ? "Amazing Anime Episode That Will Blow Your Mind"
            : "Epic Battle Scene That Changed Everything",
        channel: i % 2 === 0 ? "Anime Channel" : "Top Anime",
        views: "1.2M",
        timestamp: "3 days ago",
        thumbnail: `https://picsum.photos/seed/${i + 40}/640/360`,
        duration: "24:00",
      })),
    totalVideos: 20,
    totalDuration: "8 hours, 12 minutes",
    lastUpdated: "Last updated 3 days ago",
    creator: {
      name: "Anime Channel",
      avatar: "https://picsum.photos/seed/1/40/40",
    },
  };

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playlist Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-xl font-semibold mt-4">{playlist.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <img
                src={playlist.creator.avatar}
                alt={playlist.creator.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm">{playlist.creator.name}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {playlist.description}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-4">
              <p>{playlist.totalVideos} videos</p>
              <p>{playlist.totalDuration}</p>
              <p>{playlist.lastUpdated}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Button className="flex-1 bg-primary/90">
                <Play className="h-4 w-4 mr-2" />
                Play All
              </Button>
              <Button variant="secondary" className="flex-1">
                <Shuffle className="h-4 w-4 mr-2" />
                Shuffle
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Videos List */}
        <div className="lg:col-span-2 space-y-1">
          {playlist.videos.map((video, index) => (
            <PlaylistVideo
              key={video.id}
              video={video}
              index={index}
              isActive={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistPage;
