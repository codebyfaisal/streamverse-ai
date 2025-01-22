const randomDate = () => {
  const start = new Date("2024-01-01");
  const end = new Date();
  let d = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return d.toISOString();
};

const videos = [
  {
    id: "8a969c",
    title: "Top 10 Travel Destinations for 2025",
    channel: "Wanderlust Diaries",
    channelId: "w6d0j",
    thumbnail: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    views: 25175,
    createdAt: randomDate(),
    duration: "12:34",
  },
  {
    id: "faf33b",
    title: "Delicious Homemade Pizza Recipe",
    channel: "Culinary Delights",
    channelId: "ty82e",
    thumbnail:
      "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 33983,
    createdAt: randomDate(),
    duration: "8:45",
  },
  {
    id: "bde716",
    title: "10-Minute Morning Meditation",
    channel: "Mindful Moments",
    channelId: "tg6ge",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1661761629601-bf9436d058d2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 42836,
    createdAt: randomDate(),
    duration: "10:00",
  },
  {
    id: "e436aa",
    title: "Hilarious Cat Compilation",
    channel: "Funny Animals",
    channelId: "h1vxo",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1707353402256-3afa1e567b54?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 22454,
    createdAt: randomDate(),
    duration: "10:00",
  },
  {
    id: "b55749",
    title: "Top 5 Coding Tips for Beginners",
    channel: "Tech Savvy",
    channelId: "cs4gd",
    thumbnail:
      "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 37234,
    createdAt: randomDate(),
    duration: "9:30",
  },
  {
    id: "79fe5d",
    title: "Exploring the Amazon Rainforest",
    channel: "Nature Wonders",
    channelId: "syy3v",
    thumbnail:
      "https://images.unsplash.com/photo-1534360682754-fb2d73fd4e56?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 18683,
    createdAt: randomDate(),
    duration: "14:50",
  },
  {
    id: "e818da",
    title: "Tips for Sustainable Living",
    channel: "Green Earth",
    channelId: "jphds",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1667509241064-0fffd21b604f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 48973,
    createdAt: randomDate(),
    duration: "25:10",
  },
  {
    id: "2fd8be",
    title: "DIY Home Office Setup Ideas",
    channel: "Creative Spaces",
    channelId: "t6llv",
    thumbnail:
      "https://images.unsplash.com/photo-1696087225391-eb97abf5ba20?q=80&w=1563&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 24681,
    createdAt: randomDate(),
    duration: "11:15",
  },
  {
    id: "5ab1e1",
    title: "Epic Mountain Biking Trails",
    channel: "Adventure Sports",
    channelId: "gzl4o",
    thumbnail:
      "https://images.unsplash.com/photo-1629056528325-f328b5f27ae7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 35839,
    createdAt: randomDate(),
    duration: "13:40",
  },
  {
    id: "eb83a2",
    title: "Mastering the Art of French Cooking",
    channel: "Gourmet Kitchen",
    channelId: "ciwoy",
    thumbnail:
      "https://images.unsplash.com/photo-1596189181426-7f63a1737f0d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 30685,
    createdAt: randomDate(),
    duration: "16:25",
  },
  {
    id: "5aecbc",
    title: "Top 10 Sci-Fi Movies of All Time",
    channel: "Movie Buff",
    channelId: "nfncc",
    thumbnail:
      "https://images.unsplash.com/photo-1522448023466-b1c85da46df0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 20402,
    createdAt: randomDate(),
    duration: "18:00",
  },
  {
    id: "64824d",
    title: "Learn Spanish in 30 Minutes",
    channel: "Language Lab",
    channelId: "9lyf2",
    thumbnail:
      "https://plus.unsplash.com/premium_vector-1729646907510-18b893ea0584?q=80&w=1496&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 42545,
    createdAt: randomDate(),
    duration: "30:00",
  },
  {
    id: "134416",
    title: "Top 5 Fashion Trends for 2025",
    channel: "Style Central",
    channelId: "6sogo",
    thumbnail:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 42728,
    createdAt: randomDate(),
    duration: "7:45",
  },
  {
    id: "c241ca",
    title: "Understanding Quantum Physics",
    channel: "Science Simplified",
    channelId: "orxmn",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1689801528286-0ae8cf1c7058?q=80&w=1678&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 47933,
    createdAt: randomDate(),
    duration: "20:30",
  },
  {
    id: "21ed66",
    title: "Relaxing Piano Music for Sleep",
    channel: "Peaceful Melodies",
    channelId: "hk4hn",
    thumbnail:
      "https://images.unsplash.com/photo-1476287803067-f714aa78eaa7?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 22535,
    createdAt: randomDate(),
    duration: "60:00",
  },
  {
    id: "271007",
    title: "Top 10 Gaming Laptops in 2025",
    channel: "Gadget Guru",
    channelId: "zpcb3",
    thumbnail:
      "https://images.unsplash.com/photo-1640955014216-75201056c829?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 26475,
    createdAt: randomDate(),
    duration: "12:00",
  },
  {
    id: "bbc1ec",
    title: "History of Ancient Civilizations",
    channel: "History Hub",
    channelId: "pyzje",
    thumbnail:
      "https://images.unsplash.com/photo-1650696347800-6dcffd62153e?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 41862,
    createdAt: randomDate(),
    duration: "22:15",
  },
  {
    id: "3b2fd9",
    title: "Beginner's Guide to Photography",
    channel: "Shutterbug",
    channelId: "2xyoz",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1663957821802-4969fe6a0347?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 21573,
    createdAt: randomDate(),
    duration: "14:00",
  },
  {
    id: "d769a8",
    title: "Top 5 Comedy Shows to Watch",
    channel: "Laugh Out Loud",
    channelId: "gmb2p",
    thumbnail:
      "https://images.unsplash.com/photo-1584695039819-4164ec9af8f7?q=80&w=1529&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    views: 19898,
    createdAt: randomDate(),
    duration: "10:00",
  },
];

export default videos;
