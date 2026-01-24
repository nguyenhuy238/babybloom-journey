// Simple cart store for BabyFirst E-Commerce
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  ageRange: string;
  developmentArea: string[];
  type: 'affiliate' | 'direct' | 'babyfirst';
  affiliateUrl?: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId),
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'babyfirst-cart',
    }
  )
);

// Demo products data
export const demoProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Bộ khối gỗ Montessori Rainbow',
    price: 450000,
    originalPrice: 550000,
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop',
    category: 'Đồ chơi gỗ',
    ageRange: '6-24 tháng',
    developmentArea: ['iq', 'sensory', 'physical'],
    type: 'babyfirst',
    description: 'Bộ khối gỗ rainbow cao cấp với 12 màu sắc tự nhiên, an toàn cho bé. Giúp phát triển nhận thức màu sắc, kỹ năng xếp chồng và tư duy logic.',
    inStock: true,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: 'prod-2',
    name: 'Hộp giác quan Montessori',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
    category: 'Giác quan',
    ageRange: '0-12 tháng',
    developmentArea: ['sensory', 'iq'],
    type: 'babyfirst',
    description: 'Hộp giác quan với 6 chất liệu khác nhau: vải, gỗ, silicon, len, nhung, cotton. Kích thích xúc giác và phát triển não bộ.',
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: 'prod-3',
    name: 'Bảng bận rộn Busy Board',
    price: 650000,
    originalPrice: 750000,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop',
    category: 'Vận động tinh',
    ageRange: '12-36 tháng',
    developmentArea: ['physical', 'iq', 'independence'],
    type: 'direct',
    description: 'Bảng bận rộn với 15+ hoạt động: khóa, chuông, đèn LED, bánh xe, dây kéo... Phát triển vận động tinh và khả năng tự lập.',
    inStock: true,
    rating: 4.9,
    reviewCount: 234,
  },
  {
    id: 'prod-4',
    name: 'Bộ đĩa thức ăn Montessori',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
    category: 'Tự lập',
    ageRange: '6-24 tháng',
    developmentArea: ['independence', 'physical'],
    type: 'affiliate',
    affiliateUrl: 'https://shopee.vn',
    description: 'Bộ đĩa chia ngăn silicon an toàn thực phẩm. Giúp bé tập ăn độc lập theo phương pháp BLW.',
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 'prod-5',
    name: 'Thẻ flashcard Montessori 100 từ',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop',
    category: 'Ngôn ngữ',
    ageRange: '6-36 tháng',
    developmentArea: ['iq', 'eq'],
    type: 'affiliate',
    affiliateUrl: 'https://lazada.vn',
    description: 'Bộ 100 thẻ flashcard với hình ảnh thực tế, chất lượng cao. Hỗ trợ phát triển ngôn ngữ và nhận thức.',
    inStock: true,
    rating: 4.6,
    reviewCount: 312,
  },
  {
    id: 'prod-6',
    name: 'Kệ sách Montessori cho bé',
    price: 890000,
    originalPrice: 1100000,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    category: 'Nội thất',
    ageRange: '12-60 tháng',
    developmentArea: ['independence', 'iq'],
    type: 'direct',
    description: 'Kệ sách gỗ thông cao cấp, thiết kế thấp vừa tầm tay bé. Giúp bé tự chọn sách và phát triển tình yêu đọc sách.',
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: 'prod-7',
    name: 'Bộ nhạc cụ gỗ Mini',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    category: 'Âm nhạc',
    ageRange: '6-36 tháng',
    developmentArea: ['sensory', 'eq', 'physical'],
    type: 'babyfirst',
    description: 'Bộ 6 nhạc cụ gỗ: trống, xylophone, maracas, lục lạc, phách, chuông. Phát triển thính giác và cảm xúc qua âm nhạc.',
    inStock: true,
    rating: 4.8,
    reviewCount: 198,
  },
  {
    id: 'prod-8',
    name: 'Đồ chơi xâu hạt gỗ',
    price: 195000,
    image: 'https://images.unsplash.com/photo-1596073419667-9d77d59f033f?w=400&h=400&fit=crop',
    category: 'Vận động tinh',
    ageRange: '18-48 tháng',
    developmentArea: ['physical', 'iq'],
    type: 'affiliate',
    affiliateUrl: 'https://tiki.vn',
    description: 'Bộ xâu hạt gỗ 50 hạt với 5 dây xâu. Rèn luyện vận động tinh, sự tập trung và kiên nhẫn cho bé.',
    inStock: false,
    rating: 4.5,
    reviewCount: 145,
  },
];
