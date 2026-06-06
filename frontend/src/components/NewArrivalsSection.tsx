import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useApp } from "@/context/AppContext";
import { products } from "@/data/products";
import { useNavigate } from "react-router-dom";

const NewArrivalsSection = () => {
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useApp();
  const { ref, isVisible } = useScrollAnimation();
  const navigate = useNavigate();

  // Paginate products, showing newest (isNew) items first
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const sorted = [...products].sort((a, b) => {
    const aNew = a.isNew ? 1 : 0;
    const bNew = b.isNew ? 1 : 0;
    if (aNew !== bNew) return bNew - aNew;
    return b.id - a.id;
  });

  const totalPages = Math.ceil(sorted.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const newArrivals = sorted.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="arrivals" className="py-20 bg-secondary">
      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-12 transition-all duration-700 opacity-100 translate-y-0">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-2">Latest</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-foreground">
            Our Latest Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, i) => (
            <div
              key={product.id}
              className="group bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-700 cursor-pointer opacity-100 translate-y-0"
              onClick={() => handleProductClick(product.id)}
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
                  {product.category}
                </p>
                <h3 className="text-sm font-bold uppercase text-foreground mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-foreground">
                    ${product.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-xs font-semibold border ${
                currentPage === 1
                  ? "text-muted-foreground border-border cursor-not-allowed"
                  : "text-foreground border-border hover:border-primary"
              }`}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 text-xs font-semibold border ${
                  page === currentPage
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-foreground border-border hover:border-primary"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-xs font-semibold border ${
                currentPage === totalPages
                  ? "text-muted-foreground border-border cursor-not-allowed"
                  : "text-foreground border-border hover:border-primary"
              }`}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
