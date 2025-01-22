import {
  Clock,
  ThumbsUp,
  Bookmark,
  ListVideo,
  History,
  PlaySquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import VideoList from "@/components/VideoList";

function LibrarySection({ icon: Icon, title, count, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">{title}</h2>
          {count && (
            <span className="text-sm text-muted-foreground">({count})</span>
          )}
        </div>
        {count > 4 && (
          <Link
            to={`/${title.toLowerCase()}`}
            className="text-sm text-primary hover:underline"
          >
            See all
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

function LibraryPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-8">Library</h1>

      <div className="space-y-8">
        <LibrarySection icon={History} title="History" count={125}>
          <VideoList
            videos={
              [
                // Add video objects...
              ]
            }
            layout="horizontal"
            maxItems={4}
          />
        </LibrarySection>

        <LibrarySection icon={ThumbsUp} title="Liked Videos" count={47}>
          <VideoList
            videos={
              [
                // Add video objects...
              ]
            }
            layout="horizontal"
            maxItems={4}
          />
        </LibrarySection>

        <LibrarySection icon={ListVideo} title="Playlists" count={12}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Playlist cards */}
          </div>
        </LibrarySection>

        <LibrarySection icon={Bookmark} title="Watch Later" count={15}>
          <VideoList
            videos={
              [
                // Add video objects...
              ]
            }
            layout="horizontal"
            maxItems={4}
          />
        </LibrarySection>
      </div>
    </div>
  );
}

export default LibraryPage;
