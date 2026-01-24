import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, CreditCard, Wallet, Smartphone, 
  CheckCircle2, MapPin, User, Phone, Mail,
  Truck, Shield, Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

const paymentMethods = [
  { id: 'momo', name: 'MoMo', icon: Wallet, color: 'bg-[#ae2070]' },
  { id: 'zalopay', name: 'ZaloPay', icon: Smartphone, color: 'bg-[#0068ff]' },
  { id: 'vnpay', name: 'VNPay', icon: CreditCard, color: 'bg-[#0066b2]' },
  { id: 'cod', name: 'Thanh toán khi nhận hàng', icon: Truck, color: 'bg-muted' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [selectedPayment, setSelectedPayment] = useState('momo');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    setStep('payment');
  };

  const handlePayment = () => {
    // Simulate payment processing
    toast.loading('Đang xử lý thanh toán...');
    setTimeout(() => {
      toast.dismiss();
      setStep('success');
      clearCart();
    }, 2000);
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
          <p className="text-muted-foreground mb-6">
            Thêm sản phẩm vào giỏ hàng để thanh toán
          </p>
          <Link to="/shop">
            <Button>Đi đến cửa hàng</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-sage-dark" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Đặt hàng thành công!</h2>
          <p className="text-muted-foreground mb-2">
            Mã đơn hàng: <span className="font-bold text-primary">BF{Date.now().toString().slice(-8)}</span>
          </p>
          <p className="text-muted-foreground mb-6">
            Cảm ơn bạn đã mua sắm tại BabyFirst. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/">
              <Button variant="outline">Về trang chủ</Button>
            </Link>
            <Link to="/shop">
              <Button>Tiếp tục mua sắm</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Thanh toán</h1>
              <p className="text-sm text-muted-foreground">
                {step === 'info' ? 'Bước 1: Thông tin giao hàng' : 'Bước 2: Phương thức thanh toán'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {step === 'info' ? (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmitInfo}
                className="space-y-6"
              >
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Thông tin giao hàng
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Họ và tên *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Số điện thoại *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="0912 345 678"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Địa chỉ giao hàng *
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="note">Ghi chú (tuỳ chọn)</Label>
                      <Input
                        id="note"
                        name="note"
                        placeholder="Ghi chú về đơn hàng, ví dụ: giao hàng giờ hành chính"
                        value={formData.note}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Tiếp tục
                </Button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Chọn phương thức thanh toán
                  </h2>
                  
                  <div className="grid gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPayment(method.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          selectedPayment === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center text-white`}>
                          <method.icon className="w-6 h-6" />
                        </div>
                        <span className="font-medium">{method.name}</span>
                        {selectedPayment === method.id && (
                          <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shipping info summary */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Thông tin giao hàng</h2>
                    <Button variant="ghost" size="sm" onClick={() => setStep('info')}>
                      Sửa
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Người nhận:</span> {formData.name}</p>
                    <p><span className="text-muted-foreground">SĐT:</span> {formData.phone}</p>
                    <p><span className="text-muted-foreground">Địa chỉ:</span> {formData.address}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" onClick={() => setStep('info')}>
                    Quay lại
                  </Button>
                  <Button size="lg" className="flex-1" onClick={handlePayment}>
                    Xác nhận thanh toán
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Đơn hàng của bạn</h2>
              
              <div className="space-y-3 mb-4 max-h-64 overflow-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                      <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{getTotalPrice().toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí vận chuyển</span>
                  <span className="text-sage-dark">Miễn phí</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{getTotalPrice().toLocaleString('vi-VN')}₫</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-4 h-4 text-sage-dark" />
                  <span>Miễn phí vận chuyển toàn quốc</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-sage-dark" />
                  <span>Bảo hành 12 tháng</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gift className="w-4 h-4 text-sage-dark" />
                  <span>Tặng kèm hướng dẫn Montessori</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
