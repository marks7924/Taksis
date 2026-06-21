"use client";

import React, { useState } from "react";
import { Sparkles, Image, Check, Eye } from "lucide-react";
import { useApp } from "@/services/store";

export default function ProjectGallery() {
  const { language } = useApp();
  const isAr = language === "ar";
  const [filter, setFilter] = useState<"all" | "wood" | "vestment" | "vessels">("all");

  const portfolioItems: { title_ar: string; title_en: string; category: string; img: string; }[] = [];

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
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 text-navy-900/40 text-sm font-semibold border-2 border-dashed border-gold-500/10 rounded-2xl bg-white max-w-xl mx-auto p-8 shadow-sm">
          <Sparkles className="w-10 h-10 text-gold-500 mx-auto mb-3 animate-pulse" />
          <p>{isAr ? "سيتم عرض نماذج من أعمالنا ومشاريعنا المنجزة هنا قريباً." : "Sample projects will be displayed here soon."}</p>
        </div>
      ) : (
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
      )}

    </div>
  );
}

