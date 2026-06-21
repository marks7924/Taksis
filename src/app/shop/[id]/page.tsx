"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Heart, ShoppingBag, Star, Sparkles, AlertTriangle, ShieldCheck, 
  ChevronLeft, ArrowRight, MessageSquare, Plus, Minus, Check 
} from "lucide-react";
import { useApp } from "@/services/store";
import { getProductById, addProductReview, Product } from "@/services/api";
import { CATEGORIES } from "@/services/db-mock-data";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  
  const { addToCart, wishlist, toggleWishlist, addToRecentlyViewed } = useApp();
  
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
          // Set initial variant if any
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
    return <div className="text-center py-24 font-bold text-sm">جاري تحميل تفاصيل المنتج الفاخر...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <h3 className="font-serif text-lg font-bold text-burgundy-800">المنتج غير موجود</h3>
        <p className="text-xs text-navy-900/60">عذراً، لم نتمكن من العثور على المنتج المطلوب. قد يكون قد تم إزالته أو تغيير رابطه.</p>
        <Link href="/shop" className="inline-block bg-burgundy-800 text-gold-300 text-xs px-6 py-2.5 rounded-lg border font-bold">
          العودة للمتجر
        </Link>
      </div>
    );
  }

  const hasDiscount = !!product.discount_price;
  const displayPrice = product.discount_price || product.price;
  const isWish = wishlist.includes(product.id);

  // Dynamic Image Zoom magnifier on mouse move
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

  // Submit review server action trigger
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
      setReviewSuccessMsg("تم إضافة مراجعتك بنجاح! شكراً لمشاركتنا تجربتك الروحية.");
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb navigation links */}
      <div className="flex items-center gap-2 text-xs font-semibold text-navy-900/60">
        <Link href="/" className="hover:text-burgundy-800">الرئيسية</Link>
        <ChevronLeft className="w-3 h-3" />
        <Link href="/shop" className="hover:text-burgundy-800">المتجر</Link>
        <ChevronLeft className="w-3 h-3" />
        {currentCategory && (
          <>
            <Link href={`/shop?category=${currentCategory.id}`} className="hover:text-burgundy-800">{currentCategory.name_ar}</Link>
            <ChevronLeft className="w-3 h-3" />
          </>
        )}
        <span className="text-burgundy-800 truncate">{product.name_ar}</span>
      </div>

      {/* Main product showcase columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Image Zoom Gallery */}
        <div className="space-y-4">
          {/* Active Image with magnifier */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[380px] md:h-[500px] bg-ivory-200 rounded-2xl border-2 border-gold-500/10 overflow-hidden cursor-zoom-in"
          >
            <img
              src={activeImage}
              alt={product.name_ar}
              style={zoomStyle}
              className="w-full h-full object-cover transition-transform duration-200"
            />
            {product.stock_quantity <= 0 && (
              <span className="absolute top-4 right-4 bg-navy-900 text-white text-xs font-bold px-3 py-1 rounded">
                نفذت الكمية مؤقتاً
              </span>
            )}
          </div>

          {/* Image Gallery thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === img ? "border-gold-500 scale-95" : "border-gold-500/10 hover:border-gold-500/40"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Adding to Cart */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold-600 tracking-wider">كود SKU: {product.sku}</span>
            <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-burgundy-800 leading-tight">
              {product.name_ar}
            </h1>
            <p className="text-[11px] text-navy-900/60 font-semibold">{product.name_en}</p>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-1.5">
            <div className="flex text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4.5 h-4.5 ${i < Math.floor(product.rating) ? "fill-gold-500 text-gold-500" : "text-ivory-300"}`} 
                />
              ))}
            </div>
            <span className="text-xs font-bold text-navy-900/70">
              {product.rating} ({product.review_count} تقييمات العملاء)
            </span>
          </div>

          {/* Price Container */}
          <div className="bg-ivory-200 p-4 rounded-xl border border-gold-500/10 flex items-center gap-4">
            {hasDiscount && (
              <span className="text-sm text-navy-900/40 line-through">{product.price} ج.م</span>
            )}
            <span className="text-2xl font-bold text-burgundy-800">
              {displayPrice} ج.م
            </span>
            {hasDiscount && (
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
                وفر {product.price - product.discount_price!} ج.م
              </span>
            )}
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-navy-950">وصف مستلزم الخدمة:</h3>
            <p className="text-xs text-navy-900/75 leading-relaxed text-justify">
              {product.description_ar}
            </p>
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-navy-950">
                اختر {product.variants[0].type === "size" ? "المقاس" : "الخامة/اللون"}:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants[0].options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedVariant(opt)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      selectedVariant === opt
                        ? "bg-burgundy-800 text-gold-300 border-gold-500 shadow-sm"
                        : "bg-white text-navy-950 border-gold-500/15 hover:border-gold-500/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Engraving request options (customized church brand requirement) */}
          <div className="space-y-2 p-4 bg-gold-500/5 rounded-xl border border-gold-500/20">
            <div className="flex items-center gap-1.5 text-gold-600">
              <Sparkles className="w-4 h-4" />
              <label className="text-xs font-bold">خدمة حفر اسم مخصص أو إهداء (اختياري):</label>
            </div>
            <input
              type="text"
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              placeholder="مثال: إهداء لكنيسة ملاك سوريال بالعمرانية..."
              className="w-full bg-white border border-gold-500/20 rounded-lg p-2.5 text-xs text-right focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            />
            <p className="text-[10px] text-navy-900/50">سيقوم كادر ورش طاكسيس بنقش هذه العبارة بدقة على هذا المستلزم الكنسي.</p>
          </div>

          {/* Quantity Selector & Cart CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            
            {/* Quantity Counter */}
            <div className="flex items-center border-2 border-gold-500/15 rounded-xl bg-white overflow-hidden">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-2 text-burgundy-800 hover:bg-gold-500/10 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 text-sm font-bold text-navy-900">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-2 text-burgundy-800 hover:bg-gold-500/10 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Add To Cart Button */}
            <button
              onClick={() => {
                const combinedVariant = selectedVariant + (engravingText ? ` [حفر: ${engravingText}]` : "");
                addToCart(product, quantity, combinedVariant);
              }}
              disabled={product.stock_quantity <= 0}
              className="flex-1 bg-burgundy-800 hover:bg-burgundy-900 disabled:bg-ivory-300 disabled:text-navy-900/30 disabled:border-transparent text-gold-300 font-extrabold px-6 py-3 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-burgundy-900/10 hover:scale-[1.02]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{product.stock_quantity <= 0 ? "غير متوفر حالياً" : "إضافة إلى سلة المشتريات"}</span>
            </button>

            {/* Wishlist button toggle */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center cursor-pointer ${
                isWish
                  ? "bg-red-50 border-red-500/30 text-red-600"
                  : "bg-white border-gold-500/15 text-navy-900/60 hover:text-burgundy-800 hover:border-gold-500/40"
              }`}
              title={isWish ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            >
              <Heart className={`w-5 h-5 ${isWish ? "fill-red-600" : ""}`} />
            </button>
          </div>

          {/* Secure Purchase Assurances */}
          <div className="border-t border-gold-500/10 pt-4 grid grid-cols-2 gap-4 text-[11px] text-navy-900/60">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span>صناعة مطابقة لطقوس الكنيسة القبطية</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-gold-500" />
              <span>منتج معالج بالكامل ومضمون 3 سنوات</span>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications & Technical Details */}
      <div className="bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-3 mb-4">
          المواصفات الفنية والمقاييس
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {Object.entries(product.specifications).map(([key, val]: [string, string | number]) => (
            <div key={key} className="flex justify-between items-center py-2 border-b border-dashed border-gold-500/5 text-xs">
              <span className="font-semibold text-navy-900/60">{key}</span>
              <span className="font-bold text-navy-900">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Review and Ratings Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Post a new review */}
        <div className="bg-ivory-200 p-6 rounded-2xl border border-gold-500/15 shadow-sm space-y-4 h-fit">
          <h3 className="font-serif text-base font-bold text-burgundy-800">كتابة مراجعة للمنتج</h3>
          <p className="text-xs text-navy-900/60">رأيك يهم آباء الكنائس والرهبان لتحديد جودة الخدمة.</p>
          
          {reviewSuccessMsg ? (
            <div className="bg-gold-500/15 border border-gold-500/25 p-4 rounded-lg text-xs font-semibold text-burgundy-800 text-center leading-relaxed">
              {reviewSuccessMsg}
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Rating Star selector */}
              <div className="space-y-1">
                <label className="text-xs font-semibold block text-navy-950">التقييم:</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="text-gold-500"
                    >
                      <Star className={`w-6 h-6 ${star <= reviewRating ? "fill-gold-500" : "text-ivory-300"}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold block text-navy-950">الاسم والصفة:</label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="مثال: الشماس يوحنا كمال"
                  className="w-full bg-white border border-gold-500/20 rounded-lg p-2.5 text-xs text-right focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-semibold block text-navy-950">نص المراجعة:</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="اكتب تعليقك هنا..."
                  rows={4}
                  className="w-full bg-white border border-gold-500/20 rounded-lg p-2.5 text-xs text-right focus:outline-none focus:border-gold-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isReviewSubmitting}
                className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold py-3 rounded-lg text-xs border border-gold-500/20 transition-all cursor-pointer"
              >
                {isReviewSubmitting ? "جاري الإرسال..." : "إرسال المراجعة"}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Existing Reviews feed */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-serif text-lg font-bold text-burgundy-800 flex items-center gap-2 border-b border-gold-500/10 pb-3 mb-2">
            <MessageSquare className="w-5 h-5 text-gold-500" />
            مراجعات وآراء الآباء المشترين
          </h3>
          
          <div className="space-y-4">
            {/* Seeded and dynamic reviews */}
            <div className="bg-white p-5 rounded-xl border border-gold-500/10 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-navy-900">القمص بطرس أنور</h4>
                  <p className="text-[10px] text-navy-900/40 mt-0.5">كاهن كنيسة بالمنيا</p>
                </div>
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-navy-900/70 leading-relaxed text-justify">
                منتج ممتاز مطابق للمواصفات والطقوس الكنسية السليمة، وقد لفت انتباهي الدقة والتشطيب الفاخر والنقوش اليدوية المذهبة.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gold-500/10 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-navy-900">الشماس كيرلس فرج</h4>
                  <p className="text-[10px] text-navy-900/40 mt-0.5">شماس مرسم بكنيسة العمرانية</p>
                </div>
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-navy-900/70 leading-relaxed text-justify">
                ملمس الحرير مريح والتطريز رائع، والألوان متناسقة ومريحة للنظر. سرعة التوصيل كانت ممتازة أيضاً.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
