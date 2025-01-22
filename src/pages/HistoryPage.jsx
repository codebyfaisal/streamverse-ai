import { Clock, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VideoList from "@/components/VideoList";
import videos from "@/store/videos";

function HistoryPage() {
  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
            <div className="relative bg-background border rounded-full p-2">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Watch History</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar (Initially Hidden) */}
      <div className="mb-6 hidden">
        <Input
          type="search"
          placeholder="Search watch history..."
          className="max-w-md"
        />
      </div>

      {/* History List */}
      <div className="space-y-4">
        <div className="font-medium text-muted-foreground">
          <h1 className="text-lg border-1 border-b my-3 py-1">Today</h1>
          <VideoList videos={videos.slice(0, 5)} layout="horizontal" />
        </div>

        <div className="font-medium text-muted-foreground">
          <h1 className="text-lg border-1 border-b my-3 py-1">Yesterday</h1>
          <VideoList videos={videos.slice(0, 5)} layout="horizontal" />
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
