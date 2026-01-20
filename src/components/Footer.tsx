import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

const footerLinks = {
  product: {
    title: "Sản phẩm",
    links: [
      { label: "Tính năng", href: "#features" },
      { label: "Bảng giá", href: "#pricing" },
      { label: "Tải app", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  resources: {
    title: "Tài nguyên",
    links: [
      { label: "Blog kiến thức", href: "#" },
      { label: "Hướng dẫn sử dụng", href: "#" },
      { label: "Video demo", href: "#" },
      { label: "Montessori 101", href: "#" },
    ],
  },
  company: {
    title: "Về chúng tôi",
    links: [
      { label: "Giới thiệu", href: "#" },
      { label: "Đội ngũ chuyên gia", href: "#" },
      { label: "Tuyển dụng", href: "#" },
      { label: "Liên hệ", href: "#" },
    ],
  },
  legal: {
    title: "Pháp lý",
    links: [
      { label: "Điều khoản sử dụng", href: "#" },
      { label: "Chính sách bảo mật", href: "#" },
      { label: "Cookie", href: "#" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="bg-cream-dark/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">B</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                Baby<span className="text-primary">First</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Nền tảng giáo dục sớm dựa trên khoa học, 
              giúp phụ huynh đồng hành cùng con trong hành trình phát triển toàn diện.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 BabyFirst. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with 💝 for Vietnamese parents
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
