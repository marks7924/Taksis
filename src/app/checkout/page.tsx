"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, ArrowRight, CreditCard, CheckCircle2, Copy, Printer, 
  MapPin, Phone, Mail, ShoppingBag, Truck, Info, HelpCircle
} from "lucide-react";
import { useApp } from "@/services/store";
import { createOrder, Order } from "@/services/api";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, clearCart, currentUser, addNotification, language } = useApp();

  // URL Params values
  const paramCoupon = searchParams.get("coupon") || "";
  const paramGov = searchParams.get("gov") || "cairo";

  // Form inputs
  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [governorate, setGovernorate] = useState(paramGov);
  const [cityAddress, setCityAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "instapay" | "card">("cod");
  const [customerNotes, setCustomerNotes] = useState("");

  // Instapay / Card fields (simulated)
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // Checkout flow states
  const [loading, setLoading] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Auto-sync if currentUser updates
  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName);
      setEmail(currentUser.email);
      if (currentUser.phone) setPhone(currentUser.phone);
      if (currentUser.addresses && currentUser.addresses.length > 0) {
        setGovernorate(currentUser.addresses[0].governorate);
        setCityAddress(currentUser.addresses[0].cityAddress);
      }
    }
  }, [currentUser]);

  // If cart is empty and order hasn't been placed, redirect
  useEffect(() => {
    if (cart.length === 0 && !createdOrder) {
      router.push("/cart");
    }
  }, [cart, createdOrder, router]);

  // Calculations (must match cart calculations)
  const subtotal = cart.reduce((sum, item) => sum + (item.product.discount_price || item.product.price) * item.quantity, 0);
  
  const discountPercent = paramCoupon === "TAXSIS10" ? 10 : paramCoupon === "COPTIC15" ? 15 : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  
  const getShippingCost = () => {
    if (governorate === "cairo" || governorate === "giza") return 50;
    if (governorate === "alex") return 80;
    if (governorate === "egypt_others") return 100;
    if (governorate === "arab_countries") return 950;
    if (governorate === "europe_americas") return 1800;
    if (governorate === "rest_of_world") return 2500;
    return 100;
  };
  const shippingCost = getShippingCost();
  const taxAmount = Math.round((subtotal - discountAmount) * 0.14);
  const total = subtotal - discountAmount + shippingCost + taxAmount;

  // Submit Order handler
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !cityAddress) {
      alert("الرجاء إدخال كافة البيانات الأساسية للشحن");
      return;
    }
    
    setLoading(true);
    try {
      const itemsList = cart.map(item => ({
        id: item.product.id,
        name_ar: item.product.name_ar,
        name_en: item.product.name_en,
        price: item.product.discount_price || item.product.price,
        quantity: item.quantity,
        selectedVariant: item.selectedVariant
      }));

      const orderPayload = {
        user_id: currentUser?.id || null,
        shipping_address: {
          fullName,
          phone,
          email,
          governorate,
          cityAddress
        },
        payment_method: paymentMethod,
        items: itemsList,
        subtotal,
        tax: taxAmount,
        shipping_cost: shippingCost,
        discount: discountAmount,
        total,
        coupon_code: paramCoupon || undefined,
        customer_notes: customerNotes || undefined
      };

      // Call API server action
      const order = await createOrder(orderPayload);
      setCreatedOrder(order);
      clearCart(); // Clear local state shopping cart
      addNotification(`تم إنشاء طلبك بنجاح! كود التتبع: ${order.tracking_number}`);
    } catch (err) {
      console.error(err);
      alert("عذراً، حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const copyTrackingToClipboard = () => {
    if (createdOrder) {
      navigator.clipboard.writeText(createdOrder.tracking_number);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  // ================================== SUCCESS INVOICE VIEW ==================================
  if (createdOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fade-in">
        
        {/* Confirmed Banner */}
        <div className="bg-gold-500/10 border-2 border-gold-500/30 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-16 h-16 text-gold-600 mx-auto" />
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-burgundy-800">
            شكرًا لك! تم استلام طلبك بنجاح
          </h2>
          <p className="text-xs text-navy-900/60 leading-relaxed font-semibold max-w-lg mx-auto">
            لقد أرسلنا تفاصيل الفاتورة وتأكيد الطلب إلى بريدك الإلكتروني ({createdOrder.shipping_address.email}). كادر التوريد والشحن سيقوم ببدء تجهيز طردك فوراً.
          </p>
        </div>

        {/* Invoice Body */}
        <div className="bg-white rounded-2xl border border-gold-500/15 shadow-xl overflow-hidden p-6 md:p-10 space-y-8 text-right relative">
          {/* Coptic Border decoration on print */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300"></div>

          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-500/10 pb-6">
            <div>
              <span className="font-serif text-3xl font-bold text-burgundy-800">طاكسيس</span>
              <p className="text-[10px] text-gold-600 font-serif">للشماس والقسيس - مستلزمات كنسية</p>
            </div>
            <div className="text-left sm:text-left">
              <h3 className="font-serif text-base font-bold text-navy-950">فاتورة بيع رقمية</h3>
              <p className="text-[11px] text-navy-900/40 mt-0.5">تاريخ الطلب: {new Date(createdOrder.created_at).toLocaleString("ar-EG")}</p>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
            <div className="space-y-2 border-l border-gold-500/5 pl-4">
              <h4 className="font-bold text-burgundy-800">بيانات المشتري والشحن:</h4>
              <p className="flex gap-2"><strong>الاسم:</strong> <span>{createdOrder.shipping_address.fullName}</span></p>
              <p className="flex gap-2"><strong>الهاتف:</strong> <a href={`tel:${createdOrder.shipping_address.phone}`} className="hover:underline">{createdOrder.shipping_address.phone}</a></p>
              <p className="flex gap-2"><strong>البريد:</strong> <span>{createdOrder.shipping_address.email}</span></p>
              <p className="flex gap-2"><strong>العنوان:</strong> <span>{createdOrder.shipping_address.cityAddress}، {createdOrder.shipping_address.governorate}</span></p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-burgundy-800">تفاصيل الدفع والتتبع:</h4>
              <p className="flex gap-2">
                <strong>كود تتبع الطلب:</strong> 
                <span className="font-bold text-gold-600 bg-gold-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                  {createdOrder.tracking_number}
                  <button onClick={copyTrackingToClipboard} className="text-gold-600 hover:text-burgundy-800" title="نسخ كود التتبع">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </span>
                {copiedTracking && <span className="text-[9px] text-green-600 animate-pulse font-bold">تم النسخ!</span>}
              </p>
              <p className="flex gap-2">
                <strong>طريقة الدفع:</strong> 
                <span>
                  {createdOrder.payment_method === "cod" ? "الدفع عند الاستلام (COD)" : 
                   createdOrder.payment_method === "instapay" ? "تحويل إنستاباي (مؤكد)" : "بطاقة ائتمانية"}
                </span>
              </p>
              <p className="flex gap-2"><strong>حالة الشحن الحالية:</strong> <span className="font-bold text-amber-600">قيد التجهيز (Pending)</span></p>
              <p className="text-[10px] text-navy-900/50 mt-1">احتفظ بكود التتبع للاستعلام عن مسار شحنتك لاحقاً.</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-burgundy-800">المنتجات المشتراة:</h4>
            <div className="border border-gold-500/10 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-right text-xs">
                <thead className="bg-ivory-200 border-b border-gold-500/10 font-bold text-navy-950">
                  <tr>
                    <th className="p-3">اسم الصنف</th>
                    <th className="p-3 text-center">الكمية</th>
                    <th className="p-3 text-left">السعر الفرعي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-500/5">
                  {createdOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold">
                        {item.name_ar}
                        {item.selectedVariant && (
                          <span className="block text-[10px] text-gold-600 font-bold mt-0.5">({item.selectedVariant})</span>
                        )}
                      </td>
                      <td className="p-3 text-center font-bold">{item.quantity}</td>
                      <td className="p-3 text-left font-bold text-burgundy-800">{item.price * item.quantity} ج.م</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="border-t border-gold-500/10 pt-4 flex flex-col items-end gap-2 text-xs text-navy-950">
            <div className="w-64 flex justify-between">
              <span>المجموع الفرعي للمشتريات:</span>
              <span className="font-bold">{createdOrder.subtotal} ج.م</span>
            </div>
            {createdOrder.discount > 0 && (
              <div className="w-64 flex justify-between text-green-600 font-bold">
                <span>الخصم المطبق:</span>
                <span>-{createdOrder.discount} ج.م</span>
              </div>
            )}
            <div className="w-64 flex justify-between">
              <span>الشحن والتوصيل لـ {createdOrder.shipping_address.governorate}:</span>
              <span className="font-bold">{createdOrder.shipping_cost}.00 ج.م</span>
            </div>
            <div className="w-64 flex justify-between">
              <span>ضريبة القيمة المضافة (١٤٪):</span>
              <span className="font-bold">{createdOrder.tax}.00 ج.م</span>
            </div>
            <div className="w-64 flex justify-between text-burgundy-800 text-sm font-extrabold border-t border-gold-500/10 pt-2">
              <span>المبلغ الإجمالي المدفوع:</span>
              <span>{createdOrder.total} ج.م</span>
            </div>
          </div>

          {/* Invoice Note info */}
          {createdOrder.customer_notes && (
            <div className="p-3 bg-ivory-200 border border-gold-500/5 rounded-lg text-xs leading-relaxed text-navy-900/70">
              <strong>ملاحظاتك للطلب:</strong> {createdOrder.customer_notes}
            </div>
          )}

          {/* Print & Return buttons */}
          <div className="border-t border-gold-500/10 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs font-bold text-gold-600 hover:underline cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الفاتورة أو حفظها كـ PDF</span>
            </button>

            <div className="flex gap-3">
              <Link
                href="/tracking"
                className="bg-ivory-200 text-burgundy-800 font-bold px-6 py-2.5 rounded-lg text-xs border hover:bg-gold-500/10 transition-colors"
              >
                تتبع مسار شحنتك
              </Link>
              <Link
                href="/shop"
                className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold px-6 py-2.5 rounded-lg text-xs border border-gold-500/20 transition-all"
              >
                تسوق المزيد من المستلزمات
              </Link>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // ================================== CHECKOUT SUBMIT FORM VIEW ==================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl font-extrabold text-burgundy-800 border-b border-gold-500/10 pb-6 mb-8 flex items-center gap-2">
        <ShieldCheck className="w-8 h-8 text-gold-500" />
        إتمام الطلب والدفع الآمن
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Information and Payments */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Shipping Address section */}
          <div className="bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/10 pb-2 mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-500" />
              بيانات المستلم وعنوان الشحن والتوصيل
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-navy-950">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-bold">اسم المستلم بالكامل:</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: الشماس يوحنا كمال..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none focus:border-gold-500 font-medium"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="font-bold">رقم الهاتف المحمول:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: 01220201204..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none focus:border-gold-500 font-medium"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="font-bold">البريد الإلكتروني للفواتير:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="مثال: customer@gmail.com..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none focus:border-gold-500 font-medium"
                  required
                />
              </div>

              {/* Governorate selection */}
              <div className="space-y-1">
                <label className="font-bold">{language === "ar" ? "الدولة / وجهة الشحن:" : "Country / Shipping Destination:"}</label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right font-bold focus:outline-none focus:border-gold-500"
                >
                  <optgroup label={language === "ar" ? "جمهورية مصر العربية" : "Egypt"}>
                    <option value="cairo">{language === "ar" ? "القاهرة الكبرى" : "Cairo"}</option>
                    <option value="giza">{language === "ar" ? "الجيزة" : "Giza"}</option>
                    <option value="alex">{language === "ar" ? "الإسكندرية" : "Alexandria"}</option>
                    <option value="egypt_others">{language === "ar" ? "باقي المحافظات" : "Other Governorates"}</option>
                  </optgroup>
                  <optgroup label={language === "ar" ? "شحن دولي" : "International Shipping"}>
                    <option value="arab_countries">{language === "ar" ? "الدول العربية والخليج" : "Arab Countries & Gulf"}</option>
                    <option value="europe_americas">{language === "ar" ? "أوروبا وأمريكا وأستراليا (بلاد المهجر)" : "Europe, Americas & Australia"}</option>
                    <option value="rest_of_world">{language === "ar" ? "باقي دول العالم" : "Rest of the World"}</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* City Address detailed */}
            <div className="space-y-1 text-xs text-navy-950">
              <label className="font-bold">العنوان التفصيلي (المنطقة، الشارع، رقم العقار، علامة مميزة بجوار الكنيسة):</label>
              <input
                type="text"
                value={cityAddress}
                onChange={(e) => setCityAddress(e.target.value)}
                placeholder="العنوان بالكامل بالتفصيل..."
                className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none focus:border-gold-500 font-medium"
                required
              />
            </div>

            <div className="space-y-1 text-xs text-navy-950">
              <label className="font-bold">ملاحظات خاصة للمندوب أو للتوصيل (اختياري):</label>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="أي ملاحظات خاصة بالتوصيل أو الاتصال..."
                rows={2}
                className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Payment Method selection section */}
          <div className="bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/10 pb-2 mb-2 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gold-500" />
              طريقة دفع آمنة
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-navy-950">
              {/* Option 1: COD */}
              <label className={`border-2 rounded-xl p-4 flex flex-col justify-between h-28 cursor-pointer select-none transition-all ${
                paymentMethod === "cod"
                  ? "border-gold-500 bg-gold-500/5 text-burgundy-800"
                  : "border-gold-500/10 hover:border-gold-500/30"
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="sr-only"
                />
                <span className="text-sm">الدفع عند الاستلام</span>
                <span className="text-[10px] text-navy-900/60 leading-normal">ادفع نقداً لمندوب الشحن فور استلام الطرد الكنسي والتحقق منه.</span>
              </label>

              {/* Option 2: Instapay */}
              <label className={`border-2 rounded-xl p-4 flex flex-col justify-between h-28 cursor-pointer select-none transition-all ${
                paymentMethod === "instapay"
                  ? "border-gold-500 bg-gold-500/5 text-burgundy-800"
                  : "border-gold-500/10 hover:border-gold-500/30"
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "instapay"}
                  onChange={() => setPaymentMethod("instapay")}
                  className="sr-only"
                />
                <span className="text-sm">تحويل إنستاباي (InstaPay)</span>
                <span className="text-[10px] text-navy-900/60 leading-normal">قم بالتحويل لرقمنا المعتمد وسرّع تجهيز الطلبات الخاصة.</span>
              </label>

              {/* Option 3: Card */}
              <label className={`border-2 rounded-xl p-4 flex flex-col justify-between h-28 cursor-pointer select-none transition-all ${
                paymentMethod === "card"
                  ? "border-gold-500 bg-gold-500/5 text-burgundy-800"
                  : "border-gold-500/10 hover:border-gold-500/30"
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="sr-only"
                />
                <span className="text-sm">بطاقة فيزا / ماستركارد</span>
                <span className="text-[10px] text-navy-900/60 leading-normal">ادفع بالفيزا بأمان تام من خلال بوابات الدفع المشفرة.</span>
              </label>
            </div>

            {/* Sub-form fields based on Payment Option */}
            {paymentMethod === "instapay" && (
              <div className="p-4 bg-gold-500/5 border border-gold-500/25 rounded-xl text-xs space-y-3 leading-relaxed text-burgundy-800 font-semibold">
                <div className="flex gap-2 items-start">
                  <Info className="w-5 h-5 text-gold-600 shrink-0" />
                  <div>
                    <p>للتحويل الفوري عبر تطبيق إنستاباي (InstaPay):</p>
                    <p className="text-navy-950 mt-1">عنوان الدفع المعتمد: <span className="font-serif select-all bg-white px-2 py-0.5 rounded border border-gold-500/20">taksis@instapay</span></p>
                    <p className="text-navy-950">رقم الهاتف المحول له: <span className="select-all bg-white px-2 py-0.5 rounded border border-gold-500/20">01220201204</span></p>
                  </div>
                </div>
                <p className="text-[10px] text-navy-900/50">بعد التحويل، سيقوم نظام الإدارة بمطابقة العملية وإرسال الإشعار التلقائي.</p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="p-5 bg-ivory-200 border border-gold-500/10 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-navy-950">
                <div className="sm:col-span-3 space-y-1">
                  <label>رقم البطاقة الائتمانية:</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-white border border-gold-500/10 rounded p-2.5 text-center font-mono focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label>تاريخ الانتهاء:</label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-white border border-gold-500/10 rounded p-2.5 text-center font-mono focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label>رمز الأمان CVV:</label>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-white border border-gold-500/10 rounded p-2.5 text-center font-mono focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Order Checkout Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-gold-500/25 p-6 shadow-xl space-y-4">
            <h3 className="font-serif text-base font-bold text-burgundy-800 border-b border-gold-500/10 pb-2.5">
              مراجعة سلة مشترياتك
            </h3>

            {/* Mini summary list */}
            <div className="max-h-48 overflow-y-auto space-y-3">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="min-w-0 pr-2">
                    <span className="font-semibold block text-navy-900 truncate">{item.product.name_ar}</span>
                    <span className="text-[10px] text-navy-900/50">الكمية: {item.quantity} x {item.product.discount_price || item.product.price} ج.م</span>
                  </div>
                  <span className="font-bold text-burgundy-800 shrink-0">
                    {(item.product.discount_price || item.product.price) * item.quantity} ج.م
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations summaries */}
            <div className="border-t border-gold-500/10 pt-4 space-y-2 text-xs text-navy-900/85">
              <div className="flex justify-between">
                <span>المجموع الفرعي للسلع:</span>
                <span className="font-bold">{subtotal} ج.م</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>الخصم المطبق ({discountPercent}%):</span>
                  <span>-{discountAmount} ج.م</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>تكلفة شحن وتوصيل الطرد:</span>
                <span className="font-bold">{shippingCost} ج.م</span>
              </div>

              <div className="flex justify-between">
                <span>ضريبة القيمة المضافة لجمهورية مصر (١٤٪):</span>
                <span className="font-bold">{taxAmount}.00 ج.م</span>
              </div>

              <div className="flex justify-between text-burgundy-800 text-base font-extrabold border-t border-gold-500/15 pt-3">
                <span>المجموع الإجمالي الكلي:</span>
                <span>{total} ج.م</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 disabled:bg-ivory-300 disabled:text-navy-900/30 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] text-sm text-center"
            >
              <span>{loading ? "جاري تجهيز الفاتورة وصيانة المخزن..." : "تأكيد الطلب وإتمام الشراء"}</span>
            </button>

            <div className="border-t border-gold-500/5 pt-4 text-[10px] text-navy-900/50 flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-4.5 h-4.5 text-gold-500" />
              <span>معايير الأمان معتمدة بالكامل</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm font-bold">جاري تحميل بوابة الدفع والدفتر...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
