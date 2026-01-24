import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Heart, Star, Truck, Shield, ExternalLink, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, useCartStore } from "@/lib/store";
import { toast } from "sonner";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const developmentAreaLabels: Record<string, { emoji: string; label: string; color: string }> = {
  iq: { emoji: "🧠", label: "Trí tuệ", color: "bg-lavender" },
  eq: { emoji: "💝", label: "Cảm xúc", color: "bg-peach" },
  physical: { emoji: "🏃", label: "Thể chất", color: "bg-sky" },
  sensory: { emoji: "👀", label: "Giác quan", color: "bg-sage" },
  independence: { emoji: "🌱", label: "Tự lập", color: "bg-sunny" },
};

const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) return null;

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product.type === 'affiliate' && product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`);
    onClose();
    setQuantity(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-auto bg-card rounded-2xl shadow-2xl z-50"
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-square bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                    -{discount}%
                  </Badge>
                )}
                {product.type === 'babyfirst' && (
                  <Badge className="absolute top-4 left-4 mt-8 bg-primary text-primary-foreground">
                    BabyFirst Original
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col">
                {/* Category & Age */}
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{product.category}</span>
                  <Badge variant="outline">{product.ageRange}</Badge>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-sunny text-sunny"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">
                    ({product.reviewCount} đánh giá)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {product.price.toLocaleString('vi-VN')}₫
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  )}
                </div>

                {/* Development areas */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Phát triển:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.developmentArea.map((area) => (
                      <span
                        key={area}
                        className={`px-3 py-1 rounded-full text-sm ${developmentAreaLabels[area]?.color}/30`}
                      >
                        {developmentAreaLabels[area]?.emoji} {developmentAreaLabels[area]?.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 flex-1">
                  {product.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4 text-sage-dark" />
                    <span>Miễn phí vận chuyển</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-sage-dark" />
                    <span>Bảo hành 12 tháng</span>
                  </div>
                </div>

                {/* Quantity & Add to cart */}
                {product.type !== 'affiliate' && (
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-muted-foreground">Số lượng:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-10 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 gap-2"
                    size="lg"
                  >
                    {product.type === 'affiliate' ? (
                      <>
                        <ExternalLink className="w-5 h-5" />
                        Mua tại đối tác
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Thêm vào giỏ
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="lg" className="px-4">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                {!product.inStock && (
                  <p className="text-destructive text-sm text-center mt-2">
                    Sản phẩm hiện đang hết hàng
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;
