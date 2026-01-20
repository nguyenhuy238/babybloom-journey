import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "BabyFirst phù hợp với trẻ ở độ tuổi nào?",
    answer: "BabyFirst được thiết kế cho trẻ từ giai đoạn mang thai đến 3 tuổi. Đây là giai đoạn vàng phát triển não bộ, với 80% kết nối thần kinh được hình thành trong 3 năm đầu đời.",
  },
  {
    question: "Tôi cần bao nhiêu thời gian mỗi ngày để áp dụng BabyFirst?",
    answer: "Chỉ cần 15-30 phút mỗi ngày là đủ! Mỗi hoạt động được thiết kế ngắn gọn (1-3 phút video) và có thể tích hợp tự nhiên vào routine hàng ngày như giờ chơi, giờ ăn hay giờ tắm.",
  },
  {
    question: "BabyFirst khác gì so với các app giáo dục khác?",
    answer: "BabyFirst tập trung dạy PHỤ HUYNH cách tương tác với con, không phải để trẻ xem màn hình. Nội dung được cá nhân hóa theo độ tuổi, mục tiêu phát triển và sở thích của từng bé.",
  },
  {
    question: "Tôi có cần mua đồ chơi đặc biệt không?",
    answer: "Không nhất thiết! Nhiều hoạt động sử dụng đồ vật có sẵn trong nhà. Tuy nhiên, chúng tôi có gợi ý đồ chơi Montessori chất lượng nếu bạn muốn đầu tư thêm.",
  },
  {
    question: "Làm sao tôi biết con đang tiến bộ?",
    answer: "App có hệ thống theo dõi tiến trình với checklist kỹ năng theo Montessori. Bạn sẽ thấy rõ những gì bé đã làm được và nhận gợi ý hỗ trợ cụ thể.",
  },
  {
    question: "Tôi có thể hủy gói đăng ký bất cứ lúc nào không?",
    answer: "Hoàn toàn được! Bạn có thể hủy gói đăng ký bất cứ lúc nào mà không mất phí. Chúng tôi cũng có chính sách hoàn tiền trong 7 ngày nếu bạn không hài lòng.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-cream-dark/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <span className="text-primary font-semibold mb-4 block">Câu hỏi thường gặp</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Bạn có thắc mắc? Chúng tôi có câu trả lời
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nếu bạn không tìm thấy câu trả lời mình cần, đừng ngại liên hệ với 
              đội ngũ hỗ trợ của chúng tôi.
            </p>

            <div className="bg-card p-6 rounded-2xl shadow-soft">
              <h3 className="font-bold mb-2">Cần hỗ trợ thêm?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
                  Chat với chuyên gia
                </button>
                <button className="px-4 py-2 border border-border rounded-xl font-medium hover:bg-muted transition-colors">
                  Xem blog kiến thức
                </button>
              </div>
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-2xl px-6 border-none shadow-soft"
                >
                  <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
