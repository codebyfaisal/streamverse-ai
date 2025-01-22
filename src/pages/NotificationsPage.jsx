import { Bell, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTimeAgo } from "@/lib/format";
import { Link } from "react-router-dom";

const notifications = [
  {
    id: 1,
    type: "upload",
    title: "New Video: React Tutorial",
    description: "Learn React from scratch in this comprehensive guide",
    channel: {
      id: "1",
      name: "Code Master",
      avatar: "https://picsum.photos/seed/not1/40/40",
    },
    createdAt: "2024-03-10T10:00:00",
    read: false,
  },
  // Add more notifications...
];

function NotificationItem({ notification }) {
  return (
    <div
      className={`flex items-start gap-4 p-4 border-b ${
        !notification.read ? "bg-primary/5" : ""
      }`}
    >
      <Link to={`/channel/${notification.channel.id}`}>
        <img
          src={notification.channel.avatar}
          alt={notification.channel.name}
          className="w-12 h-12 rounded-full"
        />
      </Link>
      <div className="flex-grow min-w-0">
        <h3 className="font-medium">{notification.title}</h3>
        {notification.description && (
          <p className="text-muted-foreground mt-1">
            {notification.description}
          </p>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <Link
            to={`/channel/${notification.channel.id}`}
            className="hover:text-primary"
          >
            {notification.channel.name}
          </Link>
          <span>•</span>
          <span>{formatTimeAgo(notification.createdAt)}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          title={notification.read ? "Mark as unread" : "Mark as read"}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          title="Remove"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function NotificationsPage() {
  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
            <div className="relative bg-background border rounded-full p-2">
              <Bell className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sm">
            Mark all as read
          </Button>
          <Button variant="outline" className="text-sm">
            Clear all
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-3xl mx-auto border rounded-lg divide-y">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;
