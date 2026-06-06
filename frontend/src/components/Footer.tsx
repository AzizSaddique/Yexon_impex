import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { categories } from "@/data/products";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { setSelectedCategory } = useApp();
  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    setSelectedCategory(tag);
    navigate("/products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-card border-t border-border py-16">
      <div ref={ref} className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-3xl font-black uppercase mb-4">
              <div>
                <span style={{ background: 'linear-gradient(90deg, #1565C0, #29B6F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>YEX</span>
                <span style={{ background: 'linear-gradient(90deg, #F57C00, #FFA726)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ON</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-6 bg-[#1565C0]"></div>
                <span className="text-sm font-normal uppercase text-white">IMPEX</span>
                <div className="h-px w-6 bg-[#1565C0]"></div>
              </div>
              {/* <img src={logo} alt="Logo" className="w-20 h-20 " /> */}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium leather motorbike wear engineered for performance and style. Built for riders who refuse to compromise.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Useful Links</h4>
            <ul className="space-y-2">
              {["About Us", "FAQs", "Shipping Policy", "Returns", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Tags */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Product Tags</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((tag) => (
                <span
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="text-xs font-semibold uppercase px-3 py-1 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                yexonimpex@gmail.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                +92 3341 740 951
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                123 Rider Ave, Moto City, MC 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            © 2026 Yexon Impex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
