import React, { createContext, useContext, useState, useEffect } from "react";
import { FlavourItem, SIGNATURE_FLAVOURS, PARLOUR_INFO } from "@/data/scoopData";
import { PolicyTab } from "@/data/policiesData";

export interface CartItem {
  id: string; // unique cart entry id
  flavourId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  servingType?: "Cone" | "Cup" | "Waffle Bowl";
  toppings?: string[];
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isCustomizerOpen: boolean;
  isFindUsOpen: boolean;
  isPolicyOpen: boolean;
  activePolicyTab: PolicyTab;
  selectedFlavour: FlavourItem | null;
  promoCode: string;
  discount: number;
  addToCart: (flavour: FlavourItem, servingType?: "Cone" | "Cup" | "Waffle Bowl", toppings?: string[]) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openCustomizer: (flavour: FlavourItem) => void;
  closeCustomizer: () => void;
  openFindUs: () => void;
  closeFindUs: () => void;
  openPolicy: (tab?: PolicyTab) => void;
  closePolicy: () => void;
  applyPromoCode: (code: string) => boolean;
  toastMessage: string | null;
  triggerToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scoop_cart");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isFindUsOpen, setIsFindUsOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState<PolicyTab>("privacy");
  const [selectedFlavour, setSelectedFlavour] = useState<FlavourItem | null>(null);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("scoop_cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Handle policy hash navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashCheck = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      const validTabs: PolicyTab[] = ["privacy", "terms", "refunds", "shipping", "allergens", "cookies"];
      if (validTabs.includes(hash as PolicyTab)) {
        setActivePolicyTab(hash as PolicyTab);
        setIsPolicyOpen(true);
      }
    };

    handleHashCheck();
    window.addEventListener("hashchange", handleHashCheck);
    return () => window.removeEventListener("hashchange", handleHashCheck);
  }, []);

  const openPolicy = (tab?: PolicyTab) => {
    if (tab) {
      setActivePolicyTab(tab);
    }
    setIsPolicyOpen(true);
  };

  const closePolicy = () => {
    setIsPolicyOpen(false);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const addToCart = (
    flavour: FlavourItem,
    servingType: "Cone" | "Cup" | "Waffle Bowl" = "Cone",
    toppings: string[] = []
  ) => {
    const toppingsPrice = toppings.length * 20;
    const basePrice = flavour.price + toppingsPrice + (servingType === "Waffle Bowl" ? 30 : 0);
    const existingIndex = cart.findIndex(
      (item) =>
        item.flavourId === flavour.id &&
        item.servingType === servingType &&
        JSON.stringify(item.toppings || []) === JSON.stringify(toppings)
    );

    const updated = [...cart];
    if (existingIndex > -1 && updated[existingIndex]) {
      const currentItem = updated[existingIndex];
      updated[existingIndex] = {
        ...currentItem,
        quantity: currentItem.quantity + 1,
      };
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `${flavour.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        flavourId: flavour.id,
        name: flavour.name,
        price: basePrice,
        quantity: 1,
        image: flavour.image,
        servingType,
        toppings,
      };
      setCart((prev) => [...prev, newItem]);
    }

    triggerToast(`Added ${flavour.name} (${servingType}) to your order! 🍦`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setPromoCode("");
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "BUY2GET1" || clean === "SCOOPFREE" || clean === "HAPPY") {
      setPromoCode(clean);
      setDiscount(110); // free scoop value
      triggerToast("Promo code applied! Free scoop discount added ✨");
      return true;
    } else {
      triggerToast("Invalid promo code. Try 'BUY2GET1' 🎉");
      return false;
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = Math.max(0, cartSubtotal - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        isSearchOpen,
        isCustomizerOpen,
        isFindUsOpen,
        isPolicyOpen,
        activePolicyTab,
        selectedFlavour,
        promoCode,
        discount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        openCustomizer: (flavour: FlavourItem) => {
          setSelectedFlavour(flavour);
          setIsCustomizerOpen(true);
        },
        closeCustomizer: () => {
          setIsCustomizerOpen(false);
          setSelectedFlavour(null);
        },
        openFindUs: () => setIsFindUsOpen(true),
        closeFindUs: () => setIsFindUsOpen(false),
        openPolicy,
        closePolicy,
        applyPromoCode,
        toastMessage,
        triggerToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
