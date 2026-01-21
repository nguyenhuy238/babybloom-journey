import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, BookOpen, BarChart3, User, Play, Clock, 
  ChevronRight, Star, Calendar, CheckCircle2, Circle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoLibrary from "./VideoLibrary";
import ProgressTracker from "./ProgressTracker";

interface AppDashboardProps {
  babyData: {
    name: string;
    birthDate: string;
    goals: string[];
  };
}

const todayActivities = [
  {
    id: 1,
    title: "Trò chơi lăn bóng",
    category: "Vận động",
    duration: "5 phút",
    emoji: "🏃",
    color: "bg-peach/30",
    completed: false,
  },
  {
    id: 2,
    title: "Đọc sách cùng bé",
    category: "Ngôn ngữ",
    duration: "10 phút",
    emoji: "📚",
    color: "bg-sage/30",
    completed: true,
  },
  {
    id: 3,
    title: "Khám phá hộp giác quan",
    category: "Giác quan",
    duration: "8 phút",
    emoji: "👀",
    color: "bg-lavender/30",
    completed: false,
  },
];

const milestones = [
  { label: "Nhận ra giọng mẹ", completed: true },
  { label: "Nắm đồ vật nhỏ", completed: true },
  { label: "Lật từ ngửa sang sấp", completed: false },
  { label: "Bập bẹ nói", completed: false },
];

const AppDashboard = ({ babyData }: AppDashboardProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const [activities, setActivities] = useState(todayActivities);

  // Calculate baby age in months
  const birthDate = new Date(babyData.birthDate);
  const today = new Date();
  const ageMonths = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30));

  const toggleActivity = (id: number) => {
    setActivities(prev => 
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    );
  };

  const completedCount = activities.filter(a => a.completed).length;

  const renderContent = () => {
    switch (activeTab) {
      case "library":
        return <VideoLibrary />;
      case "progress":
        return <ProgressTracker babyName={babyData.name} ageMonths={ageMonths} />;
      case "profile":
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-terracotta rounded-full flex items-center justify-center text-5xl mb-4">
                👶
              </div>
              <h2 className="text-2xl font-bold">{babyData.name}</h2>
              <p className="text-muted-foreground">{ageMonths} tháng tuổi</p>
            </motion.div>

            {/* Goals */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <h3 className="font-semibold mb-3">Mục tiêu phát triển</h3>
              <div className="flex flex-wrap gap-2">
                {babyData.goals.map(goal => {
                  const goalInfo: Record<string, { emoji: string; label: string }> = {
                    iq: { emoji: "🧠", label: "Trí tuệ" },
                    eq: { emoji: "💝", label: "Cảm xúc" },
                    physical: { emoji: "🏃", label: "Thể chất" },
                    sensory: { emoji: "👀", label: "Giác quan" },
                    independence: { emoji: "🌱", label: "Tự lập" },
                  };
                  return (
                    <span key={goal} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                      {goalInfo[goal]?.emoji} {goalInfo[goal]?.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <div className="text-3xl font-bold text-sage-dark">28</div>
                <div className="text-sm text-muted-foreground">Hoạt động hoàn thành</div>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Ngày liên tiếp</div>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <div className="text-3xl font-bold text-sunny">15</div>
                <div className="text-sm text-muted-foreground">Video đã xem</div>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <div className="text-3xl font-bold text-terracotta">8</div>
                <div className="text-sm text-muted-foreground">Cột mốc đạt được</div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <button className="w-full p-4 text-left hover:bg-muted/50 transition-colors border-b border-border flex items-center justify-between">
                <span>Chỉnh sửa hồ sơ bé</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full p-4 text-left hover:bg-muted/50 transition-colors border-b border-border flex items-center justify-between">
                <span>Cài đặt thông báo</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full p-4 text-left hover:bg-muted/50 transition-colors border-b border-border flex items-center justify-between">
                <span>Nâng cấp Premium</span>
                <span className="bg-sunny text-xs px-2 py-0.5 rounded-full font-medium">HOT</span>
              </button>
              <button className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-center justify-between">
                <span>Hỗ trợ & Phản hồi</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Baby Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary to-terracotta-dark p-6 rounded-2xl text-primary-foreground"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center text-3xl">
                  👶
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{babyData.name}</h2>
                  <p className="opacity-90">
                    {ageMonths} tháng tuổi
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-75">Hôm nay</p>
                  <p className="font-bold">{completedCount}/{activities.length} hoạt động</p>
                </div>
              </div>
            </motion.div>

            {/* Today's Activities */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Hoạt động hôm nay</h3>
                <button className="text-primary text-sm font-medium flex items-center gap-1">
                  Xem tất cả <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border transition-all ${
                      activity.completed 
                        ? "bg-muted/50 border-border" 
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleActivity(activity.id)}
                        className="flex-shrink-0"
                      >
                        {activity.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-sage-dark" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground" />
                        )}
                      </button>
                      
                      <div className={`w-12 h-12 ${activity.color} rounded-xl flex items-center justify-center text-2xl`}>
                        {activity.emoji}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`font-semibold ${activity.completed ? "line-through text-muted-foreground" : ""}`}>
                          {activity.title}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{activity.category}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.duration}
                          </span>
                        </div>
                      </div>

                      {!activity.completed && (
                        <Button size="sm" variant="ghost" className="gap-1">
                          <Play className="w-4 h-4" />
                          Bắt đầu
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Milestones */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Cột mốc phát triển</h3>
                <span className="text-sm text-muted-foreground">
                  {milestones.filter(m => m.completed).length}/{milestones.length} đạt được
                </span>
              </div>

              <div className="bg-card rounded-xl p-4 border border-border">
                <div className="grid grid-cols-2 gap-3">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-3 rounded-lg ${
                        milestone.completed ? "bg-sage/20" : "bg-muted/50"
                      }`}
                    >
                      {milestone.completed ? (
                        <Star className="w-4 h-4 text-sunny fill-sunny" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${
                        milestone.completed ? "font-medium" : "text-muted-foreground"
                      }`}>
                        {milestone.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Stats */}
            <section className="grid grid-cols-3 gap-3">
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground">Ngày liên tiếp</div>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <div className="text-2xl font-bold text-sage-dark">28</div>
                <div className="text-xs text-muted-foreground">Hoạt động</div>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border text-center">
                <div className="text-2xl font-bold text-accent">4h</div>
                <div className="text-xs text-muted-foreground">Thời gian chơi</div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">B</span>
            </div>
            <span className="font-heading font-bold text-lg">
              Baby<span className="text-primary">First</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 inline mr-1" />
              {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2">
        <div className="flex justify-around max-w-md mx-auto">
          {[
            { id: "home", icon: Home, label: "Trang chủ" },
            { id: "library", icon: BookOpen, label: "Thư viện" },
            { id: "progress", icon: BarChart3, label: "Tiến trình" },
            { id: "profile", icon: User, label: "Tài khoản" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors min-w-[64px] ${
                activeTab === tab.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppDashboard;
