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
    description: "Hướng dẫn bố mẹ cách chơi lăn bóng với bé để phát triển kỹ năng vận động thô và phối hợp tay-mắt.",
    steps: ["Chọn bóng mềm, kích thước vừa tay bé", "Ngồi đối diện với bé, cách khoảng 1m", "Lăn nhẹ bóng về phía bé", "Khuyến khích bé đẩy bóng lại"],
    tips: "Nên chơi trên sàn phẳng, êm. Thời gian chơi 5-10 phút mỗi lần.",
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
    description: "Cách kể chuyện tương tác giúp bé phát triển ngôn ngữ, trí tưởng tượng và khả năng tập trung.",
    steps: ["Chọn sách tranh có hình minh họa rõ ràng", "Đọc với giọng điệu sinh động", "Dừng lại hỏi bé về nhân vật", "Để bé lật trang và chỉ vào hình"],
    tips: "Đọc cùng một câu chuyện nhiều lần giúp bé ghi nhớ và dự đoán nội dung.",
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
    description: "Kỹ thuật massage nhẹ nhàng giúp bé thư giãn, ngủ ngon và tăng cường gắn kết với bố mẹ.",
    steps: ["Chuẩn bị dầu massage dành cho bé", "Bắt đầu từ chân, massage nhẹ nhàng", "Di chuyển lên bụng, ngực, tay", "Kết thúc với động tác vuốt nhẹ mặt"],
    tips: "Massage 10-15 phút trước giờ ngủ sẽ giúp bé thư giãn hơn.",
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
    description: "Giới thiệu các đồ chơi Montessori kích thích giác quan và cách sử dụng hiệu quả.",
    steps: ["Chuẩn bị 3-4 loại đồ chơi khác chất liệu", "Đưa từng món cho bé khám phá", "Mô tả cảm giác: 'Mềm', 'Cứng', 'Lạnh'", "Cho bé thời gian tự do khám phá"],
    tips: "Không cần đồ chơi đắt tiền, đồ vật an toàn trong nhà cũng rất phù hợp.",
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
    description: "Phương pháp Montessori giúp bé học cách tự ăn, phát triển sự độc lập và kỹ năng vận động tinh.",
    steps: ["Chuẩn bị ghế ăn phù hợp chiều cao", "Dùng bát và thìa kích thước bé", "Để bé tự cầm thìa và xúc", "Kiên nhẫn khi bé làm đổ"],
    tips: "Bắt đầu với thức ăn dễ xúc như cháo đặc hoặc khoai tây nghiền.",
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
    description: "Hướng dẫn tummy time đúng cách để bé phát triển cơ cổ, lưng và chuẩn bị cho việc lẫy, bò.",
    steps: ["Đặt bé nằm sấp trên thảm mềm", "Đặt đồ chơi trước mặt để thu hút", "Bắt đầu với 1-2 phút", "Tăng dần thời gian mỗi ngày"],
    tips: "Thực hiện sau khi bé thức dậy, tránh sau bữa ăn.",
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
    description: "Cách dạy bé nhận biết màu sắc cơ bản thông qua đồ vật và trò chơi hàng ngày.",
    steps: ["Bắt đầu với 2 màu đối lập (đỏ-xanh)", "Chọn đồ vật cùng màu gom lại", "Gọi tên màu nhiều lần trong ngày", "Chơi trò 'Tìm màu...'"],
    tips: "Kiên nhẫn, bé cần thời gian để ghi nhớ và phân biệt màu sắc.",
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
    description: "Cách hiểu và phản hồi đúng khi bé khóc, giúp xây dựng sự tin tưởng và gắn kết an toàn.",
    steps: ["Bình tĩnh khi bé khóc", "Kiểm tra các nhu cầu cơ bản", "Ôm bé và nói chuyện nhẹ nhàng", "Quan sát ngôn ngữ cơ thể của bé"],
    tips: "Phản hồi nhanh và nhất quán giúp bé cảm thấy an toàn.",
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
            className="bg-card rounded-2xl overflow-hidden w-full max-w-lg max-h-[90vh] overflow-y-auto"
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
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedVideo.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              </div>

              <p className="text-muted-foreground text-sm">
                {selectedVideo.description}
              </p>

              {/* Steps */}
              {selectedVideo.steps && (
                <div>
                  <h4 className="font-semibold mb-3">Các bước thực hiện</h4>
                  <ol className="space-y-2">
                    {selectedVideo.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Tips */}
              {selectedVideo.tips && (
                <div className="bg-sunny/10 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    💡 Mẹo hay
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedVideo.tips}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
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
