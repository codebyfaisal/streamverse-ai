import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VideoList from "@/components/VideoList";
import { ThumbsUp, ThumbsDown, Share2, Bookmark } from "lucide-react";
import Comments from "@/components/comments/Comments";
import VideoPlayer from "@/components/VideoPlayer";
import videos from "@/store/videos";
import channels from "@/store/channels";
import { formatTimeAgo, formatViews } from "@/lib/format";

function VideoPage() {
  const { id } = useParams();

  const vid = videos.find((video) => video.id === id);
  const chan = channels.find((c) => c.id == vid.channelId);

  // Mock video data - replace with actual API call
  const video = {
    likes: "50K",
    description: `This is a detailed description of the video. 
    It can contain multiple lines of text explaining what the video is about.
    
    You can include links and other information here.
    
    #tags #video #description`,
  };

  return (
    <div className="container p-4">
      <div className="grid lg:grid-cols-[1fr,320px] gap-6">
        {/* Main Content */}
        <div className="space-y-4">
          {/* Video Player */}
          <div className="rounded-lg overflow-hidden">
            <VideoPlayer
              src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
              poster={vid.thumbnail}
              autoplay={false}
            />
          </div>

          {/* Video Info */}
          <>
            <h1 className="text-xl font-semibold">{vid.title}</h1>
            <div className="flex items-center justify-between gap-4 mt-2 flex-wrap">
              {/* Channel Info */}
              <div className="flex items-center gap-4">
                <img
                  src={vid.thumbnail}
                  alt={vid.channel}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium capitalize">{vid.channel}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatViews(chan.subscribers)}
                  </p>
                </div>
                <Button>Subscribe</Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <div className="flex items-center rounded-full bg-secondary">
                  <Button variant="ghost" className="rounded-l-full px-4">
                    <ThumbsUp className="h-5 w-5 mr-2" />
                    {video.likes}
                  </Button>
                  <div className="h-6 w-px bg-border" />
                  <Button variant="ghost" className="rounded-r-full px-4">
                    <ThumbsDown className="h-5 w-5" />
                  </Button>
                </div>
                <Button variant="secondary">
                  <Share2 className="h-5 w-5 xs:mr-2" />
                  <span className="hidden xs:block">Share</span>
                </Button>
                <Button variant="secondary">
                  <Bookmark className="h-5 w-5 xs:mr-2" />
                  <span className="hidden xs:block">Save</span>
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-lg py-2 border-t">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{formatTimeAgo(vid.createdAt)}</span>
                <span>{formatViews(vid.views)} Views</span>
              </div>
              <p className="mt-2 text-sm whitespace-pre-line">
                {video.description}
              </p>
            </div>

            {/* Comments Section */}
            <div className="mt-6 border-t border-b py-6">
              <Comments videoId={id} />
            </div>
          </>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recommended videos</h2>
          <VideoList videos={videos} layout="horizontal" />
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
