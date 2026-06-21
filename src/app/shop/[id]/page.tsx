"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Heart, ShoppingBag, Star, Sparkles, AlertTriangle, ShieldCheck, 
  ChevronLeft, MessageSquare, Plus, Minus 
} from "lucide-react";
import { useApp } from "@/services/store";
import { getProductById, addProductReview, Product } from "@/services/api";
import { CATEGORIES } from "@/services/db-mock-data";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  
  const { addToCart, wishlist, toggleWishlist, addToRecentlyViewed, language } = useApp();
  
  // States
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  
  // Custom engraving text state
  const [engravingText, setEngravingText] = useState("");
  
  // Reviews state
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState("");

  const isAr = language === "ar";

  // Fetch product detail
  useEffect(() => {
    async function loadProduct() {
      if (!productId) return;
      try {
        const prod = await getProductById(productId);
        if (prod) {
          setProduct(prod);
          setActiveImage(prod.images[0]);
          addToRecentlyViewed(prod.id);
          if (prod.variants && prod.variants.length > 0 && prod.variants[0].options.length > 0) {
            setSelectedVariant(prod.variants[0].options[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center py-24 font-bold text-sm text-burgundy-850 animate-pulse">
        {isAr ? "جاري تحميل تفاصيل المنتج الفاخر..." : "Loading premium product details..."}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <h3 className="font-serif text-lg font-bold text-burgundy-800">
          {isAr ? "المنتج غير موجود" : "Product Not Found"}
        </h3>
        <p className="text-xs text-navy-900/60">
          {isAr 
            ? "عذراً، لم نتمكن من العثور على المنتج المطلوب. قد يكون قد تم إزالته أو تغيير رابطه."
            : "Sorry, we could not find the requested product. It might have been removed or link changed."}
        </p>
        <Link href="/shop" className="inline-block bg-burgundy-800 text-gold-300 text-xs px-6 py-2.5 rounded-lg border font-bold">
          {isAr ? "العودة للمتجر" : "Back to Shop"}
        </Link>
      </div>
    );
  }

  const hasDiscount = !!product.discount_price;
  const displayPrice = product.discount_price || product.price;
  const isWish = wishlist.includes(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)"
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: "scale(1)" });
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewText) return;
    
    setIsReviewSubmitting(true);
    try {
      const updated = await addProductReview(product.id, {
        name: reviewName,
        rating: reviewRating,
        text: reviewText
      });
      setProduct(updated);
      setReviewSuccessMsg(
        isAr 
          ? "تم إضافة مراجعتك بنجاح! شكراً لمشاركتنا تجربتك الروحية."
          : "Review submitted successfully! Thank you for sharing your experience."
      );
      setReviewName("");
      setReviewText("");
      setReviewRating(5);
    } catch (err) {
      console.error(err);
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  const currentCategory = CATEGORIES.find(c => c.id === product.category_id);

  // Translation helpers for dynamic spec keys and values
  const translateSpecKey = (key: string) => {
    if (isAr) return key;
    const translations: Record<string, string> = {
      "الخامة": "Material",
      "القطر": "Diameter",
      "الوزن": "Weight",
      "المنشأ": "Origin",
      "نوع القماش": "Fabric Type",
      "التطريز": "Embroidery",
      "اللون": "Color",
      "نوع الفضة": "Silver Type",
      "الأحجار": "Gemstones",
      "الحجم": "Volume/Size",
      "مدة التصنيع": "Production Time",
      "الملحقات": "Accessories",
      "العدد": "Count",
      "المكونات": "Components",
      "القماش": "Fabric",
      "الوزن الكلي": "Total Weight",
      "التعبئة": "Packaging"
    };
    return translations[key] || key;
  };

  const translateVariantValue = (val: string) => {
    if (isAr) return val;
    const translations: Record<string, string> = {
      "صغير (١٨ سم)": "Small (18 cm)",
      "متوسط (٢٢ سم)": "Medium (22 cm)",
      "كبير (٢٦ سم)": "Large (26 cm)",
      "١٢٠ سم": "120 cm",
      "١٣٠ سم": "130 cm",
      "١٤٠ سم": "140 cm",
      "١٥٠ سم": "150 cm",
      "١٦٠ سم": "160 cm",
      "أحمر ملكي": "Royal Red",
      "أبيض ملائكي": "Angel White",
      "أزرق كحلي": "Navy Blue",
      "S (كاهن قصير)": "Small (Short Priest)",
      "M (كاهن متوسط)": "Medium (Average Priest)",
      "L (كاهن طويل)": "Large (Tall Priest)",
      "نحاس خالص مذهب": "Pure Gilded Brass",
      "٢٢ سم": "22 cm",
      "٨٠٠ جرام": "800 grams",
      "صناعة يدوية مصرية بورش طاكسيس": "Egyptian Handcrafted in Taxsis workshops",
      "حديد مصقول ومطلي بمقاوم الصدأ": "Polished coated rust-resistant iron",
      "٢٠ سم": "20 cm",
      "ذراع ضرب نحاسي وحبل تعليق": "Brass striker & hanger loop",
      "نحاس مسبوك يدوياً": "Hand-cast Brass",
      "١٥ سم": "15 cm",
      "زوج (قطعتين)": "Pair (2 Pieces)",
      "كريب ياباني فاخر": "Premium Japanese Crepe",
      "خيوط ذهبية وسيرما سورية ممتازة": "Premium gold thread & Syrian embroidery",
      "أبيض ناصع مع تطريز ذهبي وريد": "Pure White with Gold & Red embroidery",
      "قطيفة إيطالي مستوردة مع بطانة ستان فاخرة": "Imported Italian Velvet with luxury satin lining",
      "سيرما ذهبية فرنسية": "French Gold Thread",
      "١٤٥ سم": "145 cm",
      "طاقية/تاج + برنص + بطرشيل + أكمام + منطقة + طونية بيضاء": "Crown + Burnus + Stole + Cuffs + Belt + White Tonia",
      "حرير بروكار سوري فاخر": "Premium Syrian Brocade Silk",
      "٣.٥ كجم": "3.5 kg",
      "فضة ٩٢٥ مطلية ذهب عيار ٢١": "925 Sterling Silver plated in 21K Gold",
      "زركون أحمر ياقوتي عالي الجودة": "High-grade Ruby-red Zircon",
      "٧ إلى ١٠ أيام عمل": "7 to 10 working days",
      "١ لتر": "1 Liter",
      "عبوة بلاستيكية معتمة لحفظ الجودة": "Opaque plastic bottle to preserve quality",
      "مزارع أديرة وادي النطرون": "Wadi El Natrun Monastery Farms"
    };
    return translations[val] || val;
  };

  // Bilingual Dictionaries
  const dict = {
    home: isAr ? "الرئيسية" : "Home",
    shop: isAr ? "المتجر" : "Shop",
    sku: isAr ? "كود SKU:" : "SKU:",
    reviewsLabel: (count: number) => isAr ? `(${count} تقييمات العملاء)` : `(${count} customer reviews)`,
    saveAmt: (amt: number) => isAr ? `وفر ${amt} ج.م` : `Save EGP ${amt}`,
    descHeader: isAr ? "وصف مستلزم الخدمة:" : "Item Description:",
    chooseLabel: (type: string) => {
      if (type === "size") return isAr ? "اختر المقاس:" : "Choose Size:";
      return isAr ? "اختر الخيار:" : "Choose Option:";
    },
    engravingHeading: isAr ? "خدمة حفر اسم مخصص أو إهداء (اختياري):" : "Custom Engraving Name or Dedication (Optional):",
    engravingPlaceholder: isAr ? "مثال: إهداء لكنيسة ملاك سوريال بالعمرانية..." : "e.g. Dedicated to St. Mary Church in Omraniya...",
    engravingDesc: isAr 
      ? "سيقوم كادر ورش طاكسيس بنقش هذه العبارة بدقة على هذا المستلزم الكنسي."
      : "Our workshop artisans will carefully engrave this dedication onto the item.",
    addToCart: isAr ? "إضافة إلى سلة المشتريات" : "Add to Shopping Cart",
    outOfStock: isAr ? "غير متوفر حالياً" : "Out of Stock",
    outOfStockBadge: isAr ? "نفذت الكمية مؤقتاً" : "Out of Stock Temporarily",
    wishlistAdd: isAr ? "إضافة للمفضلة" : "Add to Wishlist",
    wishlistRemove: isAr ? "إزالة من المفضلة" : "Remove from Wishlist",
    assurance1: isAr ? "صناعة مطابقة لطقوس الكنيسة القبطية" : "Crafted according to Coptic liturgical rubrics",
    assurance2: isAr ? "منتج معالج بالكامل ومضمون 3 سنوات" : "Fully treated, guaranteed for 3 years",
    specsHeading: isAr ? "المواصفات الفنية والمقاييس" : "Technical Specifications & Specs",
    writeReview: isAr ? "كتابة مراجعة للمنتج" : "Write a Product Review",
    reviewSub: isAr ? "رأيك يهم آباء الكنائس والرهبان لتحديد جودة الخدمة." : "Your feedback helps church fathers and monastics choose the best quality.",
    ratingLabel: isAr ? "التقييم:" : "Rating:",
    reviewerName: isAr ? "الاسم والصفة:" : "Name & Title:",
    reviewerNamePlaceholder: isAr ? "مثال: الشماس يوحنا كمال" : "e.g. Deacon John Kamal",
    reviewText: isAr ? "نص المراجعة:" : "Review Message:",
    reviewTextPlaceholder: isAr ? "اكتب تعليقك هنا..." : "Write your feedback here...",
    submitReview: isAr ? "إرسال المراجعة" : "Submit Review",
    submitting: isAr ? "جاري الإرسال..." : "Submitting...",
    buyerReviews: isAr ? "مراجعات وآراء الآباء المشترين" : "Customer Reviews & Feedback"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb */}
      <div className={`flex items-center gap-2 text-xs font-semibold text-navy-900/60 ${isAr ? "" : "flex-row-reverse justify-end"}`}>
        <Link href="/" className="hover:text-burgundy-800">{dict.home}</Link>
        <ChevronLeft className={`w-3 h-3 ${isAr ? "" : "rotate-180"}`} />
        <Link href="/shop" className="hover:text-burgundy-800">{dict.shop}</Link>
        <ChevronLeft className={`w-3 h-3 ${isAr ? "" : "rotate-180"}`} />
        {currentCategory && (
          <>
            <Link href={`/shop?category=${currentCategory.id}`} className="hover:text-burgundy-800">
              {isAr ? currentCategory.name_ar : currentCategory.name_en}
            </Link>
            <ChevronLeft className={`w-3 h-3 ${isAr ? "" : "rotate-180"}`} />
          </>
        )}
        <span className="text-burgundy-800 truncate">{isAr ? product.name_ar : product.name_en}</span>
      </div>

      {/* Main Product Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Image Zoom Gallery */}
        <div className="space-y-4">
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[380px] md:h-[500px] bg-ivory-200 rounded-2xl border-2 border-gold-500/10 overflow-hidden cursor-zoom-in"
          >
            <img
              src={activeImage}
              alt={isAr ? product.name_ar : product.name_en}
              style={zoomStyle}
              className="w-full h-full object-cover transition-transform duration-200"
            />
            {product.stock_quantity <= 0 && (
              <span className={`absolute top-4 ${isAr ? "right-4" : "left-4"} bg-navy-900 text-white text-xs font-bold px-3 py-1 rounded`}>
                {dict.outOfStockBadge}
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === img ? "border-gold-500 scale-95" : "border-gold-500/10 hover:border-gold-500/40"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Detail description */}
        <div className={`space-y-6 ${isAr ? "text-right" : "text-left"}`}>
          <div className="space-y-2">
            <span className={`text-xs font-bold text-gold-600 ${isAr ? "tracking-normal" : "tracking-wider"}`}>{dict.sku} {product.sku}</span>
            <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-burgundy-800 leading-tight">
              {isAr ? product.name_ar : product.name_en}
            </h1>
            {!isAr && <p className="text-[11px] text-navy-900/60 font-semibold">{product.name_ar}</p>}
          </div>

          <div className={`flex items-center gap-1.5 ${isAr ? "" : "flex-row-reverse justify-end"}`}>
            <div className="flex text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4.5 h-4.5 ${i < Math.floor(product.rating) ? "fill-gold-500 text-gold-500" : "text-ivory-300"}`} 
                />
              ))}
            </div>
            <span className="text-xs font-bold text-navy-900/70">
              {product.rating} {dict.reviewsLabel(product.review_count)}
            </span>
          </div>

          {/* Price */}
          <div className={`bg-ivory-200 p-4 rounded-xl border border-gold-500/10 flex items-center gap-4 ${isAr ? "" : "flex-row-reverse justify-end"}`}>
            {hasDiscount && (
              <span className="text-sm text-navy-900/40 line-through">
                {isAr ? `${product.price} ج.م` : `EGP ${product.price}`}
              </span>
            )}
            <span className="text-2xl font-bold text-burgundy-800">
              {isAr ? `${displayPrice} ج.م` : `EGP ${displayPrice}`}
            </span>
            {hasDiscount && (
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
                {dict.saveAmt(product.price - product.discount_price!)}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-navy-950">{dict.descHeader}</h3>
            <p className="text-xs text-navy-900/75 leading-relaxed text-justify">
              {isAr ? product.description_ar : product.description_en}
            </p>
          </div>

          {/* Sizing / Options selectors */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy-950 block">
                {dict.chooseLabel(product.variants[0].type)}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants[0].options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedVariant(opt)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      selectedVariant === opt
                        ? "bg-burgundy-800 text-gold-300 border-gold-500 shadow-sm"
                        : "bg-white text-navy-950 border-gold-500/15 hover:border-gold-500/40"
                    }`}
                  >
                    {translateVariantValue(opt)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Engraving dedication overlay */}
          <div className="space-y-2 p-4 bg-gold-500/5 rounded-xl border border-gold-500/20">
            <div className={`flex items-center gap-1.5 text-gold-600 ${isAr ? "" : "flex-row-reverse"}`}>
              <Sparkles className="w-4 h-4 shrink-0" />
              <label className="text-xs font-bold">{dict.engravingHeading}</label>
            </div>
            <input
              type="text"
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              placeholder={dict.engravingPlaceholder}
              className={`w-full bg-white border border-gold-500/20 rounded-lg p-2.5 text-xs focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 ${isAr ? "text-right" : "text-left"}`}
            />
            <p className="text-[10px] text-navy-900/50">{dict.engravingDesc}</p>
          </div>

          {/* Quantity Counter & CTA */}
          <div className={`flex flex-wrap gap-4 pt-2 ${isAr ? "" : "flex-row-reverse"}`}>
            <div className="flex items-center border-2 border-gold-500/15 rounded-xl bg-white overflow-hidden shrink-0">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-2 text-burgundy-800 hover:bg-gold-500/10 transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 text-sm font-bold text-navy-900">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-2 text-burgundy-800 hover:bg-gold-500/10 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                const combinedVariant = selectedVariant + (engravingText ? ` [Engraving: ${engravingText}]` : "");
                addToCart(product, quantity, combinedVariant);
              }}
              disabled={product.stock_quantity <= 0}
              className="flex-1 bg-burgundy-800 hover:bg-burgundy-900 disabled:bg-ivory-300 disabled:text-navy-900/30 disabled:border-transparent text-gold-300 font-extrabold px-6 py-3 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-burgundy-900/10 hover:scale-[1.02]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{product.stock_quantity <= 0 ? dict.outOfStock : dict.addToCart}</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center cursor-pointer ${
                isWish
                  ? "bg-red-50 border-red-500/30 text-red-600"
                  : "bg-white border-gold-500/15 text-navy-900/60 hover:text-burgundy-800 hover:border-gold-500/40"
              }`}
              title={isWish ? dict.wishlistRemove : dict.wishlistAdd}
            >
              <Heart className={`w-5 h-5 ${isWish ? "fill-red-600" : ""}`} />
            </button>
          </div>

          <div className="border-t border-gold-500/10 pt-4 grid grid-cols-2 gap-4 text-[11px] text-navy-900/60">
            <div className={`flex items-center gap-1.5 ${isAr ? "" : "flex-row-reverse justify-end"}`}>
              <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{dict.assurance1}</span>
            </div>
            <div className={`flex items-center gap-1.5 ${isAr ? "" : "flex-row-reverse justify-end"}`}>
              <AlertTriangle className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{dict.assurance2}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications Table */}
      <div className="bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm">
        <h3 className={`font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-3 mb-4 ${isAr ? "text-right" : "text-left"}`}>
          {dict.specsHeading}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {Object.entries(product.specifications).map(([key, val]: [string, string | number]) => (
            <div key={key} className={`flex justify-between items-center py-2 border-b border-dashed border-gold-500/5 text-xs ${isAr ? "" : "flex-row-reverse"}`}>
              <span className="font-semibold text-navy-900/60">{translateSpecKey(key)}</span>
              <span className="font-bold text-navy-900">{translateVariantValue(String(val))}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Review Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Post a Review form */}
        <div className={`bg-ivory-200 p-6 rounded-2xl border border-gold-500/15 shadow-sm space-y-4 h-fit ${isAr ? "text-right" : "text-left"}`}>
          <h3 className="font-serif text-base font-bold text-burgundy-800">{dict.writeReview}</h3>
          <p className="text-xs text-navy-900/60">{dict.reviewSub}</p>
          
          {reviewSuccessMsg ? (
            <div className="bg-gold-500/15 border border-gold-500/25 p-4 rounded-lg text-xs font-semibold text-burgundy-800 text-center leading-relaxed">
              {reviewSuccessMsg}
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold block text-navy-950">{dict.ratingLabel}</label>
                <div className={`flex gap-1.5 ${isAr ? "justify-start" : "justify-start"}`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="text-gold-500 cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= reviewRating ? "fill-gold-500" : "text-ivory-300"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold block text-navy-950">{dict.reviewerName}</label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder={dict.reviewerNamePlaceholder}
                  className={`w-full bg-white border border-gold-500/20 rounded-lg p-2.5 text-xs focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold block text-navy-950">{dict.reviewText}</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={dict.reviewTextPlaceholder}
                  rows={4}
                  className={`w-full bg-white border border-gold-500/20 rounded-lg p-2.5 text-xs focus:outline-none focus:border-gold-500 resize-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isReviewSubmitting}
                className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold py-3 rounded-lg text-xs border border-gold-500/20 transition-all cursor-pointer"
              >
                {isReviewSubmitting ? dict.submitting : dict.submitReview}
              </button>
            </form>
          )}
        </div>

        {/* Existing reviews */}
        <div className={`lg:col-span-2 space-y-4 ${isAr ? "text-right" : "text-left"}`}>
          <h3 className={`font-serif text-lg font-bold text-burgundy-800 flex items-center gap-2 border-b border-gold-500/10 pb-3 mb-2 ${isAr ? "" : "flex-row-reverse"}`}>
            <MessageSquare className="w-5 h-5 text-gold-500" />
            {dict.buyerReviews}
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border border-gold-500/10 shadow-sm space-y-3">
              <div className={`flex justify-between items-start ${isAr ? "" : "flex-row-reverse"}`}>
                <div>
                  <h4 className="font-bold text-sm text-navy-900">{isAr ? "القمص بطرس أنور" : "Fr. Boutros Anwar"}</h4>
                  <p className="text-[10px] text-navy-900/40 mt-0.5">{isAr ? "كاهن كنيسة بالمنيا" : "Priest in Minya"}</p>
                </div>
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-navy-900/70 leading-relaxed text-justify">
                {isAr 
                  ? "منتج ممتاز مطابق للمواصفات والطقوس الكنسية السليمة، وقد لفت انتباهي الدقة والتشطيب الفاخر والنقوش اليدوية المذهبة."
                  : "Excellent product matching proper liturgical rubrics. The details, premium finish, and gilded hand engravings caught my attention."}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gold-500/10 shadow-sm space-y-3">
              <div className={`flex justify-between items-start ${isAr ? "" : "flex-row-reverse"}`}>
                <div>
                  <h4 className="font-bold text-sm text-navy-900">{isAr ? "الشماس كيرلس فرج" : "Deacon Cyrillos Faraj"}</h4>
                  <p className="text-[10px] text-navy-900/40 mt-0.5">{isAr ? "شماس مرسم بكنيسة العمرانية" : "Ordained Deacon at Omraniya Church"}</p>
                </div>
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-navy-900/70 leading-relaxed text-justify">
                {isAr 
                  ? "ملمس الحرير مريح والتطريز رائع، والألوان متناسقة ومريحة للنظر. سرعة التوصيل كانت ممتازة أيضاً."
                  : "The silk fabric feels very comfortable and the embroidery is gorgeous. Harmonious colors, and fast delivery too."}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
