import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-peach/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-sage-light/50 px-4 py-2 rounded-full mb-6"
            >
              <Star className="w-4 h-4 text-sage-dark fill-sage-dark" />
              <span className="text-sm font-medium text-sage-dark">
                Phương pháp Montessori hiện đại
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Đồng hành cùng bố mẹ trên{" "}
              <span className="text-gradient">hành trình phát triển</span>{" "}
              toàn diện của bé
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Nền tảng giáo dục sớm dựa trên khoa học, giúp phụ huynh Gen Z 
              chơi cùng con đúng cách – đúng giai đoạn – đúng mục tiêu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/app">
                <Button size="lg" className="text-lg px-8 gap-2 group w-full sm:w-auto">
                  Bắt đầu miễn phí
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 gap-2">
                <Play className="w-5 h-5" />
                Xem video giới thiệu
              </Button>
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-peach to-terracotta border-2 border-background"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-sunny fill-sunny" />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">10,000+</strong> phụ huynh tin dùng
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-sage/30 rounded-full animate-pulse-soft" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-peach/40 rounded-full animate-float" />
              
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={heroImage}
                  alt="Bố mẹ chơi cùng con"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-4 top-1/4 bg-card p-4 rounded-2xl shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🧒</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Bé 8 tháng tuổi</p>
                    <p className="text-xs text-muted-foreground">3 hoạt động hôm nay</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
