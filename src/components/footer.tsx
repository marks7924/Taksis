"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck 
} from "lucide-react";
import { useApp } from "@/services/store";

export default function Footer() {
  const { addNotification, language } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const isAr = language === "ar";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      addNotification(
        isAr 
          ? "شكراً لاشتراكك في النشرة البريدية لطاكسيس. سنبقيك على اطلاع بأحدث المنتجات المخصصة وعروض الأديرة."
          : "Thank you for subscribing to the Taxsis newsletter. We will keep you updated on custom products and monastic offers."
      );
      setEmail("");
    }
  };

  const branchOmraniya = {
    name: isAr ? "فرع العمرانية" : "Omraniya Branch",
    address: isAr 
      ? "الهرم - العمرانية - بجوار كنيسة الملاك سوريال ومارمينا - خلف سنترال العمرانية"
      : "Haram - Omraniya - Adjacent to Archangel Suriel & St. Mina Church - Behind Omraniya Central Exchange",
    phone: "0235469946",
    hours: isAr ? "يومياً من 8 صباحاً حتى 10 مساءً" : "Daily from 8 AM to 10 PM",
    maps: "https://maps.app.goo.gl/awRQwkFZ7hssuEky7"
  };

  const branchZaytoun = {
    name: isAr ? "فرع الزيتون" : "Zaytoun Branch",
    address: isAr
      ? "26أ شارع سنان أمام كازينو سنان - خلف كنيسة العذراء بالزيتون - أول الأصبغ من سنان"
      : "26A Sinan St. in front of Sinan Casino - Behind St. Mary Church in Zaytoun - Start of Al-Asbagh from Sinan St.",
    phone: "0226394044",
    hours: isAr ? "يومياً من 10 صباحاً حتى 10 مساءً (الأحد إجازة)" : "Daily from 10 AM to 10 PM (Closed on Sunday)",
    maps: "https://maps.app.goo.gl/Ue7yZRSDnKj8yAE89"
  };

  const socialLinks = {
    instagram: "https://www.instagram.com/taksis.store?igsh=MWpwc2diMzd5OWNuMA==",
    tiktok: "https://www.tiktok.com/@taksis10?_r=1&_d=eki1ej1cljgm33&sec_uid=MS4wLjABAAAAls08zTe4I8ty87u2QAN_EOoPPlDjxhVhvhbMH1giWNKHK3AZMqrayYk0Y6PcQfp0&share_author_id=7265597389372310533&sharer_language=en&source=h5_m&u_code=dbgdfk6136818e&timestamp=1782037169&user_id=6809345678806402053&sec_user_id=MS4wLjABAAAAWaScW3tGV5yHhP17roewlEg_OrVF9nn8CvTFB1dsIQoaklk3V2CipNQ_Qus1pqI-&item_author_type=2&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7653765852995094288&share_link_id=1fee6d17-6d80-4032-87da-55616398f6ea&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b6880%2Cb5836&social_share_type=5&share_enter_from=others_homepage&item_author_type=2&enable_checksum=1",
    facebook: "https://www.facebook.com/share/1DzLnhFmwX/"
  };

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 border-t-4 border-gold-500 relative">
      {/* Coptic Decorative Pattern Banner */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-300 via-gold-500 to-gold-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          
          {/* Brand Info */}
          <div className={`space-y-4 ${isAr ? "text-right" : "text-left"}`}>
            <Link href="/" className={`flex flex-col ${isAr ? "items-start" : "items-start"}`}>
              <span className="font-serif text-3xl font-bold text-gold-500">{isAr ? "طاكسيس" : "TAKSIS"}</span>
              <span className={`text-xs font-serif text-gold-100 ${isAr ? "tracking-normal" : "tracking-wider"}`}>
                {isAr ? "للشماس والقسيس" : "For Deacon & Priest"}
              </span>
            </Link>
            <p className="text-xs text-white/70 leading-relaxed text-justify">
              {isAr 
                ? "تعتبر معارض طاكسيس هي الهوية الموثوقة والوجهة الرائدة لتوفير مستلزمات المذبح المقدس، أواني الخدمة، ملابس الكهنة والشمامسة والرهبان، وصياغة الدفوف والصنوج النحاسية يدوياً بالكامل بجودة تدوم لأجيال."
                : "Taxsis Showrooms are the trusted identity and premier destination providing Coptic Orthodox liturgical vessels, clergy vestments, deacon stoles, and fully handcrafted cymbals designed to last for generations."}
            </p>
            <div className={`flex gap-4 pt-2 ${isAr ? "justify-start" : "justify-start"}`}>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold-500 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold-500 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold-500 transition-colors flex items-center" aria-label="TikTok">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                  <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72a162.55 162.55 0 1 1-250-135.79 161.64 161.64 0 0 1 127.77-3.83v88.24a81.18 81.18 0 1 0 41.22 70.82V0h88.24a108.68 108.68 0 0 0 108.77 108.77v88.14a210.5 210.5 0 0 1 6.77 13z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Branch 1 Details */}
          <div className={`space-y-4 ${isAr ? "text-right" : "text-left"}`}>
            <h4 className="font-serif text-lg font-bold text-gold-500 border-b border-gold-500/20 pb-2">{branchOmraniya.name}</h4>
            <div className="space-y-3 text-xs text-white/80">
              <p className="flex gap-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{branchOmraniya.address}</span>
              </p>
              <p className="flex gap-2">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{branchOmraniya.hours}</span>
              </p>
              <p className="flex gap-2">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${branchOmraniya.phone}`} className="hover:text-gold-400 font-semibold">{branchOmraniya.phone}</a>
              </p>
              <a 
                href={branchOmraniya.maps} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block text-xs font-bold text-gold-500 hover:underline mt-1"
              >
                {isAr ? "تحديد الموقع على الخريطة ←" : "Locate on map →"}
              </a>
            </div>
          </div>

          {/* Branch 2 Details */}
          <div className={`space-y-4 ${isAr ? "text-right" : "text-left"}`}>
            <h4 className="font-serif text-lg font-bold text-gold-500 border-b border-gold-500/20 pb-2">{branchZaytoun.name}</h4>
            <div className="space-y-3 text-xs text-white/80">
              <p className="flex gap-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{branchZaytoun.address}</span>
              </p>
              <p className="flex gap-2">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{branchZaytoun.hours}</span>
              </p>
              <p className="flex gap-2">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${branchZaytoun.phone}`} className="hover:text-gold-400 font-semibold">{branchZaytoun.phone}</a>
              </p>
              <a 
                href={branchZaytoun.maps} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block text-xs font-bold text-gold-500 hover:underline mt-1"
              >
                {isAr ? "تحديد الموقع على الخريطة ←" : "Locate on map →"}
              </a>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className={`space-y-4 ${isAr ? "text-right" : "text-left"}`}>
            <h4 className="font-serif text-lg font-bold text-gold-500 border-b border-gold-500/20 pb-2">
              {isAr ? "النشرة الإخبارية" : "Newsletter"}
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {isAr 
                ? "اشترك معنا لتصلك عروض التخفيضات الكبرى، وأحدث الكتب الكنسية الطقسية الصادرة حديثاً، ونماذج ملابس الشمامسة والكهنة."
                : "Subscribe to receive big seasonal discounts, updates on newly published Coptic liturgical books, and vestment models."}
            </p>
            {subscribed ? (
              <div className="bg-gold-500/10 border border-gold-500/25 p-3 rounded-lg flex items-center gap-2 text-gold-300 text-xs">
                <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" />
                <span>{isAr ? "تم الاشتراك بنجاح في القائمة البريدية" : "Successfully subscribed to our list"}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isAr ? "البريد الإلكتروني للخدمة..." : "Your service email..."}
                    className={`w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-3 text-xs focus:outline-none focus:border-gold-500 focus:bg-white/10 ${isAr ? "text-right pl-10" : "text-left pr-10"}`}
                    required
                  />
                  <Mail className={`w-4 h-4 text-white/40 absolute top-3.5 ${isAr ? "left-3" : "right-3"}`} />
                </div>
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors border border-gold-400"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? "اشترك الآن" : "Subscribe Now"}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-xs text-white/50 ${isAr ? "" : "flex-row-reverse"}`}>
          <div>
            <p>
              {isAr 
                ? `© ${new Date().getFullYear()} طاكسيس (Taxsis). جميع الحقوق محفوظة لخدمة القداس الإلهي.`
                : `© ${new Date().getFullYear()} TAKSIS. All rights reserved. Serving Coptic Divine Liturgy.`}
            </p>
          </div>
          <div className="flex gap-4">
            <span>{isAr ? "تطوير وإشراف فني ممتاز" : "Developed & Managed Professionally"}</span>
            <span>•</span>
            <a href="mailto:taksisdaf@gmail.com" className="hover:text-gold-500 transition-colors">taksisdaf@gmail.com</a>
          </div>
          <div className="flex items-center gap-1 text-gold-400/80 bg-gold-500/5 px-2.5 py-1 rounded border border-gold-500/10">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>
              {isAr 
                ? "منتجات كنسية موثوقة ومطابقة للطقس الأرثوذكسي" 
                : "Trusted Coptic Supplies, aligned with Orthodox rubrics"}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
