"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, X, Plus, Minus, ArrowLeft, ShieldCheck, 
  Truck, Tag, Sparkles 
} from "lucide-react";
import { useApp } from "@/services/store";

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useApp();
  
  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [governorate, setGovernorate] = useState("cairo");

  // Cart totals
  const subtotal = cart.reduce((sum, item) => sum + (item.product.discount_price || item.product.price) * item.quantity, 0);
  
  // Apply coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "TAXSIS10") {
      setDiscountPercent(10);
      setCouponMsg("تم تطبيق الكود بنجاح! خصم ١٠٪ على جميع المشتريات.");
    } else if (code === "COPTIC15") {
      setDiscountPercent(15);
      setCouponMsg("كود بركة الأعياد مفعّل! خصم ١٥٪ على السلة.");
    } else {
      setDiscountPercent(0);
      setCouponMsg("كود الخصم غير صحيح أو منتهي الصلاحية.");
    }
  };

  // Shipping calculation
  const getShippingCost = () => {
    if (governorate === "cairo" || governorate === "giza") return 50;
    if (governorate === "alex") return 80;
    // Other governorates
    return 100;
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingCost = cart.length > 0 ? getShippingCost() : 0;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.14); // 14% VAT Egypt
  const total = subtotal - discountAmount + shippingCost + taxAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl font-extrabold text-burgundy-800 border-b border-gold-500/10 pb-6 mb-8 flex items-center gap-2">
        <ShoppingBag className="w-8 h-8 text-gold-500" />
        تفاصيل سلة المشتريات
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gold-500/10 p-12 text-center shadow-sm space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-burgundy-800">السلة فارغة حالياً</h3>
            <p className="text-xs text-navy-900/60 leading-relaxed">
              لم تقم بإضافة أي مستلزمات كنسية للسلة بعد. يمكنك تصفح المنتجات الكاملة لتفصيل الملابس أو الدفوف وأدوات المذبح.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-block bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold px-8 py-3 rounded-lg border border-gold-500/20 text-xs transition-colors"
          >
            تصفح المتجر بالكامل
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Cart items table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gold-500/10 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gold-500/5 bg-ivory-200/50 flex justify-between items-center">
                <span className="text-xs font-bold text-navy-950">المنتج</span>
                <span className="text-xs font-bold text-navy-950">الإجمالي الفرعي</span>
              </div>
              
              <div className="divide-y divide-gold-500/10">
                {cart.map((item, idx) => {
                  const pPrice = item.product.discount_price || item.product.price;
                  return (
                    <div key={idx} className="p-6 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center relative group">
                      <div className="flex gap-4 items-center">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name_ar} 
                          className="w-20 h-20 object-cover rounded border border-gold-500/10" 
                        />
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-navy-900">
                            <Link href={`/shop/${item.product.id}`} className="hover:text-burgundy-800 transition-colors">
                              {item.product.name_ar}
                            </Link>
                          </h4>
                          <p className="text-xs text-navy-900/50">SKU: {item.product.sku}</p>
                          {item.selectedVariant && (
                            <p className="text-xs text-gold-600 font-bold">المواصفة: {item.selectedVariant}</p>
                          )}
                          
                          {/* Quantity selectors */}
                          <div className="flex items-center border border-gold-500/20 rounded bg-ivory-200 mt-2 w-fit">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                              className="px-2.5 py-1 text-burgundy-800 hover:bg-gold-500/10 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-4 text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                              className="px-2.5 py-1 text-burgundy-800 hover:bg-gold-500/10 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                        <span className="font-bold text-sm text-burgundy-800">{pPrice * item.quantity} ج.م</span>
                        <span className="text-[10px] text-navy-900/40">({pPrice} ج.م للقطعة)</span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                        className="absolute top-4 left-4 text-navy-900/30 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-full transition-all"
                        title="إزالة المنتج"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-xs font-bold text-red-600 hover:underline border border-dashed border-red-500/20 rounded px-4 py-2 hover:bg-red-50 transition-colors"
              >
                تفريغ سلة المشتريات بالكامل
              </button>
              <Link 
                href="/shop"
                className="flex items-center gap-1.5 text-xs font-bold text-gold-600 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                مواصلة التسوق وإضافة مستلزمات
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            
            {/* Promo code box */}
            <div className="bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-sm font-bold text-burgundy-800 flex items-center gap-2">
                <Tag className="w-4.5 h-4.5 text-gold-500" />
                هل لديك كود خصم؟
              </h3>
              
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="مثال: TAXSIS10..."
                  className="bg-ivory-200 border border-gold-500/15 rounded-lg p-2.5 text-xs font-bold text-center flex-grow uppercase text-burgundy-800 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold px-4 py-2.5 rounded-lg text-xs border border-gold-400 cursor-pointer transition-colors"
                >
                  تطبيق
                </button>
              </form>
              
              {couponMsg && (
                <p className={`text-[10px] font-bold text-center ${discountPercent > 0 ? "text-green-600" : "text-red-500"}`}>
                  {couponMsg}
                </p>
              )}
              <p className="text-[9px] text-navy-900/50 leading-relaxed text-center">
                جرب إدخال كود <span className="font-bold text-gold-600">TAXSIS10</span> للحصول على خصم ١٠٪ أو كود <span className="font-bold text-gold-600">COPTIC15</span> لـ ١٥٪ خصم مبارك!
              </p>
            </div>

            {/* Calculations and Checkout button */}
            <div className="bg-white rounded-2xl border-2 border-gold-500/20 p-6 shadow-md space-y-4">
              <h3 className="font-serif text-base font-bold text-burgundy-800 border-b border-gold-500/10 pb-2.5">
                ملخص الحساب الإجمالي
              </h3>

              <div className="space-y-2.5 text-xs text-navy-900/80">
                <div className="flex justify-between">
                  <span>المجموع الفرعي للمنتجات:</span>
                  <span className="font-bold">{subtotal} ج.م</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>خصم الكوبون ({discountPercent}%):</span>
                    <span>-{discountAmount} ج.م</span>
                  </div>
                )}

                {/* Shipping estimator selection */}
                <div className="flex flex-col gap-1 border-t border-gold-500/5 pt-2">
                  <div className="flex justify-between items-center">
                    <span>تقدير تكلفة الشحن:</span>
                    <span className="font-bold">{shippingCost} ج.م</span>
                  </div>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="bg-ivory-200 border border-gold-500/10 rounded-lg p-2 mt-1 text-[10px] text-right focus:outline-none"
                  >
                    <option value="cairo">القاهرة الكبرى / الجيزة (٥٠ ج.م)</option>
                    <option value="alex">الإسكندرية والساحل (٨٠ ج.م)</option>
                    <option value="others">باقي محافظات وجه بحري وقبلي (١٠٠ ج.م)</option>
                  </select>
                </div>

                <div className="flex justify-between border-t border-gold-500/5 pt-2">
                  <span>ضريبة القيمة المضافة (١٤٪ VAT):</span>
                  <span>{taxAmount}.00 ج.م</span>
                </div>

                <div className="flex justify-between text-burgundy-800 text-base font-extrabold border-t border-gold-500/15 pt-3">
                  <span>المجموع الإجمالي النهائي:</span>
                  <span>{total} ج.م</span>
                </div>
              </div>

              <Link
                href={`/checkout?coupon=${discountPercent > 0 ? couponCode : ""}&gov=${governorate}`}
                className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-burgundy-900/10 hover:scale-[1.02] text-sm text-center"
              >
                <span>الانتقال لصفحة الدفع الآمن</span>
              </Link>

              <div className="border-t border-gold-500/5 pt-4 text-[10px] text-navy-900/50 flex items-center gap-1.5 justify-center">
                <ShieldCheck className="w-4.5 h-4.5 text-gold-500" />
                <span>عملية دفع وحسابات آمنة وموثوقة ١٠٠٪</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
