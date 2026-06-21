"use client";

import React, { useState } from "react";
import { MapPin, Phone, Clock, Compass } from "lucide-react";
import { BRANCHES } from "@/services/db-mock-data";
import { useApp } from "@/services/store";

export default function Branches() {
  const { language } = useApp();
  const [userLocationMsg, setUserLocationMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isAr = language === "ar";

  const handleLocateUser = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setUserLocationMsg(
        isAr 
          ? "متصفحك لا يدعم الخدمة الجغرافية لتحديد الفروع."
          : "Your browser does not support geolocation service to detect showrooms."
      );
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        
        const distOmraniya = Math.sqrt(Math.pow(lat - 29.9984, 2) + Math.pow(lng - 31.2023, 2));
        const distZaytoun = Math.sqrt(Math.pow(lat - 30.1032, 2) + Math.pow(lng - 31.3094, 2));

        if (distOmraniya < distZaytoun) {
          setUserLocationMsg(
            isAr
              ? "بناءً على موقعك الجغرافي الحالي، المعرض الأقرب إليك هو فرع العمرانية (العمرانية - الجيزة) خلف سنترال العمرانية."
              : "Based on your current location, the nearest branch is Omraniya Branch (Omraniya, Giza) behind Omraniya Central Exchange."
          );
        } else {
          setUserLocationMsg(
            isAr
              ? "بناءً على موقعك الجغرافي الحالي، المعرض الأقرب إليك هو فرع الزيتون (شارع سنان، خلف كنيسة العذراء بالزيتون)."
              : "Based on your current location, the nearest branch is Zaytoun Branch (Sinan St, behind St. Mary Church in Zaytoun)."
          );
        }
        setLoading(false);
      },
      () => {
        setUserLocationMsg(
          isAr
            ? "لم نتمكن من تحديد موقعك الجغرافي التلقائي. فرع الزيتون يخدم القاهرة الكبرى، وفرع العمرانية يخدم محافظة الجيزة."
            : "Could not determine your GPS location automatically. Zaytoun branch serves Greater Cairo, and Omraniya branch serves Giza Governorate."
        );
        setLoading(false);
      }
    );
  };

  // Dictionaries
  const dict = {
    title: isAr ? "معارض ومحلات طاكسيس لمستلزمات الخدمة" : "Taxsis Showrooms & Liturgical Outlets",
    subtitle: isAr
      ? "شرفنا بزيارتنا في فروعنا بالقاهرة والجيزة لمعاينة جودة تفصيل البرانس، الطونيات وتجربة الدفوف والصنوج النحاسية المصنوعة يدوياً."
      : "We welcome your visit to our showrooms in Cairo and Giza to inspect our tailored phelonions, deacon tonias, and test handcrafted brass cymbals.",
    gpsTitle: isAr ? "حدد المعرض الأقرب إليك تلقائياً" : "Find Your Nearest Showroom Automatically",
    gpsDesc: isAr
      ? "تطبيق طاكسيس يمكنه مقارنة إحداثياتك الحالية وعرض الفرع المناسب."
      : "The Taxsis application can compare your coordinates to show you the closest branch.",
    gpsBtn: isAr ? "تحديد الفرع الأقرب جغرافياً" : "Locate Closest Showroom",
    gpsLoading: isAr ? "جاري قياس المسافة..." : "Calculating distance...",
    addressLabel: isAr ? "عنوان المعرض بالتفصيل:" : "Detailed Showroom Address:",
    hoursLabel: isAr ? "مواعيد وفترات العمل:" : "Showroom Working Hours:",
    phoneLabel: isAr ? "رقم التليفون المباشر:" : "Direct Phone Number:",
    mapsBtn: isAr ? "الاتجاهات على خرائط جوجل" : "Directions on Google Maps",
    callBtn: isAr ? "اتصال مباشر بالمعرض" : "Call Showroom Directly"
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

      {/* Locate Nearest Showroom */}
      <div className="bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm max-w-xl mx-auto text-center space-y-4">
        <div className="space-y-1">
          <h3 className="font-serif text-base font-bold text-burgundy-800">{dict.gpsTitle}</h3>
          <p className="text-xs text-navy-900/50">{dict.gpsDesc}</p>
        </div>
        
        <button
          onClick={handleLocateUser}
          disabled={loading}
          className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-extrabold px-6 py-2.5 rounded-lg border border-gold-400 text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
        >
          <Compass className="w-4.5 h-4.5" />
          <span>{loading ? dict.gpsLoading : dict.gpsBtn}</span>
        </button>

        {userLocationMsg && (
          <p className="text-xs font-semibold text-burgundy-800 bg-gold-500/10 p-3 rounded-lg border border-gold-500/25 leading-relaxed text-center animate-fade-in">
            {userLocationMsg}
          </p>
        )}
      </div>

      {/* Showroom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {BRANCHES.map((branch) => (
          <div key={branch.id} className="bg-white rounded-2xl border border-gold-500/15 overflow-hidden shadow-md flex flex-col justify-between">
            <div className="h-56 relative overflow-hidden border-b border-gold-500/5">
              <img src={branch.image} alt={isAr ? branch.name_ar : branch.name_en} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/90 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <h2 className="text-white font-serif text-2xl font-bold">{isAr ? branch.name_ar : branch.name_en}</h2>
                  {!isAr && <p className="text-gold-300 text-xs mt-1">{branch.name_ar}</p>}
                </div>
              </div>
            </div>

            <div className={`p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between ${isAr ? "text-right" : "text-left"}`}>
              
              <div className="space-y-4 text-xs text-navy-950">
                <div className={`flex gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                  <MapPin className="w-5 h-5 text-gold-500 shrink-0" />
                  <div className="space-y-1">
                    <strong>{dict.addressLabel}</strong>
                    <p className="text-navy-900/70 font-medium leading-relaxed">
                      {isAr ? branch.address_ar : branch.address_en}
                    </p>
                  </div>
                </div>

                <div className={`flex gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                  <Clock className="w-5 h-5 text-gold-500 shrink-0" />
                  <div className="space-y-0.5">
                    <strong>{dict.hoursLabel}</strong>
                    <p className="text-navy-900/70 font-medium">
                      {isAr ? branch.working_hours_ar : branch.working_hours_en}
                    </p>
                  </div>
                </div>

                <div className={`flex gap-3 ${isAr ? "" : "flex-row-reverse text-left"}`}>
                  <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                  <div className="space-y-0.5">
                    <strong>{dict.phoneLabel}</strong>
                    <p className="text-navy-900/70">
                      <a href={`tel:${branch.phone}`} className="hover:text-gold-600 font-bold hover:underline">{branch.phone}</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gold-500/10 grid grid-cols-2 gap-4">
                <a
                  href={branch.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 text-center font-extrabold py-3 rounded-lg text-xs border border-gold-400 transition-colors shadow-sm"
                >
                  {dict.mapsBtn}
                </a>
                <a
                  href={`tel:${branch.phone}`}
                  className="bg-burgundy-800 hover:bg-burgundy-950 text-gold-300 text-center font-extrabold py-3 rounded-lg text-xs border border-gold-500/20 transition-colors"
                >
                  {dict.callBtn}
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
