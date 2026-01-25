import { useState } from "react";
import { motion } from "framer-motion";
import { Baby, BookOpen, Heart, Brain, Calendar, Users, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  ageRange: string;
  duration: string;
  lessons: number;
  features: string[];
  price: string;
  originalPrice?: string;
}

const courses: Course[] = [
  {
    id: "0-1",
    title: "Chương trình 0-1 tuổi",
    subtitle: "Nền tảng vàng cho bé sơ sinh",
    description: "Lộ trình toàn diện cho 12 tháng đầu đời quan trọng nhất. Hỗ trợ bé phát triển vận động, giác quan, ngôn ngữ và gắn kết tình cảm với bố mẹ.",
    icon: Baby,
    color: "bg-peach",
    ageRange: "0-12 tháng",
    duration: "12 tháng",
    lessons: 150,
    features: [
      "150+ video hướng dẫn theo tuần",
      "Lộ trình cá nhân hóa theo tháng tuổi",
      "Checklist kỹ năng phát triển",
      "Gợi ý đồ chơi Montessori phù hợp",
      "Hỗ trợ chat với chuyên gia",
    ],
    price: "1,990,000đ",
    originalPrice: "2,990,000đ",
  },
  {
    id: "1-3",
    title: "Chương trình 1-3 tuổi",
    subtitle: "Giai đoạn bùng nổ phát triển",
    description: "Phát triển toàn diện IQ, EQ và kỹ năng tự lập. Giai đoạn quan trọng hình thành tính cách và thói quen tốt cho bé.",
    icon: Brain,
    color: "bg-sage",
    ageRange: "12-36 tháng",
    duration: "24 tháng",
    lessons: 300,
    features: [
      "300+ video theo giai đoạn",
      "Phát triển ngôn ngữ & giao tiếp",
      "Kỹ năng tự lập và kỷ luật tích cực",
      "Hoạt động Montessori tại nhà",
      "Xử lý hành vi khó (ăn vạ, bướng bỉnh)",
      "Cộng đồng phụ huynh hỗ trợ",
    ],
    price: "2,990,000đ",
    originalPrice: "4,490,000đ",
  },
  {
    id: "prenatal",
    title: "Chương trình Thai giáo",
    subtitle: "Đầu tư từ trong bụng mẹ",
    description: "Kích thích phát triển não bộ và cảm xúc của thai nhi. Giúp mẹ bầu giảm stress, tạo gắn kết mẹ-con từ sớm.",
    icon: Heart,
    color: "bg-lavender",
    ageRange: "Tuần 16-40 thai kỳ",
    duration: "6 tháng",
    lessons: 80,
    features: [
      "80+ bài thai giáo âm nhạc",
      "Kỹ thuật thư giãn cho mẹ bầu",
      "Giao tiếp với thai nhi",
      "Chuẩn bị tâm lý làm mẹ",
      "Dinh dưỡng cho não bộ thai nhi",
    ],
    price: "990,000đ",
    originalPrice: "1,490,000đ",
  },
  {
    id: "behavior",
    title: "Cẩm nang xử lý hành vi",
    subtitle: "Hiểu và đồng hành cùng con",
    description: "Giải mã các hành vi khó của trẻ và hướng dẫn phương pháp kỷ luật tích cực. Không la mắng, không đánh, vẫn hiệu quả.",
    icon: BookOpen,
    color: "bg-sunny",
    ageRange: "0-3 tuổi",
    duration: "Tự học",
    lessons: 50,
    features: [
      "50 tình huống hành vi phổ biến",
      "Phương pháp kỷ luật tích cực",
      "Video mô phỏng xử lý thực tế",
      "Ebook bí kíp hành vi",
      "1 buổi tư vấn 1-1 với chuyên gia",
    ],
    price: "590,000đ",
    originalPrice: "890,000đ",
  },
];

const Courses = () => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    babyName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmitConsult = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đã gửi yêu cầu tư vấn!",
      description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.",
    });
    setShowConsultForm(false);
    setSelectedCourse(null);
    setFormData({ parentName: "", babyName: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-sage/20 to-peach/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Các khóa học <span className="text-primary">BabyFirst</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Lộ trình toàn diện, cá nhân hóa theo độ tuổi và nhu cầu phát triển của bé
              </p>
            </motion.div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className={`${course.color}/20 p-6`}>
                    <div className="flex items-start justify-between">
                      <div className={`w-16 h-16 ${course.color} rounded-xl flex items-center justify-center`}>
                        <course.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{course.price}</p>
                        {course.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {course.originalPrice}
                          </p>
                        )}
                      </div>
                    </div>
                    <h3 className="text-2xl font-heading font-bold mt-4">{course.title}</h3>
                    <p className="text-primary font-medium">{course.subtitle}</p>
                  </div>

                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">{course.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {course.ageRange}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {course.lessons} bài học
                      </span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-sage-dark mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowConsultForm(true);
                        }}
                      >
                        Nhận tư vấn
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="/trial">Học thử</a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold mb-4">
                Tại sao chọn BabyFirst?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  emoji: "🎯",
                  title: "Cá nhân hóa 100%",
                  desc: "Nội dung được điều chỉnh theo độ tuổi và mục tiêu phát triển riêng của bé",
                },
                {
                  emoji: "📱",
                  title: "Học mọi lúc mọi nơi",
                  desc: "Video ngắn 3-5 phút, dễ xem trên điện thoại, áp dụng ngay tại nhà",
                },
                {
                  emoji: "👩‍⚕️",
                  title: "Chuyên gia đồng hành",
                  desc: "Đội ngũ chuyên gia giáo dục sớm sẵn sàng hỗ trợ 24/7",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <span className="text-5xl mb-4 block">{item.emoji}</span>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Consultation Form Dialog */}
      <Dialog open={showConsultForm} onOpenChange={setShowConsultForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nhận tư vấn khóa học</DialogTitle>
            <DialogDescription>
              {selectedCourse?.title} - Chúng tôi sẽ liên hệ trong vòng 24h
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitConsult} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Tên bố/mẹ *</label>
                <Input
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="Nhập tên của bạn"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Tên bé</label>
                <Input
                  value={formData.babyName}
                  onChange={(e) => setFormData({ ...formData, babyName: e.target.value })}
                  placeholder="Nhập tên bé"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Số điện thoại *</label>
              <Input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0912 345 678"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Ghi chú</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Bé bao nhiêu tháng? Bạn quan tâm điều gì?"
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full">
              Gửi yêu cầu tư vấn
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Courses;
