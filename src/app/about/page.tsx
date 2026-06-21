"use client";

import React from "react";
import { Award, ShieldCheck, Heart } from "lucide-react";
import { useApp } from "@/services/store";

export default function About() {
  const { language } = useApp();
  const isAr = language === "ar";

  // Dictionaries
  const dict = {
    badge: isAr ? "قصتنا وتراثنا" : "Our Story & Heritage",
    title: isAr ? "معارض طاكسيس | للشماس والقسيس" : "Taxsis Showrooms | For Deacon & Priest",
    subtitle: isAr
      ? "هوية قبطية عريقة متخصصة في توفير كافة الاحتياجات والملابس الكهنوتية، أواني المذبح، ودفوف الألحان المصنوعة يدوياً طبقاً للمقاييس الكنسية الأرثوذكسية السليمة."
      : "A long-standing Coptic heritage brand specialized in providing liturgical supplies, priest vestments, deacon stoles, altar vessels, and handcrafted cymbals aligned with Orthodox rubrics.",
    storyTitle: isAr ? "معنى اسم طاكسيس وأصالة البداية" : "Meaning of Taxsis & Brand Origin",
    storyP1: isAr
      ? "كلمة طاكسيس هي كلمة مشتقة من اللغة اليونانية والقبطية وتعني \"الترتيب\" أو \"النظام الطقسي\". تم اختيار هذا الاسم ليعكس التزامنا الصارم بتقديم خدمات ومستلزمات الخدمة الكنسية مطابقة بالكامل للترتيب الطقسي الكنسي الأرثوذكسي المعتمد."
      : "The word 'Taxsis' is derived from Greek and Coptic, meaning 'Order' or 'Liturgical Rite'. This name was chosen to reflect our strict commitment to offering church supplies that fully match Coptic Orthodox liturgical order and rubrics.",
    storyP2: isAr
      ? "بدأنا كورشة صغيرة متخصصة في صياغة الدفوف والصنوج النحاسية يدوياً بالكامل لضمان نقاء النغمة وقوة الرنين في ألحان التسبحة الكنسية. وبفضل ثقة الآباء الكهنة والشمامسة الأجلاء، توسعنا لتأسيس معارض متكاملة تشمل تفصيل الملابس والبرانس الكهنوتية الفاخرة وحفر الهياكل الخشبية."
      : "We began as a small workshop specialized in forging solid brass cymbals (Dafs) entirely by hand to ensure acoustic purity for liturgical praises. Thanks to the trust of reverend fathers and deacons, we expanded into a comprehensive showroom covering luxury vestments, tailored stoles, and hand-carved sanctuary screen woodwork.",
    valuesTitle: isAr ? "التزامنا بالجودة وركائزنا الروحية" : "Our Core Values & Commitment",
    valuesSub: isAr ? "لماذا يختار الآباء والأديرة معارض طاكسيس؟" : "Why do churches and monasteries choose Taxsis?",
    value1Title: isAr ? "التوافق الطقسي الكامل" : "Strict Liturgical Accordance",
    value1Desc: isAr
      ? "جميع ملابس الكهنوت والأواني تصنع وتصاغ بمراجعة دقيقة لطقوس الكنيسة القبطية الأرثوذكسية والرموز الروحية الأصيلة."
      : "All clergy vestments and vessels are crafted with strict compliance to Coptic Orthodox rubrics and authentic spiritual iconography.",
    value2Title: isAr ? "صياغة وتطريز ممتاز" : "Premium Forging & Embroidery",
    value2Desc: isAr
      ? "نستخدم أقمشة الحرير المستورد والقطيفة الإيطالي وخيوط السيرما الذهبية والفضية، وصياغة نحاس ثقيل يدوم طويلاً."
      : "We source premium imported brocade silk, Italian velvet, French gold metallic thread, and solid brass built to last for generations.",
    value3Title: isAr ? "تخصيص كامل بالطلب" : "Complete Bespoke Customization",
    value3Desc: isAr
      ? "نوفر كادر مقاسات خاص بالكهنة والشمامسة، ونحفر أسماء الكنائس والإهداءات على الهدايا والصلبان والمنجليات بالطلب الخاص."
      : "We offer custom measurements for priest vestments and engrave custom dedications, church names, and details on all woodwork and crosses."
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Brand Hero Callout */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className={`font-serif text-gold-500 font-extrabold text-sm block ${isAr ? "tracking-normal" : "tracking-widest"}`}>{dict.badge}</span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-burgundy-800 leading-tight">
          {dict.title}
        </h1>
        <p className="text-sm text-navy-900/60 leading-relaxed font-medium">
          {dict.subtitle}
        </p>
      </div>

      {/* Detail Columns */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${isAr ? "" : "flex-row-reverse"}`}>
        <div className={`space-y-6 ${isAr ? "text-right" : "text-left"}`}>
          <h2 className={`font-serif text-2xl md:text-3xl font-extrabold text-burgundy-800 pr-3 ${isAr ? "border-r-4 border-gold-500" : "border-l-4 border-gold-500 pl-3"}`}>
            {dict.storyTitle}
          </h2>
          <p className="text-xs text-navy-900/75 leading-relaxed text-justify">
            {dict.storyP1}
          </p>
          <p className="text-xs text-navy-900/75 leading-relaxed text-justify">
            {dict.storyP2}
          </p>
        </div>

        <div className="h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-gold-500/10">
          <img 
            src="https://images.unsplash.com/photo-1548625361-155de6c7f54d?auto=format&fit=crop&w=600&q=80" 
            alt="Taxsis Showroom Story" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      {/* Values Checklist */}
      <div className="bg-white rounded-3xl border border-gold-500/10 p-8 md:p-12 shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-xl md:text-2xl font-extrabold text-burgundy-800">{dict.valuesTitle}</h3>
          <p className="text-xs text-navy-900/50">{dict.valuesSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Val 1 */}
          <div className={`space-y-3 flex flex-col ${isAr ? "text-right items-end md:items-start md:text-right" : "text-left items-start"}`}>
            <div className="w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-navy-950">{dict.value1Title}</h4>
            <p className={`text-xs text-navy-900/60 leading-relaxed ${isAr ? "text-right" : "text-left"}`}>
              {dict.value1Desc}
            </p>
          </div>

          {/* Val 2 */}
          <div className={`space-y-3 flex flex-col ${isAr ? "text-right items-end md:items-start md:text-right" : "text-left items-start"}`}>
            <div className="w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-navy-950">{dict.value2Title}</h4>
            <p className={`text-xs text-navy-900/60 leading-relaxed ${isAr ? "text-right" : "text-left"}`}>
              {dict.value2Desc}
            </p>
          </div>

          {/* Val 3 */}
          <div className={`space-y-3 flex flex-col ${isAr ? "text-right items-end md:items-start md:text-right" : "text-left items-start"}`}>
            <div className="w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-navy-950">{dict.value3Title}</h4>
            <p className={`text-xs text-navy-900/60 leading-relaxed ${isAr ? "text-right" : "text-left"}`}>
              {dict.value3Desc}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
