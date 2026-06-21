"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { useApp } from "@/services/store";

export default function Contact() {
  const { addNotification, language } = useApp();
  
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isAr = language === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && email && message) {
      setSubmitted(true);
      addNotification(
        isAr 
          ? "نشكرك على تواصلك مع معارض طاكسيس. تم استلام رسالتك وسيتواصل معك أحد مسؤولي الخدمة قريباً."
          : "Thank you for contacting Taxsis Showrooms. Your message has been received, and our support team will reach out to you shortly."
      );
      setName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
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

  // Dictionaries
  const dict = {
    title: isAr ? "تواصل مع معارض طاكسيس" : "Contact Taxsis Showrooms",
    subtitle: isAr
      ? "يسعدنا تواصلكم للاستفسار عن منتجات الكنائس ومقاسات تفصيل ملابس الكهنة وتجهيز الألواح الخشبية المحفورة."
      : "We are pleased to connect with you regarding church supplies, tailored priest vestments, and custom-engraved oak structures.",
    hotlineTitle: isAr ? "الخط الساخن الموحد" : "Unified Customer Support",
    hotlineDesc: isAr
      ? "تواصل معنا مباشرة عبر مكالمة هاتفية أو رسالة واتساب للطلبات العاجلة."
      : "Contact us directly via a phone call or WhatsApp message for urgent orders.",
    branchHeading: isAr ? "عناوين المعارض" : "Showroom Addresses",
    addressLabel: isAr ? "العنوان:" : "Address:",
    hoursLabel: isAr ? "مواعيد العمل:" : "Hours:",
    phoneLabel: isAr ? "التليفون:" : "Phone:",
    mapsBtn: isAr ? "خرائط جوجل ←" : "Google Maps →",
    successHeading: isAr ? "تم إرسال رسالتكم بنجاح" : "Message Sent Successfully",
    successDesc: isAr
      ? "تم تسجيل رسالتك بنجاح في نظام المتابعة. سنقوم بمراجعة التفاصيل ومراسلتك هاتفياً أو عبر البريد الإلكتروني في أسرع وقت."
      : "Your message has been registered in our follow-up system. We will review details and contact you via phone or email as soon as possible.",
    formTitle: isAr ? "تواصل معنا عبر رسائل الموقع" : "Send Us a Message",
    formName: isAr ? "اسم الراسل بالكامل:" : "Full Sender Name:",
    formNamePlaceholder: isAr ? "الاسم الكريم..." : "Your name...",
    formPhone: isAr ? "رقم الهاتف للتواصل:" : "Mobile Phone Number:",
    formPhonePlaceholder: isAr ? "رقم للتأكيد..." : "Phone number...",
    formEmail: isAr ? "البريد الإلكتروني للعميل:" : "Client Email Address:",
    formEmailPlaceholder: isAr ? "البريد..." : "Email...",
    formSubject: isAr ? "موضوع الرسالة:" : "Message Subject:",
    formSubjectPlaceholder: isAr ? "مثال: تفصيل ملابس شماس..." : "e.g., Deacon stoles tailoring...",
    formMsg: isAr ? "نص رسالتك:" : "Message Body:",
    formMsgPlaceholder: isAr ? "اكتب هنا طلبك أو تفاصيل استفسارك..." : "Type your inquiry or request details here...",
    formSubmit: isAr ? "إرسال الرسالة الآن" : "Send Message Now"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Details */}
        <div className="space-y-6">
          
          <div className="bg-gradient-to-r from-burgundy-800 to-burgundy-900 text-white rounded-2xl p-6 border border-gold-500/20 shadow-md space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold-400">{dict.hotlineTitle}</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              {dict.hotlineDesc}
            </p>
            <div className={`space-y-3 text-sm flex flex-col ${isAr ? "" : "items-start text-left"}`}>
              <a href="tel:01220201204" className="flex items-center gap-2 hover:text-gold-300 font-bold">
                <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                <span>01220201204</span>
              </a>
              <a href="mailto:taksisdaf@gmail.com" className="flex items-center gap-2 hover:text-gold-300">
                <Mail className="w-5 h-5 text-gold-500 shrink-0" />
                <span className="text-xs">taksisdaf@gmail.com</span>
              </a>
            </div>
          </div>

          <div className={`bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm space-y-6 text-xs leading-relaxed text-navy-950 ${isAr ? "text-right" : "text-left"}`}>
            <h3 className={`font-serif text-base font-bold text-burgundy-800 border-b border-gold-500/10 pb-2 mb-2 ${isAr ? "" : "text-left"}`}>
              {dict.branchHeading}
            </h3>
            
            {/* Omraniya */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-navy-900 text-sm">{branchOmraniya.name}</h4>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{branchOmraniya.address}</span>
              </p>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{branchOmraniya.hours}</span>
              </p>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${branchOmraniya.phone}`} className="hover:text-gold-600 font-bold">{branchOmraniya.phone}</a>
              </p>
              <a href={branchOmraniya.maps} target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] font-bold text-gold-600 hover:underline">{dict.mapsBtn}</a>
            </div>

            {/* Zaytoun */}
            <div className="space-y-2.5 border-t border-gold-500/5 pt-4">
              <h4 className="font-bold text-navy-900 text-sm">{branchZaytoun.name}</h4>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{branchZaytoun.address}</span>
              </p>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{branchZaytoun.hours}</span>
              </p>
              <p className={`flex gap-2 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${branchZaytoun.phone}`} className="hover:text-gold-600 font-bold">{branchZaytoun.phone}</a>
              </p>
              <a href={branchZaytoun.maps} target="_blank" rel="noopener noreferrer" className="inline-block text-[10px] font-bold text-gold-600 hover:underline">{dict.mapsBtn}</a>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-sm">
          {submitted ? (
            <div className="bg-gold-500/15 border-2 border-gold-500/25 p-8 rounded-xl text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-gold-600 mx-auto animate-bounce" />
              <h3 className="font-serif text-xl font-bold text-burgundy-800">{dict.successHeading}</h3>
              <p className="text-xs text-navy-900/80 leading-relaxed font-semibold">
                {dict.successDesc}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`space-y-6 text-xs text-navy-950 ${isAr ? "text-right" : "text-left"}`}>
              <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-2 mb-4">
                {dict.formTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-navy-950 font-semibold">
                <div className="space-y-1">
                  <label className="font-bold block">{dict.formName}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={dict.formNamePlaceholder}
                    className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold block">{dict.formPhone}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={dict.formPhonePlaceholder}
                    className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold block">{dict.formEmail}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.formEmailPlaceholder}
                    className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold block">{dict.formSubject}</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={dict.formSubjectPlaceholder}
                    className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold block">{dict.formMsg}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={dict.formMsgPlaceholder}
                  rows={5}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 resize-none font-semibold ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>{dict.formSubmit}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
