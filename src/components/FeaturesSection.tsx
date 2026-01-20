import { motion } from "framer-motion";
import { BookOpen, Target, BarChart3, Users, Sparkles, Calendar } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Lộ trình theo độ tuổi",
    description: "Nội dung được cá nhân hóa theo từng giai đoạn phát triển của bé, từ thai kỳ đến 3 tuổi.",
    color: "bg-terracotta/10 text-terracotta",
  },
  {
    icon: BookOpen,
    title: "Video hướng dẫn chi tiết",
    description: "Hướng dẫn từng bước cách chơi cùng con với video ngắn 1-3 phút, dễ làm theo tại nhà.",
    color: "bg-sage/20 text-sage-dark",
  },
  {
    icon: Target,
    title: "Cá nhân hóa mục tiêu",
    description: "Chọn ưu tiên phát triển IQ, EQ, thể chất hoặc giác quan - hệ thống sẽ gợi ý phù hợp.",
    color: "bg-peach/30 text-accent-foreground",
  },
  {
    icon: BarChart3,
    title: "Theo dõi tiến trình",
    description: "Checklist kỹ năng theo Montessori, giúp bố mẹ biết bé đã làm được gì và cần hỗ trợ thêm.",
    color: "bg-lavender/30 text-foreground",
  },
  {
    icon: Users,
    title: "Kết nối chuyên gia",
    description: "Video call hoặc chat với chuyên gia giáo dục sớm, hỗ trợ phụ huynh mọi lúc mọi nơi.",
    color: "bg-sky/30 text-foreground",
  },
  {
    icon: Sparkles,
    title: "Gợi ý đồ chơi Montessori",
    description: "Đề xuất đồ chơi phù hợp với giai đoạn phát triển, tích hợp mua sắm tiện lợi.",
    color: "bg-sunny/30 text-foreground",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-cream-dark/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold mb-4 block">Tính năng</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Mọi thứ bố mẹ cần trong một ứng dụng
          </h2>
          <p className="text-lg text-muted-foreground">
            BabyFirst kết hợp khoa học não bộ, phương pháp Montessori và công nghệ AI 
            để mang đến trải nghiệm giáo dục sớm tốt nhất cho gia đình bạn.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card p-6 lg:p-8 rounded-2xl shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
