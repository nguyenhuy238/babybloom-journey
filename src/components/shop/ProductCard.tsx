import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, useCartStore } from "@/lib/store";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const developmentAreaLabels: Record<string, { emoji: string; label: string }> = {
  iq: { emoji: "🧠", label: "Trí tuệ" },
  eq: { emoji: "💝", label: "Cảm xúc" },
  physical: { emoji: "🏃", label: "Thể chất" },
  sensory: { emoji: "👀", label: "Giác quan" },
  independence: { emoji: "🌱", label: "Tự lập" },
};

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (product.type === 'affiliate' && product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank');
      return;
    }
    addItem(product);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group bg-card rounded-2xl border border-border overflow-hidden transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
          {product.type === 'babyfirst' && (
            <Badge className="bg-primary text-primary-foreground">
              BabyFirst
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary">Hết hàng</Badge>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick view overlay */}
        {onQuickView && (
          <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              onClick={() => onQuickView(product)}
            >
              Xem nhanh
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category & Age */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{product.category}</span>
          <span className="text-primary font-medium">{product.ageRange}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Development areas */}
        <div className="flex flex-wrap gap-1">
          {product.developmentArea.slice(0, 3).map((area) => (
            <span
              key={area}
              className="text-xs bg-muted px-2 py-0.5 rounded-full"
            >
              {developmentAreaLabels[area]?.emoji} {developmentAreaLabels[area]?.label}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 fill-sunny text-sunny" />
          <span className="font-medium">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-primary">
            {product.price.toLocaleString('vi-VN')}₫
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full gap-2"
          variant={product.type === 'affiliate' ? 'outline' : 'default'}
        >
          {product.type === 'affiliate' ? (
            <>
              <ExternalLink className="w-4 h-4" />
              Mua tại đối tác
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Thêm vào giỏ
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
