import { motion } from "framer-motion";

const pillars = [
  {
    emoji: "🧠",
    title: "Trí tuệ (IQ)",
    subtitle: "Cognitive Development",
    description: "Nhận thức, ngôn ngữ, tư duy logic, trí nhớ và khả năng tập trung.",
    examples: ["Phân biệt màu sắc, hình dạng", "Kể chuyện tương tác", "Nhận biết đồ vật"],
    color: "from-terracotta to-terracotta-dark",
    bgColor: "bg-terracotta/10",
  },
  {
    emoji: "💝",
    title: "Cảm xúc - Xã hội (EQ)",
    subtitle: "Emotional Intelligence",
    description: "Nhận diện cảm xúc, gắn kết bố mẹ - con, tự tin và an toàn cảm xúc.",
    examples: ["Phản hồi khi trẻ khóc", "Trò chơi chạm - ôm - nhìn", "Giao tiếp bằng ánh mắt"],
    color: "from-sage to-sage-dark",
    bgColor: "bg-sage/20",
  },
  {
    emoji: "🏃",
    title: "Thể chất",
    subtitle: "Physical Development",
    description: "Vận động thô (lẫy, bò, đi), vận động tinh (cầm, nắm, xếp), phối hợp tay-mắt.",
    examples: ["Tummy time", "Trò chơi lăn bóng", "Xếp khối gỗ"],
    color: "from-peach to-accent",
    bgColor: "bg-peach/30",
  },
  {
    emoji: "👀",
    title: "Giác quan",
    subtitle: "Sensory Development",
    description: "Phát triển 5 giác quan: thị giác, thính giác, xúc giác, vị giác, khứu giác.",
    examples: ["Hộp giác quan", "Âm nhạc thai giáo", "Khám phá kết cấu"],
    color: "from-lavender to-lavender",
    bgColor: "bg-lavender/30",
  },
  {
    emoji: "🌱",
    title: "Nhân cách - Tự lập",
    subtitle: "Independence & Character",
    description: "Kỷ luật tự giác, khả năng tự phục vụ và tính kiên nhẫn theo Montessori.",
    examples: ["Tự ăn", "Dọn dẹp đồ chơi", "Chờ đợi lượt"],
    color: "from-sky to-sky",
    bgColor: "bg-sky/30",
  },
];

const PillarsSection = () => {
  return (
    <section id="pillars" className="section-padding">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold mb-4 block">Phương pháp Montessori</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            5 trụ cột phát triển toàn diện
          </h2>
          <p className="text-lg text-muted-foreground">
            Mỗi hoạt động được thiết kế theo khoa học, nhắm đúng vào từng lĩnh vực phát triển 
            quan trọng của trẻ từ 0-3 tuổi.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl p-6 lg:p-8 ${pillar.bgColor} hover-lift`}
            >
              {/* Emoji */}
              <div className="text-5xl mb-4">{pillar.emoji}</div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold mb-1">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pillar.subtitle}</p>
                <p className="text-foreground/80 mb-6">{pillar.description}</p>

                {/* Examples */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">Ví dụ:</p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.examples.map((example) => (
                      <span
                        key={example}
                        className="text-xs bg-background/60 px-3 py-1.5 rounded-full"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${pillar.color} opacity-10 rounded-bl-full`} />
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-gradient-to-br from-primary to-terracotta-dark text-primary-foreground flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Khám phá lộ trình phù hợp với bé
            </h3>
            <p className="mb-6 opacity-90">
              Chỉ cần nhập ngày sinh của bé, hệ thống sẽ tạo lộ trình cá nhân hóa ngay lập tức.
            </p>
            <button className="bg-background text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-background/90 transition-colors self-start">
              Bắt đầu ngay →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
