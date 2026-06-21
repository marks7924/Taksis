"use client";

import React from "react";
import { useApp } from "@/services/store";

export default function WhatsAppCTA() {
  const { language } = useApp();
  const isAr = language === "ar";

  const phoneNumber = "201220201204"; // Egypt country code + phone
  
  const arMsg = "سلام ونعمة، أود الاستفسار عن مستلزمات كنسية من معرض طاكسيس.";
  const enMsg = "Hello and blessings, I would like to inquire about church supplies from Taxsis.";
  
  const message = encodeURIComponent(isAr ? arMsg : enMsg);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-gold-500/80 group shrink-0"
      aria-label={isAr ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap font-medium text-sm">
        {isAr ? "تواصل معنا واتساب" : "WhatsApp Chat"}
      </span>
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.782.001-2.592-1.006-5.031-2.836-6.861-1.83-1.83-4.27-2.834-6.862-2.835-5.41 0-9.809 4.383-9.811 9.782-.001 1.702.463 3.364 1.34 4.807l-.993 3.629 3.732-.977zm11.367-5.98c-.294-.147-1.737-.858-2.006-.957-.269-.099-.465-.148-.659.148-.195.297-.753.957-.922 1.153-.169.196-.339.221-.633.074-.294-.147-1.243-.458-2.37-1.462-.877-.782-1.47-1.747-1.642-2.044-.172-.296-.018-.457.129-.603.132-.131.294-.346.441-.519.147-.173.196-.296.294-.494.099-.197.049-.37-.025-.519-.074-.148-.659-1.587-.903-2.175-.237-.57-.479-.493-.659-.502-.17-.008-.366-.01-.562-.01-.197 0-.517.074-.788.37-.27.296-1.03 1.012-1.03 2.47 0 1.458 1.06 2.864 1.209 3.062.149.198 2.086 3.186 5.053 4.47.706.305 1.258.487 1.687.625.71.226 1.357.194 1.868.118.57-.085 1.737-.71 1.98-1.396.243-.686.243-1.275.169-1.396-.074-.122-.269-.196-.563-.344z" />
      </svg>
    </a>
  );
}
