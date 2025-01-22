import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SearchResult({ video }) {
  return (
    <div className="flex gap-4">
      <div className="relative flex-shrink-0 w-64 aspect-video rounded-lg overflow-hidden">
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
        <h3 className="font-medium line-clamp-2">{video.title}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <span>{video.views} views</span>
          <span>•</span>
          <span>{video.timestamp}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">{video.channel}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}

function FilterButton({ children, active, ...props }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "rounded-full",
        active && "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

function SearchPage() {
  const filters = [
    "All",
    "Videos",
    "Channels",
    "Playlists",
    "Movies",
    "Live",
    "Gaming",
    "News",
    "Music",
    "Recently uploaded",
    "Watched",
  ];

  const searchResults = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: i,
      title:
        i % 2 === 0
          ? "Amazing Anime Episode That Will Blow Your Mind"
          : "Interesting Video Title That Catches Your Attention And Goes For Multiple Lines",
      channel: i % 2 === 0 ? "Anime Channel" : "Cool Channel",
      views: "1.2M",
      timestamp: "3 days ago",
      thumbnail: `https://picsum.photos/seed/${i + 20}/640/360`,
      channelAvatar: `https://picsum.photos/seed/${i + 50}/40/40`,
      duration: "10:30",
      description:
        "This is a detailed description of the video that provides more context about what viewers can expect to see. It might contain keywords and important information about the content.",
    }));

  return (
    <div className="container py-4">
      {/* Filters */}
      <div className="flex items-center gap-2 pb-4 border-b overflow-x-auto custom-scrollbar">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
        </Button>
        <div className="w-px h-6 bg-border" />
        {filters.map((filter, i) => (
          <FilterButton key={i} active={i === 0}>
            {filter}
          </FilterButton>
        ))}
      </div>

      {/* Search Results */}
      <div className="mt-4 space-y-8">
        {searchResults.map((video) => (
          <SearchResult key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
