"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, X, Plus, Minus, ArrowLeft, ShieldCheck, Tag 
} from "lucide-react";
import { useApp } from "@/services/store";
import { validateCoupon } from "@/services/api";

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, language } = useApp();
  
  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [fixedDiscount, setFixedDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [governorate, setGovernorate] = useState("cairo");

  const isAr = language === "ar";

  // Cart totals
  const subtotal = cart.reduce((sum, item) => sum + (item.product.discount_price || item.product.price) * item.quantity, 0);
  
  // Apply coupon
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    
    try {
      const coupon = await validateCoupon(code);
      if (coupon) {
        if (coupon.discount_type === "percentage") {
          setDiscountPercent(coupon.discount_value);
          setFixedDiscount(0);
          setCouponMsg(
            isAr 
              ? `تم تطبيق الكود بنجاح! خصم ${coupon.discount_value}٪ على السلة.`
              : `Coupon applied successfully! ${coupon.discount_value}% off all purchases.`
          );
        } else {
          setFixedDiscount(coupon.discount_value);
          setDiscountPercent(0);
          setCouponMsg(
            isAr 
              ? `تم تطبيق الكود بنجاح! خصم بقيمة ${coupon.discount_value} ج.م على السلة.`
              : `Coupon applied successfully! EGP ${coupon.discount_value} off all purchases.`
          );
        }
      } else {
        setDiscountPercent(0);
        setFixedDiscount(0);
        setCouponMsg(
          isAr
            ? "كوبون الخصم غير صحيح، أو انتهت فترة صلاحيته."
            : "Invalid or expired coupon code."
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Shipping calculation
  const getShippingCost = () => {
    if (governorate === "cairo" || governorate === "giza") return 50;
    if (governorate === "alex") return 80;
    return 100;
  };

  const discountAmount = fixedDiscount > 0 ? fixedDiscount : Math.round((subtotal * discountPercent) / 100);
  const shippingCost = cart.length > 0 ? getShippingCost() : 0;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.14); // 14% VAT Egypt
  const total = subtotal - discountAmount + shippingCost + taxAmount;

  // Dictionaries
  const dict = {
    cartTitle: isAr ? "تفاصيل سلة المشتريات" : "Your Shopping Cart Details",
    emptyTitle: isAr ? "السلة فارغة حالياً" : "Your Cart is Empty",
    emptyDesc: isAr 
      ? "لم تقم بإضافة أي مستلزمات كنسية للسلة بعد. يمكنك تصفح المنتجات الكاملة لتفصيل الملابس أو الدفوف وأدوات المذبح."
      : "You haven't added any church supplies to your cart yet. Browse our products for custom vestments, cymbals, or altar vessels.",
    browseShop: isAr ? "تصفح المتجر بالكامل" : "Browse Full Shop",
    productHeader: isAr ? "المنتج" : "Product",
    subtotalHeader: isAr ? "الإجمالي الفرعي" : "Subtotal",
    optionLabel: isAr ? "المواصفة:" : "Option:",
    perItem: (price: number) => isAr ? `(${price} ج.م للقطعة)` : `(EGP ${price} each)`,
    removeTooltip: isAr ? "إزالة المنتج" : "Remove Item",
    clearCartBtn: isAr ? "تفريغ سلة المشتريات بالكامل" : "Clear Entire Shopping Cart",
    continueBtn: isAr ? "مواصلة التسوق وإضافة مستلزمات" : "Continue Shopping & Add Supplies",
    couponTitle: isAr ? "هل لديك كود خصم؟" : "Have a Coupon Code?",
    couponPlaceholder: isAr ? "مثال: TAXSIS10..." : "e.g. TAXSIS10...",
    couponApply: isAr ? "تطبيق" : "Apply",
    couponTip: isAr 
      ? "جرب إدخال كود TAXSIS10 للحصول على خصم ١٠٪ أو كود COPTIC15 لـ ١٥٪ خصم مبارك!"
      : "Try coupon TAXSIS10 to get 10% off or COPTIC15 for 15% discount!",
    summaryTitle: isAr ? "ملخص الحساب الإجمالي" : "Order Summary",
    subtotalLabel: isAr ? "المجموع الفرعي للمنتجات:" : "Subtotal of products:",
    discountLabel: (pct: number) => isAr ? `خصم الكوبون (${pct}%):` : `Coupon Discount (${pct}%):`,
    shippingCostLabel: isAr ? "تقدير تكلفة الشحن:" : "Estimated Shipping Cost:",
    shippingCairoOpt: isAr ? "القاهرة الكبرى / الجيزة (٥٠ ج.م)" : "Greater Cairo / Giza (EGP 50)",
    shippingAlexOpt: isAr ? "الإسكندرية والساحل (٨٠ ج.م)" : "Alexandria & North Coast (EGP 80)",
    shippingOthersOpt: isAr ? "باقي المحافظات (١٠٠ ج.م)" : "Other Governorates (EGP 100)",
    vatLabel: isAr ? "ضريبة القيمة المضافة (١٤٪ VAT):" : "Value Added Tax (14% VAT):",
    grandTotalLabel: isAr ? "المجموع الإجمالي النهائي:" : "Final Grand Total:",
    checkoutBtn: isAr ? "الانتقال لصفحة الدفع الآمن" : "Proceed to Secure Checkout",
    checkoutSafeBadge: isAr ? "عملية دفع وحسابات آمنة وموثوقة ١٠٠٪" : "100% Secured and Trusted Checkout"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className={`font-serif text-3xl font-extrabold text-burgundy-800 border-b border-gold-500/10 pb-6 mb-8 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
        <ShoppingBag className="w-8 h-8 text-gold-500" />
        <span>{dict.cartTitle}</span>
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gold-500/10 p-12 text-center shadow-sm space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-burgundy-800">{dict.emptyTitle}</h3>
            <p className="text-xs text-navy-900/60 leading-relaxed">
              {dict.emptyDesc}
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-block bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold px-8 py-3 rounded-lg border border-gold-500/20 text-xs transition-colors"
          >
            {dict.browseShop}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Cart items table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gold-500/10 overflow-hidden shadow-sm">
              <div className={`p-6 border-b border-gold-500/5 bg-ivory-200/50 flex justify-between items-center ${isAr ? "" : "flex-row-reverse"}`}>
                <span className="text-xs font-bold text-navy-950">{dict.productHeader}</span>
                <span className="text-xs font-bold text-navy-950">{dict.subtotalHeader}</span>
              </div>
              
              <div className="divide-y divide-gold-500/10">
                {cart.map((item, idx) => {
                  const pPrice = item.product.discount_price || item.product.price;
                  return (
                    <div key={idx} className={`p-6 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center relative group ${isAr ? "" : "flex-row-reverse text-left"}`}>
                      <div className={`flex gap-4 items-center ${isAr ? "" : "flex-row-reverse text-left"}`}>
                        <img 
                          src={item.product.images[0]} 
                          alt={isAr ? item.product.name_ar : item.product.name_en} 
                          className="w-20 h-20 object-cover rounded border border-gold-500/10 shrink-0" 
                        />
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-navy-900">
                            <Link href={`/shop/${item.product.id}`} className="hover:text-burgundy-800 transition-colors">
                              {isAr ? item.product.name_ar : item.product.name_en}
                            </Link>
                          </h4>
                          <p className="text-xs text-navy-900/50">SKU: {item.product.sku}</p>
                          {item.selectedVariant && (
                            <p className="text-xs text-gold-600 font-bold">
                              {dict.optionLabel} {item.selectedVariant}
                            </p>
                          )}
                          
                          {/* Quantity selectors */}
                          <div className="flex items-center border border-gold-500/20 rounded bg-ivory-200 mt-2 w-fit">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                              className="px-2.5 py-1 text-burgundy-800 hover:bg-gold-500/10 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-4 text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                              className="px-2.5 py-1 text-burgundy-800 hover:bg-gold-500/10 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className={`flex flex-col gap-2 w-full sm:w-auto ${isAr ? "items-end" : "items-start"}`}>
                        <span className="font-bold text-sm text-burgundy-800">
                          {isAr ? `${pPrice * item.quantity} ج.م` : `EGP ${pPrice * item.quantity}`}
                        </span>
                        <span className="text-[10px] text-navy-900/40">{dict.perItem(pPrice)}</span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                        className={`absolute top-4 ${isAr ? "left-4" : "right-4"} text-navy-900/30 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-full transition-all cursor-pointer`}
                        title={dict.removeTooltip}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className={`flex justify-between items-center ${isAr ? "" : "flex-row-reverse"}`}>
              <button
                onClick={clearCart}
                className="text-xs font-bold text-red-600 hover:underline border border-dashed border-red-500/20 rounded px-4 py-2 hover:bg-red-50 transition-colors cursor-pointer"
              >
                {dict.clearCartBtn}
              </button>
              <Link 
                href="/shop"
                className={`flex items-center gap-1.5 text-xs font-bold text-gold-600 hover:underline ${isAr ? "" : "flex-row-reverse"}`}
              >
                <ArrowLeft className={`w-3.5 h-3.5 ${isAr ? "" : "rotate-180"}`} />
                <span>{dict.continueBtn}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            
            {/* Promo code box */}
            <div className={`bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm space-y-4 ${isAr ? "text-right" : "text-left"}`}>
              <h3 className={`font-serif text-sm font-bold text-burgundy-800 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                <Tag className="w-4.5 h-4.5 text-gold-500" />
                <span>{dict.couponTitle}</span>
              </h3>
              
              <form onSubmit={handleApplyCoupon} className={`flex gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={dict.couponPlaceholder}
                  className="bg-ivory-200 border border-gold-500/15 rounded-lg p-2.5 text-xs font-bold text-center flex-grow uppercase text-burgundy-800 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold px-4 py-2.5 rounded-lg text-xs border border-gold-400 cursor-pointer transition-colors"
                >
                  {dict.couponApply}
                </button>
              </form>
              
              {couponMsg && (
                <p className={`text-[10px] font-bold text-center ${discountPercent > 0 ? "text-green-600" : "text-red-500"}`}>
                  {couponMsg}
                </p>
              )}
              <p className="text-[9px] text-navy-900/50 leading-relaxed text-center">
                {dict.couponTip}
              </p>
            </div>

            {/* Calculations and Checkout button */}
            <div className={`bg-white rounded-2xl border-2 border-gold-500/20 p-6 shadow-md space-y-4 ${isAr ? "text-right" : "text-left"}`}>
              <h3 className="font-serif text-base font-bold text-burgundy-800 border-b border-gold-500/10 pb-2.5">
                {dict.summaryTitle}
              </h3>

              <div className="space-y-2.5 text-xs text-navy-900/80">
                <div className={`flex justify-between ${isAr ? "" : "flex-row-reverse"}`}>
                  <span>{dict.subtotalLabel}</span>
                  <span className="font-bold">
                    {isAr ? `${subtotal} ج.م` : `EGP ${subtotal}`}
                  </span>
                </div>
                
                {discountAmount > 0 && (
                  <div className={`flex justify-between text-green-600 font-semibold ${isAr ? "" : "flex-row-reverse"}`}>
                    <span>{dict.discountLabel(discountPercent)}</span>
                    <span>-{isAr ? `${discountAmount} ج.م` : `EGP ${discountAmount}`}</span>
                  </div>
                )}

                {/* Shipping estimator */}
                <div className="flex flex-col gap-1 border-t border-gold-500/5 pt-2">
                  <div className={`flex justify-between items-center ${isAr ? "" : "flex-row-reverse"}`}>
                    <span>{dict.shippingCostLabel}</span>
                    <span className="font-bold">
                      {isAr ? `${shippingCost} ج.م` : `EGP ${shippingCost}`}
                    </span>
                  </div>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className={`bg-ivory-200 border border-gold-500/10 rounded-lg p-2 mt-1 text-[10px] focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  >
                    <option value="cairo">{dict.shippingCairoOpt}</option>
                    <option value="alex">{dict.shippingAlexOpt}</option>
                    <option value="others">{dict.shippingOthersOpt}</option>
                  </select>
                </div>

                <div className={`flex justify-between border-t border-gold-500/5 pt-2 ${isAr ? "" : "flex-row-reverse"}`}>
                  <span>{dict.vatLabel}</span>
                  <span>{isAr ? `${taxAmount}.00 ج.م` : `EGP ${taxAmount}.00`}</span>
                </div>

                <div className={`flex justify-between text-burgundy-800 text-base font-extrabold border-t border-gold-500/15 pt-3 ${isAr ? "" : "flex-row-reverse"}`}>
                  <span>{dict.grandTotalLabel}</span>
                  <span>{isAr ? `${total} ج.م` : `EGP ${total}`}</span>
                </div>
              </div>

              <Link
                href={`/checkout?coupon=${(discountPercent > 0 || fixedDiscount > 0) ? couponCode : ""}&gov=${governorate}`}
                className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-burgundy-900/10 hover:scale-[1.02] text-sm text-center"
              >
                <span>{dict.checkoutBtn}</span>
              </Link>

              <div className="border-t border-gold-500/5 pt-4 text-[10px] text-navy-900/50 flex items-center gap-1.5 justify-center">
                <ShieldCheck className="w-4.5 h-4.5 text-gold-500" />
                <span>{dict.checkoutSafeBadge}</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
