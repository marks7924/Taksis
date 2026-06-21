"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, ShoppingBag, Heart, User, Bell, X, Plus, Minus, 
  Menu, Sparkles, LogOut, LayoutDashboard, ShoppingCart, HelpCircle
} from "lucide-react";
import { useApp } from "@/services/store";
import { PRODUCTS, Product } from "@/services/db-mock-data";

export default function Header() {
  const pathname = usePathname();
  const { 
    cart, updateCartQuantity, removeFromCart, clearCart,
    wishlist, currentUser, logoutUser, loginUser,
    notifications, markNotificationsAsRead,
    language, setLanguage
  } = useApp();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Cart totals
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.discount_price || item.product.price) * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const isAr = language === "ar";

  // Simple category shortcuts
  const categoriesShort = isAr ? [
    { name: "ملابس كهنوتية", path: "/shop?category=cat-6" },
    { name: "طونيات شماس", path: "/shop?category=cat-4" },
    { name: "أواني المذبح", path: "/shop?category=cat-8" },
    { name: "دفوف وصنوج", path: "/shop?category=cat-1" },
    { name: "كتب كنسية", path: "/shop?category=cat-9" },
    { name: "أيقونات يدوية", path: "/shop?category=cat-10" }
  ] : [
    { name: "Clergy Vestments", path: "/shop?category=cat-6" },
    { name: "Deacon Tonias", path: "/shop?category=cat-4" },
    { name: "Altar Vessels", path: "/shop?category=cat-8" },
    { name: "Cymbals & Dafs", path: "/shop?category=cat-1" },
    { name: "Church Books", path: "/shop?category=cat-9" },
    { name: "Handmade Icons", path: "/shop?category=cat-10" }
  ];

  const mainLinks = isAr ? [
    { name: "الرئيسية", path: "/" },
    { name: "المتجر الكامل", path: "/shop" },
    { name: "طلبات خاصة ومخصصة", path: "/custom-orders" },
    { name: "فروعنا ومعارضنا", path: "/branches" },
    { name: "معرض الأعمال", path: "/gallery" },
    { name: "قصتنا وعن طاكسيس", path: "/about" },
    { name: "تواصل معنا", path: "/contact" }
  ] : [
    { name: "Home", path: "/" },
    { name: "Full Shop", path: "/shop" },
    { name: "Custom Orders", path: "/custom-orders" },
    { name: "Our Branches", path: "/branches" },
    { name: "Work Gallery", path: "/gallery" },
    { name: "Our Story", path: "/about" },
    { name: "Contact Us", path: "/contact" }
  ];

  return (
    <>
      {/* Top Gold & Burgundy Accent Bar */}
      <div className="bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-900 text-gold-300 text-xs py-2 px-4 text-center font-medium border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>{isAr ? "معارض طاكسيس لمستلزمات الكهنة والشمامسة والكنائس بالأرثوذكسية" : "Taxsis Showrooms for Orthodox Clergy, Deacon, and Church Supplies"}</span>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <span>{isAr ? "توصيل لكافة المحافظات وشحن دولي" : "Worldwide shipping & local delivery"}</span>
            <span className="text-gold-400">|</span>
            <a href="tel:01220201204" className="hover:text-gold-300 transition-colors">{isAr ? "اتصل بنا" : "Call us"}: 01220201204</a>
          </div>
        </div>
      </div>

      {/* Main Luxury Navbar */}
      <header className="sticky top-0 z-40 w-full glass-panel shadow-md border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          
          {/* Right Section: Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden text-burgundy-800 p-2 hover:bg-gold-500/10 rounded-lg transition-colors"
              aria-label={isAr ? "القائمة" : "Menu"}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo & Tagline */}
            <Link href="/" className="flex flex-col items-start group">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-800 tracking-wider group-hover:text-gold-600 transition-colors">
                طاكسيس
              </span>
              <span className="text-[10px] sm:text-xs font-serif font-semibold text-gold-600 tracking-widest mt-[-2px] uppercase">
                {isAr ? "للشماس والقسيس" : "For Deacon & Priest"}
              </span>
            </Link>
          </div>

          {/* Center Section: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-5">
            {mainLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-semibold transition-colors duration-200 py-2 border-b-2 ${
                    isActive 
                      ? "text-burgundy-800 border-gold-500" 
                      : "text-navy-900 border-transparent hover:text-burgundy-800 hover:border-gold-500/40"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Left Section: Interaction Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-burgundy-800 p-2 hover:bg-gold-500/10 rounded-full transition-all"
              title={isAr ? "البحث" : "Search"}
            >
              <Search className="w-5 h-5 sm:w-6 h-6" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/shop?wishlist=true"
              className="relative text-burgundy-800 p-2 hover:bg-gold-500/10 rounded-full transition-all hidden sm:inline-flex"
              title={isAr ? "المفضلة" : "Wishlist"}
            >
              <Heart className="w-5 h-5 sm:w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-gold-500 text-burgundy-900 font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-ivory-100">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Notifications Toggle */}
            <button
              onClick={() => {
                setIsNotifOpen(true);
                markNotificationsAsRead();
              }}
              className="relative text-burgundy-800 p-2 hover:bg-gold-500/10 rounded-full transition-all"
              title={isAr ? "الإشعارات" : "Notifications"}
            >
              <Bell className="w-5 h-5 sm:w-6 h-6" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 bg-burgundy-600 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-ivory-100 animate-bounce">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isAr ? "en" : "ar")}
              className="text-burgundy-800 p-2 hover:bg-gold-500/10 rounded-full transition-all text-xs font-bold font-serif focus:outline-none flex items-center justify-center min-w-9 h-9 cursor-pointer"
              title={isAr ? "Switch to English" : "تغيير للعربية"}
            >
              {isAr ? "EN" : "عربي"}
            </button>

            {/* User Account Portal Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-burgundy-800 p-2 hover:bg-gold-500/10 rounded-full transition-all flex items-center gap-1 cursor-pointer"
                title={isAr ? "حسابي" : "My Account"}
              >
                <User className="w-5 h-5 sm:w-6 h-6" />
              </button>

              {isUserMenuOpen && (
                <div className={`absolute ${isAr ? "left-0" : "right-0"} mt-2 w-56 bg-ivory-100 rounded-lg shadow-xl border border-gold-500/20 py-2 z-50 animate-fade-in-down text-navy-900 ${isAr ? "text-right" : "text-left"}`}>
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-gold-500/10">
                        <p className="font-bold text-sm text-burgundy-800">{currentUser.fullName}</p>
                        <p className="text-xs text-navy-900/60 truncate">{currentUser.email}</p>
                        <p className="text-[10px] mt-1 inline-block bg-gold-500/20 text-gold-600 px-2 py-0.5 rounded">
                          {currentUser.role === "admin" ? (isAr ? "مدير النظام" : "General Manager") : (isAr ? "عميل مميز" : "Valued Customer")}
                        </p>
                      </div>
                      
                      {currentUser.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`flex items-center gap-2 px-4 py-2 hover:bg-gold-500/10 text-sm font-semibold transition-colors ${isAr ? "flex-row" : "flex-row-reverse justify-end"}`}
                        >
                          <LayoutDashboard className="w-4 h-4 text-burgundy-800" />
                          <span>{isAr ? "لوحة تحكم المدير" : "Admin Dashboard"}</span>
                        </Link>
                      )}

                      <Link
                        href="/tracking"
                        onClick={() => setIsUserMenuOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2 hover:bg-gold-500/10 text-sm font-semibold transition-colors ${isAr ? "flex-row" : "flex-row-reverse justify-end"}`}
                      >
                        <ShoppingCart className="w-4 h-4 text-burgundy-800" />
                        <span>{isAr ? "تتبع طلباتي" : "Track My Orders"}</span>
                      </Link>

                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full ${isAr ? "text-right flex-row" : "text-left flex-row-reverse justify-end"} flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 text-sm font-semibold transition-colors border-t border-gold-500/10 mt-1 cursor-pointer`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{isAr ? "تسجيل الخروج" : "Logout"}</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-xs text-navy-900/60 border-b border-gold-500/10 text-center">
                        {isAr ? "سجل دخولك لتتبع طلباتك وإدارة حسابك" : "Log in to track orders & manage account"}
                      </div>
                      <button
                        onClick={() => {
                          loginUser("customer@taksis.com");
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full ${isAr ? "text-right" : "text-left"} px-4 py-2 hover:bg-gold-500/10 text-sm font-semibold transition-colors cursor-pointer`}
                      >
                        {isAr ? "دخول سريع كعميل" : "Quick Customer Login"}
                      </button>
                      <button
                        onClick={() => {
                          loginUser("taksisdaf@gmail.com");
                          setIsUserMenuOpen(false);
                        }}
                        className={`w-full ${isAr ? "text-right" : "text-left"} px-4 py-2 hover:bg-burgundy-800/10 text-sm font-semibold text-burgundy-800 transition-colors cursor-pointer`}
                      >
                        {isAr ? "دخول سريع كمدير (Admin)" : "Quick Admin Login"}
                      </button>
                      <div className="border-t border-gold-500/10 mt-1 pt-1 text-center">
                        <Link 
                          href="/login" 
                          onClick={() => setIsUserMenuOpen(false)} 
                          className="inline-block text-xs font-bold text-gold-600 hover:underline"
                        >
                          {isAr ? "صفحة التسجيل والتحقق" : "Register / Verify Page"}
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-gradient-to-r from-burgundy-800 to-burgundy-900 text-gold-300 p-2 sm:px-4 sm:py-2.5 rounded-full flex items-center gap-2 border border-gold-500/30 hover:scale-105 transition-all shadow-md cursor-pointer"
              title={isAr ? "سلة المشتريات" : "Shopping Cart"}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-bold text-xs">{isAr ? `${totalItems} قطع - ${cartSubtotal} ج.م` : `${totalItems} items - ${cartSubtotal} EGP`}</span>
              <span className="sm:hidden font-bold text-xs">{totalItems}</span>
            </button>

          </div>
        </div>

        {/* Quick Categories Bar (Desktop) */}
        <div className="hidden xl:block bg-ivory-200 border-t border-gold-500/5 py-2.5">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-center gap-8 text-xs font-semibold text-navy-800">
            {categoriesShort.map((cat, idx) => (
              <Link key={idx} href={cat.path} className="hover:text-burgundy-800 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ==================================== DRAWERS & POPUPS ==================================== */}

      {/* 1. Sliding Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)} 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />
          
          {/* Drawer Body */}
          <div className="relative w-full max-w-md bg-ivory-100 h-full shadow-2xl flex flex-col z-10 border-r border-gold-500/10">
            {/* Header */}
            <div className="p-6 border-b border-gold-500/15 flex items-center justify-between bg-burgundy-800 text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-gold-400 w-6 h-6" />
                <span className="font-bold font-serif text-lg">{isAr ? "سلة مشترياتك" : "Your Shopping Cart"}</span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-white hover:text-gold-400 p-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-navy-900/60 text-center gap-4">
                  <div className="w-16 h-16 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-burgundy-800">{isAr ? "السلة فارغة حالياً" : "Your Cart is Empty"}</h3>
                    <p className="text-sm mt-1">{isAr ? "تصفح أقسام المعرض المميزة وأضف مستلزمات المذبح والخدمة" : "Browse our collection to add liturgical or deacon supplies."}</p>
                  </div>
                  <Link 
                    href="/shop" 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold px-6 py-2.5 rounded-lg border border-gold-500/30 transition-all text-sm"
                  >
                    {isAr ? "اذهب للمتجر الآن" : "Go to Shop Now"}
                  </Link>
                </div>
              ) : (
                cart.map((item, idx) => {
                  const pPrice = item.product.discount_price || item.product.price;
                  return (
                    <div key={idx} className="flex gap-4 p-3 bg-white rounded-lg border border-gold-500/10 shadow-sm relative group">
                      {/* Image */}
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name_ar} 
                        className="w-20 h-20 object-cover rounded border border-gold-500/10" 
                      />
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-navy-900 truncate">
                          {isAr ? item.product.name_ar : item.product.name_en}
                        </h4>
                        {item.selectedVariant && (
                          <p className="text-xs text-gold-600 font-medium mt-0.5">
                            {isAr ? "المواصفة: " : "Option: "} {item.selectedVariant}
                          </p>
                        )}
                        <p className="text-xs text-navy-900/50 mt-1">SKU: {item.product.sku}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-gold-500/20 rounded bg-ivory-200">
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                              className="px-2 py-1 text-burgundy-800 hover:bg-gold-500/10 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                              className="px-2 py-1 text-burgundy-800 hover:bg-gold-500/10 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {/* Price */}
                          <span className="font-bold text-sm text-burgundy-800">{item.quantity * pPrice} {isAr ? "ج.م" : "EGP"}</span>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                        className={`absolute top-2 ${isAr ? "left-2" : "right-2"} text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors cursor-pointer`}
                        title={isAr ? "إزالة" : "Remove"}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gold-500/15 bg-white space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-navy-900/70">{isAr ? "المجموع الفرعي:" : "Subtotal:"}</span>
                  <span className="text-burgundy-800 text-lg font-bold">{cartSubtotal} {isAr ? "ج.م" : "EGP"}</span>
                </div>
                <p className="text-[10px] text-navy-900/60 leading-relaxed text-center">
                  {isAr ? "الشحن والضرائب يتم حسابهم بدقة في خطوة الدفع الآمن." : "Shipping and taxes are calculated at checkout."}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={clearCart}
                    className="border border-red-500/30 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-lg text-sm transition-all cursor-pointer"
                  >
                    {isAr ? "تفريغ السلة" : "Clear Cart"}
                  </button>
                  <Link 
                    href="/checkout" 
                    onClick={() => setIsCartOpen(false)}
                    className="bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-bold py-3 rounded-lg text-sm text-center border border-gold-500/30 transition-all shadow-md shadow-burgundy-900/20"
                  >
                    {isAr ? "إتمام الشراء" : "Checkout"}
                  </Link>
                </div>
                <div className="text-center mt-2">
                  <Link 
                    href="/cart" 
                    onClick={() => setIsCartOpen(false)} 
                    className="text-xs font-bold text-gold-600 hover:underline"
                  >
                    {isAr ? "تعديل الكميات والتفاصيل الكاملة" : "View Cart & Edit Details"}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Search Popup overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-ivory-100 rounded-2xl border border-gold-500/20 shadow-2xl max-w-2xl w-full mt-20 overflow-hidden animate-fade-in-up">
            {/* Search Input bar */}
            <div className="p-4 bg-burgundy-800 flex items-center gap-3 border-b border-gold-500/10">
              <Search className="text-gold-400 w-6 h-6 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "ابحث باسم المنتج، كود الـ SKU، أو القسم..." : "Search by product name, SKU, or category..."}
                className="bg-transparent text-white placeholder-white/60 focus:outline-none w-full text-base font-semibold"
                autoFocus
              />
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Live Search suggestions */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {searchQuery.trim().length > 0 ? (
                <div>
                  <h4 className="text-xs font-bold text-gold-600 uppercase mb-3 tracking-wider">{isAr ? "نتائج بحث مقترحة" : "Suggested Search Results"}</h4>
                  <div className="space-y-3">
                    <Link
                      href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="block p-3 hover:bg-gold-500/10 rounded-lg text-sm font-semibold text-burgundy-800 transition-colors border border-dashed border-gold-500/10"
                    >
                      {isAr ? `عرض جميع النتائج لـ "${searchQuery}"` : `View all results for "${searchQuery}"`}
                    </Link>
                    
                    {/* Hardcoded matching mock preview for fast typing */}
                    {PRODUCTS.filter((p: Product) => 
                      p.name_ar.includes(searchQuery) || 
                      p.name_en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
                    ).slice(0, 5).map((prod: Product) => (
                      <Link
                        key={prod.id}
                        href={`/shop/${prod.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2 hover:bg-gold-500/5 rounded-lg transition-colors border border-transparent hover:border-gold-500/10"
                      >
                        <img src={prod.images[0]} alt={isAr ? prod.name_ar : prod.name_en} className="w-12 h-12 object-cover rounded border" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-navy-900 truncate">{isAr ? prod.name_ar : prod.name_en}</p>
                          <p className="text-xs text-navy-900/50">SKU: {prod.sku}</p>
                        </div>
                        <span className="font-bold text-sm text-burgundy-800">{prod.discount_price || prod.price} {isAr ? "ج.م" : "EGP"}</span>
                      </Link>
                    ))}
                    
                    {PRODUCTS.filter((p: Product) => 
                      p.name_ar.includes(searchQuery) || 
                      p.name_en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="text-center py-6 text-navy-900/50 text-sm">
                        {isAr ? 'لا توجد نتائج مطابقة، جرب كلمات أخرى مثل "طونية" أو "شورية"' : 'No results found, try searching "Tonia" or "Shoria"'}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-gold-600 uppercase mb-3 tracking-wider">{isAr ? "روابط بحث شائعة" : "Popular Searches"}</h4>
                    <div className="flex flex-col gap-2">
                      <Link href="/shop?category=cat-6" onClick={() => setIsSearchOpen(false)} className="text-sm font-semibold hover:text-burgundy-800 transition-colors text-navy-800">{isAr ? "بدلة كهنوتية" : "Clergy Vestments"}</Link>
                      <Link href="/shop?category=cat-1" onClick={() => setIsSearchOpen(false)} className="text-sm font-semibold hover:text-burgundy-800 transition-colors text-navy-800">{isAr ? "دفوف كنسية" : "Church Dafs"}</Link>
                      <Link href="/shop?category=cat-7" onClick={() => setIsSearchOpen(false)} className="text-sm font-semibold hover:text-burgundy-800 transition-colors text-navy-800">{isAr ? "شورية نحاس" : "Brass Shoria"}</Link>
                      <Link href="/shop?category=cat-10" onClick={() => setIsSearchOpen(false)} className="text-sm font-semibold hover:text-burgundy-800 transition-colors text-navy-800">{isAr ? "أيقونات السيدة العذراء" : "Saint Mary Icons"}</Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gold-600 uppercase mb-3 tracking-wider">{isAr ? "خدمات خاصة" : "Special Requests"}</h4>
                    <div className="flex flex-col gap-2">
                      <Link href="/custom-orders" onClick={() => setIsSearchOpen(false)} className="text-sm font-semibold hover:text-burgundy-800 transition-colors text-navy-800">{isAr ? "طلب تفصيل مقاسات" : "Clergy Vestment Sizing"}</Link>
                      <Link href="/custom-orders" onClick={() => setIsSearchOpen(false)} className="text-sm font-semibold hover:text-burgundy-800 transition-colors text-navy-800">{isAr ? "طلب حفر خشب مخصص" : "Custom Woodwork Request"}</Link>
                      <Link href="/branches" onClick={() => setIsSearchOpen(false)} className="text-sm font-semibold hover:text-burgundy-800 transition-colors text-navy-800">{isAr ? "معارض ومحلات طاكسيس" : "Our Showrooms"}</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Notifications Sidebar */}
      {isNotifOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div onClick={() => setIsNotifOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm bg-ivory-100 h-full shadow-2xl flex flex-col z-10 border-r border-gold-500/10">
            <div className="p-6 border-b border-gold-500/15 flex items-center justify-between bg-burgundy-800 text-white">
              <div className="flex items-center gap-2">
                <Bell className="text-gold-400 w-5 h-5" />
                <span className="font-bold font-serif text-base">{isAr ? "مركز الإشعارات" : "Notification Center"}</span>
              </div>
              <button onClick={() => setIsNotifOpen(false)} className="text-white hover:text-gold-400 cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-3 bg-white rounded-lg border border-gold-500/10 shadow-sm">
                  <p className="text-sm font-medium text-navy-900">{notif.message}</p>
                  <p className="text-[10px] text-navy-900/50 mt-1.5">{new Date(notif.date).toLocaleString("ar-EG")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-50 flex ${isAr ? "justify-start" : "justify-end"}`}>
          <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/60" />
          <div className={`relative w-80 bg-ivory-100 h-full shadow-2xl flex flex-col z-10 ${isAr ? "text-right" : "text-left"}`}>
            <div className={`p-6 bg-burgundy-900 text-white flex items-center justify-between border-b border-gold-500/10 ${isAr ? "flex-row" : "flex-row-reverse"}`}>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold">طاكسيس</span>
                <span className="text-[10px] font-serif text-gold-400 tracking-wider">
                  {isAr ? "للشماس والقسيس" : "For Deacon & Priest"}
                </span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-1 hover:bg-white/10 rounded-full cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex flex-col gap-4">
                {mainLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-bold text-navy-900 hover:text-burgundy-800 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-gold-500/10 pt-6">
                <h4 className="text-xs font-bold text-gold-600 mb-3">{isAr ? "أقسام سريعة" : "Quick Categories"}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-navy-800">
                  {categoriesShort.map((cat, idx) => (
                    <Link 
                      key={idx} 
                      href={cat.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:text-burgundy-800 bg-white p-2 rounded border border-gold-500/5 text-center"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gold-500/10 bg-ivory-200">
              <p className="text-xs text-navy-900/60 mb-2">{isAr ? "معارض طاكسيس للخدمة الكنسية" : "Taxsis Showrooms for Liturgical Supplies"}</p>
              <a href="tel:01220201204" className={`text-sm font-bold text-burgundy-800 flex items-center ${isAr ? "justify-end" : "justify-start"} gap-1`}>
                <span>01220201204</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
