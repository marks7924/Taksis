"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  SlidersHorizontal, Heart, ShoppingBag, Search, X, 
  ChevronDown, Grid, Star, Sparkles, Filter 
} from "lucide-react";
import { useApp } from "@/services/store";
import { Category, Product } from "@/services/db-mock-data";

function ShopCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist, language, products, categories } = useApp();

  const isAr = language === "ar";

  // URL Query Parameters
  const paramCategory = searchParams.get("category") || "all";
  const paramSearch = searchParams.get("q") || "";
  const paramWishlistOnly = searchParams.get("wishlist") === "true";
  const paramDiscounted = searchParams.get("discounted") === "true";

  // Filter States
  const [searchVal, setSearchVal] = useState(paramSearch);
  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [priceMax, setPriceMax] = useState<number>(15000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(paramCategory);
  }, [paramCategory]);

  useEffect(() => {
    setSearchVal(paramSearch);
  }, [paramSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateQuery({ q: searchVal });
  };

  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "all" || val === "") {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    router.push(`/shop?${params.toString()}`);
  };

  // Filter and Sort Logic
  const filteredProducts = products.filter((product) => {
    if (paramSearch) {
      const q = paramSearch.toLowerCase();
      const matchName = product.name_ar.includes(q) || product.name_en.toLowerCase().includes(q);
      const matchSku = product.sku.toLowerCase().includes(q);
      const matchDesc = product.description_ar.includes(q) || product.description_en.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchDesc) return false;
    }

    if (selectedCategory !== "all" && product.category_id !== selectedCategory) {
      return false;
    }

    if (paramWishlistOnly && !wishlist.includes(product.id)) {
      return false;
    }

    if (paramDiscounted && !product.discount_price) {
      return false;
    }

    const currentPrice = product.discount_price || product.price;
    if (currentPrice > priceMax) return false;

    if (inStockOnly && product.stock_quantity <= 0) return false;

    return true;
  }).sort((a, b) => {
    const priceA = a.discount_price || a.price;
    const priceB = b.discount_price || b.price;

    if (sortBy === "price_asc") return priceA - priceB;
    if (sortBy === "price_desc") return priceB - priceA;
    if (sortBy === "popular") return b.review_count - a.review_count;
    return b.sku.localeCompare(a.sku);
  });

  const clearAllFilters = () => {
    setSearchVal("");
    setPriceMax(15000);
    setInStockOnly(false);
    setSortBy("newest");
    router.push("/shop");
  };

  // Bilingual Dictionaries
  const dict = {
    wishlistTitle: isAr ? "منتجاتي المفضلة" : "My Saved Wishlist",
    wishlistSub: (count: number) => isAr 
      ? `تصفح المنتجات الـ ${count} التي قمت بحفظها في قائمتك الخاصة`
      : `Browse the ${count} item(s) you saved in your personal wishlist`,
    catalogTitle: isAr ? "معرض المنتجات والمستلزمات" : "Product Catalog & Supplies",
    catalogSub: (count: number) => isAr
      ? `نعرض لكم ${count} من أفضل الملابس الكهنوتية، أواني الخدمة والكتب الكنسية`
      : `Showing ${count} premium Coptic vestments, altar vessels, and liturgical books`,
    filterBtn: isAr ? "تصفية النتائج" : "Filter Results",
    sortByLabel: isAr ? "ترتيب حسب:" : "Sort by:",
    sortNewest: isAr ? "الأحدث وصولاً" : "Newest Arrivals",
    sortPopular: isAr ? "الأكثر شعبية" : "Most Popular",
    sortPriceAsc: isAr ? "السعر: من الأقل للأعلى" : "Price: Low to High",
    sortPriceDesc: isAr ? "السعر: من الأعلى للأقل" : "Price: High to Low",
    toolsHeading: isAr ? "أدوات التصفية" : "Filters & Search",
    resetBtn: isAr ? "إعادة تعيين الكل" : "Reset All",
    searchLabel: isAr ? "ابحث داخل النتائج:" : "Search within results:",
    searchPlaceholder: isAr ? "اسم المنتج، كود الـ SKU..." : "Product name, SKU...",
    categoryLabel: isAr ? "القسم الكنسي:" : "Liturgical Category:",
    allCategories: isAr ? "جميع الأقسام الـ 19" : "All 19 Categories",
    maxPriceLabel: isAr ? "الحد الأقصى للسعر:" : "Max Price Limit:",
    inStockOnly: isAr ? "المتوفر في المخزن فقط" : "In Stock Only",
    noResults: isAr ? "لم نجد أي نتائج مطابقة" : "No results match your criteria",
    noResultsSub: isAr 
      ? "حاول تغيير معايير التصفية، أو تقليل سعر الحد الأدنى، أو البحث عن عبارة شائعة مثل \"طونية\" أو \"دف\"."
      : "Try changing the filter parameters, adjusting the max price slider, or searching for terms like \"Tonia\" or \"Daf\".",
    clearFilters: isAr ? "إلغاء جميع خيارات التصفية" : "Clear all active filters",
    saleBadge: isAr ? "خصم خاص" : "Sale",
    limitedBadge: isAr ? "إصدار محدود" : "Limited",
    outOfStockBadge: isAr ? "نفذت الكمية" : "Out of Stock",
    addToCartBtn: isAr ? "أضف لسلة" : "Add to Cart",
    unavailableBtn: isAr ? "غير متوفر" : "Out of Stock",
    applyFilters: isAr ? "تطبيق التصفية" : "Apply Filters"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title Header */}
      <div className={`border-b border-gold-500/10 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isAr ? "" : "flex-row-reverse"}`}>
        <div className={isAr ? "text-right" : "text-left"}>
          <h1 className="font-serif text-3xl font-extrabold text-burgundy-800">
            {paramWishlistOnly ? dict.wishlistTitle : dict.catalogTitle}
          </h1>
          <p className="text-xs text-navy-900/60 mt-1">
            {paramWishlistOnly 
              ? dict.wishlistSub(filteredProducts.length)
              : dict.catalogSub(filteredProducts.length)
            }
          </p>
        </div>

        {/* Action controls */}
        <div className={`flex gap-3 w-full md:w-auto ${isAr ? "" : "flex-row-reverse"}`}>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center justify-center gap-1.5 bg-white border border-gold-500/20 text-navy-900 px-4 py-2.5 rounded-lg text-xs font-bold w-full"
          >
            <Filter className="w-4 h-4 text-gold-600" />
            {dict.filterBtn}
          </button>

          <div className={`flex items-center gap-2 bg-white border border-gold-500/15 rounded-lg px-3 py-2 text-xs font-semibold text-navy-900 w-full md:w-56 justify-between ${isAr ? "" : "flex-row-reverse"}`}>
            <span className="text-navy-900/50">{dict.sortByLabel}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none font-bold text-burgundy-800 text-left cursor-pointer"
            >
              <option value="newest">{dict.sortNewest}</option>
              <option value="popular">{dict.sortPopular}</option>
              <option value="price_asc">{dict.sortPriceAsc}</option>
              <option value="price_desc">{dict.sortPriceDesc}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ================================== SIDEBAR FILTERS (DESKTOP) ================================== */}
        <aside className={`hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-gold-500/10 shadow-sm h-fit ${isAr ? "text-right" : "text-left"}`}>
          <div className={`flex items-center justify-between border-b border-gold-500/10 pb-4 ${isAr ? "" : "flex-row-reverse"}`}>
            <h3 className={`font-serif text-base font-bold text-burgundy-800 flex items-center gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
              <SlidersHorizontal className="w-4.5 h-4.5 text-gold-500" />
              {dict.toolsHeading}
            </h3>
            <button 
              onClick={clearAllFilters}
              className="text-[10px] font-bold text-gold-600 hover:underline cursor-pointer"
            >
              {dict.resetBtn}
            </button>
          </div>

          {/* Search box filter */}
          <form onSubmit={handleSearchSubmit} className="space-y-2">
            <label className="text-xs font-bold text-navy-950 block">{dict.searchLabel}</label>
            <div className="relative">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder={dict.searchPlaceholder}
                className={`w-full bg-ivory-200 border border-gold-500/20 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-gold-500 ${isAr ? "text-right pl-8" : "text-left pr-8"}`}
              />
              <button type="submit" className={`absolute top-2.5 text-navy-900/40 hover:text-burgundy-800 cursor-pointer ${isAr ? "left-2.5" : "right-2.5"}`}>
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Categories select list */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-navy-950 block">{dict.categoryLabel}</label>
            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
              <button
                onClick={() => updateQuery({ category: "all" })}
                className={`w-full px-2.5 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${isAr ? "text-right" : "text-left"} ${
                  selectedCategory === "all"
                    ? "bg-gold-500/20 text-burgundy-800 border-r-4 border-gold-500"
                    : "text-navy-900/70 hover:bg-gold-500/5"
                }`}
              >
                {dict.allCategories}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateQuery({ category: cat.id })}
                  className={`w-full px-2.5 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${isAr ? "text-right" : "text-left"} ${
                    selectedCategory === cat.id
                      ? "bg-gold-500/20 text-burgundy-800 border-r-4 border-gold-500"
                      : "text-navy-900/70 hover:bg-gold-500/5"
                  }`}
                >
                  {isAr ? cat.name_ar : cat.name_en}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range max slider */}
          <div className="space-y-2">
            <div className={`flex justify-between items-center ${isAr ? "" : "flex-row-reverse"}`}>
              <label className="text-xs font-bold text-navy-950">{dict.maxPriceLabel}</label>
              <span className="text-xs font-bold text-burgundy-800">
                {isAr ? `${priceMax} ج.م` : `EGP ${priceMax}`}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="15000"
              step="50"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-burgundy-800 cursor-pointer"
            />
            <div className={`flex justify-between text-[10px] text-navy-900/40 ${isAr ? "" : "flex-row-reverse"}`}>
              <span>{isAr ? "٥٠ ج.م" : "EGP 50"}</span>
              <span>{isAr ? "١٥,٠٠٠ ج.م" : "EGP 15,000"}</span>
            </div>
          </div>

          {/* Availability checkbox */}
          <div className="pt-2 border-t border-gold-500/5">
            <label className={`flex items-center gap-2 cursor-pointer select-none ${isAr ? "" : "flex-row-reverse"}`}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-burgundy-800 w-4 h-4 cursor-pointer"
              />
              <span className="text-xs font-bold text-navy-900/80">{dict.inStockOnly}</span>
            </label>
          </div>
        </aside>

        {/* ================================== PRODUCTS LIST GRID ================================== */}
        <section className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gold-500/10 p-12 text-center shadow-sm space-y-4">
              <div className="w-16 h-16 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-burgundy-800">{dict.noResults}</h3>
                <p className="text-xs text-navy-900/60 max-w-md mx-auto">
                  {dict.noResultsSub}
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold px-6 py-2.5 rounded-lg border border-gold-500/20 text-xs transition-colors cursor-pointer"
              >
                {dict.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isWish = wishlist.includes(product.id);
                const hasDiscount = !!product.discount_price;
                const displayPrice = product.discount_price || product.price;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-gold-500/10 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    {/* Image & Wishlist Button */}
                    <div className="relative h-56 bg-ivory-200 overflow-hidden border-b border-gold-500/5">
                      <img
                        src={product.images[0]}
                        alt={isAr ? product.name_ar : product.name_en}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 ${isAr ? "left-3" : "right-3"} bg-white/80 hover:bg-white text-burgundy-800 p-2 rounded-full border border-gold-500/15 transition-all shadow cursor-pointer z-10`}
                      >
                        <Heart className={`w-4.5 h-4.5 ${isWish ? "fill-burgundy-800" : ""}`} />
                      </button>
                      
                      {/* Badge Tags */}
                      <div className={`absolute top-3 ${isAr ? "right-3" : "left-3"} flex flex-col gap-1`}>
                        {hasDiscount && (
                          <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">{dict.saleBadge}</span>
                        )}
                        {product.is_limited_edition && (
                          <span className="bg-gold-500 text-burgundy-900 text-[9px] font-bold px-2 py-0.5 rounded">{dict.limitedBadge}</span>
                        )}
                        {product.stock_quantity <= 0 && (
                          <span className="bg-navy-900 text-white text-[9px] font-bold px-2 py-0.5 rounded">{dict.outOfStockBadge}</span>
                        )}
                      </div>
                    </div>

                    {/* Content details */}
                    <div className={`p-4 space-y-2.5 flex-1 flex flex-col justify-between ${isAr ? "text-right" : "text-left"}`}>
                      <div>
                        <h4 className="font-bold text-sm text-navy-900 group-hover:text-burgundy-800 transition-colors line-clamp-1">
                          <Link href={`/shop/${product.id}`}>{isAr ? product.name_ar : product.name_en}</Link>
                        </h4>
                        <p className="text-[10px] font-bold text-gold-600">
                          {isAr 
                            ? categories.find(c => c.id === product.category_id)?.name_ar 
                            : categories.find(c => c.id === product.category_id)?.name_en}
                        </p>
                        <p className="text-[11px] text-navy-900/50 line-clamp-2 mt-1 leading-relaxed">
                          {isAr ? product.description_ar : product.description_en}
                        </p>
                      </div>

                      <div className={`pt-3 border-t border-gold-500/5 flex items-center justify-between ${isAr ? "" : "flex-row-reverse"}`}>
                        <div className="flex flex-col">
                          {hasDiscount && (
                            <span className="text-[10px] text-navy-900/40 line-through leading-none mb-1">
                              {isAr ? `${product.price} ج.م` : `EGP ${product.price}`}
                            </span>
                          )}
                          <span className="font-bold text-sm text-burgundy-800 leading-none">
                            {isAr ? `${displayPrice} ج.م` : `EGP ${displayPrice}`}
                          </span>
                        </div>

                         <button
                          onClick={() => {
                            const isEngravingProduct = product.name_ar.includes("حفر") || product.name_en.toLowerCase().includes("engrav") || product.category_id === "cat-10" || product.id === "prod-laser-eng";
                            if (isEngravingProduct) {
                              router.push(`/shop/${product.id}`);
                            } else {
                              addToCart(product, 1);
                            }
                          }}
                          disabled={product.stock_quantity <= 0}
                          className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 disabled:bg-ivory-300 disabled:text-navy-900/30 disabled:border-transparent font-bold p-2 px-3 rounded-lg border border-gold-400 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{product.stock_quantity <= 0 ? dict.unavailableBtn : dict.addToCartBtn}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>

      {/* ================================== MOBILE FILTER OVERLAY DRAWER ================================== */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div onClick={() => setShowMobileFilters(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className={`relative w-80 bg-ivory-100 h-full shadow-2xl flex flex-col z-10 p-6 ${isAr ? "text-right ml-auto" : "text-left mr-auto"}`}>
            <div className={`flex items-center justify-between border-b border-gold-500/15 pb-4 mb-4 ${isAr ? "" : "flex-row-reverse"}`}>
              <h3 className="font-serif text-base font-bold text-burgundy-800">{dict.filterBtn}</h3>
              <button onClick={() => setShowMobileFilters(false)} className="text-navy-900 p-1.5 hover:bg-gold-500/10 rounded-full cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-1">
              {/* Search */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-950 block">{dict.searchLabel}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder={dict.searchPlaceholder}
                    className={`w-full bg-ivory-200 border border-gold-500/20 rounded-lg p-2.5 text-xs ${isAr ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-950 block">{dict.categoryLabel}</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    updateQuery({ category: e.target.value });
                  }}
                  className={`w-full bg-ivory-200 border border-gold-500/20 rounded-lg p-2.5 text-xs font-semibold ${isAr ? "text-right" : "text-left"}`}
                >
                  <option value="all">{dict.allCategories}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{isAr ? cat.name_ar : cat.name_en}</option>
                  ))}
                </select>
              </div>

              {/* Price slider */}
              <div className="space-y-2">
                <div className={`flex justify-between items-center ${isAr ? "" : "flex-row-reverse"}`}>
                  <label className="text-xs font-bold text-navy-950">{dict.maxPriceLabel}</label>
                  <span className="text-xs font-bold text-burgundy-800">
                    {isAr ? `${priceMax} ج.م` : `EGP ${priceMax}`}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="15000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-burgundy-800"
                />
              </div>

              {/* In stock */}
              <label className={`flex items-center gap-2 cursor-pointer select-none ${isAr ? "" : "flex-row-reverse"}`}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded accent-burgundy-800 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-bold text-navy-900/80">{dict.inStockOnly}</span>
              </label>
            </div>

            <button
              onClick={() => {
                updateQuery({ q: searchVal });
                setShowMobileFilters(false);
              }}
              className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold py-3 rounded-lg text-xs w-full mt-4 cursor-pointer"
            >
              {dict.applyFilters}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-sm font-bold">Loading...</div>}>
      <ShopCatalog />
    </Suspense>
  );
}
