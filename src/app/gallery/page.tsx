"use client";

import React, { useState } from "react";
import { Sparkles, Image, Check, Eye } from "lucide-react";

export default function ProjectGallery() {
  const [filter, setFilter] = useState<"all" | "wood" | "vestment" | "vessels">("all");

  const portfolioItems = [
    { title: "منجلية (حامل إنجيل) خشب أرو أحمر محفورة يدوياً", category: "wood", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80" },
    { title: "تفصيل بدلة كهنوتية بيضاء مذهبة بالكامل بخيوط فرنسية", category: "vestment", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
    { title: "صياغة طقم أواني المذبح مذهبة بالذهب عيار ٢٤", category: "vessels", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" },
    { title: "شمع دانات نحاسية عملاقة منقوشة بالصلبان القبطية", category: "vessels", img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=400&q=80" },
    { title: "صليب يدوي من خشب الزيتون الطبيعي محفور بدقة", category: "wood", img: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&w=400&q=80" },
    { title: "تفصيل بطرشيل قطيفة أحمر ملكي مطرز بصور القديسين والصلبان", category: "vestment", img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80" },
    { title: "أغطية مذبح حرير طبيعي مطرزة بالخيوط اللامعة", category: "vestment", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80" },
    { title: "علبة أواني كنسية مخصصة ومبطنة بالقطيفة الحمراء", category: "wood", img: "https://images.unsplash.com/photo-1548625361-155de6c7f54d?auto=format&fit=crop&w=400&q=80" }
  ];

  const filteredItems = filter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-burgundy-800">
          معرض الأعمال والمشروعات المنجزة
        </h1>
        <p className="text-sm text-navy-900/60 leading-relaxed font-medium">
          نفخر بعرض نماذج حية للمشغولات التي قمنا بتسليمها وتصنيعها بورش طاكسيس لملابس الكهنوت وصياغة النحاس وحفر الأخشاب.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center border-b border-gold-500/10 pb-1">
        <div className="flex gap-2 bg-ivory-200 p-1.5 rounded-lg border border-gold-500/10 text-xs font-bold text-navy-900">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2.5 rounded transition-all cursor-pointer ${
              filter === "all" ? "bg-burgundy-800 text-gold-300" : "hover:bg-gold-500/10"
            }`}
          >
            الكل ({portfolioItems.length})
          </button>
          
          <button
            onClick={() => setFilter("vestment")}
            className={`px-6 py-2.5 rounded transition-all cursor-pointer ${
              filter === "vestment" ? "bg-burgundy-800 text-gold-300" : "hover:bg-gold-500/10"
            }`}
          >
            ملابس الخدمة
          </button>

          <button
            onClick={() => setFilter("wood")}
            className={`px-6 py-2.5 rounded transition-all cursor-pointer ${
              filter === "wood" ? "bg-burgundy-800 text-gold-300" : "hover:bg-gold-500/10"
            }`}
          >
            أعمال خشبية منقوشة
          </button>

          <button
            onClick={() => setFilter("vessels")}
            className={`px-6 py-2.5 rounded transition-all cursor-pointer ${
              filter === "vessels" ? "bg-burgundy-800 text-gold-300" : "hover:bg-gold-500/10"
            }`}
          >
            أواني وصياغة المذبح
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
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-burgundy-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="bg-white/95 text-burgundy-800 font-extrabold px-4 py-2 rounded-lg text-xs flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  معاينة التفاصيل
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-xs md:text-sm text-navy-950 leading-relaxed text-center min-h-[40px] flex items-center justify-center">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
