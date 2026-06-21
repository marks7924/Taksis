"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, Lock, User, Phone, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { useApp } from "@/services/store";
import { mockRegister } from "@/services/api";

export default function LoginPortal() {
  const router = useRouter();
  const { loginUser, currentUser } = useApp();

  // Mode tabs: login | signup | reset
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Feedback states
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setErrorMsg("");
    
    setTimeout(() => {
      try {
        loginUser(email);
        setSuccessMsg("تم تسجيل الدخول بنجاح! جاري توجيهك للصفحة الرئيسية.");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (err) {
        setErrorMsg("خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !phone) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await mockRegister({
        fullName,
        email,
        phone,
        role: "customer"
      });

      setSuccessMsg("تم إنشاء الحساب بنجاح! تم إرسال رابط التحقق إلى بريدك الإلكتروني لتأكيد الاشتراك.");
      setTimeout(() => {
        loginUser(email);
        router.push("/");
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "فشل تسجيل الحساب.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    setTimeout(() => {
      setSuccessMsg("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح.");
      setLoading(false);
    }, 800);
  };

  // If already logged in, show simple dashboard portal redirect
  if (currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-gold-600 mx-auto" />
        <h2 className="font-serif text-xl font-bold text-burgundy-800">أنت مسجل الدخول بالفعل</h2>
        <p className="text-xs text-navy-900/60 font-semibold">مرحباً بك، {currentUser.fullName}. يمكنك زيارة المتجر أو لوحة الإدارة.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/shop" className="bg-burgundy-800 text-gold-300 text-xs px-6 py-2.5 rounded-lg border font-bold">المتجر العام</Link>
          <Link href="/" className="bg-ivory-200 text-navy-950 text-xs px-6 py-2.5 rounded-lg border font-bold">الرئيسية</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      {/* Brand logo & tagline */}
      <div className="text-center space-y-2">
        <span className="font-serif text-3xl font-extrabold text-burgundy-800">طاكسيس</span>
        <p className="text-xs font-serif text-gold-600 tracking-wider">بوابة الشركاء والعملاء</p>
      </div>

      {/* Auth Card container */}
      <div className="bg-white rounded-2xl border border-gold-500/10 p-6 md:p-8 shadow-xl space-y-6 text-xs text-navy-950">
        
        {/* Toggle tabs */}
        {mode !== "reset" && (
          <div className="flex justify-center border-b border-gold-500/10 pb-2">
            <div className="flex gap-2 bg-ivory-200 p-1 rounded-lg">
              <button
                onClick={() => { setMode("login"); setErrorMsg(""); setSuccessMsg(""); }}
                className={`px-4 py-1.5 rounded font-bold transition-all ${
                  mode === "login" ? "bg-burgundy-800 text-gold-300" : "text-navy-800 hover:bg-gold-500/10"
                }`}
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => { setMode("signup"); setErrorMsg(""); setSuccessMsg(""); }}
                className={`px-4 py-1.5 rounded font-bold transition-all ${
                  mode === "signup" ? "bg-burgundy-800 text-gold-300" : "text-navy-800 hover:bg-gold-500/10"
                }`}
              >
                إنشاء حساب جديد
              </button>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-50 border border-red-500/10 p-3 rounded-lg flex items-center gap-2 text-red-600 font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-gold-500/10 border border-gold-500/25 p-3 rounded-lg flex items-center gap-2 text-gold-600 font-semibold">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1. LOGIN MODE */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-bold">البريد الإلكتروني للخدمة:</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@taksis.com"
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-left focus:outline-none"
                  required
                />
                <Mail className="w-4 h-4 text-navy-900/30 absolute right-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold">كلمة المرور:</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-left focus:outline-none"
                  required
                />
                <Lock className="w-4 h-4 text-navy-900/30 absolute right-3 top-3" />
              </div>
            </div>

            <div className="text-left">
              <button
                type="button"
                onClick={() => setMode("reset")}
                className="text-[10px] font-bold text-gold-600 hover:underline"
              >
                هل نسيت كلمة المرور؟
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3 rounded-lg border border-gold-500/20 transition-all cursor-pointer"
            >
              {loading ? "جاري الدخول الآمن..." : "تسجيل الدخول"}
            </button>
          </form>
        )}

        {/* 2. SIGNUP MODE */}
        {mode === "signup" && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-bold">الاسم بالكامل:</label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: يوحنا كمال..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none"
                  required
                />
                <User className="w-4 h-4 text-navy-900/30 absolute right-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold">البريد الإلكتروني للعميل:</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@gmail.com"
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-left focus:outline-none"
                  required
                />
                <Mail className="w-4 h-4 text-navy-900/30 absolute right-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold">رقم الهاتف للتأكيد (واتساب):</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01220201204"
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-right focus:outline-none"
                  required
                />
                <Phone className="w-4 h-4 text-navy-900/30 absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3 rounded-lg border border-gold-500/20 transition-all cursor-pointer"
            >
              {loading ? "جاري التسجيل..." : "إنشاء حساب جديد"}
            </button>
          </form>
        )}

        {/* 3. RESET PASSWORD MODE */}
        {mode === "reset" && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <h3 className="font-bold text-sm text-burgundy-800 text-center">إعادة تعيين كلمة المرور</h3>
            <p className="text-[10px] text-navy-900/60 leading-relaxed text-center">
              أدخل البريد الإلكتروني المسجل وسيقوم خادم طاكسيس بإرسال رمز إعادة التعيين والتحقق.
            </p>

            <div className="space-y-1">
              <label className="font-bold">البريد الإلكتروني للخدمة:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@gmail.com"
                className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-left focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setMode("login"); setErrorMsg(""); setSuccessMsg(""); }}
                className="bg-ivory-200 text-navy-950 font-bold py-2.5 rounded-lg border text-center"
              >
                إلغاء والعودة
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold py-2.5 rounded-lg border border-gold-500/20 transition-all text-center cursor-pointer"
              >
                {loading ? "جاري الإرسال..." : "إرسال الرابط"}
              </button>
            </div>
          </form>
        )}

        {/* Social auth log-ins */}
        {mode !== "reset" && (
          <div className="border-t border-gold-500/10 pt-4 space-y-3">
            <p className="text-[10px] text-navy-900/40 text-center font-bold">أو تسجيل الدخول السريع عبر منصات التواصل</p>
            <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold text-navy-950">
              <button 
                type="button"
                onClick={() => loginUser("coptic_social_login@gmail.com")}
                className="border border-gold-500/15 p-2 rounded-lg hover:bg-gold-500/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>جوجل (Google)</span>
              </button>
              <button 
                type="button"
                onClick={() => loginUser("coptic_social_login@gmail.com")}
                className="border border-gold-500/15 p-2 rounded-lg hover:bg-gold-500/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>فيسبوك (Facebook)</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
