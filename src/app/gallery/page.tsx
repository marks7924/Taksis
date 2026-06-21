"use client";

import React, { useState } from "react";
import { Sparkles, Image, Check, Eye } from "lucide-react";
import { useApp } from "@/services/store";

export default function ProjectGallery() {
  const { language } = useApp();
  const isAr = language === "ar";
  const [filter, setFilter] = useState<"all" | "wood" | "vestment" | "vessels">("all");

  const portfolioItems = [
    { 
      title_ar: "منجلية (حامل إنجيل) خشب أرو أحمر محفورة يدوياً", 
      title_en: "Fully Hand-Carved Oak Bible Lectern (Mangaleya)", 
      category: "wood", 
      img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title_ar: "تفصيل بدلة كهنوتية بيضاء مذهبة بالكامل بخيوط فرنسية", 
      title_en: "Bespoke Royal White Vestment with Gold French Thread", 
      category: "vestment", 
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title_ar: "صياغة طقم أواني المذبح مذهبة بالذهب عيار ٢٤", 
      title_en: "Liturgical Vessel Set Gilded in 24K Gold", 
      category: "vessels", 
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title_ar: "شمع دانات نحاسية عملاقة منقوشة بالصلبان القبطية", 
      title_en: "Giant Solid Brass Candelabras with Coptic Cross Engravings", 
      category: "vessels", 
      img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title_ar: "صليب يدوي من خشب الزيتون الطبيعي محفور بدقة", 
      title_en: "Natural Olive Wood Hand Cross Finely Engraved", 
      category: "wood", 
      img: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title_ar: "تفصيل بطرشيل قطيفة أحمر ملكي مطرز بصور القديسين والصلبان", 
      title_en: "Royal Red Velvet Priest Stole (Batrashil) with Embroidered Saints", 
      category: "vestment", 
      img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title_ar: "أغطية مذبح حرير طبيعي مطرزة بالخيوط اللامعة", 
      title_en: "Natural Silk Altar Covers Embroidered with Shimmering Threads", 
      category: "vestment", 
      img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80" 
    },
    { 
      title_ar: "علبة أواني كنسية مخصصة ومبطنة بالقطيفة الحمراء", 
      title_en: "Bespoke Liturgical Vessels Storage Box Lined with Red Velvet", 
      category: "wood", 
      img: "https://images.unsplash.com/photo-1548625361-155de6c7f54d?auto=format&fit=crop&w=400&q=80" 
    }
  ];

  const filteredItems = filter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  // Dictionaries
  const dict = {
    title: isAr ? "معرض الأعمال والمشروعات المنجزة" : "Completed Projects Portfolio",
    subtitle: isAr
      ? "نفخر بعرض نماذج حية للمشغولات التي قمنا بتسليمها وتصنيعها بورش طاكسيس لملابس الكهنوت وصياغة النحاس وحفر الأخشاب."
      : "We are proud to showcase live examples of crafted and tailored liturgical vestments, hand-engraved oak woodwork, and altars delivered by Taxsis.",
    catAll: isAr ? "الكل" : "All",
    catVestment: isAr ? "ملابس الخدمة" : "Liturgical Vestments",
    catWood: isAr ? "أعمال خشبية منقوشة" : "Hand-carved Woodwork",
    catVessels: isAr ? "أواني وصياغة المذبح" : "Altar Vessels & Forging",
    previewBtn: isAr ? "معاينة التفاصيل" : "Preview Details"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-burgundy-800">
          {dict.title}
        </h1>
        <p className="text-sm text-navy-900/60 leading-relaxed font-medium">
          {dict.subtitle}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center border-b border-gold-500/10 pb-1">
        <div className={`flex flex-wrap gap-2 bg-ivory-200 p-1.5 rounded-lg border border-gold-500/10 text-xs font-bold text-navy-900 ${isAr ? "" : "flex-row-reverse"}`}>
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2.5 rounded transition-all cursor-pointer ${
              filter === "all" ? "bg-burgundy-800 text-gold-300" : "hover:bg-gold-500/10"
            }`}
          >
            {dict.catAll} ({portfolioItems.length})
          </button>
          
          <button
            onClick={() => setFilter("vestment")}
            className={`px-5 py-2.5 rounded transition-all cursor-pointer ${
              filter === "vestment" ? "bg-burgundy-800 text-gold-300" : "hover:bg-gold-500/10"
            }`}
          >
            {dict.catVestment}
          </button>

          <button
            onClick={() => setFilter("wood")}
            className={`px-5 py-2.5 rounded transition-all cursor-pointer ${
              filter === "wood" ? "bg-burgundy-800 text-gold-300" : "hover:bg-gold-500/10"
            }`}
          >
            {dict.catWood}
          </button>

          <button
            onClick={() => setFilter("vessels")}
            className={`px-5 py-2.5 rounded transition-all cursor-pointer ${
              filter === "vessels" ? "bg-burgundy-800 text-gold-300" : "hover:bg-gold-500/10"
            }`}
          >
            {dict.catVessels}
          </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-xl overflow-hidden border border-gold-500/10 shadow-sm hover:shadow-md transition-all group relative flex flex-col justify-between"
          >
            <div className="relative h-64 overflow-hidden border-b border-gold-500/5">
              <img 
                src={item.img} 
                alt={isAr ? item.title_ar : item.title_en} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-burgundy-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="bg-white/95 text-burgundy-800 font-extrabold px-4 py-2 rounded-lg text-xs flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {dict.previewBtn}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-xs md:text-sm text-navy-950 leading-relaxed text-center min-h-[40px] flex items-center justify-center">
                {isAr ? item.title_ar : item.title_en}
              </h4>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

