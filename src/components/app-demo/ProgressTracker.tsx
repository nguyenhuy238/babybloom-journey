import { motion } from "framer-motion";
import { Star, TrendingUp, Award, Calendar, ChevronRight, Check } from "lucide-react";

interface ProgressTrackerProps {
  babyName: string;
  ageMonths: number;
}

const developmentAreas = [
  {
    id: "cognitive",
    label: "Nhận thức",
    emoji: "🧠",
    progress: 75,
    color: "bg-terracotta",
    skills: [
      { name: "Nhận ra giọng mẹ", done: true },
      { name: "Theo dõi đồ vật di chuyển", done: true },
      { name: "Nhận biết màu cơ bản", done: true },
      { name: "Phân biệt hình dạng", done: false },
    ],
  },
  {
    id: "language",
    label: "Ngôn ngữ",
    emoji: "💬",
    progress: 60,
    color: "bg-sage",
    skills: [
      { name: "Phản hồi khi gọi tên", done: true },
      { name: "Bập bẹ âm thanh", done: true },
      { name: "Nói từ đơn", done: false },
      { name: "Nói câu 2 từ", done: false },
    ],
  },
  {
    id: "motor",
    label: "Vận động",
    emoji: "🏃",
    progress: 80,
    color: "bg-peach",
    skills: [
      { name: "Giữ đầu vững", done: true },
      { name: "Lật từ ngửa sang sấp", done: true },
      { name: "Ngồi không cần đỡ", done: true },
      { name: "Bò", done: true },
      { name: "Đứng vịn", done: false },
    ],
  },
  {
    id: "social",
    label: "Cảm xúc - Xã hội",
    emoji: "💝",
    progress: 70,
    color: "bg-lavender",
    skills: [
      { name: "Mỉm cười xã hội", done: true },
      { name: "Nhận ra người lạ", done: true },
      { name: "Chơi peek-a-boo", done: true },
      { name: "Thể hiện muốn/không muốn", done: false },
    ],
  },
];

const weeklyStats = [
  { day: "T2", activities: 3, target: 3 },
  { day: "T3", activities: 2, target: 3 },
  { day: "T4", activities: 3, target: 3 },
  { day: "T5", activities: 1, target: 3 },
  { day: "T6", activities: 3, target: 3 },
  { day: "T7", activities: 2, target: 3 },
  { day: "CN", activities: 0, target: 3 },
];

const achievements = [
  { icon: "🔥", label: "7 ngày liên tiếp", earned: true },
  { icon: "📚", label: "20 video hoàn thành", earned: true },
  { icon: "🌟", label: "Siêu sao vận động", earned: true },
  { icon: "🎯", label: "Hoàn thành tuần", earned: false },
  { icon: "👑", label: "Master tháng 8", earned: false },
];

const ProgressTracker = ({ babyName, ageMonths }: ProgressTrackerProps) => {
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-sage to-sage-dark p-6 rounded-2xl text-primary-foreground"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Tiến trình của {babyName}</h2>
            <p className="opacity-90">{ageMonths} tháng tuổi</p>
          </div>
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-3xl font-bold">72%</p>
            <p className="text-sm opacity-75">Mức phát triển</p>
          </div>
          <div className="h-12 w-px bg-primary-foreground/20" />
          <div>
            <p className="text-3xl font-bold">15</p>
            <p className="text-sm opacity-75">Kỹ năng đạt được</p>
          </div>
          <div className="h-12 w-px bg-primary-foreground/20" />
          <div>
            <p className="text-3xl font-bold">28</p>
            <p className="text-sm opacity-75">Hoạt động</p>
          </div>
        </div>
      </motion.div>

      {/* Weekly Activity */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Hoạt động tuần này</h3>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Tuần 32
          </span>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex justify-between items-end gap-2">
            {weeklyStats.map((day, index) => (
              <div key={day.day} className="flex-1 text-center">
                <div className="relative h-24 bg-muted rounded-lg overflow-hidden mb-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.activities / day.target) * 100}%` }}
                    transition={{ delay: index * 0.1 }}
                    className={`absolute bottom-0 left-0 right-0 ${
                      day.activities >= day.target ? "bg-sage" : "bg-primary/60"
                    } rounded-lg`}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{day.day}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Areas */}
      <section>
        <h3 className="font-bold text-lg mb-4">Lĩnh vực phát triển</h3>
        <div className="space-y-3">
          {developmentAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 border border-border"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 ${area.color}/20 rounded-xl flex items-center justify-center text-2xl`}>
                  {area.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">{area.label}</p>
                    <span className="text-sm font-medium text-primary">{area.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${area.progress}%` }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className={`h-full ${area.color} rounded-full`}
                    />
                  </div>
                </div>
              </div>

              {/* Skills checklist */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border">
                {area.skills.map((skill, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-sm ${
                      skill.done ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {skill.done ? (
                      <Check className="w-4 h-4 text-sage-dark" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-muted-foreground" />
                    )}
                    <span className={skill.done ? "" : ""}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Thành tích</h3>
          <button className="text-primary text-sm font-medium flex items-center gap-1">
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex-shrink-0 w-24 p-4 rounded-xl text-center ${
                achievement.earned
                  ? "bg-sunny/20 border-2 border-sunny"
                  : "bg-muted/50 border border-border"
              }`}
            >
              <div className={`text-3xl mb-2 ${achievement.earned ? "" : "grayscale opacity-50"}`}>
                {achievement.icon}
              </div>
              <p className={`text-xs font-medium ${
                achievement.earned ? "text-foreground" : "text-muted-foreground"
              }`}>
                {achievement.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgressTracker;
