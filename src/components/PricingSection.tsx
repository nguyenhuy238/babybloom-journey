import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Miễn phí",
    price: "0",
    period: "Mãi mãi",
    description: "Khám phá nền tảng với nội dung cơ bản",
    features: [
      "10 video hướng dẫn cơ bản",
      "Lộ trình theo độ tuổi",
      "Checklist phát triển",
      "Cộng đồng phụ huynh",
    ],
    cta: "Bắt đầu miễn phí",
    popular: false,
  },
  {
    name: "Premium",
    price: "199K",
    period: "/tháng",
    description: "Trải nghiệm đầy đủ với lộ trình cá nhân hóa",
    features: [
      "Tất cả tính năng Free",
      "100+ video chuyên sâu",
      "Lộ trình cá nhân hóa theo bé",
      "Theo dõi tiến trình chi tiết",
      "Gợi ý đồ chơi Montessori",
      "Hỏi đáp cộng đồng ưu tiên",
    ],
    cta: "Dùng thử 7 ngày",
    popular: true,
  },
  {
    name: "Chuyên gia",
    price: "499K",
    period: "/tháng",
    description: "Đồng hành 1-1 cùng chuyên gia giáo dục",
    features: [
      "Tất cả tính năng Premium",
      "2 buổi video call/tháng",
      "Chat trực tiếp chuyên gia",
      "Lộ trình được thiết kế riêng",
      "Báo cáo phát triển hàng tháng",
      "Hỗ trợ ưu tiên 24/7",
    ],
    cta: "Liên hệ tư vấn",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold mb-4 block">Bảng giá</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Chọn gói phù hợp với gia đình bạn
          </h2>
          <p className="text-lg text-muted-foreground">
            Bắt đầu miễn phí, nâng cấp khi bạn sẵn sàng. 
            Không ràng buộc, hủy bất cứ lúc nào.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-6 lg:p-8 ${
                plan.popular
                  ? "bg-gradient-to-br from-primary to-terracotta-dark text-primary-foreground shadow-elevated scale-105"
                  : "bg-card shadow-card"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-sunny text-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Phổ biến nhất
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm ${plan.popular ? "opacity-90" : "text-muted-foreground"} mb-4`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "opacity-75" : "text-muted-foreground"}`}>
                    đ{plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? "bg-primary-foreground/20" : "bg-sage/30"
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={`text-sm ${plan.popular ? "opacity-90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-background text-foreground hover:bg-background/90"
                    : ""
                }`}
                variant={plan.popular ? "secondary" : "default"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-sage-dark" />
              Bảo mật thanh toán
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-sage-dark" />
              Hoàn tiền trong 7 ngày
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-sage-dark" />
              Hủy bất cứ lúc nào
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
