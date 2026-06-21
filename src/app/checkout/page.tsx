"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, Printer, CheckCircle2, Copy, MapPin, Phone, Mail, ShoppingBag, CreditCard, Info
} from "lucide-react";
import { useApp } from "@/services/store";
import { createOrder, Order } from "@/services/api";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, clearCart, currentUser, addNotification, language, refreshData } = useApp();

  const isAr = language === "ar";

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

  // Calculations
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
      alert(isAr ? "الرجاء إدخال كافة البيانات الأساسية للشحن" : "Please enter all required shipping details.");
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

      const order = await createOrder(orderPayload);
      setCreatedOrder(order);
      clearCart();
      await refreshData();
      addNotification(
        isAr 
          ? `تم إنشاء طلبك بنجاح! كود التتبع: ${order.tracking_number}`
          : `Order placed successfully! Tracking Code: ${order.tracking_number}`
      );
    } catch (err) {
      console.error(err);
      alert(
        isAr 
          ? "عذراً، حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى."
          : "Sorry, an error occurred while placing the order. Please try again."
      );
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

  // Dictionaries
  const dict = {
    checkoutTitle: isAr ? "إتمام الطلب والدفع الآمن" : "Secure Checkout & Order Placement",
    successTitle: isAr ? "شكرًا لك! تم استلام طلبك بنجاح" : "Thank you! Your order has been received successfully",
    successDesc: (email: string) => isAr
      ? `لقد أرسلنا تفاصيل الفاتورة وتأكيد الطلب إلى بريدك الإلكتروني (${email}). كادر التوريد والشحن سيقوم ببدء تجهيز طردك فوراً.`
      : `We have sent the invoice and order confirmation details to your email (${email}). Our shipping team will start processing your package immediately.`,
    brandTitle: isAr ? "طاكسيس" : "TAKSIS",
    brandTagline: isAr ? "للشماس والقسيس - مستلزمات كنسية" : "For Deacon & Priest - Liturgical Supplies",
    invoiceTitle: isAr ? "فاتورة بيع رقمية" : "Digital Sales Invoice",
    invoiceDate: (date: string) => isAr 
      ? `تاريخ الطلب: ${new Date(date).toLocaleString("ar-EG")}`
      : `Order Date: ${new Date(date).toLocaleString("en-US")}`,
    buyerSection: isAr ? "بيانات المشتري والشحن:" : "Buyer & Shipping Info:",
    buyerName: isAr ? "الاسم:" : "Name:",
    buyerPhone: isAr ? "الهاتف:" : "Phone:",
    buyerEmail: isAr ? "البريد:" : "Email:",
    buyerAddress: isAr ? "العنوان:" : "Address:",
    paymentSection: isAr ? "تفاصيل الدفع والتتبع:" : "Payment & Tracking Details:",
    trackingCodeLabel: isAr ? "كود تتبع الطلب:" : "Order Tracking Code:",
    trackingCopy: isAr ? "نسخ كود التتبع" : "Copy Tracking Code",
    copied: isAr ? "تم النسخ!" : "Copied!",
    paymentMethodLabel: isAr ? "طريقة الدفع:" : "Payment Method:",
    codValue: isAr ? "الدفع عند الاستلام (COD)" : "Cash on Delivery (COD)",
    instapayValue: isAr ? "تحويل إنستاباي" : "InstaPay Transfer",
    cardValue: isAr ? "بطاقة اائتمانية" : "Credit Card",
    shippingStatusLabel: isAr ? "حالة الشحن الحالية:" : "Current Shipping Status:",
    pendingStatus: isAr ? "قيد التجهيز (Pending)" : "Processing (Pending)",
    trackingTip: isAr ? "احتفظ بكود التتبع للاستعلام عن مسار شحنتك لاحقاً." : "Keep this tracking code to check your shipment path later.",
    itemsHeading: isAr ? "المنتجات المشتراة:" : "Purchased Items:",
    thName: isAr ? "اسم الصنف" : "Item Name",
    thQty: isAr ? "الكمية" : "Qty",
    thSubtotal: isAr ? "السعر الفرعي" : "Subtotal",
    optLabel: isAr ? "المواصفة: " : "Option: ",
    subtotalSummary: isAr ? "المجموع الفرعي للمشتريات:" : "Items Subtotal:",
    discountSummary: isAr ? "الخصم المطبق:" : "Applied Discount:",
    shippingSummary: (region: string) => {
      return isAr ? `الشحن والتوصيل لـ ${region}:` : `Shipping & Delivery to ${region}:`;
    },
    vatSummary: isAr ? "ضريبة القيمة المضافة (١٤٪):" : "Value Added Tax (14% VAT):",
    totalSummary: isAr ? "المبلغ الإجمالي المدفوع:" : "Total Amount Paid:",
    customerNotesLabel: isAr ? "ملاحظاتك للطلب:" : "Your Order Notes:",
    printBtn: isAr ? "طباعة الفاتورة أو حفظها كـ PDF" : "Print Invoice or Save as PDF",
    trackBtn: isAr ? "تتبع مسار شحنتك" : "Track Your Shipment",
    shopBtn: isAr ? "تسوق المزيد من المستلزمات" : "Shop More Supplies",
    formHeading: isAr ? "بيانات المستلم وعنوان الشحن والتوصيل" : "Recipient Information & Shipping Address",
    formFullName: isAr ? "اسم المستلم بالكامل:" : "Full Recipient Name:",
    formFullNamePlaceholder: isAr ? "مثال: الشماس يوحنا كمال..." : "e.g. Deacon John Kamal...",
    formPhone: isAr ? "رقم الهاتف المحمول:" : "Mobile Phone Number:",
    formPhonePlaceholder: isAr ? "مثال: 01220201204..." : "e.g. 01220201204...",
    formEmail: isAr ? "البريد الإلكتروني للفواتير:" : "Billing Email Address:",
    formEmailPlaceholder: isAr ? "مثال: customer@gmail.com..." : "e.g. customer@gmail.com...",
    formRegion: isAr ? "الدولة / وجهة الشحن:" : "Country / Shipping Destination:",
    egyptLabel: isAr ? "جمهورية مصر العربية" : "Egypt",
    cairoLabel: isAr ? "القاهرة الكبرى" : "Greater Cairo",
    gizaLabel: isAr ? "الجيزة" : "Giza",
    alexLabel: isAr ? "الإسكندرية" : "Alexandria",
    egyptOthersLabel: isAr ? "باقي المحافظات" : "Other Governorates",
    intlLabel: isAr ? "شحن دولي" : "International Shipping",
    arabLabel: isAr ? "الدول العربية والخليج" : "Arab Countries & Gulf",
    europeLabel: isAr ? "أوروبا وأمريكا وأستراليا (بلاد المهجر)" : "Europe, Americas & Australia",
    worldLabel: isAr ? "باقي دول العالم" : "Rest of the World",
    formAddress: isAr ? "العنوان التفصيلي (المنطقة، الشارع، رقم العقار، علامة مميزة بجوار الكنيسة):" : "Detailed Address (District, Street, Building, Landmarks near church):",
    formAddressPlaceholder: isAr ? "العنوان بالكامل بالتفصيل..." : "Full detailed address...",
    formNotes: isAr ? "ملاحظات خاصة للمندوب أو للتوصيل (اختياري):" : "Special delivery notes or instructions (Optional):",
    formNotesPlaceholder: isAr ? "أي ملاحظات خاصة بالتوصيل أو الاتصال..." : "Any delivery notes, preferred times, etc...",
    securePaymentHeading: isAr ? "طريقة دفع آمنة" : "Secure Payment Method",
    payCod: isAr ? "الدفع عند الاستلام" : "Cash on Delivery",
    payCodDesc: isAr ? "ادفع نقداً لمندوب الشحن فور استلام الطرد الكنسي والتحقق منه." : "Pay cash to the courier representative once you inspect your liturgical order.",
    payInstapay: isAr ? "تحويل إنستاباي (InstaPay)" : "InstaPay Transfer",
    payInstapayDesc: isAr ? "قم بالتحويل لرقمنا المعتمد وسرّع تجهيز الطلبات الخاصة." : "Transfer directly to our registered alias to speed up custom workshop tasks.",
    payCard: isAr ? "بطاقة فيزا / ماستركارد" : "Visa / MasterCard",
    payCardDesc: isAr ? "ادفع بالفيزا بأمان تام من خلال بوابات الدفع المشفرة." : "Pay securely using credit card via encrypted payment gateways.",
    instapayHeading: isAr ? "للتحويل الفوري عبر تطبيق إنستاباي (InstaPay):" : "For instant transfer via InstaPay App:",
    instapayAlias: isAr ? "عنوان الدفع المعتمد: " : "Verified Payment Address: ",
    instapayPhone: isAr ? "رقم الهاتف المحول له: " : "Transfer Phone Number: ",
    instapayNotice: isAr 
      ? "بعد التحويل، سيقوم نظام الإدارة بمطابقة العملية وإرسال الإشعار التلقائي."
      : "After transferring, our administration will match the transaction and send confirmation.",
    cardNum: isAr ? "رقم البطاقة الائتمانية:" : "Credit Card Number:",
    cardExp: isAr ? "تاريخ الانتهاء:" : "Expiry Date:",
    cardCvv: isAr ? "رمز الأمان CVV:" : "CVV Security Code:",
    reviewCartHeading: isAr ? "مراجعة سلة مشترياتك" : "Review Your Cart",
    miniQty: (qty: number, price: number) => isAr ? `الكمية: ${qty} x ${price} ج.م` : `Qty: ${qty} x EGP ${price}`,
    casingSubtotal: isAr ? "المجموع الفرعي للسلع:" : "Items Subtotal:",
    casingDiscount: (pct: number) => isAr ? `الخصم المطبق (${pct}%):` : `Applied Discount (${pct}%):`,
    casingShipping: isAr ? "تكلفة شحن وتوصيل الطرد:" : "Parcel Shipping Cost:",
    casingVat: isAr ? "ضريبة القيمة المضافة لجمهورية مصر (١٤٪):" : "VAT Tax for Egypt (14%):",
    casingGrandTotal: isAr ? "المجموع الإجمالي الكلي:" : "Grand Total Amount:",
    casingConfirmBtn: isAr ? "تأكيد الطلب وإتمام الشراء" : "Confirm Order & Purchase",
    casingConfirming: isAr ? "جاري تجهيز الفاتورة وصيانة المخزن..." : "Processing Order & Stock updates...",
    safetyNotice: isAr ? "معايير الأمان معتمدة بالكامل" : "100% Fully Certified Security Standards"
  };

  const getGovernorateName = (govKey: string) => {
    if (govKey === "cairo") return isAr ? "القاهرة" : "Cairo";
    if (govKey === "giza") return isAr ? "الجيزة" : "Giza";
    if (govKey === "alex") return isAr ? "الإسكندرية" : "Alexandria";
    if (govKey === "egypt_others") return isAr ? "باقي المحافظات" : "Other Egyptian Governorates";
    if (govKey === "arab_countries") return isAr ? "الدول العربية" : "Arab Countries";
    if (govKey === "europe_americas") return isAr ? "المهجر (أوروبا/أمريكا)" : "Europe/Americas";
    if (govKey === "rest_of_world") return isAr ? "باقي دول العالم" : "Rest of World";
    return govKey;
  };

  // ================================== SUCCESS INVOICE VIEW ==================================
  if (createdOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fade-in">
        
        {/* Confirmed Banner */}
        <div className="bg-gold-500/10 border-2 border-gold-500/30 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-16 h-16 text-gold-600 mx-auto animate-bounce" />
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-burgundy-800">
            {dict.successTitle}
          </h2>
          <p className="text-xs text-navy-900/60 leading-relaxed font-semibold max-w-lg mx-auto">
            {dict.successDesc(createdOrder.shipping_address.email)}
          </p>
        </div>

        {/* Invoice Body */}
        <div className={`bg-white rounded-2xl border border-gold-500/15 shadow-xl overflow-hidden p-6 md:p-10 space-y-8 relative ${isAr ? "text-right" : "text-left"}`}>
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300"></div>

          {/* Invoice Header */}
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-500/10 pb-6 ${isAr ? "" : "flex-row-reverse"}`}>
            <div>
              <span className="font-serif text-3xl font-bold text-burgundy-800">{dict.brandTitle}</span>
              <p className="text-[10px] text-gold-600 font-serif">{dict.brandTagline}</p>
            </div>
            <div className={isAr ? "text-left" : "text-right"}>
              <h3 className="font-serif text-base font-bold text-navy-950">{dict.invoiceTitle}</h3>
              <p className="text-[11px] text-navy-900/40 mt-0.5">{dict.invoiceDate(createdOrder.created_at)}</p>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed ${isAr ? "" : "text-left"}`}>
            <div className={`space-y-2 ${isAr ? "border-l border-gold-500/5 pl-4" : "border-r border-gold-500/5 pr-4 text-left"}`}>
              <h4 className="font-bold text-burgundy-800">{dict.buyerSection}</h4>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse justify-end"}`}><strong>{dict.buyerName}</strong> <span>{createdOrder.shipping_address.fullName}</span></p>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse justify-end"}`}><strong>{dict.buyerPhone}</strong> <a href={`tel:${createdOrder.shipping_address.phone}`} className="hover:underline">{createdOrder.shipping_address.phone}</a></p>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse justify-end"}`}><strong>{dict.buyerEmail}</strong> <span>{createdOrder.shipping_address.email}</span></p>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse justify-end"}`}><strong>{dict.buyerAddress}</strong> <span>{createdOrder.shipping_address.cityAddress}، {getGovernorateName(createdOrder.shipping_address.governorate)}</span></p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-burgundy-800">{dict.paymentSection}</h4>
              <p className={`flex gap-2 items-center ${isAr ? "" : "flex-row-reverse justify-end"}`}>
                <strong>{dict.trackingCodeLabel}</strong> 
                <span className="font-bold text-gold-600 bg-gold-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                  {createdOrder.tracking_number}
                  <button onClick={copyTrackingToClipboard} className="text-gold-600 hover:text-burgundy-800 cursor-pointer" title={dict.trackingCopy}>
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </span>
                {copiedTracking && <span className="text-[9px] text-green-600 animate-pulse font-bold">{dict.copied}</span>}
              </p>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse justify-end"}`}>
                <strong>{dict.paymentMethodLabel}</strong> 
                <span>
                  {createdOrder.payment_method === "cod" ? dict.codValue : 
                   createdOrder.payment_method === "instapay" ? dict.instapayValue : dict.cardValue}
                </span>
              </p>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse justify-end"}`}><strong>{dict.shippingStatusLabel}</strong> <span className="font-bold text-amber-600">{dict.pendingStatus}</span></p>
              <p className="text-[10px] text-navy-900/50 mt-1">{dict.trackingTip}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-burgundy-800">{dict.itemsHeading}</h4>
            <div className="border border-gold-500/10 rounded-xl overflow-hidden shadow-sm">
              <table className={`w-full text-xs ${isAr ? "text-right" : "text-left"}`}>
                <thead className="bg-ivory-200 border-b border-gold-500/10 font-bold text-navy-950">
                  <tr>
                    <th className="p-3">{dict.thName}</th>
                    <th className="p-3 text-center">{dict.thQty}</th>
                    <th className={`p-3 ${isAr ? "text-left" : "text-right"}`}>{dict.thSubtotal}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-500/5">
                  {createdOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold">
                        {isAr ? item.name_ar : item.name_en}
                        {item.selectedVariant && (
                          <span className="block text-[10px] text-gold-600 font-bold mt-0.5">({dict.optLabel} {item.selectedVariant})</span>
                        )}
                      </td>
                      <td className="p-3 text-center font-bold">{item.quantity}</td>
                      <td className={`p-3 font-bold text-burgundy-800 ${isAr ? "text-left" : "text-right"}`}>
                        {isAr ? `${item.price * item.quantity} ج.م` : `EGP ${item.price * item.quantity}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className={`border-t border-gold-500/10 pt-4 flex flex-col gap-2 text-xs text-navy-950 ${isAr ? "items-end" : "items-start"}`}>
            <div className={`w-72 flex justify-between ${isAr ? "" : "flex-row-reverse"}`}>
              <span>{dict.subtotalSummary}</span>
              <span className="font-bold">{isAr ? `${createdOrder.subtotal} ج.م` : `EGP ${createdOrder.subtotal}`}</span>
            </div>
            {createdOrder.discount > 0 && (
              <div className={`w-72 flex justify-between text-green-600 font-bold ${isAr ? "" : "flex-row-reverse"}`}>
                <span>{dict.discountSummary}</span>
                <span>-{isAr ? `${createdOrder.discount} ج.م` : `EGP ${createdOrder.discount}`}</span>
              </div>
            )}
            <div className={`w-72 flex justify-between ${isAr ? "" : "flex-row-reverse"}`}>
              <span>{dict.shippingSummary(getGovernorateName(createdOrder.shipping_address.governorate))}</span>
              <span className="font-bold">{isAr ? `${createdOrder.shipping_cost}.00 ج.م` : `EGP ${createdOrder.shipping_cost}.00`}</span>
            </div>
            <div className={`w-72 flex justify-between ${isAr ? "" : "flex-row-reverse"}`}>
              <span>{dict.vatSummary}</span>
              <span className="font-bold">{isAr ? `${createdOrder.tax}.00 ج.م` : `EGP ${createdOrder.tax}.00`}</span>
            </div>
            <div className={`w-72 flex justify-between text-burgundy-800 text-sm font-extrabold border-t border-gold-500/10 pt-2 ${isAr ? "" : "flex-row-reverse"}`}>
              <span>{dict.totalSummary}</span>
              <span className="font-bold">{isAr ? `${createdOrder.total} ج.م` : `EGP ${createdOrder.total}`}</span>
            </div>
          </div>

          {createdOrder.customer_notes && (
            <div className="p-3 bg-ivory-200 border border-gold-500/5 rounded-lg text-xs leading-relaxed text-navy-900/70">
              <strong>{dict.customerNotesLabel}</strong> {createdOrder.customer_notes}
            </div>
          )}

          {/* Print & Return buttons */}
          <div className={`border-t border-gold-500/10 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center ${isAr ? "" : "flex-row-reverse"}`}>
            <button
              onClick={() => window.print()}
              className={`flex items-center gap-1.5 text-xs font-bold text-gold-600 hover:underline cursor-pointer ${isAr ? "" : "flex-row-reverse"}`}
            >
              <Printer className="w-4 h-4" />
              <span>{dict.printBtn}</span>
            </button>

            <div className="flex gap-3">
              <Link
                href="/tracking"
                className="bg-ivory-200 text-burgundy-800 font-bold px-6 py-2.5 rounded-lg text-xs border hover:bg-gold-500/10 transition-colors"
              >
                {dict.trackBtn}
              </Link>
              <Link
                href="/shop"
                className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold px-6 py-2.5 rounded-lg text-xs border border-gold-500/20 transition-all"
              >
                {dict.shopBtn}
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
      <h1 className={`font-serif text-3xl font-extrabold text-burgundy-800 border-b border-gold-500/10 pb-6 mb-8 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
        <ShieldCheck className="w-8 h-8 text-gold-500" />
        <span>{dict.checkoutTitle}</span>
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Information and Payments */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Shipping Address section */}
          <div className={`bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm space-y-6 ${isAr ? "text-right" : "text-left"}`}>
            <h3 className={`font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/10 pb-2 mb-2 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
              <MapPin className="w-5 h-5 text-gold-500" />
              <span>{dict.formHeading}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-navy-950">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-bold">{dict.formFullName}</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={dict.formFullNamePlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 font-medium ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="font-bold">{dict.formPhone}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={dict.formPhonePlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 font-medium ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="font-bold">{dict.formEmail}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.formEmailPlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 font-medium ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              {/* Country Selection */}
              <div className="space-y-1">
                <label className="font-bold">{dict.formRegion}</label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 font-bold focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                >
                  <optgroup label={dict.egyptLabel}>
                    <option value="cairo">{dict.cairoLabel}</option>
                    <option value="giza">{dict.gizaLabel}</option>
                    <option value="alex">{dict.alexLabel}</option>
                    <option value="egypt_others">{dict.egyptOthersLabel}</option>
                  </optgroup>
                  <optgroup label={dict.intlLabel}>
                    <option value="arab_countries">{dict.arabLabel}</option>
                    <option value="europe_americas">{dict.europeLabel}</option>
                    <option value="rest_of_world">{dict.worldLabel}</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Address Info */}
            <div className="space-y-1 text-xs text-navy-950">
              <label className="font-bold">{dict.formAddress}</label>
              <input
                type="text"
                value={cityAddress}
                onChange={(e) => setCityAddress(e.target.value)}
                placeholder={dict.formAddressPlaceholder}
                className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 font-medium ${isAr ? "text-right" : "text-left"}`}
                required
              />
            </div>

            {/* Notes */}
            <div className="space-y-1 text-xs text-navy-950">
              <label className="font-bold">{dict.formNotes}</label>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder={dict.formNotesPlaceholder}
                rows={2}
                className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none resize-none ${isAr ? "text-right" : "text-left"}`}
              />
            </div>
          </div>

          {/* Secure Payment details */}
          <div className={`bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm space-y-6 ${isAr ? "text-right" : "text-left"}`}>
            <h3 className={`font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/10 pb-2 mb-2 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
              <CreditCard className="w-5 h-5 text-gold-500" />
              <span>{dict.securePaymentHeading}</span>
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
                <span className="text-sm">{dict.payCod}</span>
                <span className="text-[10px] text-navy-900/60 leading-normal font-medium">{dict.payCodDesc}</span>
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
                <span className="text-sm">{dict.payInstapay}</span>
                <span className="text-[10px] text-navy-900/60 leading-normal font-medium">{dict.payInstapayDesc}</span>
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
                <span className="text-sm">{dict.payCard}</span>
                <span className="text-[10px] text-navy-900/60 leading-normal font-medium">{dict.payCardDesc}</span>
              </label>
            </div>

            {/* Subfields */}
            {paymentMethod === "instapay" && (
              <div className="p-4 bg-gold-500/5 border border-gold-500/25 rounded-xl text-xs space-y-3 leading-relaxed text-burgundy-800 font-semibold">
                <div className={`flex gap-2 items-start ${isAr ? "" : "flex-row-reverse"}`}>
                  <Info className="w-5 h-5 text-gold-600 shrink-0" />
                  <div>
                    <p>{dict.instapayHeading}</p>
                    <p className="text-navy-950 mt-1">{dict.instapayAlias}<span className="font-serif select-all bg-white px-2 py-0.5 rounded border border-gold-500/20">taksis@instapay</span></p>
                    <p className="text-navy-950">{dict.instapayPhone}<span className="select-all bg-white px-2 py-0.5 rounded border border-gold-500/20 font-serif">01220201204</span></p>
                  </div>
                </div>
                <p className="text-[10px] text-navy-900/50">{dict.instapayNotice}</p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="p-5 bg-ivory-200 border border-gold-500/10 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-navy-950">
                <div className="sm:col-span-3 space-y-1">
                  <label>{dict.cardNum}</label>
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
                  <label>{dict.cardExp}</label>
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
                  <label>{dict.cardCvv}</label>
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

        {/* Right Column: Checkout Pricing list */}
        <div className="space-y-6">
          <div className={`bg-white rounded-2xl border-2 border-gold-500/25 p-6 shadow-xl space-y-4 ${isAr ? "text-right" : "text-left"}`}>
            <h3 className="font-serif text-base font-bold text-burgundy-800 border-b border-gold-500/10 pb-2.5">
              {dict.reviewCartHeading}
            </h3>

            <div className="max-h-48 overflow-y-auto space-y-3">
              {cart.map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center text-xs ${isAr ? "" : "flex-row-reverse"}`}>
                  <div className={`min-w-0 ${isAr ? "pr-2 text-right" : "pl-2 text-left"}`}>
                    <span className="font-semibold block text-navy-900 truncate">{isAr ? item.product.name_ar : item.product.name_en}</span>
                    <span className="text-[10px] text-navy-900/50">{dict.miniQty(item.quantity, item.product.discount_price || item.product.price)}</span>
                  </div>
                  <span className="font-bold text-burgundy-800 shrink-0">
                    {isAr 
                      ? `${(item.product.discount_price || item.product.price) * item.quantity} ج.م` 
                      : `EGP ${(item.product.discount_price || item.product.price) * item.quantity}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gold-500/10 pt-4 space-y-2 text-xs text-navy-900/85">
              <div className={`flex justify-between ${isAr ? "" : "flex-row-reverse"}`}>
                <span>{dict.casingSubtotal}</span>
                <span className="font-bold">{isAr ? `${subtotal} ج.م` : `EGP ${subtotal}`}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className={`flex justify-between text-green-600 font-bold ${isAr ? "" : "flex-row-reverse"}`}>
                  <span>{dict.casingDiscount(discountPercent)}</span>
                  <span>-{isAr ? `${discountAmount} ج.م` : `EGP ${discountAmount}`}</span>
                </div>
              )}

              <div className={`flex justify-between ${isAr ? "" : "flex-row-reverse"}`}>
                <span>{dict.casingShipping}</span>
                <span className="font-bold">{isAr ? `${shippingCost} ج.م` : `EGP ${shippingCost}`}</span>
              </div>

              <div className={`flex justify-between ${isAr ? "" : "flex-row-reverse"}`}>
                <span>{dict.casingVat}</span>
                <span className="font-bold">{isAr ? `${taxAmount}.00 ج.م` : `EGP ${taxAmount}.00`}</span>
              </div>

              <div className={`flex justify-between text-burgundy-800 text-base font-extrabold border-t border-gold-500/15 pt-3 ${isAr ? "" : "flex-row-reverse"}`}>
                <span>{dict.casingGrandTotal}</span>
                <span className="font-bold">{isAr ? `${total} ج.م` : `EGP ${total}`}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 disabled:bg-ivory-300 disabled:text-navy-900/30 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] text-sm text-center"
            >
              <span>{loading ? dict.casingConfirming : dict.casingConfirmBtn}</span>
            </button>

            <div className="border-t border-gold-500/5 pt-4 text-[10px] text-navy-900/50 flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-4.5 h-4.5 text-gold-500" />
              <span>{dict.safetyNotice}</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm font-bold">Loading secure payment gate...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
