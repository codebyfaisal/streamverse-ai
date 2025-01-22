import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoCard } from "@/components/VideoCard";
import {
  Edit,
  Settings,
  Share2,
  Bell,
  BellOff,
  Users,
  PlaySquare,
  Globe,
  Twitter,
  Instagram,
  Github,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function ProfilePage() {
  const { username } = useParams();
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  // Mock user data
  const pageUser = {
    displayName: user.username,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe",
    banner: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
    subscribers: 1500,
    totalViews: 25000,
    joinDate: "Jan 15, 2023",
    description: user.bio,
    socialLinks: {
      website: user.socialLinks.website,
      twitter: user.socialLinks.twitter,
      instagram: user.socialLinks.instagram,
      github: user.socialLinks.github,
      linkedin: user.socialLinks.linkedin,
    },
  };

  // Mock videos data
  const videos = [
    {
      id: 1,
      title: "Building a React App from Scratch",
      thumbnail: "https://i.ytimg.com/vi/Pf3YBiIEMaU/hqdefault.jpg",
      views: 1200,
      timestamp: "2 weeks ago",
      duration: "15:30",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      thumbnail: "https://i.ytimg.com/vi/XyTfneDHqik/hqdefault.jpg",
      views: 800,
      timestamp: "1 month ago",
      duration: "20:45",
    },
    {
      id: 3,
      title: "Understanding TypeScript",
      thumbnail: "https://i.ytimg.com/vi/zQnBQ4tB3ZA/hqdefault.jpg",
      views: 950,
      timestamp: "3 weeks ago",
      duration: "18:20",
    },
    {
      id: 4,
      title: "JavaScript Performance Optimization",
      thumbnail: "https://i.ytimg.com/vi/FNx_LfO2I7c/hqdefault.jpg",
      views: 1100,
      timestamp: "1 week ago",
      duration: "25:00",
    },
  ];

  // Mock playlists data
  const playlists = [
    {
      id: 1,
      title: "JavaScript Tutorials",
      videoCount: 15,
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    },
    {
      id: 2,
      title: "React Projects",
      videoCount: 8,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    },
  ];

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      setIsNotificationOn(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-48 md:h-64">
        <img
          src={pageUser.banner}
          alt="Channel banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="container max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-end gap-6 -mt-12 md:-mt-16">
          {/* Avatar */}
          <div className="relative z-10">
            <img
              src={pageUser.avatar}
              alt={pageUser.username}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg border-2 dark:border-white/10"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4 z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{pageUser.displayName}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {pageUser.subscribers.toLocaleString()} subscribers
                  </span>
                  <span className="flex items-center gap-1">
                    <PlaySquare className="w-4 h-4" />
                    {videos.length} videos
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isSubscribed ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={toggleSubscription}
                      className="font-semibold"
                    >
                      Subscribed
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsNotificationOn(!isNotificationOn)}
                    >
                      {isNotificationOn ? (
                        <Bell className="w-5 h-5" />
                      ) : (
                        <BellOff className="w-5 h-5" />
                      )}
                    </Button>
                  </>
                ) : (
                  <Button onClick={toggleSubscription}>Subscribe</Button>
                )}
                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
                {username === pageUser.username && (
                  <>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to="/user/account">
                        <Edit className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to="/settings">
                        <Settings className="w-5 h-5" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="videos" className="mt-8">
          <TabsList>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group relative aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="font-semibold text-white">
                        {playlist.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {playlist.videoCount} videos
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{pageUser.description}</p>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-2xl font-bold">
                      {pageUser.subscribers.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Subscribers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {pageUser.totalViews.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{videos.length}</p>
                    <p className="text-sm text-muted-foreground">Videos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{playlists.length}</p>
                    <p className="text-sm text-muted-foreground">Playlists</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Links</h2>
                <div className="space-y-2">
                  {Object.entries(pageUser.socialLinks).map(
                    ([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:underline capitalize"
                      >
                        {platform === "website" && <Globe className="w-4 h-4" />}
                        {platform === "twitter" && <Twitter className="w-4 h-4" />}
                        {platform === "instagram" && (<Instagram className="w-4 h-4" />)}
                        {platform === "github" && <Github className="w-4 h-4" />}
                        {platform === "linkedin" && (<Linkedin className="w-4 h-4" />)}
                        <span className="text-blue-500">{url}</span>
                      </a>
                    )
                  )}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Joined</h2>
                <p className="text-muted-foreground">{pageUser.joinDate}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;
