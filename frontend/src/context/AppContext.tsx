import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

type AppContextType = {
  cart: Product[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInCart: (productId: number) => boolean;
  isInWishlist: (productId: number) => boolean;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInCart = (productId: number) => {
    return cart.some((p) => p.id === productId);
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((p) => p.id === productId);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        isInCart,
        isInWishlist,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
