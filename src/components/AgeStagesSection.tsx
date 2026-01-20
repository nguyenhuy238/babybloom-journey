import { motion } from "framer-motion";

const stages = [
  {
    age: "Mang thai",
    months: "9 tháng",
    description: "Gắn kết thai nhi qua âm thanh, cảm xúc và thai giáo",
    icon: "🤰",
    activities: ["Nghe nhạc cổ điển", "Massage thai", "Trò chuyện với bé"],
  },
  {
    age: "0-6 tháng",
    months: "Sơ sinh",
    description: "Phát triển giác quan và xây dựng gắn kết an toàn",
    icon: "👶",
    activities: ["Tummy time", "Ánh mắt giao tiếp", "Xúc giác nhẹ nhàng"],
  },
  {
    age: "6-12 tháng",
    months: "Khám phá",
    description: "Vận động thô, khám phá và bắt đầu ngôn ngữ",
    icon: "🧒",
    activities: ["Bò vượt chướng ngại", "Peek-a-boo", "Nhận biết đồ vật"],
  },
  {
    age: "1-2 tuổi",
    months: "Ngôn ngữ",
    description: "Phát triển ngôn ngữ mạnh mẽ và bắt đầu tự lập",
    icon: "🧒",
    activities: ["Kể chuyện tranh", "Hát và vỗ tay", "Chơi giả vờ"],
  },
  {
    age: "2-3 tuổi",
    months: "Logic",
    description: "Tư duy logic, cảm xúc và kỹ năng tự lập hoàn thiện",
    icon: "🧒",
    activities: ["Phân loại đồ vật", "Giải quyết vấn đề", "Tự mặc quần áo"],
  },
];

const AgeStagesSection = () => {
  return (
    <section className="section-padding bg-cream-dark/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold mb-4 block">Lộ trình theo độ tuổi</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Mỗi giai đoạn, một hành trình riêng
          </h2>
          <p className="text-lg text-muted-foreground">
            Não bộ trẻ phát triển theo từng giai đoạn nhạy cảm. BabyFirst giúp bạn 
            không bỏ lỡ bất kỳ cột mốc quan trọng nào.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-sage via-terracotta to-peach rounded-full transform -translate-y-1/2" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.age}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Card */}
                <div className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-card transition-all group">
                  {/* Icon */}
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {stage.icon}
                  </div>

                  {/* Age */}
                  <h3 className="font-bold text-lg mb-1">{stage.age}</h3>
                  <p className="text-xs text-primary font-medium mb-2">{stage.months}</p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {stage.description}
                  </p>

                  {/* Activities */}
                  <div className="space-y-1">
                    {stage.activities.map((activity) => (
                      <div
                        key={activity}
                        className="text-xs flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connection dot */}
                <div className="hidden lg:block absolute left-1/2 -bottom-3 transform -translate-x-1/2 translate-y-full w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgeStagesSection;
