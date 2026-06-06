import cat01 from "@/assets/YEXON IMPEX/mainHomecat01-1.jpg";
import cat02 from "@/assets/YEXON IMPEX/mainHomecat02-1.jpg";
import cat03 from "@/assets/YEXON IMPEX/mainHomecat03-1.jpg";
import cat04 from "@/assets/YEXON IMPEX/mainHomecat04-1.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { mainCategories } from "@/data/products";

const categoryImages: Record<string, string> = {
  Bags: cat01,
  "Tactical Jackets": cat02,
  Gloves: cat03,
  Hoodies: cat04,
};

const CategoriesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { setSelectedCategory } = useApp();
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate("/products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="categories" className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-2">Browse</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-foreground">
            Featured Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 justify-items-center">
          {mainCategories.map((cat, i) => (
            <div
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`group relative w-full max-w-[576px] aspect-[576/328] overflow-hidden cursor-pointer transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              <img
                src={categoryImages[cat] || cat01}
                alt={cat}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/576x328/cccccc/000000?text=No+Image';
                }}
              />
              <div className="absolute inset-0 overlay-dark group-hover:bg-black/60 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                <h3 className="text-lg font-bold uppercase tracking-wide text-foreground mb-3">
                  {cat}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(cat);
                  }}
                  className="bg-primary text-primary-foreground px-6 py-2 text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 duration-300"
                >
                  Products
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
