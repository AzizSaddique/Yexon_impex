import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <NewArrivalsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
