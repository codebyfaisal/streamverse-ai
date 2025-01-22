import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "@/lib/format";

const notifications = [
  {
    id: 1,
    type: "upload",
    title: "New Video: React Tutorial",
    channel: {
      id: "1",
      name: "Code Master",
      avatar: "https://picsum.photos/seed/not1/40/40",
    },
    createdAt: "2024-03-10T10:00:00",
    read: false,
  },
  {
    id: 2,
    type: "like",
    title: "Someone liked your comment",
    channel: {
      id: "2",
      name: "Tech Enthusiast",
      avatar: "https://picsum.photos/seed/not2/40/40",
    },
    createdAt: "2024-03-09T15:30:00",
    read: true,
  },
  // Add more notifications...
];

function NotificationItem({ notification }) {
  return (
    <DropdownMenuItem
      className={`flex items-start gap-3 p-3 ${
        !notification.read ? "bg-primary/5" : ""
      }`}
    >
      <img
        src={notification.channel.avatar}
        alt={notification.channel.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-grow min-w-0">
        <p className="font-medium line-clamp-2">{notification.title}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{notification.channel.name}</span>
          <span>•</span>
          <span>{formatTimeAgo(notification.createdAt)}</span>
        </div>
      </div>
    </DropdownMenuItem>
  );
}

function NotificationDropdown() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <h2 className="font-semibold">Notifications</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/notifications">See all</Link>
          </Button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationDropdown;
