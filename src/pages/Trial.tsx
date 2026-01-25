import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Target, Lock, ChevronRight, Star, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface TrialLesson {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  description: string;
  isFree: boolean;
}

const developmentGoals = [
  { id: "motor", label: "Vận động", emoji: "🏃" },
  { id: "cognitive", label: "Trí tuệ", emoji: "🧠" },
  { id: "emotional", label: "Cảm xúc - Xã hội", emoji: "💝" },
  { id: "art", label: "Nghệ thuật", emoji: "🎨" },
  { id: "language", label: "Ngôn ngữ", emoji: "💬" },
];

const trialLessons: TrialLesson[] = [
  {
    id: "1",
    title: "Bài tập vận động thô cho bé 6 tháng",
    category: "Vận động",
    duration: "5 phút",
    thumbnail: "🏃",
    description: "Giúp bé phát triển cơ bắp và khả năng vận động lớn",
    isFree: true,
  },
  {
    id: "2",
    title: "Phát triển gắn kết tình cảm mẹ-bé",
    category: "Cảm xúc - Xã hội",
    duration: "4 phút",
    thumbnail: "💝",
    description: "Tăng cường sự gắn bó và tin tưởng giữa mẹ và bé",
    isFree: true,
  },
  {
    id: "3",
    title: "Vẽ tự do với màu nước an toàn",
    category: "Nghệ thuật",
    duration: "6 phút",
    thumbnail: "🎨",
    description: "Khám phá khả năng sáng tạo và cảm nhận màu sắc",
    isFree: true,
  },
  {
    id: "4",
    title: "Đọc thơ và vần điệu cho bé",
    category: "Ngôn ngữ",
    duration: "3 phút",
    thumbnail: "📖",
    description: "Phát triển khả năng ngôn ngữ qua âm thanh và nhịp điệu",
    isFree: false,
  },
  {
    id: "5",
    title: "Thai giáo âm nhạc - Tuần 20-28",
    category: "Thai giáo",
    duration: "10 phút",
    thumbnail: "🎵",
    description: "Kích thích phát triển não bộ thai nhi qua âm nhạc",
    isFree: false,
  },
  {
    id: "6",
    title: "Trò chơi phát triển trí não 12 tháng",
    category: "Trí tuệ",
    duration: "5 phút",
    thumbnail: "🧠",
    description: "Các hoạt động kích thích tư duy và nhận thức",
    isFree: false,
  },
];

