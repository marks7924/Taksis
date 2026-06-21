"use client";

import React, { useState } from "react";
import { 
  Search, ClipboardList, CheckCircle2, Truck, Box, Calendar, 
  ArrowLeft, RefreshCw, AlertTriangle, ShieldCheck, Mail 
} from "lucide-react";
import { getOrderByTracking, Order } from "@/services/api";
import { useApp } from "@/services/store";

export default function OrderTracking() {
  const { addNotification, addToCart } = useApp();
  const [trackingNo, setTrackingNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [requestReturnMsg, setRequestReturnMsg] = useState("");

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
        setErrorMsg("عذراً، لم نجد أي طلب مسجل بهذا الرقم. يرجى التأكد من كتابة كود التتبع بشكل صحيح (مثال: TAX-123456).");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("حدث خطأ أثناء البحث عن الطلب.");
    } finally {
      setLoading(false);
    }
  };

  // Reorder functionality
  const handleReorder = () => {
    if (!order) return;
    // We add all products from this order to the cart again
    order.items.forEach(item => {
      // Find matching static product details or mock a product schema to insert
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
    addNotification("تم إضافة جميع أصناف الطلب السابق إلى السلة لإعادة الشراء!");
  };

  // Return request submission mock
  const handleReturnRequest = () => {
    setRequestReturnMsg("تم تسجيل طلب الإرجاع/الاستبدال الخاص بك. سيقوم مسؤول علاقات العملاء بالاتصال بك هاتفياً لترتيب استلام الطرد.");
    addNotification("تم تسجيل طلب الإرجاع بنجاح");
  };

  // Determine active step index
  // pending -> 0, processing -> 1, completed -> 2
  const getStepIndex = (status: Order["status"]) => {
    if (status === "pending") return 0;
    if (status === "processing") return 1;
    if (status === "completed") return 2;
    return 3; // For cancelled or returned, we will handle accordingly
  };

  const steps = [
    { title: "قيد المراجعة", desc: "تم استلام الطلب وتدقيق المقاسات الكنسية", icon: ClipboardList },
    { title: "قيد التجهيز", desc: "جاري تطريز الملابس وصباغة وتجهيز الأثاث", icon: Box },
    { title: "تم الشحن", desc: "تم تسليم الطرد لشركة الشحن وتجهيز بوليصة التوصيل", icon: Truck }
  ];

  const stepIndex = order ? getStepIndex(order.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      
      {/* Editorial Title */}
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl font-extrabold text-burgundy-800">
          تتبع حالة طلباتك الكنسية
        </h1>
        <p className="text-sm text-navy-900/60 max-w-md mx-auto leading-relaxed">
          أدخل كود تتبع الشحنة المكون من 6 أرقام والموجود في فاتورتك لمراقبة مراحل تطريز ملابسك وصياغة أوانيك.
        </p>
      </div>

      {/* Track form */}
      <div className="bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={trackingNo}
            onChange={(e) => setTrackingNo(e.target.value)}
            placeholder="مثال: TAX-123456..."
            className="flex-grow bg-ivory-200 border border-gold-500/15 rounded-lg p-3 text-sm text-center uppercase font-bold text-burgundy-800 focus:outline-none focus:border-gold-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold px-8 py-3 rounded-lg text-sm border border-gold-500/20 cursor-pointer transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4.5 h-4.5" />
            <span>{loading ? "جاري البحث..." : "تتبع الآن"}</span>
          </button>
        </form>
        
        {errorMsg && (
          <p className="text-xs font-semibold text-red-500 text-center mt-3 animate-pulse">{errorMsg}</p>
        )}
      </div>

      {/* TRACKING DATA DETAILS VIEW */}
      {order && (
        <div className="bg-white rounded-2xl border border-gold-500/15 shadow-xl p-6 md:p-8 space-y-10 text-right animate-fade-in">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-500/10 pb-4">
            <div>
              <h3 className="font-bold text-sm text-navy-950">تفاصيل الطلب: {order.tracking_number}</h3>
              <p className="text-[10px] text-navy-900/40 mt-0.5">تاريخ الإرسال: {new Date(order.created_at).toLocaleString("ar-EG")}</p>
            </div>
            <div className="text-left">
              <span className={`inline-block font-bold text-xs px-3 py-1 rounded ${
                order.status === "completed" ? "bg-green-100 text-green-700" :
                order.status === "processing" ? "bg-blue-100 text-blue-700" :
                order.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
              }`}>
                الحالة: {
                  order.status === "pending" ? "قيد المراجعة" :
                  order.status === "processing" ? "قيد التجهيز والتطريز" :
                  order.status === "completed" ? "تم الشحن والتسليم" : "ملغى"
                }
              </span>
            </div>
          </div>

          {/* Visual Timeline Steps progress */}
          {order.status !== "cancelled" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative pt-4">
              
              {/* Horizontal linking line in desktop */}
              <div className="hidden md:block absolute top-[44px] right-[16.6%] left-[16.6%] h-1 bg-gold-500/10 z-0">
                <div 
                  className="bg-gold-500 h-full transition-all duration-500" 
                  style={{ width: `${(stepIndex / 2) * 100}%` }}
                />
              </div>

              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx <= stepIndex;
                const isActive = idx === stepIndex;

                return (
                  <div key={idx} className="flex flex-col items-center text-center relative z-10 space-y-2.5">
                    {/* Circle Icon */}
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

          {/* Ordered items details */}
          <div className="border-t border-gold-500/10 pt-6 space-y-4">
            <h4 className="font-bold text-xs text-burgundy-800">تفاصيل الطرد الكنسي المشتراة:</h4>
            
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-dashed border-gold-500/5 text-xs">
                  <div>
                    <span className="font-semibold text-navy-900">{item.name_ar}</span>
                    {item.selectedVariant && (
                      <span className="block text-[10px] text-gold-600 font-bold mt-0.5">({item.selectedVariant})</span>
                    )}
                  </div>
                  <span className="font-bold text-navy-900/70">الكمية: {item.quantity} × {item.price} ج.م</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-navy-900/60 pt-2 border-t border-gold-500/5">
              <span>طريقة الدفع المحددة:</span>
              <span className="font-bold text-navy-950">
                {order.payment_method === "cod" ? "الدفع نقدًا عند استلام المندوب" : "تحويل إنستاباي / فيزا كارد"}
              </span>
            </div>

            <div className="flex justify-between text-sm font-bold text-burgundy-800">
              <span>المبلغ الإجمالي المدفوع:</span>
              <span>{order.total} ج.م</span>
            </div>
          </div>

          {/* Reorder / Return widgets */}
          <div className="border-t border-gold-500/10 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            
            {/* Reorder */}
            <button
              onClick={handleReorder}
              className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold py-2.5 px-6 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow cursor-pointer border border-gold-500/30"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>إعادة طلب هذه المستلزمات مجدداً</span>
            </button>

            {/* Return Request */}
            {order.status === "completed" && (
              <div className="flex flex-col items-end gap-2">
                {requestReturnMsg ? (
                  <p className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded border border-green-500/10">
                    {requestReturnMsg}
                  </p>
                ) : (
                  <button
                    onClick={handleReturnRequest}
                    className="text-xs font-bold text-red-600 hover:underline border border-dashed border-red-500/20 rounded px-4 py-2 hover:bg-red-50 transition-all cursor-pointer"
                  >
                    تقديم طلب إرجاع أو استبدال
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
