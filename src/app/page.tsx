"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Phone, MapPin, Clock, ArrowRight, Heart, ShoppingBag, 
  Map, Check, ChevronDown, Quote, HelpCircle, Award
} from "lucide-react";
import { useApp } from "@/services/store";
import { BRANCHES, TESTIMONIALS, FAQS, Product, Category, Branch } from "@/services/db-mock-data";

export default function Home() {
  const { addToCart, wishlist, toggleWishlist, language, products, categories } = useApp();
  
  // States
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Geolocation branch finder state
  const [selectedCity, setSelectedCity] = useState("all");
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [nearestBranchMsg, setNearestBranchMsg] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 30, seconds: 15 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isAr = language === "ar";

  // Dynamic Dictionaries
  const dict = {
    taglineBadge: isAr ? "طاكسيس للشماس والقسيس - منذ سنوات في خدمتكم" : "Taksis for Deacon & Priest - In your service for years",
    ctaQuoteBtn: isAr ? "طلب تسعير مقاسات خاصة" : "Request Custom Quote",
    categoriesHeading: isAr ? "أقسام المعرض المتكاملة" : "Liturgical Categories",
    categoriesSub: isAr ? "تصفح أقسامنا الـ 19 المصنفة طقسياً لتلبية احتياجات الكنائس، الآباء الكهنة، والشمامسة الأجلاء." : "Browse our 19 liturgical categories tailored to the needs of churches, priests, and deacons.",
    flashSaleTitle: isAr ? "تخفيضات الأعياد الكبرى" : "Feast Grand Sale",
    flashSaleSub: isAr ? "عرض لفترة محدودة" : "Limited Time Offer",
    flashSaleDesc: isAr ? "احصل على خصومات تصل إلى 15% على الملابس الكهنوتية الجاهزة وأواني المذبح المذهبة المصممة بأعلى جودة مطابقة لطقس الكنيسة الأرثوذكسية." : "Get up to 15% off ready-made clergy vestments and gilded altar vessels made under strict Orthodox guidelines.",
    endsIn: isAr ? "ينتهي العرض الخاص خلال:" : "Sale ends in:",
    hours: isAr ? "ساعة" : "hr",
    mins: isAr ? "دقيقة" : "min",
    secs: isAr ? "ثانية" : "sec",
    browseSale: isAr ? "تسوق عروض الخصومات الكبرى" : "Shop Feast Sale Offers",
    featuredTitle: isAr ? "منتجات طاكسيس المميزة" : "Featured Products",
    featuredSub: isAr ? "مجموعة مختارة بعناية من أفضل معروضاتنا" : "A handpicked selection of our finest products",
    viewAll: isAr ? "عرض الكل" : "View All",
    saleBadge: isAr ? "خصم خاص" : "Sale",
    limitedBadge: isAr ? "نسخة محدودة" : "Limited Edition",
    addToCartBtn: isAr ? "أضف للسلة" : "Add to Cart",
    customHeadingBadge: isAr ? "قسم التصنيع الطقسي المخصص" : "Bespoke Liturgical Works",
    customTitle: isAr ? "خدمة التفصيل وتصنيع المنجليات وحفر الأخشاب بالطلب" : "Custom Tailoring, Wood Carvings & Gilded Metalworks",
    customDesc: isAr 
      ? "تنفرد معارض طاكسيس بتوفير كادر متخصص لتلبية الطلبات الخاصة لأدوات المذبح والهياكل. نوفر خدمة أخذ مقاسات الكهنة لتفصيل البرانس والملابس الكهنوتية، وحفر المنجليات الكبيرة، ورسم الأيقونات القبطية عيار 22، وتفصيل صلبان الصدر الفضية والمذهبة مع نقوش خاصة وصياغة الكاس والصينية الفضة الخالصة."
      : "Taxsis Showrooms specialize in custom work for altars and sanctuaries. We offer bespoke sizing for priest vestments and phelonions, hand-carved solid wood lecterns, hand-painted 22k gold icons, custom silver pectoral crosses, and pure silver chalices.",
    customBullet1: isAr ? "ملابس كهنوت وشماس مقاسات خاصة" : "Clergy & Deacon Custom Sizing",
    customBullet2: isAr ? "حفر زان وأرو يدوي للمذبح" : "Hand-carved Oak Altar Woodwork",
    customBullet3: isAr ? "صياغة فضة ونحاس مطلية ذهب" : "Gold-plated Silver & Brass Metalwork",
    customBtn1: isAr ? "طلب تفصيل ملابس كهنوتية" : "Order Custom Vestments",
    customBtn2: isAr ? "طلب حفر خشب / أواني مخصصة" : "Request Wood/Vessel Crafting",
    collectionsTitle: isAr ? "تشكيلات طاكسيس الفاخرة" : "Taxsis Premium Collections",
    collectionsSub: isAr ? "منتجات مسبوكة ومطرزة بعناية فائقة" : "Finely cast, polished, and embroidered products",
    bestSellers: isAr ? "الأكثر مبيعاً" : "Best Sellers",
    newArrivals: isAr ? "وصل حديثاً" : "New Arrivals",
    nearestTitle: isAr ? "البحث عن أقرب فرع" : "Find Nearest Showroom",
    nearestSub: isAr ? "هل ترغب في زيارة معارضنا لرؤية خامات ملابس الكهنوت والأردية الشماسية وتجربة الدفوف؟ حدد موقعك للعثور على الفرع الأقرب." : "Want to visit our showrooms to feel fabric textures or test cymbals? Locate your nearest branch.",
    nearestBadge: isAr ? "موقعك الجغرافي" : "Showroom Finder",
    detectBtn: isAr ? "تحديد أقرب فرع تلقائياً" : "Find Nearest Automatically",
    detecting: isAr ? "جاري تحديد الموقع..." : "Detecting Location...",
    manualSelect: isAr ? "أو اختر المنطقة يدوياً:" : "Or select area manually:",
    manualPlaceholder: isAr ? "اختر محافظتك/منطقتك..." : "Choose your governorate/area...",
    cairoOpt: isAr ? "القاهرة الكبرى / الزيتون / مصر الجديدة / شبرا" : "Greater Cairo / Zaytoun / Heliopolis / Shubra",
    gizaOpt: isAr ? "الجيزة / الهرم / العمرانية / الدقي" : "Giza / Haram / Omraniya / Dokki",
    gpsError: isAr ? "خاصية تحديد الموقع الجغرافي غير مدعومة في متصفحك. فرع الزيتون يقع في القاهرة الكبرى وفرع العمرانية بالجيزة." : "Geolocation is not supported in your browser. Omraniya branch is in Giza, and Zaytoun branch is in Cairo.",
    detectFail: isAr ? "لم نتمكن من تحديد موقعك التلقائي. فرع الزيتون يخدم القاهرة وفرع العمرانية يخدم الجيزة." : "Could not determine location. Zaytoun showroom covers Cairo, and Omraniya showroom covers Giza.",
    branchOmraniyaNear: isAr ? "الفرع الأقرب إليك هو: فرع العمرانية (العمرانية - الهرم). يبعد حوالي دقائق بسيطة بالسيارة." : "Nearest: Omraniya Branch (Haram, Giza). A short drive away.",
    branchZaytounNear: isAr ? "الفرع الأقرب إليك هو: فرع الزيتون (شارع سنان، أمام كازينو سنان خلف كنيسة العذراء بالزيتون)." : "Nearest: Zaytoun Branch (Sinan St, front of Sinan Casino, behind St. Mary Church).",
    mapsBtn: isAr ? "خرائط جوجل" : "Google Maps",
    callBtn: isAr ? "اتصل بالمعرض" : "Call Showroom",
    galleryTitle: isAr ? "معرض مشروعات طاكسيس المنجزة" : "Our Completed Projects Portfolio",
    gallerySub: isAr ? "شاهد أعمال تفصيل المذبح وحفر الخشب وصياغة الفضة التي قمنا بتسليمها للكنائس والأديرة الكبرى بمصر والمهجر." : "View custom altar carvings, vestments, and silver vessels delivered to major churches and monasteries in Egypt and abroad.",
    galleryBtn: isAr ? "شاهد المعرض الكامل للمشروعات والكتالوجات" : "View Full Portfolio & Catalogues",
    testimonialsTitle: isAr ? "أصوات الآباء والشمامسة الأجلاء" : "Words from Fathers & Deacons",
    faqTitle: isAr ? "الأسئلة الأكثر شيوعاً" : "Frequently Asked Questions",
    faqSub: isAr ? "كل ما تود معرفته عن خدمات التفصيل المخصصة والشحن والمقاسات" : "Everything you need to know about custom sizing, shipping, and delivery."
  };

  // Slideshow data
  const heroSlides = isAr ? [
    {
      title: "طاكسيس للشماس والقسيس",
      subtitle: "مستلزمات كنسية فاخرة تصنع يدوياً بالطلب الخاص لتلائم جلال ووقار المذبح المقدس",
      bgImage: "https://images.unsplash.com/photo-1548625361-155de6c7f54d?auto=format&fit=crop&w=1200&q=80",
      ctaText: "تصفح المتجر الكامل",
      ctaLink: "/shop"
    },
    {
      title: "ملابس الكهنوت والأردية الشماسية",
      subtitle: "تفصيل البرانس، والبطراشيل، والطونيات بأجود الأقمشة والحرير السوري والكنارات المذهبة",
      bgImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      ctaText: "تفصيل ملابس خدمة مخصصة",
      ctaLink: "/custom-orders"
    },
    {
      title: "الدفوف والصنوج النحاسية المصمتة",
      subtitle: "صياغة نحاسية يدوية دقيقة ورائعة لخدمة ألحان الكنيسة القبطية الأرثوذكسية والتسبحة",
      bgImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      ctaText: "استكشف الدفوف الكنسية",
      ctaLink: "/shop?category=cat-1"
    }
  ] : [
    {
      title: "Taksis for Deacon & Priest",
      subtitle: "Premium bespoke church supplies handcrafted to order, preserving the solemnity of the holy altar.",
      bgImage: "https://images.unsplash.com/photo-1548625361-155de6c7f54d?auto=format&fit=crop&w=1200&q=80",
      ctaText: "Browse Full Shop",
      ctaLink: "/shop"
    },
    {
      title: "Clergy Vestments & Deacon Tonias",
      subtitle: "Custom tailoring of stoles (batrashil), sticharia (tonia), and phelonions using premium Syrian silk.",
      bgImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      ctaText: "Order Custom Vestments",
      ctaLink: "/custom-orders"
    },
    {
      title: "Handcrafted Cymbals & Solid Brass Dafs",
      subtitle: "Meticulously hand-forged brass instruments tuned for Coptic Orthodox liturgical hymns and praises.",
      bgImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      ctaText: "Explore Liturgical Dafs",
      ctaLink: "/shop?category=cat-1"
    }
  ];

  // Auto-rotate hero banner slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  // Nearest branch finder logic
  const findNearestBranch = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      setNearestBranchMsg(dict.gpsError);
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLat(lat);
        setUserLng(lng);

        const distOmraniya = Math.sqrt(Math.pow(lat - 29.9984, 2) + Math.pow(lng - 31.2023, 2));
        const distZaytoun = Math.sqrt(Math.pow(lat - 30.1032, 2) + Math.pow(lng - 31.3094, 2));

        if (distOmraniya < distZaytoun) {
          setNearestBranchMsg(dict.branchOmraniyaNear);
        } else {
          setNearestBranchMsg(dict.branchZaytounNear);
        }
        setLoadingLocation(false);
      },
      (error) => {
        setNearestBranchMsg(dict.detectFail);
        setLoadingLocation(false);
      }
    );
  };

  const filteredFeatured = products.filter(p => p.is_featured);
  const bestSellers = products.filter(p => p.is_best_seller).slice(0, 4);
  const newArrivals = products.filter(p => p.is_new_arrival).slice(0, 4);

  const completedProjects = isAr ? [
    { title: "حامل إنجيل (منجلية) خشبي أرو محفور بالكامل", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80" },
    { title: "تفصيل برنص كهنوتي ملكي مذهب يدوي", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
    { title: "صياغة طقم أواني كنسية فضة خالصة مطلية ذهب", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" },
    { title: "شمع دانات نحاسية عملاقة لمذبح كنيسة مارمينا", img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=400&q=80" }
  ] : [
    { title: "Fully Hand-Carved Oak Bible Lectern (Mangaleya)", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80" },
    { title: "Bespoke Royal Phelonion with Hand-Embroidered Gold Accents", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
    { title: "Hand-forged Altar Vessel Set in Pure Gilded Silver", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" },
    { title: "Giant Solid Brass Candlesticks for St. Mina Church Altar", img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SLIDESHOW BANNER */}
      <section className="relative h-[500px] md:h-[650px] overflow-hidden bg-burgundy-900">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/40" />

            <div className="absolute inset-0 flex items-center justify-center text-center p-6">
              <div className="max-w-4xl space-y-6 animate-fade-in-up">
                
                <div className={`inline-flex items-center gap-1.5 bg-gold-500/10 text-gold-400 px-4 py-1.5 rounded-full border border-gold-500/20 text-xs font-semibold mb-2 ${isAr ? "tracking-normal" : "tracking-wider"}`}>
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  <span>{dict.taglineBadge}</span>
                </div>

                <h1 className="font-serif text-3xl md:text-6xl font-extrabold text-ivory-100 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-sm md:text-lg text-gold-100 max-w-2xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Link
                    href={slide.ctaLink}
                    className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-extrabold px-8 py-3.5 rounded-xl border border-gold-400 shadow-lg shadow-gold-600/20 hover:scale-105 transition-all text-sm md:text-base cursor-pointer"
                  >
                    {slide.ctaText}
                  </Link>
                  <Link
                    href="/custom-orders"
                    className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-8 py-3.5 rounded-xl border border-white/20 backdrop-blur hover:scale-105 transition-all text-sm md:text-base"
                  >
                    {dict.ctaQuoteBtn}
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                index === activeSlide ? "bg-gold-500 w-16" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. CATEGORIES GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="w-12 h-0.5 bg-gold-500 mx-auto"></div>
          <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-burgundy-800">
            {dict.categoriesHeading}
          </h2>
          <p className="text-sm text-navy-900/60 max-w-xl mx-auto font-medium">
            {dict.categoriesSub}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="bg-white rounded-xl border border-gold-500/10 p-3 flex flex-col items-center text-center hover:shadow-md hover:border-gold-500/30 transition-all duration-300 group"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold-500/20 mb-3 relative">
                <img
                  src={category.image_url}
                  alt={isAr ? category.name_ar : category.name_en}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-navy-900 group-hover:text-burgundy-800 transition-colors line-clamp-2">
                {isAr ? category.name_ar : category.name_en}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS & FLASH SALES */}
      <section className="bg-ivory-200 py-16 border-y border-gold-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Flash Sale Banner Column */}
            <div className="bg-gradient-to-br from-burgundy-800 to-burgundy-900 text-white rounded-2xl p-8 border border-gold-500/20 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-4 border-gold-500/10 pointer-events-none rounded-full" />
              
              <div className="space-y-4">
                <span className="bg-gold-500 text-burgundy-900 text-xs font-bold px-3 py-1 rounded-full inline-block">
                  {dict.flashSaleSub}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-gold-400">
                  {dict.flashSaleTitle}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {dict.flashSaleDesc}
                </p>
              </div>

              {/* Countdown */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gold-300">{dict.endsIn}</p>
                <div className={`flex gap-2 justify-start items-center ${isAr ? "" : "flex-row-reverse"}`}>
                  <div className="bg-white/10 rounded-lg p-2.5 text-center min-w-[50px] border border-white/10">
                    <span className="font-mono text-xl font-bold text-gold-400">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <p className="text-[9px] uppercase mt-0.5">{dict.hours}</p>
                  </div>
                  <span className="text-gold-400 font-bold">:</span>
                  <div className="bg-white/10 rounded-lg p-2.5 text-center min-w-[50px] border border-white/10">
                    <span className="font-mono text-xl font-bold text-gold-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <p className="text-[9px] uppercase mt-0.5">{dict.mins}</p>
                  </div>
                  <span className="text-gold-400 font-bold">:</span>
                  <div className="bg-white/10 rounded-lg p-2.5 text-center min-w-[50px] border border-white/10">
                    <span className="font-mono text-xl font-bold text-gold-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <p className="text-[9px] uppercase mt-0.5">{dict.secs}</p>
                  </div>
                </div>
              </div>

              <Link 
                href="/shop?discounted=true" 
                className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 text-xs font-bold py-3 px-6 rounded-lg text-center border border-gold-400 transition-colors w-full cursor-pointer"
              >
                {dict.browseSale}
              </Link>
            </div>

            {/* Featured Products Grid Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`flex justify-between items-end border-b border-gold-500/10 pb-4 ${isAr ? "" : "flex-row-reverse"}`}>
                <div className={isAr ? "text-right" : "text-left"}>
                  <h3 className="font-serif text-2xl font-bold text-burgundy-800">{dict.featuredTitle}</h3>
                  <p className="text-xs text-navy-900/60 mt-0.5">{dict.featuredSub}</p>
                </div>
                <Link href="/shop" className="text-xs font-bold text-gold-600 hover:underline flex items-center gap-1">
                  <span>{dict.viewAll}</span>
                  <ArrowRight className={`w-3 h-3 transform ${isAr ? "rotate-180" : ""}`} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredFeatured.slice(0, 2).map((product) => {
                  const hasDiscount = !!product.discount_price;
                  const displayPrice = product.discount_price || product.price;
                  const isWish = wishlist.includes(product.id);

                  return (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-xl border border-gold-500/10 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div className="relative h-56 bg-ivory-200 overflow-hidden border-b border-gold-500/5">
                        <img
                          src={product.images[0]}
                          alt={isAr ? product.name_ar : product.name_en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute top-3 ${isAr ? "left-3" : "right-3"} bg-white/80 hover:bg-white text-burgundy-800 p-2 rounded-full border border-gold-500/15 transition-all shadow`}
                        >
                          <Heart className={`w-4.5 h-4.5 ${isWish ? "fill-burgundy-800" : ""}`} />
                        </button>
                        
                        <div className={`absolute top-3 ${isAr ? "right-3" : "left-3"} flex flex-col gap-1`}>
                          {hasDiscount && (
                            <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded">{dict.saleBadge}</span>
                          )}
                          {product.is_limited_edition && (
                            <span className="bg-gold-500 text-burgundy-900 text-[10px] font-bold px-2.5 py-1 rounded">{dict.limitedBadge}</span>
                          )}
                        </div>
                      </div>

                      <div className={`p-4 space-y-3 flex-1 flex flex-col justify-between ${isAr ? "text-right" : "text-left"}`}>
                        <div>
                          <h4 className="font-bold text-sm text-navy-900 group-hover:text-burgundy-800 transition-colors line-clamp-1">
                            {isAr ? product.name_ar : product.name_en}
                          </h4>
                          <p className="text-xs text-navy-900/60 line-clamp-2 mt-1 leading-relaxed">
                            {isAr ? product.description_ar : product.description_en}
                          </p>
                        </div>

                        <div className={`pt-3 border-t border-gold-500/5 flex items-center justify-between ${isAr ? "" : "flex-row-reverse"}`}>
                          <div className="flex flex-col">
                            {hasDiscount && (
                              <span className="text-xs text-navy-900/40 line-through leading-none mb-1">
                                {isAr ? `${product.price} ج.م` : `EGP ${product.price}`}
                              </span>
                            )}
                            <span className="font-bold text-base text-burgundy-800 leading-none">
                              {isAr ? `${displayPrice} ج.م` : `EGP ${displayPrice}`}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold p-2 px-3 rounded-lg border border-gold-400 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            {dict.addToCartBtn}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. CUSTOM ORDERS / ORNAMENTATION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-gradient-to-r from-burgundy-900 via-navy-900 to-burgundy-900 text-white rounded-3xl p-8 md:p-12 border-2 border-gold-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 ${isAr ? "text-right" : "text-left"}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(212,175,55,0.08),_transparent_60%)] pointer-events-none" />

          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-2 text-gold-400">
              <Award className="w-6 h-6 animate-bounce" />
              <span className={`text-xs font-bold uppercase ${isAr ? "tracking-normal" : "tracking-wider"}`}>{dict.customHeadingBadge}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-gold-300">
              {dict.customTitle}
            </h2>
            <p className="text-sm text-white/80 leading-relaxed text-justify">
              {dict.customDesc}
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gold-200">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-gold-400" /> {dict.customBullet1}</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-gold-400" /> {dict.customBullet2}</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-gold-400" /> {dict.customBullet3}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto flex-shrink-0">
            <Link
              href="/custom-orders"
              className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-extrabold px-8 py-3.5 rounded-xl border border-gold-400 text-center transition-all hover:scale-105 cursor-pointer text-sm shadow-lg shadow-gold-600/10"
            >
              {dict.customBtn1}
            </Link>
            <Link
              href="/custom-orders"
              className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-8 py-3.5 rounded-xl border border-white/20 backdrop-blur text-center transition-all hover:scale-105 text-sm"
            >
              {dict.customBtn2}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS & BEST SELLERS (TABS GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className={`flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-gold-500/15 pb-6 ${isAr ? "" : "flex-row-reverse"}`}>
          <div className={isAr ? "text-right" : "text-left"}>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-burgundy-800">{dict.collectionsTitle}</h2>
            <p className="text-xs text-navy-900/60 mt-1">{dict.collectionsSub}</p>
          </div>
          
          <div className="flex gap-2 bg-ivory-200 p-1.5 rounded-lg border border-gold-500/10">
            <button
              onClick={() => setActiveCategory("best")}
              className={`px-6 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeCategory === "best" || activeCategory === "all"
                  ? "bg-burgundy-800 text-gold-300"
                  : "text-navy-800 hover:bg-gold-500/10"
              }`}
            >
              {dict.bestSellers}
            </button>
            <button
              onClick={() => setActiveCategory("new")}
              className={`px-6 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeCategory === "new"
                  ? "bg-burgundy-800 text-gold-300"
                  : "text-navy-800 hover:bg-gold-500/10"
              }`}
            >
              {dict.newArrivals}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(activeCategory === "new" ? newArrivals : bestSellers).map((product) => {
            const hasDiscount = !!product.discount_price;
            const displayPrice = product.discount_price || product.price;
            const isWish = wishlist.includes(product.id);

            return (
              <div 
                key={product.id} 
                className="bg-white rounded-xl border border-gold-500/10 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="relative h-56 bg-ivory-200 overflow-hidden border-b border-gold-500/5">
                  <img
                    src={product.images[0]}
                    alt={isAr ? product.name_ar : product.name_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-3 ${isAr ? "left-3" : "right-3"} bg-white/80 hover:bg-white text-burgundy-800 p-2 rounded-full border border-gold-500/15 transition-all shadow`}
                  >
                    <Heart className={`w-4.5 h-4.5 ${isWish ? "fill-burgundy-800" : ""}`} />
                  </button>
                </div>

                <div className={`p-4 space-y-3 flex-1 flex flex-col justify-between ${isAr ? "text-right" : "text-left"}`}>
                  <div>
                    <h4 className="font-bold text-sm text-navy-900 group-hover:text-burgundy-800 transition-colors line-clamp-1">
                      <Link href={`/shop/${product.id}`}>{isAr ? product.name_ar : product.name_en}</Link>
                    </h4>
                    <p className="text-[10px] font-bold text-gold-600 mt-0.5">
                      {isAr 
                        ? categories.find(c => c.id === product.category_id)?.name_ar 
                        : categories.find(c => c.id === product.category_id)?.name_en}
                    </p>
                  </div>

                  <div className={`pt-3 border-t border-gold-500/5 flex items-center justify-between ${isAr ? "" : "flex-row-reverse"}`}>
                    <div className="flex flex-col">
                      {hasDiscount && (
                        <span className="text-xs text-navy-900/40 line-through leading-none mb-1">
                          {isAr ? `${product.price} ج.م` : `EGP ${product.price}`}
                        </span>
                      )}
                      <span className="font-bold text-sm text-burgundy-800 leading-none">
                        {isAr ? `${displayPrice} ج.م` : `EGP ${displayPrice}`}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold p-2 px-3 rounded-lg border border-gold-400 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {dict.addToCartBtn}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. NEAREST BRANCH FINDER SECTION */}
      <section className="bg-ivory-200 py-16 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Nearest Branch Finder input form */}
            <div className={`lg:col-span-1 bg-white rounded-2xl p-8 border border-gold-500/15 shadow-xl space-y-6 ${isAr ? "text-right" : "text-left"}`}>
              <div className="space-y-2">
                <span className={`text-[10px] font-bold text-gold-600 uppercase ${isAr ? "tracking-normal" : "tracking-widest"}`}>{dict.nearestBadge}</span>
                <h3 className="font-serif text-xl md:text-2xl font-extrabold text-burgundy-800">{dict.nearestTitle}</h3>
                <p className="text-xs text-navy-900/60 leading-relaxed">
                  {dict.nearestSub}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={findNearestBranch}
                  disabled={loadingLocation}
                  className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold py-3 px-4 rounded-lg text-xs border border-gold-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Map className="w-4 h-4" />
                  <span>{loadingLocation ? dict.detecting : dict.detectBtn}</span>
                </button>

                {nearestBranchMsg && (
                  <div className="p-3.5 bg-gold-500/10 border border-gold-500/25 rounded-lg text-xs font-semibold text-burgundy-800 leading-relaxed animate-fade-in text-center">
                    {nearestBranchMsg}
                  </div>
                )}

                <div className="border-t border-gold-500/10 pt-4 space-y-2">
                  <label className="text-xs font-bold text-navy-900/70">{dict.manualSelect}</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      if (e.target.value === "cairo") {
                        setNearestBranchMsg(dict.branchZaytounNear);
                      } else if (e.target.value === "giza") {
                        setNearestBranchMsg(dict.branchOmraniyaNear);
                      } else {
                        setNearestBranchMsg("");
                      }
                    }}
                    className={`w-full bg-ivory-200 border border-gold-500/20 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                  >
                    <option value="all">{dict.manualPlaceholder}</option>
                    <option value="cairo">{dict.cairoOpt}</option>
                    <option value="giza">{dict.gizaOpt}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Branches Card Displays */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {BRANCHES.map((branch) => (
                <div key={branch.id} className="bg-white rounded-2xl border border-gold-500/10 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
                  <div className="h-44 overflow-hidden relative border-b border-gold-500/5">
                    <img src={branch.image} alt={isAr ? branch.name_ar : branch.name_en} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className={`absolute bottom-4 ${isAr ? "right-4" : "left-4"} text-white font-serif text-lg font-bold`}>
                      {isAr ? branch.name_ar : branch.name_en}
                    </span>
                  </div>

                  <div className={`p-6 space-y-4 flex-1 flex flex-col justify-between ${isAr ? "text-right" : "text-left"}`}>
                    <div className="space-y-2.5 text-xs text-navy-950/70">
                      <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                        <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                        <span className="font-medium">{isAr ? branch.address_ar : branch.address_en}</span>
                      </p>
                      <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                        <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                        <span>{isAr ? branch.working_hours_ar : branch.working_hours_en}</span>
                      </p>
                      <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse"}`}>
                        <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                        <a href={`tel:${branch.phone}`} className="hover:text-gold-600 font-bold">{branch.phone}</a>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gold-500/10 grid grid-cols-2 gap-3">
                      <a
                        href={branch.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 text-center font-bold py-2.5 rounded-lg text-xs border border-gold-400 transition-colors"
                      >
                        {dict.mapsBtn}
                      </a>
                      <a
                        href={`tel:${branch.phone}`}
                        className="bg-burgundy-800 hover:bg-burgundy-950 text-gold-300 text-center font-bold py-2.5 rounded-lg text-xs border border-gold-500/20 transition-colors"
                      >
                        {dict.callBtn}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. GALLERY COMPLETE PROJECTS PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="w-12 h-0.5 bg-gold-500 mx-auto"></div>
          <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-burgundy-800">
            {dict.galleryTitle}
          </h2>
          <p className="text-sm text-navy-900/60 max-w-xl mx-auto font-medium">
            {dict.gallerySub}
          </p>
        </div>

        {/* Grid portfolio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {completedProjects.map((item, idx) => (
            <div key={idx} className="relative rounded-xl overflow-hidden group shadow-sm h-64 border border-gold-500/10">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className={`text-white font-bold text-xs md:text-sm leading-relaxed ${isAr ? "text-right" : "text-left"}`}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/gallery" className="inline-block bg-white hover:bg-gold-500/10 text-burgundy-800 font-bold border-2 border-gold-500/30 px-8 py-3 rounded-lg text-xs transition-colors">
            {dict.galleryBtn}
          </Link>
        </div>
      </section>

      {/* 8. TESTIMONIALS (CAROUSEL SLIDER) */}
      <section className="bg-gradient-to-r from-burgundy-900 to-burgundy-950 text-white py-16 border-y border-gold-500/20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <Quote className="w-10 h-10 text-gold-500 mx-auto opacity-80" />
          
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-gold-300">
            {dict.testimonialsTitle}
          </h2>

          <div className="min-h-[140px] flex items-center justify-center">
            {TESTIMONIALS.map((t, idx) => (
              <div key={t.id} className={`${idx === 0 ? "block" : "hidden"} space-y-4 animate-fade-in`}>
                <p className="text-sm md:text-base leading-relaxed text-gold-100 italic">
                  " {isAr ? t.text_ar : t.text_en} "
                </p>
                <div>
                  <h4 className="font-bold text-sm text-white">{isAr ? t.name_ar : t.name_en}</h4>
                  <p className="text-xs text-gold-500 mt-0.5">{isAr ? t.role_ar : t.role_en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-gold-500 mx-auto" />
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-burgundy-800">
            {dict.faqTitle}
          </h2>
          <p className="text-xs text-navy-900/60">{dict.faqSub}</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className="bg-white rounded-xl border border-gold-500/10 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className={`w-full p-5 font-bold text-sm text-navy-900 hover:text-burgundy-800 transition-colors flex items-center justify-between gap-4 ${isAr ? "text-right flex-row-reverse" : "text-left flex-row"}`}
                >
                  <span>{isAr ? faq.question_ar : faq.question_en}</span>
                  <ChevronDown className={`w-4.5 h-4.5 text-gold-600 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
                </button>
                
                {isOpen && (
                  <div className={`px-5 pb-5 pt-1 text-xs text-navy-900/70 border-t border-gold-500/5 leading-relaxed bg-ivory-200/50 ${isAr ? "text-right" : "text-left"}`}>
                    {isAr ? faq.answer_ar : faq.answer_en}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
