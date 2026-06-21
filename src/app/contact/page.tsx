"use client";

import React, { useState } from "react";
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  MessageCircle 
} from "lucide-react";
import { useApp } from "@/services/store";

export default function Contact() {
  const { addNotification } = useApp();
  
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && email && message) {
      setSubmitted(true);
      addNotification("نشكرك على تواصلك مع معارض طاكسيس. تم استلام رسالتك وسيتواصل معك أحد مسؤولي الخدمة قريباً.");
      setName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };

  const branchOmraniya = {
    name: "فرع العمرانية",
    address: "الهرم - العمرانية - بجوار كنيسة الملاك سوريال ومارمينا - خلف سنترال العمرانية",
    phone: "0235469946",
    hours: "يومياً من 8 صباحاً حتى 10 مساءً",
    maps: "https://maps.app.goo.gl/awRQwkFZ7hssuEky7"
  };

  const branchZaytoun = {
    name: "فرع الزيتون",
    address: "26أ شارع سنان أمام كازينو سنان - خلف كنيسة العذراء بالزيتون - أول الأصبغ من سنان",
    phone: "0226394044",
    hours: "يومياً من 10 صباحاً حتى 10 مساءً (الأحد إجازة)",
    maps: "https://maps.app.goo.gl/Ue7yZRSDnKj8yAE89"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Editorial Title */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-burgundy-800">
          تواصل مع معارض طاكسيس
        </h1>
        <p className="text-sm text-navy-900/60 leading-relaxed font-medium">
          يسعدنا تواصلكم للاستفسار عن منتجات الكنائس ومقاسات تفصيل ملابس الكهنة وتجهيز الألواح الخشبية المحفورة.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Contact Details cards */}
        <div className="space-y-6">
          
          {/* Quick hotline contact */}
          <div className="bg-gradient-to-r from-burgundy-800 to-burgundy-900 text-white rounded-2xl p-6 border border-gold-500/20 shadow-md space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold-400">الخط الساخن الموحد</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              تواصل معنا مباشرة عبر مكالمة هاتفية أو رسالة واتساب للطلبات العاجلة.
            </p>
            <div className="space-y-3 text-sm">
              <a href="tel:01220201204" className="flex items-center gap-2 hover:text-gold-300 font-bold">
                <Phone className="w-5 h-5 text-gold-500" />
                <span>01220201204</span>
              </a>
              <a href="mailto:taksisdaf@gmail.com" className="flex items-center gap-2 hover:text-gold-300">
                <Mail className="w-5 h-5 text-gold-500" />
                <span className="text-xs">taksisdaf@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Branches info */}
          <div className="bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm space-y-6 text-xs leading-relaxed text-navy-950">
            <h3 className="font-serif text-base font-bold text-burgundy-800 border-b border-gold-500/10 pb-2 mb-2">عناوين المعارض</h3>
            
            <div className="space-y-2.5">
              <h4 className="font-bold text-navy-900 text-sm">{branchOmraniya.name}</h4>
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
                <a href={`tel:${branchOmraniya.phone}`} className="hover:text-gold-600 font-bold">{branchOmraniya.phone}</a>
              </p>
              <a href={branchOmraniya.maps} target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] font-bold text-gold-600 hover:underline">خرائط جوجل ←</a>
            </div>

            <div className="space-y-2.5 border-t border-gold-500/5 pt-4">
              <h4 className="font-bold text-navy-900 text-sm">{branchZaytoun.name}</h4>
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
                <a href={`tel:${branchZaytoun.phone}`} className="hover:text-gold-600 font-bold">{branchZaytoun.phone}</a>
              </p>
              <a href={branchZaytoun.maps} target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] font-bold text-gold-600 hover:underline">خرائط جوجل ←</a>
            </div>
          </div>

        </div>

        {/* Right Columns: Interactive Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm">
          {submitted ? (
            <div className="bg-gold-500/15 border-2 border-gold-500/25 p-8 rounded-xl text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-gold-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-burgundy-800">تم إرسال رسالتكم بنجاح</h3>
              <p className="text-xs text-navy-900/80 leading-relaxed font-semibold">
                تم تسجيل رسالتك بنجاح في نظام المتابعة. سنقوم بمراجعة التفاصيل ومراسلتك هاتفياً أو عبر البريد الإلكتروني في أسرع وقت.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs text-navy-950">
              <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-2 mb-4">
                تواصل معنا عبر رسائل الموقع
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="font-bold">اسم الراسل بالكامل:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="الاسم الكريم..."
                    className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none focus:border-gold-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold">رقم الهاتف للتواصل:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="رقم للتأكيد..."
                    className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none focus:border-gold-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold">البريد الإلكتروني للعميل:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="البريد..."
                    className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none focus:border-gold-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold">موضوع الرسالة:</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="مثال: تفصيل ملابس شماس..."
                    className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none focus:border-gold-500 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold">نص رسالتك:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب هنا طلبك أو تفاصيل استفسارك..."
                  rows={5}
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none focus:border-gold-500 resize-none font-semibold"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة الآن</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
