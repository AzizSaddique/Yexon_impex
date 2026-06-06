import { useState } from "react";
import { Menu, X, ShoppingCart, ChevronDown, Heart, User, LogOut } from "lucide-react";
import { NavLink } from "./NavLink";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { categories } from "@/data/products";
import logo from "@/assets/yexon impex logo (1).png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { setSelectedCategory, cart, wishlist } = useApp();
  const { user, logOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate("/products");
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    await logOut();
    setProfileOpen(false);
  };

  const menuItems = [
    {
      label: "HOME",
      href: "/",
      type: "link",
    },
    {
      label: "COMPANY",
      type: "dropdown",
      items: ["About", "Careers", "Contact"],
    },
    {
      label: "CATEGORIES",
      type: "dropdown",
      hasCart: true,
      items: categories,
    },
    {
      label: "CUSTOMIZED PRODUCTS",
      href: "/customized-products",
      type: "link",
    },
    {
      label: "CONTACT US",
      href: "#contact",
      type: "link",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white z-40 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center" activeClassName="">
              <img src={logo} alt="Yexon Impex" className="h-12 w-auto" />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0 justify-center flex-1">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.type === "link" ? (
                  <NavLink
                    to={item.href || "/"}
                    className="px-3 py-4 text-xs font-medium text-white transition-colors flex items-center gap-2"
                    activeClassName="text-orange-500"
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <button
                    className="px-3 py-4 text-xs font-medium text-white transition-colors flex items-center gap-2 group"
                  >
                    {item.label}
                    {item.hasCart && <ShoppingCart className="w-4 h-4" />}
                    {item.type === "dropdown" && (
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                    )}
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.type === "dropdown" && (
                  <div className="absolute left-0 mt-0 w-48 bg-black text-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.items?.map((subitem) => (
                      <button
                        key={subitem}
                        onClick={() => handleCategoryClick(subitem)}
                        className="block w-full text-left px-4 py-2 text-xs text-white transition-colors border-b border-gray-800 last:border-b-0"
                      >
                        {subitem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">
            {/* Wishlist */}
            <button
              onClick={() => navigate("/products")}
              className="relative p-2 text-white hover:text-orange-500 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={() => navigate("/products")}
              className="relative p-2 text-white hover:text-orange-500 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-2 text-white hover:text-orange-500 transition-colors flex items-center gap-2"
                title="Profile"
              >
                <User className="w-5 h-5" />
                <ChevronDown className={`w-4 h-4 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-0 w-48 bg-black text-white shadow-lg z-50 rounded">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-800">
                        <p className="text-sm text-white">Logged in as:</p>
                        <p className="text-sm font-medium text-white truncate">
                          {user.displayName || user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-white transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-white transition-colors"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-700">
            <div className="flex flex-col gap-0">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.type === "link" ? (
                    <NavLink
                      to={item.href || "/"}
                      className="block px-4 py-3 text-xs font-medium text-white border-b border-gray-800 transition-colors"
                      activeClassName="text-orange-500"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <div>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          )
                        }
                        className="w-full text-left px-4 py-3 text-xs font-medium text-white border-b border-gray-800 flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {item.label}
                          {item.hasCart && <ShoppingCart className="w-4 h-4" />}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Dropdown */}
                      {openDropdown === item.label && (
                        <div className="bg-black border-b border-gray-800">
                          {item.items?.map((subitem) => (
                            <button
                              key={subitem}
                              onClick={() => {
                                handleCategoryClick(subitem);
                                setOpenDropdown(null);
                              }}
                              className="block w-full text-left px-6 py-2 text-xs text-white transition-colors"
                            >
                              {subitem}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Icons Section */}
              <div className="border-t border-gray-800 px-4 py-4 space-y-3">
                {/* Mobile Wishlist */}
                <button
                  onClick={() => {
                    navigate("/products");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-2 py-2 text-xs font-medium text-white hover:text-orange-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="ml-auto bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Mobile Shopping Cart */}
                <button
                  onClick={() => {
                    navigate("/products");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-2 py-2 text-xs font-medium text-white hover:text-orange-500 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <span className="ml-auto bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>

                {/* Mobile Profile */}
                {user ? (
                  <>
                    <div className="px-2 py-2 text-xs text-white border-t border-gray-800 pt-3">
                      <p className="text-xs">Logged in as:</p>
                      <p className="font-medium text-white text-xs truncate">
                        {user.displayName || user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-2 py-2 text-xs font-medium text-white transition-colors border-t border-gray-800"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-2 py-2 text-xs font-medium text-white transition-colors border-t border-gray-800"
                  >
                    <User className="w-5 h-5" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
