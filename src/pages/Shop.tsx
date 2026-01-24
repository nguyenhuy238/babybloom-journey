import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Search, Filter, ShoppingCart, SlidersHorizontal,
  Grid3X3, List, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/shop/ProductCard";
import ProductQuickView from "@/components/shop/ProductQuickView";
import CartDrawer from "@/components/shop/CartDrawer";
import { Product, demoProducts, useCartStore } from "@/lib/store";

const categories = [
  { id: 'all', label: 'Tất cả', count: demoProducts.length },
  { id: 'sensory', label: 'Giác quan', count: demoProducts.filter(p => p.developmentArea.includes('sensory')).length },
  { id: 'physical', label: 'Vận động', count: demoProducts.filter(p => p.developmentArea.includes('physical')).length },
  { id: 'iq', label: 'Trí tuệ', count: demoProducts.filter(p => p.developmentArea.includes('iq')).length },
  { id: 'independence', label: 'Tự lập', count: demoProducts.filter(p => p.developmentArea.includes('independence')).length },
  { id: 'eq', label: 'Cảm xúc', count: demoProducts.filter(p => p.developmentArea.includes('eq')).length },
];

const ageFilters = [
  { id: 'all', label: 'Tất cả độ tuổi' },
  { id: '0-6', label: '0-6 tháng' },
  { id: '6-12', label: '6-12 tháng' },
  { id: '12-24', label: '12-24 tháng' },
  { id: '24+', label: 'Trên 24 tháng' },
];

const sortOptions = [
  { id: 'popular', label: 'Phổ biến nhất' },
  { id: 'newest', label: 'Mới nhất' },
  { id: 'price-low', label: 'Giá thấp đến cao' },
  { id: 'price-high', label: 'Giá cao đến thấp' },
  { id: 'rating', label: 'Đánh giá cao' },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const cartItems = useCartStore((state) => state.getTotalItems());

  // Filter and sort products
  let filteredProducts = demoProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.developmentArea.includes(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Cửa hàng Montessori</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} sản phẩm
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>
          </div>

          {/* Search */}
          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Lọc
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar filters - Desktop */}
          <aside className={`w-64 flex-shrink-0 hidden lg:block`}>
            <div className="sticky top-32 space-y-6">
              {/* Categories */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-bold mb-3">Phân loại</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-xs ${
                        selectedCategory === cat.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Age filter */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-bold mb-3">Độ tuổi</h3>
                <div className="space-y-2">
                  {ageFilters.map((age) => (
                    <button
                      key={age.id}
                      onClick={() => setSelectedAge(age.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedAge === age.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type filter */}
              <div className="bg-card rounded-xl border border-border p-4">
                <h3 className="font-bold mb-3">Loại sản phẩm</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">BabyFirst Original</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Đối tác (Affiliate)</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mb-4 bg-card rounded-xl border border-border p-4"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    size="sm"
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-card border border-border rounded-lg px-3 py-1.5 text-sm"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active filters */}
            {(selectedCategory !== 'all' || searchQuery) && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Đang lọc:</span>
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {categories.find(c => c.id === selectedCategory)?.label}
                    <button onClick={() => setSelectedCategory('all')} className="ml-1">×</button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="ml-1">×</button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-muted-foreground">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick view modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Cart drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Shop;
