import React, { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { recordOrder } from "@/lib/analytics";

export function CartDrawer() {
  const {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    promoCode,
    discount,
    applyPromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  React.useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      // Record order into live analytics database
      recordOrder(
        cart.map((item) => ({
          flavourId: item.flavourId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          servingType: item.servingType,
          toppings: item.toppings,
          image: item.image,
        })),
        rawSubtotal,
        discount,
        promoCode || undefined,
        {
          name: "Online Order Customer",
          phone: "+91 75279 89807",
          address: "Storefront Delivery / Pickup",
          orderType: "Delivery",
        }
      );

      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  const handleExploreFlavours = () => {
    closeCart();
    setTimeout(() => {
      const section = document.getElementById("flavours") || document.getElementById("menu");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.href = "/#flavours";
      }
    }, 150);
  };

  const handleBackToMenu = () => {
    setOrderComplete(false);
    closeCart();
    setTimeout(() => {
      const section = document.getElementById("flavours") || document.getElementById("menu");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.href = "/#flavours";
      }
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div className="w-screen max-w-md h-full bg-[#FAF6F0] p-4 sm:p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E8DDD5] pb-3 sm:pb-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FCE7EC] text-[#D8436B]">
                <ShoppingBag className="h-4.5 w-4.5" />
              </div>
              <h2 className="font-display text-base sm:text-xl font-bold text-[#221815]">
                Your Sweet Order ({cartCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-[#796660] hover:bg-[#F4EBE4] hover:text-[#221815] active:scale-95 cursor-pointer"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body: Cart items or empty state */}
          <div className="flex-1 min-h-0 overflow-y-auto py-3 sm:py-6">
            {orderComplete ? (
              <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#E2EEDA] text-[#2B4524] mb-3 sm:mb-4 animate-bounce">
                  <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#221815]">
                  Order Placed! 🍦
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#796660] max-w-xs">
                  Your artisanal scoops are being freshly crafted with love. Enjoy every bite!
                </p>
                <button
                  onClick={handleBackToMenu}
                  className="mt-5 sm:mt-6 rounded-full bg-[#D8436B] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#C43862] active:scale-95 cursor-pointer transition-all"
                >
                  Back to Menu
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12">
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#FCE7EC] text-[#D8436B] mb-3 sm:mb-4">
                  <ShoppingBag className="h-7 w-7 sm:h-9 sm:w-9 stroke-[1.5]" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#221815]">
                  Your cart is empty
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#796660] max-w-xs">
                  Discover our freshly crafted flavours and treat yourself to happiness!
                </p>
                <button
                  onClick={handleExploreFlavours}
                  className="mt-5 sm:mt-6 rounded-full bg-[#221815] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#3D2C28] active:scale-95 cursor-pointer transition-all hover:scale-105"
                >
                  Explore Flavours
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 sm:gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2.5 sm:gap-4 rounded-2xl bg-white p-2.5 sm:p-3.5 shadow-xs border border-[#E8DDD5]/80"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-13 w-13 sm:h-16 sm:w-16 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex flex-1 flex-col min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display text-xs sm:text-sm font-bold text-[#221815] truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A6928B] hover:text-[#EF4444] transition-colors p-1 shrink-0 active:scale-90"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-1 mt-0.5">
                        <span className="rounded-full bg-[#FCE7EC] px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-[#D8436B]">
                          {item.servingType || "Cone"}
                        </span>
                        {item.toppings?.map((top, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-[#FAF6F0] px-1.5 py-0.5 text-[8px] sm:text-[9px] text-[#796660]"
                          >
                            +{top}
                          </span>
                        ))}
                      </div>

                      <div className="mt-2 sm:mt-2.5 flex items-center justify-between">
                        <span className="font-display text-xs sm:text-sm font-bold text-[#221815]">
                          ₹{item.price * item.quantity}
                        </span>

                        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#F4EBE4] px-1.5 sm:px-2 py-0.5 sm:py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full bg-white text-[#221815] shadow-2xs hover:bg-[#D8436B] hover:text-white active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-[11px] sm:text-xs font-bold text-[#221815] min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full bg-white text-[#221815] shadow-2xs hover:bg-[#D8436B] hover:text-white active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Area */}
          {cart.length > 0 && !orderComplete && (
            <div className="border-t border-[#E8DDD5] pt-3 sm:pt-4 flex flex-col gap-2 sm:gap-3 shrink-0">
              
              {/* Promo Code Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code (BUY2GET1)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 rounded-full border border-[#E8DDD5] bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#D8436B]"
                />
                <button
                  onClick={() => {
                    if (inputCode) applyPromoCode(inputCode);
                  }}
                  className="rounded-full bg-[#F4EBE4] px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-[#221815] hover:bg-[#D8436B] hover:text-white transition-colors active:scale-95"
                >
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-1 text-xs text-[#5C4A44] pt-0.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{rawSubtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#D8436B] font-semibold">
                    <span>Discount ({promoCode})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#E8DDD5] pt-1.5 font-display text-sm sm:text-base font-bold text-[#221815]">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                disabled={isCheckingOut}
                onClick={handleCheckout}
                className="mt-0.5 flex w-full items-center justify-center gap-2 rounded-full bg-[#D8436B] py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-[#C43862] hover:shadow-lg disabled:opacity-50 active:scale-98"
              >
                {isCheckingOut ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Confirm Order • ₹{cartTotal}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
