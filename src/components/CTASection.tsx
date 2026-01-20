import { motion } from "framer-motion";
import { ArrowRight, Apple, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-terracotta to-terracotta-dark p-8 md:p-12 lg:p-16 text-primary-foreground"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-peach/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-sage/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="text-6xl mb-6"
            >
              👨‍👩‍👧
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Bắt đầu hành trình đồng hành cùng con ngay hôm nay
            </h2>

            <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Hơn 10,000 phụ huynh Việt Nam đã tin tưởng BabyFirst. 
              Tải app miễn phí và nhận lộ trình cá nhân hóa cho bé trong 2 phút.
            </p>

            {/* App download buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 gap-3 text-lg px-8"
              >
                <Apple className="w-6 h-6" />
                Tải trên App Store
              </Button>
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 gap-3 text-lg px-8"
              >
                <Smartphone className="w-6 h-6" />
                Tải trên Google Play
              </Button>
            </div>

            {/* Or web CTA */}
            <div className="flex items-center justify-center gap-3 text-sm opacity-75">
              <span>hoặc</span>
              <a href="#" className="underline hover:no-underline flex items-center gap-1">
                Dùng thử trên web
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
