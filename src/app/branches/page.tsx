"use client";

import React, { useState } from "react";
import { MapPin, Phone, Clock, Compass, HelpCircle, AlertCircle, Award } from "lucide-react";
import { BRANCHES } from "@/services/db-mock-data";

export default function Branches() {
  const [userLocationMsg, setUserLocationMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLocateUser = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setUserLocationMsg("متصفحك لا يدعم الخدمة الجغرافية لتحديد الفروع.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        // Omraniya coords: 29.9984, 31.2023
        // Zaytoun coords: 30.1032, 31.3094
        const distOmraniya = Math.sqrt(Math.pow(lat - 29.9984, 2) + Math.pow(lng - 31.2023, 2));
        const distZaytoun = Math.sqrt(Math.pow(lat - 30.1032, 2) + Math.pow(lng - 31.3094, 2));

        if (distOmraniya < distZaytoun) {
          setUserLocationMsg("بناءً على موقعك الجغرافي الحالي، المعرض الأقرب إليك هو فرع العمرانية (العمرانية - الجيزة) خلف سنترال العمرانية.");
        } else {
          setUserLocationMsg("بناءً على موقعك الجغرافي الحالي، المعرض الأقرب إليك هو فرع الزيتون (شارع سنان، خلف كنيسة العذراء بالزيتون).");
        }
        setLoading(false);
      },
      () => {
        setUserLocationMsg("لم نتمكن من تحديد موقعك الجغرافي التلقائي. فرع الزيتون يخدم القاهرة الكبرى، وفرع العمرانية يخدم محافظة الجيزة.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-burgundy-800">
          معارض ومحلات طاكسيس لمستلزمات الخدمة
        </h1>
        <p className="text-sm text-navy-900/60 leading-relaxed font-medium">
          شرفنا بزيارتنا في فروعنا بالقاهرة والجيزة لمعاينة جودة تفصيل البرانس، الطونيات وتجربة الدفوف والصنوج النحاسية المصنوعة يدوياً.
        </p>
      </div>

      {/* Locate nearest button */}
      <div className="bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm max-w-xl mx-auto text-center space-y-4">
        <div className="space-y-1">
          <h3 className="font-serif text-base font-bold text-burgundy-800">حدد المعرض الأقرب إليك تلقائياً</h3>
          <p className="text-xs text-navy-900/50">تطبيق طاكسيس يمكنه مقارنة إحداثياتك الحالية وعرض الفرع المناسب.</p>
        </div>
        
        <button
          onClick={handleLocateUser}
          disabled={loading}
          className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-extrabold px-6 py-2.5 rounded-lg border border-gold-400 text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
        >
          <Compass className="w-4.5 h-4.5" />
          <span>{loading ? "جاري قياس المسافة..." : "تحديد الفرع الأقرب جغرافياً"}</span>
        </button>

        {userLocationMsg && (
          <p className="text-xs font-semibold text-burgundy-800 bg-gold-500/10 p-3 rounded-lg border border-gold-500/25 leading-relaxed text-center animate-fade-in">
            {userLocationMsg}
          </p>
        )}
      </div>

      {/* Branches List details cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {BRANCHES.map((branch) => (
          <div key={branch.id} className="bg-white rounded-2xl border border-gold-500/15 overflow-hidden shadow-md flex flex-col justify-between">
            <div className="h-56 relative overflow-hidden border-b border-gold-500/5">
              <img src={branch.image} alt={branch.name_ar} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/90 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <h2 className="text-white font-serif text-2xl font-bold">{branch.name_ar}</h2>
                  <p className="text-gold-300 text-xs mt-1">{branch.name_en}</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
              
              <div className="space-y-4 text-xs text-navy-950">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-gold-500 shrink-0" />
                  <div className="space-y-1">
                    <strong>عنوان المعرض بالتفصيل:</strong>
                    <p className="text-navy-900/70 font-medium leading-relaxed">{branch.address_ar}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-gold-500 shrink-0" />
                  <div className="space-y-0.5">
                    <strong>مواعيد وفترات العمل:</strong>
                    <p className="text-navy-900/70 font-medium">{branch.working_hours_ar}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                  <div className="space-y-0.5">
                    <strong>رقم التليفون المباشر:</strong>
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
                  الاتجاهات على خرائط جوجل
                </a>
                <a
                  href={`tel:${branch.phone}`}
                  className="bg-burgundy-800 hover:bg-burgundy-950 text-gold-300 text-center font-extrabold py-3 rounded-lg text-xs border border-gold-500/20 transition-colors"
                >
                  اتصال مباشر بالمعرض
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
