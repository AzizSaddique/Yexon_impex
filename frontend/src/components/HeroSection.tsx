import { useState, useEffect } from "react";
import heroBg1 from "@/assets/hero-bg.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";

const heroImages = [
  { src: heroBg1, alt: "Motorcycle rider on the open highway at dusk" },
  { src: heroBg2, alt: "Rider in premium leather gear on a desert highway" },
  { src: heroBg3, alt: "Riders with sport bikes in an industrial warehouse" },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {heroImages.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/1920x1080/cccccc/000000?text=Image+Not+Available';
          }}
        />
      ))}
      <div className="absolute inset-0 overlay-dark-strong" />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-10 h-1 transition-all duration-300 ${
              i === currentIndex ? "bg-primary" : "bg-foreground/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 animate-fade-in-up">
        <p className="text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-primary mb-8">
          Premium Leather Collection
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 text-foreground">
         Yexon impex
         <br/>
         <span className="text-foreground text-4xl font-bold uppercase tracking-wider text-center inline-block ">Manufacturers & Exporters</span>
        </h1>
        
        <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto mb-8">
          Engineered for performance. Crafted for riders who demand the best.
        </p>
        <a
          href="#arrivals"
          className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
        >
          Explore Products
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
