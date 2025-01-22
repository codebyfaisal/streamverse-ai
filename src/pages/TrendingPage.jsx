import { Flame, TrendingUp } from "lucide-react";
import VideoGrid from "@/components/VideoGrid";
import { Button } from "@/components/ui/button";

const timeFilters = ["Now", "Today", "This Week", "This Month", "All Time"];

function TrendingPage() {
  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
          <div className="relative bg-background border rounded-full p-2">
            <Flame className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Trending</h1>
      </div>

      {/* Time Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {timeFilters.map((filter) => (
          <Button
            key={filter}
            variant={filter === "Now" ? "default" : "outline"}
            className="flex-shrink-0"
          >
            {filter === "Now" && <TrendingUp className="mr-2 h-4 w-4" />}
            {filter}
          </Button>
        ))}
      </div>

      {/* Videos Grid */}
      <VideoGrid
        videos={[
          {
            id: "1",
            title: "Amazing Video Title 1",
            thumbnail: "https://picsum.photos/seed/1/360/200",
            duration: "12:34",
            views: "1.2M",
            createdAt: "2 hours ago",
            channel: {
              name: "Channel Name",
              avatar: "https://picsum.photos/seed/avatar1/40/40",
            },
          },
          // Add more video objects...
        ]}
      />
    </div>
  );
}

export default TrendingPage;
