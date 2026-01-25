import { motion } from "framer-motion";
import { Heart, Target, Eye, Users, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Heart,
    title: "Yêu thương",
    description: "Mọi hoạt động đều xuất phát từ tình yêu và sự thấu hiểu con trẻ",
  },
  {
    icon: Target,
    title: "Khoa học",
    description: "Dựa trên nghiên cứu Montessori và khoa học phát triển não bộ",
  },
  {
    icon: Users,
    title: "Đồng hành",
    description: "Không dạy trẻ, mà dạy phụ huynh cách đồng hành cùng con",
  },
  {
    icon: Award,
    title: "Thực tiễn",
    description: "Nội dung ngắn gọn, dễ áp dụng ngay tại nhà mỗi ngày",
  },
];

const team = [
  {
    name: "Dr. Nguyễn Thị Mai",
    role: "Founder & CEO",
    expertise: "Tiến sĩ Giáo dục Sớm - ĐH Stanford",
    avatar: "👩‍⚕️",
  },
  {
    name: "ThS. Trần Văn Hùng",
    role: "Head of Content",
    expertise: "Thạc sĩ Tâm lý Trẻ em - ĐH Sư phạm",
    avatar: "👨‍🏫",
  },
  {
    name: "Lê Thị Hương",
    role: "Montessori Expert",
    expertise: "AMI Certified Montessori Guide",
    avatar: "👩‍🎓",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-sage/20 to-peach/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Về <span className="text-primary">BabyFirst</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Chúng tôi tin rằng mỗi đứa trẻ đều là một kỳ quan. Và cha mẹ chính là 
                người nghệ sĩ vĩ đại nhất, kiến tạo nên những năm tháng đầu đời quý giá.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-heading font-bold mb-6">
                  Câu chuyện của chúng tôi
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    BabyFirst được thành lập từ một câu hỏi đơn giản: "Tại sao giáo dục sớm 
                    lại khó tiếp cận với đa số cha mẹ Việt Nam?"
                  </p>
                  <p>
                    Chúng tôi nhận ra rằng các khóa học Montessori truyền thống thường đắt đỏ, 
                    tốn thời gian, và không phù hợp với nhịp sống bận rộn của cha mẹ hiện đại.
                  </p>
                  <p>
                    Vì vậy, BabyFirst ra đời - mang đến nội dung giáo dục sớm chất lượng cao, 
                    được cá nhân hóa theo từng bé, với định dạng ngắn gọn, trực quan, 
                    và có thể áp dụng ngay tại nhà.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-sage/20 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-sage-dark">10K+</p>
                  <p className="text-muted-foreground">Gia đình tin dùng</p>
                </div>
                <div className="bg-peach/20 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-terracotta">500+</p>
                  <p className="text-muted-foreground">Video hướng dẫn</p>
                </div>
                <div className="bg-sunny/20 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-primary">98%</p>
                  <p className="text-muted-foreground">Hài lòng</p>
                </div>
                <div className="bg-lavender/20 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-lavender">24/7</p>
                  <p className="text-muted-foreground">Hỗ trợ</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <div className="w-14 h-14 bg-sage/20 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-sage-dark" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">Tầm nhìn</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Trở thành nền tảng giáo dục sớm số 1 Việt Nam, nơi mọi cha mẹ đều có thể 
                  tiếp cận kiến thức nuôi dạy con khoa học, bất kể điều kiện kinh tế hay địa lý.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <div className="w-14 h-14 bg-terracotta/20 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-terracotta" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">Sứ mệnh</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Đồng hành cùng 1 triệu gia đình Việt Nam trong hành trình nuôi dạy con, 
                  giúp mỗi đứa trẻ phát triển toàn diện từ những năm tháng đầu đời quan trọng nhất.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold mb-4">Giá trị cốt lõi</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Những nguyên tắc định hướng mọi hoạt động của BabyFirst
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold mb-4">Đội ngũ chuyên gia</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Những người tận tâm xây dựng nội dung giáo dục chất lượng cho BabyFirst
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 text-center border border-border"
                >
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.expertise}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-heading font-bold mb-4">
                Bắt đầu đồng hành cùng BabyFirst
              </h2>
              <p className="text-muted-foreground mb-8">
                Hãy để chúng tôi đồng hành cùng bạn trong hành trình nuôi dạy con tuyệt vời
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/trial">Học thử miễn phí</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/courses">Xem các khóa học</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
