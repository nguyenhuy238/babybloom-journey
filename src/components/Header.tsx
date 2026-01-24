import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CartDrawer from "@/components/shop/CartDrawer";
import { useCartStore } from "@/lib/store";

const navItems = [
  { label: "Trang chủ", href: "#hero" },
  { label: "Tính năng", href: "#features" },
  { label: "Phương pháp", href: "#pillars" },
  { label: "Cửa hàng", href: "/shop", isRoute: true },
  { label: "Bảng giá", href: "#pricing" },
  { label: "Hỗ trợ", href: "#faq" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.getTotalItems());

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-bold text-lg">B</span>
                </div>
                <span className="font-heading font-bold text-xl text-foreground">
                  Baby<span className="text-primary">First</span>
                </span>
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                item.isRoute ? (
                  <motion.div key={item.label} whileHover={{ y: -2 }}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                  </motion.a>
                )
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Button>
              <Button variant="ghost" className="font-semibold">
                Đăng nhập
              </Button>
              <Link to="/app">
                <Button className="font-semibold">
                  Thử App
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Button>
              <button
                className="p-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4"
              >
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    item.isRoute ? (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    )
                  ))}
                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <Button variant="ghost" className="justify-start font-semibold">
                      Đăng nhập
                    </Button>
                    <Link to="/app">
                      <Button className="w-full font-semibold">
                        Thử App
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
