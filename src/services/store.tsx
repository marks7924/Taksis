"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Category } from "./db-mock-data";
import { UserSession } from "./api";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  
  wishlist: string[]; // Product IDs
  toggleWishlist: (productId: string) => void;
  
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  
  recentlyViewed: string[]; // Product IDs
  addToRecentlyViewed: (productId: string) => void;
  
  currentUser: UserSession | null;
  loginUser: (email: string, role?: "customer" | "admin" | "priest" | "deacon") => void;
  logoutUser: () => void;
  
  notifications: { id: string; message: string; date: string; read: boolean }[];
  addNotification: (message: string) => void;
  markNotificationsAsRead: () => void;

  language: "ar" | "en";
  setLanguage: (lang: "ar" | "en") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [notifications, setNotifications] = useState<{ id: string; message: string; date: string; read: boolean }[]>([]);
  const [language, setLanguageState] = useState<"ar" | "en">("ar");

  // Load state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("taxsis_lang") as "ar" | "en" | null;
      if (storedLang) {
        setLanguageState(storedLang);
        document.documentElement.dir = storedLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = storedLang;
      } else {
        document.documentElement.dir = "rtl";
        document.documentElement.lang = "ar";
      }

      const storedCart = localStorage.getItem("taxsis_cart");
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem("taxsis_wishlist");
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedRecently = localStorage.getItem("taxsis_recently");
      if (storedRecently) setRecentlyViewed(JSON.parse(storedRecently));

      const storedUser = localStorage.getItem("taxsis_user");
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
      
      const storedNotifs = localStorage.getItem("taxsis_notifs");
      if (storedNotifs) {
        setNotifications(JSON.parse(storedNotifs));
      } else {
        const initialNotif = [
          { id: "1", message: "مرحباً بكم في معارض طاكسيس لمستلزمات الكنائس!", date: new Date().toISOString(), read: false }
        ];
        setNotifications(initialNotif);
        localStorage.setItem("taxsis_notifs", JSON.stringify(initialNotif));
      }
    }
  }, []);

  const setLanguage = (lang: "ar" | "en") => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("taxsis_lang", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  // Sync helpers
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("taxsis_cart", JSON.stringify(newCart));
  };

  const saveWishlist = (newWish: string[]) => {
    setWishlist(newWish);
    localStorage.setItem("taxsis_wishlist", JSON.stringify(newWish));
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && item.selectedVariant === variant
    );

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      saveCart(newCart);
    } else {
      saveCart([...cart, { product, quantity, selectedVariant: variant }]);
    }
    addNotification(`تم إضافة ${product.name_ar} إلى سلة المشتريات`);
  };

  const removeFromCart = (productId: string, variant?: string) => {
    const newCart = cart.filter(
      item => !(item.product.id === productId && item.selectedVariant === variant)
    );
    saveCart(newCart);
  };

  const updateCartQuantity = (productId: string, quantity: number, variant?: string) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === productId && item.selectedVariant === variant
    );
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity = Math.max(1, quantity);
      saveCart(newCart);
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const newWish = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];
    saveWishlist(newWish);
    
    if (wishlist.includes(productId)) {
      addNotification("تم إزالة المنتج من المفضلة");
    } else {
      addNotification("تم إضافة المنتج للمفضلة");
    }
  };

  // Compare actions
  const toggleCompare = (product: Product) => {
    const exists = compareList.find(p => p.id === product.id);
    if (exists) {
      setCompareList(compareList.filter(p => p.id !== product.id));
      addNotification(`تم إزالة ${product.name_ar} من المقارنة`);
    } else {
      if (compareList.length >= 4) {
        addNotification("يمكنك مقارنة 4 منتجات كحد أقصى");
        return;
      }
      setCompareList([...compareList, product]);
      addNotification(`تم إضافة ${product.name_ar} للمقارنة`);
    }
  };

  // Recently Viewed actions
  const addToRecentlyViewed = (productId: string) => {
    const filtered = recentlyViewed.filter(id => id !== productId);
    const newRecently = [productId, ...filtered].slice(0, 10);
    setRecentlyViewed(newRecently);
    localStorage.setItem("taxsis_recently", JSON.stringify(newRecently));
  };

  // Session actions
  const loginUser = (email: string, role: "customer" | "admin" | "priest" | "deacon" = "customer") => {
    const user: UserSession = {
      id: "usr-" + Math.random().toString(36).substr(2, 9),
      fullName: email.split("@")[0] === "taksisdaf" ? "المدير العام طاكسيس" : "مستخدم طاكسيس",
      email: email,
      role: email === "taksisdaf@gmail.com" ? "admin" : role,
      phone: "01220201204",
      addresses: [
        {
          fullName: "يوحنا كمال",
          phone: "01220201204",
          email: email,
          governorate: "القاهرة",
          cityAddress: "الزيتون، أمام كنيسة العذراء"
        }
      ],
      wishlist: []
    };
    setCurrentUser(user);
    localStorage.setItem("taxsis_user", JSON.stringify(user));
    addNotification(`أهلاً بك، تم تسجيل الدخول بنجاح`);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("taxsis_user");
    addNotification("تم تسجيل الخروج");
  };

  // Notifications
  const addNotification = (message: string) => {
    const newNotif = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      date: new Date().toISOString(),
      read: false
    };
    const updated = [newNotif, ...notifications].slice(0, 20);
    setNotifications(updated);
    localStorage.setItem("taxsis_notifs", JSON.stringify(updated));
  };

  const markNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("taxsis_notifs", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        compareList,
        toggleCompare,
        recentlyViewed,
        addToRecentlyViewed,
        currentUser,
        loginUser,
        logoutUser,
        notifications,
        addNotification,
        markNotificationsAsRead,
        language,
        setLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
