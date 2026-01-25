import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  HelpCircle, 
  ChevronDown, 
  Send,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SupportTicket {
  id: string;
  subject: string;
  status: "pending" | "in_progress" | "resolved";
  date: string;
}

const faqs = [
  {
    question: "BabyFirst phù hợp với bé từ mấy tháng tuổi?",
    answer: "BabyFirst có nội dung từ giai đoạn thai kỳ cho đến 3 tuổi. Mỗi chương trình được thiết kế riêng theo từng giai đoạn phát triển của bé, đảm bảo nội dung phù hợp và hiệu quả nhất.",
  },
  {
    question: "Tôi có thể học thử miễn phí không?",
    answer: "Có! Bạn có thể truy cập 3 bài học miễn phí ngay mà không cần đăng ký. Để có trải nghiệm cá nhân hóa đầy đủ, bạn chỉ cần đăng ký thông tin đơn giản của bé.",
  },
  {
    question: "Mỗi ngày cần dành bao nhiêu thời gian để học?",
    answer: "Chỉ cần 15-20 phút mỗi ngày là đủ! Mỗi video hướng dẫn chỉ dài 3-5 phút, bạn có thể xem và thực hành cùng bé trong thời gian ngắn, rất phù hợp với lịch trình bận rộn.",
  },
  {
    question: "Tôi có thể xem trên thiết bị nào?",
    answer: "BabyFirst hoạt động trên tất cả các thiết bị: điện thoại (iOS/Android), máy tính bảng và máy tính. Bạn có thể học ở bất cứ đâu, bất cứ lúc nào.",
  },
  {
    question: "Có được hoàn tiền nếu không hài lòng không?",
    answer: "Có! Chúng tôi cam kết hoàn tiền 100% trong vòng 7 ngày đầu tiên nếu bạn không hài lòng với khóa học, không cần giải thích lý do.",
  },
  {
    question: "Làm sao để liên hệ với chuyên gia?",
    answer: "Với các gói Premium và Pro, bạn có thể chat trực tiếp với đội ngũ chuyên gia 24/7 qua ứng dụng. Gói Pro còn bao gồm buổi tư vấn video call 1-1 hàng tháng.",
  },
];

const mockTickets: SupportTicket[] = [
  { id: "TK001", subject: "Không xem được video trên điện thoại", status: "resolved", date: "2024-01-10" },
  { id: "TK002", subject: "Hỏi về khóa học 1-3 tuổi", status: "in_progress", date: "2024-01-15" },
];

const Support = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"contact" | "faq" | "status">("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; content: string }[]>([
    { role: "bot", content: "Xin chào! Tôi là trợ lý ảo BabyFirst. Tôi có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đã gửi yêu cầu hỗ trợ!",
      description: "Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { 
          role: "bot", 
          content: "Cảm ơn bạn đã liên hệ! Đội ngũ hỗ trợ sẽ phản hồi trong thời gian sớm nhất. Trong lúc chờ đợi, bạn có thể tham khảo mục FAQ để tìm câu trả lời nhanh hơn nhé!" 
        },
      ]);
    }, 1000);
    setChatInput("");
  };

  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Đang chờ</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="border-primary text-primary"><AlertCircle className="w-3 h-3 mr-1" />Đang xử lý</Badge>;
      case "resolved":
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Đã giải quyết</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-sage/20 to-peach/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Hỗ trợ & Tư vấn
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.a
                href="tel:19001234"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-sage-dark" />
                </div>
                <div>
                  <p className="font-bold">Hotline</p>
                  <p className="text-primary text-lg">1900 1234</p>
                  <p className="text-sm text-muted-foreground">8:00 - 22:00 hàng ngày</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:support@babyfirst.vn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-peach/30 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-terracotta" />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-primary">support@babyfirst.vn</p>
                  <p className="text-sm text-muted-foreground">Phản hồi trong 24h</p>
                </div>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border"
              >
                <div className="w-14 h-14 bg-lavender/30 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-lavender" />
                </div>
                <div>
                  <p className="font-bold">Live Chat</p>
                  <p className="text-primary">Chat ngay</p>
                  <p className="text-sm text-muted-foreground">Trợ lý ảo 24/7</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-6 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex gap-4">
              <Button
                variant={activeTab === "contact" ? "default" : "ghost"}
                onClick={() => setActiveTab("contact")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Gửi yêu cầu
              </Button>
              <Button
                variant={activeTab === "faq" ? "default" : "ghost"}
                onClick={() => setActiveTab("faq")}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Câu hỏi thường gặp
              </Button>
              <Button
                variant={activeTab === "status" ? "default" : "ghost"}
                onClick={() => setActiveTab("status")}
              >
                <Clock className="w-4 h-4 mr-2" />
                Theo dõi hỗ trợ
              </Button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {activeTab === "contact" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card rounded-xl border border-border p-6"
                  >
                    <h2 className="text-xl font-bold mb-6">Gửi yêu cầu hỗ trợ</h2>
                    <form onSubmit={handleSubmitContact} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Họ tên *</label>
                          <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Nhập họ tên"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Email *</label>
                          <Input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Số điện thoại</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0912 345 678"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Tiêu đề *</label>
                        <Input
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Tóm tắt vấn đề của bạn"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Nội dung chi tiết *</label>
                        <Textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Mô tả chi tiết vấn đề bạn cần hỗ trợ..."
                          rows={5}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="w-4 h-4 mr-2" />
                        Gửi yêu cầu
                      </Button>
                    </form>
                  </motion.div>
                )}

                {activeTab === "faq" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card rounded-xl border border-border p-6"
                  >
                    <h2 className="text-xl font-bold mb-6">Câu hỏi thường gặp</h2>
                    <Accordion type="single" collapsible className="space-y-2">
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                          <AccordionTrigger className="text-left hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                )}

                {activeTab === "status" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card rounded-xl border border-border p-6"
                  >
                    <h2 className="text-xl font-bold mb-6">Theo dõi yêu cầu hỗ trợ</h2>
                    {mockTickets.length > 0 ? (
                      <div className="space-y-4">
                        {mockTickets.map((ticket) => (
                          <div
                            key={ticket.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{ticket.subject}</p>
                              <p className="text-sm text-muted-foreground">
                                Mã yêu cầu: {ticket.id} · {ticket.date}
                              </p>
                            </div>
                            {getStatusBadge(ticket.status)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        Bạn chưa có yêu cầu hỗ trợ nào
                      </p>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Chat Widget */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl border border-border overflow-hidden sticky top-24">
                  <div className="bg-primary p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-primary-foreground">Chat hỗ trợ</p>
                        <p className="text-xs text-primary-foreground/80">Trợ lý ảo 24/7</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-80 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                      />
                      <Button size="icon" onClick={handleSendChat}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
