import { data } from "autoprefixer";

export function formatDuration(duration) {
  if (typeof duration === "string") {
    // If duration is already formatted (e.g., "12:34")
    return duration;
  }

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatViews(views) {
  if (typeof views === "string") {
    // If views is already formatted (e.g., "1.2M")
    return views;
  }

  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
}

export function randomizeArray(array) {
  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  return shuffleArray([...array]);
}
