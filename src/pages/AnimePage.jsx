import { Swords } from "lucide-react";
import VideoGrid from "@/components/VideoGrid";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Action",
  "Romance",
  "Comedy",
  "Drama",
  "Fantasy",
  "Sci-Fi",
  "Slice of Life",
];

function AnimePage() {
  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
          <div className="relative bg-background border rounded-full p-2">
            <Swords className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Anime</h1>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === "All" ? "default" : "outline"}
            className="flex-shrink-0"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Videos Grid */}
      <VideoGrid
        videos={[
          {
            id: "1",
            title: "Anime Episode Title 1",
            thumbnail: "https://picsum.photos/seed/anime1/360/200",
            duration: "23:45",
            views: "500K",
            createdAt: "1 day ago",
            channel: {
              name: "Anime Channel",
              avatar: "https://picsum.photos/seed/animech1/40/40",
            },
          },
          // Add more video objects...
        ]}
      />
    </div>
  );
}

export default AnimePage;
