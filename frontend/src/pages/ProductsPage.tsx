import { useEffect, useState } from "react";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  products,
  findParentCategory,
  getProductsByFilter,
  getSubcategoriesForCategory,
} from "@/data/products";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ProductsPage = () => {
  const { selectedCategory, addToCart, addToWishlist, isInCart, isInWishlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const isVerifiedUser = Boolean(user?.emailVerified);
  const selectedParentCategory = selectedCategory
    ? findParentCategory(selectedCategory) ?? selectedCategory
    : null;
  const availableTypes = selectedParentCategory
    ? getSubcategoriesForCategory(selectedParentCategory)
    : [];
  const [activeType, setActiveType] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCategory) {
      setActiveType(null);
      return;
    }

    if (selectedParentCategory && selectedParentCategory !== selectedCategory) {
      setActiveType(selectedCategory);
      return;
    }

    setActiveType(null);
  }, [selectedCategory, selectedParentCategory]);

  const baseProducts = activeType
    ? getProductsByFilter(activeType)
    : selectedParentCategory
    ? getProductsByFilter(selectedParentCategory)
    : products;

  const filteredProducts = [...baseProducts].sort((a, b) => {
    const aNew = a.isNew ? 1 : 0;
    const bNew = b.isNew ? 1 : 0;
    if (aNew !== bNew) return bNew - aNew;
    return b.id - a.id;
  });

  const handleBack = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const requireVerifiedAuth = (action: string) => {
    if (isVerifiedUser) return true;

    toast({
      title: "Sign in required",
      description: `Please sign in with a verified Gmail account before you ${action}.`,
      variant: "destructive",
    });
    navigate("/login", { state: { from: location.pathname } });
    return false;
  };

  const heading = activeType ?? selectedParentCategory ?? "All Products";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-20">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black uppercase text-foreground mb-2">
            {heading}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {availableTypes.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveType(null)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                !activeType
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              All {selectedParentCategory}
            </button>
            {availableTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                  activeType === type
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border overflow-hidden hover:border-primary/30 transition-all cursor-pointer"
              onClick={() => {
                navigate(`/products/${product.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-background">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x400/cccccc/000000?text=No+Image';
                  }}
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white">
                    New
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!requireVerifiedAuth("add products to wishlist")) return;
                    addToWishlist(product);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isInWishlist(product.id)
                        ? "fill-primary text-primary"
                        : "text-foreground"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {product.subcategory ?? product.category}
                </p>
                <h3 className="text-sm font-bold uppercase text-foreground mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!requireVerifiedAuth("add products to cart")) return;
                      addToCart(product);
                    }}
                    disabled={isInCart(product.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                      isInCart(product.id)
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {isInCart(product.id) ? "In Cart" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
