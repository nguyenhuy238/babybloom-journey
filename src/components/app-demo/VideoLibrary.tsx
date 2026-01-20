import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Filter, Search, X, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "Tất cả", emoji: "✨" },
  { id: "iq", label: "Trí tuệ", emoji: "🧠" },
  { id: "eq", label: "Cảm xúc", emoji: "💝" },
  { id: "physical", label: "Thể chất", emoji: "🏃" },
  { id: "sensory", label: "Giác quan", emoji: "👀" },
  { id: "independence", label: "Tự lập", emoji: "🌱" },
];

const videos = [
  {
    id: 1,
    title: "Trò chơi lăn bóng phát triển vận động",
    category: "physical",
    duration: "3:24",
    age: "6-12 tháng",
    thumbnail: "🏀",
    color: "from-peach to-terracotta",
    rating: 4.8,
    views: "12.5K",
    isPremium: false,
  },
  {
    id: 2,
    title: "Kể chuyện tương tác - Chú thỏ con",
    category: "iq",
    duration: "5:12",
    age: "1-2 tuổi",
    thumbnail: "🐰",
    color: "from-terracotta to-terracotta-dark",
    rating: 4.9,
    views: "28.3K",
    isPremium: false,
  },
  {
    id: 3,
    title: "Massage và gắn kết với bé sơ sinh",
    category: "eq",
    duration: "4:45",
    age: "0-6 tháng",
    thumbnail: "🤱",
    color: "from-sage to-sage-dark",
    rating: 4.7,
    views: "18.9K",
    isPremium: true,
  },
  {
    id: 4,
    title: "Hộp giác quan - Khám phá kết cấu",
    category: "sensory",
    duration: "3:58",
    age: "6-12 tháng",
    thumbnail: "📦",
    color: "from-lavender to-lavender",
    rating: 4.6,
    views: "9.2K",
    isPremium: false,
  },
  {
    id: 5,
    title: "Dạy bé tự ăn theo Montessori",
    category: "independence",
    duration: "6:30",
    age: "1-2 tuổi",
    thumbnail: "🥄",
    color: "from-sky to-sky",
    rating: 4.9,
    views: "45.1K",
    isPremium: true,
  },
  {
    id: 6,
    title: "Tummy Time - Bài tập cho bé sơ sinh",
    category: "physical",
    duration: "2:45",
    age: "0-6 tháng",
    thumbnail: "👶",
    color: "from-peach to-accent",
    rating: 4.8,
    views: "33.7K",
    isPremium: false,
  },
  {
    id: 7,
    title: "Nhận biết màu sắc cùng bé",
    category: "iq",
    duration: "4:10",
    age: "1-2 tuổi",
    thumbnail: "🎨",
    color: "from-sunny to-peach",
    rating: 4.5,
    views: "15.8K",
    isPremium: false,
  },
  {
    id: 8,
    title: "Phản hồi khi bé khóc - Hướng dẫn",
    category: "eq",
    duration: "5:55",
    age: "0-6 tháng",
    thumbnail: "😢",
    color: "from-sage-light to-sage",
    rating: 4.9,
    views: "52.4K",
    isPremium: true,
  },
];

const VideoLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm video..."
          className="pl-10 py-6 rounded-xl"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <span>{cat.emoji}</span>
            <span className="font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedVideo(video)}
            className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-card transition-all cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className={`relative aspect-video bg-gradient-to-br ${video.color} flex items-center justify-center`}>
              <span className="text-6xl">{video.thumbnail}</span>
              
              {/* Play overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-background/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-5 h-5 text-foreground ml-0.5" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>

              {/* Premium badge */}
              {video.isPremium && (
                <div className="absolute top-2 left-2 bg-sunny text-foreground text-xs px-2 py-1 rounded-md font-semibold">
                  Premium
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h4 className="font-semibold line-clamp-2 mb-2">{video.title}</h4>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{video.age}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-sunny fill-sunny" />
                  <span>{video.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{video.views}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/80 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl overflow-hidden w-full max-w-lg"
          >
            {/* Video Player Placeholder */}
            <div className={`aspect-video bg-gradient-to-br ${selectedVideo.color} flex items-center justify-center relative`}>
              <span className="text-8xl">{selectedVideo.thumbnail}</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-background/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-foreground ml-1" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{selectedVideo.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedVideo.duration}
                </span>
                <span>{selectedVideo.age}</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-sunny fill-sunny" />
                  {selectedVideo.rating}
                </span>
              </div>

              <p className="text-muted-foreground mb-6">
                Hướng dẫn chi tiết cách thực hiện hoạt động này cùng bé tại nhà. 
                Video được thiết kế ngắn gọn, dễ làm theo với các bước rõ ràng.
              </p>

              <div className="flex gap-3">
                <Button className="flex-1 gap-2">
                  <Play className="w-4 h-4" />
                  Xem video
                </Button>
                <Button variant="outline" onClick={() => setSelectedVideo(null)}>
                  Đóng
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VideoLibrary;
