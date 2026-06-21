import React from "react";
import { Award, ShieldCheck, Heart, Sparkles, BookOpen } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Brand Hero Callout */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="font-serif text-gold-500 font-extrabold tracking-widest text-sm block">قصتنا وتراثنا</span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-burgundy-800 leading-tight">
          معارض طاكسيس | للشماس والقسيس
        </h1>
        <p className="text-sm text-navy-900/60 leading-relaxed font-medium">
          هوية قبطية عريقة متخصصة في توفير كافة الاحتياجات والملابس الكهنوتية، أواني المذبح، ودفوف الألحان المصنوعة يدوياً طبقاً للمقاييس الكنسية الأرثوذكسية السليمة.
        </p>
      </div>

      {/* Detail Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-burgundy-800 border-r-4 border-gold-500 pr-3">
            معنى اسم طاكسيس وأصالة البداية
          </h2>
          <p className="text-xs text-navy-900/75 leading-relaxed text-justify">
            كلمة **طاكسيس** هي كلمة مشتقة من اللغة اليونانية والقبطية وتعني **"الترتيب"** أو **"النظام الطقسي"**. تم اختيار هذا الاسم ليعكس التزامنا الصارم بتقديم خدمات ومستلزمات الخدمة الكنسية مطابقة بالكامل للترتيب الطقسي الكنسي الأرثوذكسي المعتمد.
          </p>
          <p className="text-xs text-navy-900/75 leading-relaxed text-justify">
            بدأنا كورشة صغيرة متخصصة في صياغة الدفوف والصنوج النحاسية يدوياً بالكامل لضمان نقاء النغمة وقوة الرنين في ألحان التسبحة الكنسية. وبفضل ثقة الآباء الكهنة والشمامسة الأجلاء، توسعنا لتأسيس معارض متكاملة تشمل تفصيل الملابس والبرانس الكهنوتية الفاخرة وحفر الهياكل الخشبية.
          </p>
        </div>

        <div className="h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-gold-500/10">
          <img 
            src="https://images.unsplash.com/photo-1548625361-155de6c7f54d?auto=format&fit=crop&w=600&q=80" 
            alt="طاكسيس للشماس والقسيس" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      {/* Values checklist */}
      <div className="bg-white rounded-3xl border border-gold-500/10 p-8 md:p-12 shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-xl md:text-2xl font-extrabold text-burgundy-800">التزامنا بالجودة وركائزنا الروحية</h3>
          <p className="text-xs text-navy-900/50">لماذا يختار الآباء والأديرة معارض طاكسيس؟</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 text-center md:text-right flex flex-col items-center md:items-start">
            <div className="w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-navy-950">التوافق الطقسي الكامل</h4>
            <p className="text-xs text-navy-900/60 leading-relaxed">
              جميع ملابس الكهنوت والأواني تصنع وتصاغ بمراجعة دقيقة لطقوس الكنيسة القبطية الأرثوذكسية والرموز الروحية الأصيلة.
            </p>
          </div>

          <div className="space-y-3 text-center md:text-right flex flex-col items-center md:items-start">
            <div className="w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-navy-950">صياغة وتطريز ممتاز</h4>
            <p className="text-xs text-navy-900/60 leading-relaxed">
              نستخدم أقمشة الحرير المستورد والقطيفة الإيطالي وخيوط السيرما الذهبية والفضية، وصياغة نحاس ثقيل مصمت يدوم طويلاً.
            </p>
          </div>

          <div className="space-y-3 text-center md:text-right flex flex-col items-center md:items-start">
            <div className="w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-navy-950">تخصيص كامل بالطلب</h4>
            <p className="text-xs text-navy-900/60 leading-relaxed">
              نوفر كادر مقاسات خاص بالكهنة والشمامسة، ونحفر أسماء الكنائس والإهداءات على الهدايا والصلبان والمنجليات بالطلب الخاص.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