const Trial = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<TrialLesson | null>(null);
  const [userData, setUserData] = useState({
    parentName: "",
    babyName: "",
    babyMonths: "",
    goals: [] as string[],
  });
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    if (userData.goals.includes(goalId)) {
      setUserData({ ...userData, goals: userData.goals.filter((g) => g !== goalId) });
    } else if (userData.goals.length < 3) {
      setUserData({ ...userData, goals: [...userData.goals, goalId] });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.parentName && userData.babyName && userData.babyMonths && userData.goals.length > 0) {
      setIsLoggedIn(true);
      setShowRegister(false);
    }
  };

  const handleWatchVideo = (lesson: TrialLesson) => {
    if (!lesson.isFree && !isLoggedIn) {
      setShowRegister(true);
      return;
    }
    setSelectedVideo(lesson);
  };

  const markAsComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const toggleFavorite = (lessonId: string) => {
    if (favorites.includes(lessonId)) {
      setFavorites(favorites.filter((f) => f !== lessonId));
    } else {
      setFavorites([...favorites, lessonId]);
    }
  };

  const filteredLessons = isLoggedIn
    ? trialLessons.filter((lesson) => {
        const categoryToGoal: Record<string, string> = {
          "Vận động": "motor",
          "Trí tuệ": "cognitive",
          "Cảm xúc - Xã hội": "emotional",
          "Nghệ thuật": "art",
          "Ngôn ngữ": "language",
        };
        const goalId = categoryToGoal[lesson.category];
        return !goalId || userData.goals.includes(goalId);
      })
    : trialLessons;

  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        {/* Header Section */}
        <section className="py-12 bg-gradient-to-br from-sage/20 to-peach/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2">
                  {isLoggedIn ? `Xin chào, ${userData.parentName}! 👋` : "Khóa học thử miễn phí"}
                </h1>
                <p className="text-muted-foreground">
                  {isLoggedIn
                    ? `Bé ${userData.babyName} - ${userData.babyMonths} tháng tuổi`
                    : today}
                </p>
              </div>
              {!isLoggedIn && (
                <Button onClick={() => setShowRegister(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Đăng ký cá nhân hóa
                </Button>
              )}
            </div>

            {isLoggedIn && (
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground mr-2">Mục tiêu:</span>
                {userData.goals.map((goalId) => {
                  const goal = developmentGoals.find((g) => g.id === goalId);
                  return goal ? (
                    <Badge key={goalId} variant="secondary">
                      {goal.emoji} {goal.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </section>

        {/* Stats for logged in users */}
        {isLoggedIn && (
          <section className="py-6 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-primary">{completedLessons.length}</p>
                  <p className="text-sm text-muted-foreground">Bài đã học</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-terracotta">{favorites.length}</p>
                  <p className="text-sm text-muted-foreground">Yêu thích</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Lessons Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-bold">
                {isLoggedIn ? "Bài học gợi ý cho bé" : "Danh sách bài học thử"}
              </h2>
              {!isLoggedIn && (
                <p className="text-sm text-muted-foreground">
                  Xem miễn phí 3 bài · Đăng ký để mở khóa tất cả
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video bg-muted flex items-center justify-center">
                    <span className="text-6xl">{lesson.thumbnail}</span>
                    {!lesson.isFree && !isLoggedIn && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    {completedLessons.includes(lesson.id) && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-sage rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-primary-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {lesson.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>

                    <div className="flex items-center gap-2">
                      <Button
                        className="flex-1"
                        variant={lesson.isFree || isLoggedIn ? "default" : "secondary"}
                        onClick={() => handleWatchVideo(lesson)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {lesson.isFree || isLoggedIn ? "Xem ngay" : "Mở khóa"}
                      </Button>
                      {isLoggedIn && (
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => toggleFavorite(lesson.id)}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              favorites.includes(lesson.id)
                                ? "fill-yellow-400 text-yellow-400"
                                : ""
                            }`}
                          />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA for upgrade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-br from-primary/10 to-sage/20 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-heading font-bold mb-4">
                Muốn truy cập đầy đủ 500+ video?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Nâng cấp để có lộ trình cá nhân hóa hoàn chỉnh, theo dõi tiến trình, 
                và nhận gợi ý hoạt động hàng ngày cho bé.
              </p>
              <Button size="lg" asChild>
                <a href="/courses">
                  Xem các khóa học
                  <ChevronRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Register Dialog */}
      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Đăng ký cá nhân hóa</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Tên mẹ/bố</label>
              <Input
                value={userData.parentName}
                onChange={(e) => setUserData({ ...userData, parentName: e.target.value })}
                placeholder="Nhập tên của bạn"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Tên bé</label>
              <Input
                value={userData.babyName}
                onChange={(e) => setUserData({ ...userData, babyName: e.target.value })}
                placeholder="Nhập tên bé"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Bé bao nhiêu tháng?</label>
              <Input
                type="number"
                min="0"
                max="36"
                value={userData.babyMonths}
                onChange={(e) => setUserData({ ...userData, babyMonths: e.target.value })}
                placeholder="Số tháng tuổi"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Mong muốn phát triển (chọn tối đa 3)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {developmentGoals.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-3 rounded-lg border text-left text-sm transition-all ${
                      userData.goals.includes(goal.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="mr-2">{goal.emoji}</span>
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={userData.goals.length === 0}>
              Bắt đầu học
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <span className="text-8xl block mb-4">{selectedVideo?.thumbnail}</span>
              <p className="text-muted-foreground">Video demo - Nội dung sẽ được cập nhật</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              className="flex-1"
              onClick={() => {
                if (selectedVideo) {
                  markAsComplete(selectedVideo.id);
                  setSelectedVideo(null);
                }
              }}
            >
              <Check className="w-4 h-4 mr-2" />
              Đánh dấu hoàn thành
            </Button>
            {isLoggedIn && selectedVideo && (
              <Button variant="outline" onClick={() => toggleFavorite(selectedVideo.id)}>
                <Star
                  className={`w-4 h-4 mr-2 ${
                    favorites.includes(selectedVideo.id) ? "fill-yellow-400 text-yellow-400" : ""
                  }`}
                />
                Yêu thích
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Trial;
