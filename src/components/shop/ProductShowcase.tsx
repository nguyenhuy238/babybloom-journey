import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { Product } from "@/lib/store";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { Loader2 } from "lucide-react";

const categories = [
  { id: 'all', label: 'Tất cả', emoji: '🎁' },
  { id: 'sensory', label: 'Giác quan', emoji: '👀' },
  { id: 'physical', label: 'Vận động', emoji: '🏃' },
  { id: 'iq', label: 'Trí tuệ', emoji: '🧠' },
  { id: 'independence', label: 'Tự lập', emoji: '🌱' },
];

const ProductShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["products-showcase"],
    queryFn: () => api.get<{ data: any[] }>("/v1/products"),
  });

  const apiProducts = apiResponse?.data || [];

  const products: Product[] = apiProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.thumbnailUrl,
    description: p.description,
    category: p.category,
    ageRange: p.ageRange || "0-3 tuổi",
    rating: p.rating,
    reviewCount: p.reviewCount,
    developmentArea: p.developmentAreas || [],
    type: (p.productType as 'affiliate' | 'direct' | 'babyfirst') || 'babyfirst',
    inStock: p.stockCount > 0,
    affiliateUrl: p.affiliateUrl
  }));

  const filteredProducts = selectedCategory === 'all'
    ? products.slice(0, 4)
    : products.filter(p => p.developmentArea.includes(selectedCategory) || p.category === selectedCategory).slice(0, 4);

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-4">
            🛍️ Đồ chơi Montessori
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sản phẩm được <span className="text-gradient">khuyên dùng</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Các sản phẩm được chuyên gia BabyFirst chọn lọc, phù hợp với từng giai đoạn phát triển của bé
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.id)}
              className="gap-2"
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </Button>
          ))}
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 min-h-[400px]">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
            </div>
          )}
        </div>

        {/* View all */}
        <div className="text-center">
          <Link to="/shop">
            <Button variant="outline" size="lg" className="gap-2">
              Xem tất cả sản phẩm
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Quick view modal */}
        <ProductQuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </section>
  );
};

export default ProductShowcase;
