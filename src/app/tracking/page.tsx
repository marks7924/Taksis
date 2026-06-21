"use client";

import React, { useState } from "react";
import { 
  Search, ClipboardList, Box, Truck, RefreshCw, AlertTriangle, ShieldCheck
} from "lucide-react";
import { getOrderByTracking, Order } from "@/services/api";
import { useApp } from "@/services/store";

export default function OrderTracking() {
  const { addNotification, addToCart, language } = useApp();
  const [trackingNo, setTrackingNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [requestReturnMsg, setRequestReturnMsg] = useState("");

  const isAr = language === "ar";

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNo.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setRequestReturnMsg("");
    try {
      const ord = await getOrderByTracking(trackingNo.trim());
      if (ord) {
        setOrder(ord);
      } else {
        setOrder(null);
        setErrorMsg(
          isAr 
            ? "عذراً، لم نجد أي طلب مسجل بهذا الرقم. يرجى التأكد من كتابة كود التتبع بشكل صحيح (مثال: TAX-123456)."
            : "Sorry, we could not find an order under this code. Make sure you entered it correctly (e.g., TAX-123456)."
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(isAr ? "حدث خطأ أثناء البحث عن الطلب." : "An error occurred while tracking the order.");
    } finally {
      setLoading(false);
    }
  };

  // Reorder functionality
  const handleReorder = () => {
    if (!order) return;
    order.items.forEach(item => {
      const mockProduct = {
        id: item.id,
        sku: "TS-REORDER",
        name_ar: item.name_ar,
        name_en: item.name_en,
        description_ar: "إعادة طلب منتج",
        description_en: "Reordered Item",
        price: item.price,
        category_id: "cat-19",
        stock_quantity: 10,
        images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80"],
        specifications: {},
        variants: [],
        rating: 5,
        review_count: 1,
        is_featured: false,
        is_best_seller: false,
        is_new_arrival: false,
        is_limited_edition: false
      };
      addToCart(mockProduct, item.quantity, item.selectedVariant);
    });
    addNotification(
      isAr 
        ? "تم إضافة جميع أصناف الطلب السابق إلى السلة لإعادة الشراء!"
        : "All items from the previous order have been added to the cart for re-purchase!"
    );
  };

  const handleReturnRequest = () => {
    setRequestReturnMsg(
      isAr 
        ? "تم تسجيل طلب الإرجاع/الاستبدال الخاص بك. سيقوم مسؤول علاقات العملاء بالاتصال بك هاتفياً لترتيب استلام الطرد."
        : "Your return/exchange request has been logged. Our customer service agent will contact you shortly to coordinate courier pickup."
    );
    addNotification(isAr ? "تم تسجيل طلب الإرجاع بنجاح" : "Return request submitted successfully");
  };

  const getStepIndex = (status: Order["status"]) => {
    if (status === "pending") return 0;
    if (status === "processing") return 1;
    if (status === "completed") return 2;
    return 3;
  };

  const steps = isAr ? [
    { title: "قيد المراجعة", desc: "تم استلام الطلب وتدقيق المقاسات الكنسية", icon: ClipboardList },
    { title: "قيد التجهيز", desc: "جاري تطريز الملابس وصباغة وتجهيز الأثاث", icon: Box },
    { title: "تم الشحن", desc: "تم تسليم الطرد لشركة الشحن وتجهيز بوليصة التوصيل", icon: Truck }
  ] : [
    { title: "Under Review", desc: "Order received & sizing specifications verified", icon: ClipboardList },
    { title: "In Preparation", desc: "Embroidering vestments & crafting metal/woodwork", icon: Box },
    { title: "Dispatched", desc: "Package handed to courier & waybill printed", icon: Truck }
  ];

  const stepIndex = order ? getStepIndex(order.status) : 0;

  // Dictionaries
  const dict = {
    title: isAr ? "تتبع حالة طلباتك الكنسية" : "Track Coptic Liturgical Orders",
    subtitle: isAr
      ? "أدخل كود تتبع الشحنة المكون من 6 أرقام والموجود في فاتورتك لمراقبة مراحل تطريز ملابسك وصياغة أوانيك."
      : "Enter the tracking code from your invoice to monitor the tailoring, forging, or carving progress of your order.",
    inputPlaceholder: isAr ? "مثال: TAX-123456..." : "e.g. TAX-123456...",
    searchBtn: isAr ? "تتبع الآن" : "Track Now",
    searching: isAr ? "جاري البحث..." : "Searching...",
    detailsHeading: (code: string) => isAr ? `تفاصيل الطلب: ${code}` : `Order Details: ${code}`,
    dateLabel: (date: string) => isAr 
      ? `تاريخ الإرسال: ${new Date(date).toLocaleString("ar-EG")}`
      : `Dispatched Date: ${new Date(date).toLocaleString("en-US")}`,
    statusLabel: isAr ? "الحالة:" : "Status:",
    statusPending: isAr ? "قيد المراجعة" : "Under Review",
    statusProcessing: isAr ? "قيد التجهيز والتطريز" : "In Tailoring & Preparation",
    statusCompleted: isAr ? "تم الشحن والتسليم" : "Shipped & Delivered",
    statusCancelled: isAr ? "ملغى" : "Cancelled",
    parcelHeading: isAr ? "تفاصيل الطرد الكنسي المشتراة:" : "Liturgical Package Items Purchased:",
    qtyLabel: (qty: number, price: number) => isAr ? `الكمية: ${qty} × ${price} ج.م` : `Qty: ${qty} × EGP ${price}`,
    paymentLabel: isAr ? "طريقة الدفع المحددة:" : "Selected Payment Method:",
    payCod: isAr ? "الدفع نقدًا عند استلام المندوب" : "Cash on Delivery (COD)",
    payCard: isAr ? "تحويل إنستاباي / فيزا كارد" : "InstaPay / Visa Card Payment",
    totalLabel: isAr ? "المبلغ الإجمالي المدفوع:" : "Total Amount Paid:",
    totalValue: (total: number) => isAr ? `${total} ج.م` : `EGP ${total}`,
    reorderBtn: isAr ? "إعادة طلب هذه المستلزمات مجدداً" : "Reorder These Items Again",
    returnBtn: isAr ? "تقديم طلب إرجاع أو استبدال" : "Request Return or Exchange"
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl font-extrabold text-burgundy-800">
          {dict.title}
        </h1>
        <p className="text-sm text-navy-900/60 max-w-md mx-auto leading-relaxed">
          {dict.subtitle}
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleTrackSubmit} className={`flex flex-col sm:flex-row gap-3 ${isAr ? "" : "flex-row-reverse"}`}>
          <input
            type="text"
            value={trackingNo}
            onChange={(e) => setTrackingNo(e.target.value)}
            placeholder={dict.inputPlaceholder}
            className="flex-grow bg-ivory-200 border border-gold-500/15 rounded-lg p-3 text-sm text-center uppercase font-bold text-burgundy-800 focus:outline-none focus:border-gold-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold px-8 py-3 rounded-lg text-sm border border-gold-500/20 cursor-pointer transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4.5 h-4.5" />
            <span>{loading ? dict.searching : dict.searchBtn}</span>
          </button>
        </form>
        
        {errorMsg && (
          <p className="text-xs font-semibold text-red-500 text-center mt-3 animate-pulse">{errorMsg}</p>
        )}
      </div>

      {/* Results */}
      {order && (
        <div className={`bg-white rounded-2xl border border-gold-500/15 shadow-xl p-6 md:p-8 space-y-10 animate-fade-in ${isAr ? "text-right" : "text-left"}`}>
          
          {/* Result Header */}
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-500/10 pb-4 ${isAr ? "" : "flex-row-reverse"}`}>
            <div>
              <h3 className="font-bold text-sm text-navy-950">{dict.detailsHeading(order.tracking_number)}</h3>
              <p className="text-[10px] text-navy-900/40 mt-0.5">{dict.dateLabel(order.created_at)}</p>
            </div>
            <div className={isAr ? "text-left" : "text-right"}>
              <span className={`inline-block font-bold text-xs px-3 py-1 rounded ${
                order.status === "completed" ? "bg-green-100 text-green-700" :
                order.status === "processing" ? "bg-blue-100 text-blue-700" :
                order.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
              }`}>
                {dict.statusLabel} {
                  order.status === "pending" ? dict.statusPending :
                  order.status === "processing" ? dict.statusProcessing :
                  order.status === "completed" ? dict.statusCompleted : dict.statusCancelled
                }
              </span>
            </div>
          </div>

          {/* Timeline */}
          {order.status !== "cancelled" && (
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 relative pt-4 ${isAr ? "" : "flex-row-reverse"}`}>
              {/* Linked Line */}
              <div className="hidden md:block absolute top-[44px] right-[16.6%] left-[16.6%] h-1 bg-gold-500/10 z-0">
                <div 
                  className="bg-gold-500 h-full transition-all duration-500" 
                  style={{ width: `${(stepIndex / 2) * 100}%` }}
                />
              </div>

              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = isAr ? (idx <= stepIndex) : ((2 - idx) <= stepIndex);
                const isActive = isAr ? (idx === stepIndex) : ((2 - idx) === stepIndex);

                return (
                  <div key={idx} className="flex flex-col items-center text-center relative z-10 space-y-2.5">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted 
                        ? "bg-burgundy-800 border-gold-500 text-gold-300 shadow-md" 
                        : "bg-ivory-200 border-gold-500/10 text-navy-900/30"
                    } ${isActive ? "animate-pulse ring-4 ring-gold-500/20" : ""}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-xs ${isCompleted ? "text-burgundy-800" : "text-navy-900/40"}`}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-navy-900/50 leading-relaxed max-w-[200px] mx-auto mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table summary */}
          <div className="border-t border-gold-500/10 pt-6 space-y-4">
            <h4 className="font-bold text-xs text-burgundy-800">{dict.parcelHeading}</h4>
            
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center py-2 border-b border-dashed border-gold-500/5 text-xs ${isAr ? "" : "flex-row-reverse"}`}>
                  <div className={isAr ? "text-right" : "text-left"}>
                    <span className="font-semibold text-navy-900">{isAr ? item.name_ar : item.name_en}</span>
                    {item.selectedVariant && (
                      <span className="block text-[10px] text-gold-600 font-bold mt-0.5">({item.selectedVariant})</span>
                    )}
                  </div>
                  <span className="font-bold text-navy-900/70">{dict.qtyLabel(item.quantity, item.price)}</span>
                </div>
              ))}
            </div>

            <div className={`flex justify-between text-xs text-navy-900/60 pt-2 border-t border-gold-500/5 ${isAr ? "" : "flex-row-reverse"}`}>
              <span>{dict.paymentLabel}</span>
              <span className="font-bold text-navy-950">
                {order.payment_method === "cod" ? dict.payCod : dict.payCard}
              </span>
            </div>

            <div className={`flex justify-between text-sm font-bold text-burgundy-800 ${isAr ? "" : "flex-row-reverse"}`}>
              <span>{dict.totalLabel}</span>
              <span>{dict.totalValue(order.total)}</span>
            </div>
          </div>

          {/* Action trigger widgets */}
          <div className={`border-t border-gold-500/10 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center ${isAr ? "" : "flex-row-reverse"}`}>
            <button
              onClick={handleReorder}
              className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold py-2.5 px-6 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow cursor-pointer border border-gold-500/30"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{dict.reorderBtn}</span>
            </button>

            {order.status === "completed" && (
              <div className={`flex flex-col ${isAr ? "items-end" : "items-start"} gap-2`}>
                {requestReturnMsg ? (
                  <p className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded border border-green-500/10">
                    {requestReturnMsg}
                  </p>
                ) : (
                  <button
                    onClick={handleReturnRequest}
                    className="text-xs font-bold text-red-600 hover:underline border border-dashed border-red-500/20 rounded px-4 py-2 hover:bg-red-50 transition-all cursor-pointer"
                  >
                    {dict.returnBtn}
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
