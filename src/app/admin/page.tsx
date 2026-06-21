"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, ShoppingCart, Package, Settings, Users, FileText,
  TrendingUp, AlertCircle, Plus, Edit3, Trash2, CheckCircle2, ChevronDown, 
  Search, ShieldAlert, Sparkles, MessageCircle, DollarSign
} from "lucide-react";
import { useApp } from "@/services/store";
import { 
  getProducts, saveProduct, deleteProduct, 
  getOrders, updateOrderStatus, 
  getCustomRequests, updateCustomRequestStatus,
  Order, CustomRequest
} from "@/services/api";
import { CATEGORIES, Product } from "@/services/db-mock-data";

export default function AdminDashboard() {
  const router = useRouter();
  const { currentUser, addNotification } = useApp();

  // Redirect non-admins in real app, but keep it accessible for mock testing easily
  useEffect(() => {
    // If you want strict admin check:
    // if (!currentUser || currentUser.role !== 'admin') { router.push('/'); }
  }, [currentUser]);

  // Tab state
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "customs" | "settings">("overview");

  // Database Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customs, setCustoms] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States for adding/editing product
  const [showProductForm, setShowProductForm] = useState(false);
  const [formId, setFormId] = useState<string | undefined>(undefined);
  const [formSku, setFormSku] = useState("");
  const [formNameAr, setFormNameAr] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDiscount, setFormDiscount] = useState("");
  const [formCategory, setFormCategory] = useState("cat-6");
  const [formStock, setFormStock] = useState("");
  const [formDescAr, setFormDescAr] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formImages, setFormImages] = useState("");
  
  // Custom Quote state
  const [selectedCustomId, setSelectedCustomId] = useState<string | null>(null);
  const [quoteVal, setQuoteVal] = useState("");

  // Load database items
  const loadDatabase = async () => {
    setLoading(true);
    try {
      const p = await getProducts();
      const o = await getOrders();
      const c = await getCustomRequests();
      setProducts(p);
      setOrders(o);
      setCustoms(c);
    } catch (err) {
      console.error("Failed to load admin db", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  // Product actions handlers
  const handleOpenAddProduct = () => {
    setFormId(undefined);
    setFormSku("");
    setFormNameAr("");
    setFormNameEn("");
    setFormPrice("");
    setFormDiscount("");
    setFormCategory("cat-6");
    setFormStock("");
    setFormDescAr("");
    setFormDescEn("");
    setFormImages("");
    setShowProductForm(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setFormId(p.id);
    setFormSku(p.sku);
    setFormNameAr(p.name_ar);
    setFormNameEn(p.name_en);
    setFormPrice(String(p.price));
    setFormDiscount(p.discount_price ? String(p.discount_price) : "");
    setFormCategory(p.category_id);
    setFormStock(String(p.stock_quantity));
    setFormDescAr(p.description_ar);
    setFormDescEn(p.description_en);
    setFormImages(p.images ? p.images.join(", ") : "");
    setShowProductForm(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedImages = formImages
        ? formImages.split(",").map(img => img.trim()).filter(Boolean)
        : ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"];

      await saveProduct({
        id: formId,
        sku: formSku || undefined,
        name_ar: formNameAr,
        name_en: formNameEn,
        price: Number(formPrice),
        discount_price: formDiscount ? Number(formDiscount) : undefined,
        category_id: formCategory,
        stock_quantity: Number(formStock),
        description_ar: formDescAr,
        description_en: formDescEn,
        images: parsedImages
      });
      addNotification(formId ? "تم تعديل صنف المنتج بنجاح" : "تم إضافة صنف كنسي جديد بنجاح");
      setShowProductForm(false);
      loadDatabase();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حفظ المنتج");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج نهائياً من المعرض؟")) return;
    try {
      await deleteProduct(id);
      addNotification("تم حذف المنتج بنجاح");
      loadDatabase();
    } catch (err) {
      console.error(err);
    }
  };

  // Order status actions handlers
  const handleUpdateOrderStatus = async (orderId: string, status: Order["status"], payStatus?: Order["payment_status"]) => {
    try {
      await updateOrderStatus(orderId, status, payStatus);
      addNotification(`تم تحديث حالة الطلب رقم ${orderId.substr(0,6)} إلى ${status}`);
      loadDatabase();
    } catch (err) {
      console.error(err);
    }
  };

  // Custom order actions handlers
  const handleCustomQuoteSubmit = async (e: React.FormEvent, customId: string) => {
    e.preventDefault();
    if (!quoteVal) return;
    try {
      await updateCustomRequestStatus(customId, "quoted", Number(quoteVal));
      addNotification("تم إرسال عرض الأسعار المالي للعميل بنجاح");
      setSelectedCustomId(null);
      setQuoteVal("");
      loadDatabase();
    } catch (err) {
      console.error(err);
    }
  };

  // Overview metrics
  const totalSales = orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.total, 0);
  const lowStockCount = products.filter(p => p.stock_quantity <= 4).length;
  const pendingOrdersCount = orders.filter(o => o.status === "pending").length;
  const openCustomsCount = customs.filter(c => c.status === "pending").length;

  if (loading) {
    return <div className="text-center py-24 font-bold text-sm">جاري تحميل لوحة التحكم للمشرف...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gold-500/15 pb-6">
        <div>
          <div className="flex items-center gap-2 text-gold-600 font-bold">
            <ShieldAlert className="w-5 h-5 text-gold-500" />
            <span>نظام إدارة طاكسيس المعتمد</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-burgundy-800 mt-1">
            لوحة الإدارة والمشرفين
          </h1>
        </div>

        {/* Quick Database seed trigger */}
        <button
          onClick={loadDatabase}
          className="bg-ivory-200 text-burgundy-800 font-bold border border-gold-500/20 px-4 py-2.5 rounded-lg text-xs hover:bg-gold-500/10 transition-colors"
        >
          تحديث لوحة البيانات دقيقة بدقيقة
        </button>
      </div>

      {/* Main Tab Controls Row */}
      <div className="flex flex-wrap gap-2 border-b border-gold-500/10 pb-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "overview" ? "bg-burgundy-800 text-gold-300 shadow" : "text-navy-800 hover:bg-gold-500/10"
          }`}
        >
          <LayoutDashboard className="w-4.5 h-4.5" />
          <span>نظرة عامة والتحليلات</span>
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "products" ? "bg-burgundy-800 text-gold-300 shadow" : "text-navy-800 hover:bg-gold-500/10"
          }`}
        >
          <Package className="w-4.5 h-4.5" />
          <span>المخزون والمنتجات ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "orders" ? "bg-burgundy-800 text-gold-300 shadow" : "text-navy-800 hover:bg-gold-500/10"
          }`}
        >
          <ShoppingCart className="w-4.5 h-4.5" />
          <span>الطلبات والمبيعات ({orders.length})</span>
          {pendingOrdersCount > 0 && (
            <span className="bg-red-600 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
              {pendingOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("customs")}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "customs" ? "bg-burgundy-800 text-gold-300 shadow" : "text-navy-800 hover:bg-gold-500/10"
          }`}
        >
          <FileText className="w-4.5 h-4.5" />
          <span>طلبات التفصيل المخصصة ({customs.length})</span>
          {openCustomsCount > 0 && (
            <span className="bg-gold-500 text-burgundy-900 font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
              {openCustomsCount}
            </span>
          )}
        </button>
      </div>

      {/* ================================== TAB CONTENT SWITCHES ================================== */}
      
      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fade-in">
          {/* Dashboard Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metric 1 */}
            <div className="bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-navy-900/40">إجمالي المبيعات المكتملة</p>
                <h3 className="font-bold text-lg text-burgundy-800">{totalSales} ج.م</h3>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-navy-900/40">الطلبات قيد المراجعة</p>
                <h3 className="font-bold text-lg text-burgundy-800">{pendingOrdersCount} طلبات</h3>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-navy-900/40">أصناف منخفضة المخزون</p>
                <h3 className="font-bold text-lg text-burgundy-800">{lowStockCount} منتجات</h3>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-navy-900/40">طلبات التفصيل المفتوحة</p>
                <h3 className="font-bold text-lg text-burgundy-800">{openCustomsCount} طلبات</h3>
              </div>
            </div>

          </div>

          {/* Low Stock Alerts list */}
          {lowStockCount > 0 && (
            <div className="bg-red-50 border border-red-500/15 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-sm font-bold text-red-700 flex items-center gap-1.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                تحذير: منتجات شارفت كميتها على النفاد (أقل من 5 قطع)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {products.filter(p => p.stock_quantity <= 4).map(prod => (
                  <div key={prod.id} className="bg-white border rounded-lg p-3 flex justify-between items-center shadow-sm">
                    <div>
                      <p className="font-bold text-navy-900">{prod.name_ar}</p>
                      <p className="text-[10px] text-navy-900/40 mt-0.5">كود: {prod.sku}</p>
                    </div>
                    <span className="font-bold bg-red-100 text-red-800 px-3 py-1 rounded">
                      متبقي: {prod.stock_quantity} قطع
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity audit log logs */}
          <div className="bg-white rounded-2xl border border-gold-500/10 p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-burgundy-800">سجل النشاط والأحداث البرمجية</h3>
            
            <div className="space-y-3 text-xs leading-normal pr-1 max-h-60 overflow-y-auto">
              <div className="p-3 border-r-4 border-green-500 bg-green-50/50 rounded flex justify-between items-center">
                <span>تحديث ناجح لقاعدة البيانات الملحية للـ JSON DB.</span>
                <span className="text-[9px] text-navy-900/40">الآن</span>
              </div>
              <div className="p-3 border-r-4 border-gold-500 bg-gold-50/50 rounded flex justify-between items-center">
                <span>مسؤول المقاسات بطاكسيس قام بمطابقة جدول المقاسات للكهنة.</span>
                <span className="text-[9px] text-navy-900/40">منذ ساعة</span>
              </div>
              {orders.slice(0, 3).map(o => (
                <div key={o.id} className="p-3 border-r-4 border-blue-500 bg-blue-50/50 rounded flex justify-between items-center">
                  <span>إنشاء طلب جديد بنجاح بكود تتبع: {o.tracking_number} لصالح العميل {o.shipping_address.fullName}.</span>
                  <span className="text-[9px] text-navy-900/40">{new Date(o.created_at).toLocaleTimeString("ar-EG")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT CRUD MANAGEMENT */}
      {activeTab === "products" && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-burgundy-800">قائمة أصناف المعرض</h3>
            <button
              onClick={handleOpenAddProduct}
              className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-extrabold px-4 py-2.5 rounded-lg text-xs border border-gold-400 cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة صنف كنسي جديد</span>
            </button>
          </div>

          {/* Product form toggle dialog inline */}
          {showProductForm && (
            <div className="bg-ivory-200 border-2 border-gold-500/25 p-6 rounded-2xl shadow-lg animate-fade-in text-xs text-navy-950">
              <form onSubmit={handleProductSubmit} className="space-y-6">
                <h4 className="font-serif text-sm font-bold text-burgundy-800 border-b border-gold-500/10 pb-2 mb-4">
                  {formId ? "تعديل بيانات الصنف" : "إضافة صنف منتج جديد للمعرض"}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold">كود الـ SKU:</label>
                    <input
                      type="text"
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value)}
                      placeholder="تلقائي إن تُرِك فارغاً"
                      className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">الاسم بالعربية:</label>
                    <input
                      type="text"
                      value={formNameAr}
                      onChange={(e) => setFormNameAr(e.target.value)}
                      placeholder="دف كنسي نحاسي..."
                      className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">الاسم بالإنجليزية:</label>
                    <input
                      type="text"
                      value={formNameEn}
                      onChange={(e) => setFormNameEn(e.target.value)}
                      placeholder="Coptic Cymbals..."
                      className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">سعر البيع الأساسي (ج.م):</label>
                    <input
                      type="number"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="1800"
                      className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">سعر الخصم الترويجي (اختياري):</label>
                    <input
                      type="number"
                      value={formDiscount}
                      onChange={(e) => setFormDiscount(e.target.value)}
                      placeholder="1600"
                      className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">الكمية المتوفرة بالمخزن:</label>
                    <input
                      type="number"
                      value={formStock}
                      onChange={(e) => setFormStock(e.target.value)}
                      placeholder="15"
                      className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">القسم الكنسي التابع له:</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none text-right font-semibold"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.name_ar}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold">شرح الصنف بالعربية:</label>
                  <textarea
                    value={formDescAr}
                    onChange={(e) => setFormDescAr(e.target.value)}
                    placeholder="تفاصيل دقيقة عن الصنف الطقسي..."
                    rows={2}
                    className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold">شرح الصنف بالإنجليزية:</label>
                  <textarea
                    value={formDescEn}
                    onChange={(e) => setFormDescEn(e.target.value)}
                    placeholder="English description..."
                    rows={2}
                    className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold">روابط الصور (رابط مباشر أو روابط تفصلها فواصل للصور المتعددة):</label>
                  <input
                    type="text"
                    value={formImages}
                    onChange={(e) => setFormImages(e.target.value)}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    className="w-full bg-white border border-gold-500/10 rounded p-2 focus:outline-none text-left"
                    dir="ltr"
                  />
                  <p className="text-[10px] text-navy-900/40">يمكنك إدخال رابط أو عدة روابط صور مفصولة بفواصل لجعل المعرض متحركاً.</p>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowProductForm(false)}
                    className="bg-white border rounded px-4 py-2"
                  >
                    إلغاء والعودة
                  </button>
                  <button
                    type="submit"
                    className="bg-burgundy-800 text-gold-300 font-bold px-6 py-2 rounded border border-gold-500/20"
                  >
                    حفظ وتأكيد التخزين
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Table display */}
          <div className="bg-white rounded-2xl border border-gold-500/10 overflow-hidden shadow-sm">
            <table className="w-full text-right text-xs">
              <thead className="bg-ivory-200 border-b border-gold-500/10 font-bold text-navy-950">
                <tr>
                  <th className="p-3">رمز SKU</th>
                  <th className="p-3">اسم المنتج بالعربية</th>
                  <th className="p-3">القسم الكنسي</th>
                  <th className="p-3 text-center">السعر أساسي/خصم</th>
                  <th className="p-3 text-center">المخزن</th>
                  <th className="p-3 text-left">التحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/5 font-semibold text-navy-900/80">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gold-500/5 transition-colors">
                    <td className="p-3 font-mono font-bold text-gold-600">{p.sku}</td>
                    <td className="p-3 font-bold text-navy-950">{p.name_ar}</td>
                    <td className="p-3 text-[10px] text-navy-900/60">
                      {CATEGORIES.find(c => c.id === p.category_id)?.name_ar}
                    </td>
                    <td className="p-3 text-center font-bold">
                      {p.price} ج.م / {p.discount_price ? `${p.discount_price} ج.م` : "بلا"}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        p.stock_quantity <= 4 ? "bg-red-100 text-red-800 font-extrabold" : "bg-green-100 text-green-800"
                      }`}>
                        {p.stock_quantity} قطعة
                      </span>
                    </td>
                    <td className="p-3 text-left flex gap-2 justify-end">
                      <button
                        onClick={() => handleOpenEditProduct(p)}
                        className="text-gold-600 hover:text-burgundy-800 p-1"
                        title="تعديل المنتج"
                      >
                        <Edit3 className="w-4.5 h-4.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="حذف نهائي"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 3: ORDER LIST & STATUS TRANSITION */}
      {activeTab === "orders" && (
        <div className="space-y-6 animate-fade-in text-xs text-navy-950">
          <h3 className="font-serif text-base font-bold text-burgundy-800 border-b border-gold-500/10 pb-2.5">
            إدارة طلبات ومبيعات العملاء
          </h3>

          <div className="bg-white rounded-2xl border border-gold-500/10 overflow-hidden shadow-sm">
            <table className="w-full text-right text-xs">
              <thead className="bg-ivory-200 border-b border-gold-500/10 font-bold text-navy-950">
                <tr>
                  <th className="p-3">رقم التتبع</th>
                  <th className="p-3">اسم المستلم والهاتف</th>
                  <th className="p-3">تاريخ الطلب</th>
                  <th className="p-3 text-center">السعر الكلي</th>
                  <th className="p-3 text-center">حالة الدفع/الطلب</th>
                  <th className="p-3 text-left">تحديث الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/5 font-semibold text-navy-900/80">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-navy-900/40">لا توجد أي مبيعات أو طلبات مسجلة بعد.</td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gold-500/5 transition-colors">
                      <td className="p-3 font-mono font-bold text-burgundy-800">{o.tracking_number}</td>
                      <td className="p-3">
                        <p className="font-bold text-navy-950">{o.shipping_address.fullName}</p>
                        <p className="text-[10px] text-navy-900/50 mt-0.5">{o.shipping_address.phone}</p>
                      </td>
                      <td className="p-3 text-[10px] text-navy-900/40">
                        {new Date(o.created_at).toLocaleString("ar-EG")}
                      </td>
                      <td className="p-3 text-center font-bold text-burgundy-800">{o.total} ج.م</td>
                      <td className="p-3 text-center space-y-1">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.status === "completed" ? "bg-green-100 text-green-700" :
                          o.status === "processing" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {o.status === "pending" ? "قيد المراجعة" :
                           o.status === "processing" ? "قيد التجهيز" : "تم الشحن"}
                        </span>
                        <span className={`block text-[9px] font-bold text-center ${
                          o.payment_status === "paid" ? "text-green-600" : "text-amber-600"
                        }`}>
                          ({o.payment_status === "paid" ? "مدفوع" : "غير مدفوع بعد"})
                        </span>
                      </td>
                      <td className="p-3 text-left flex gap-1 justify-end pt-5">
                        <button
                          onClick={() => handleUpdateOrderStatus(o.id, "processing")}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-500/20 text-[10px] cursor-pointer"
                        >
                          تجهيز
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(o.id, "completed", "paid")}
                          className="bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border border-green-500/20 text-[10px] cursor-pointer"
                        >
                          شحن/أنجز
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOM ORDER REQUEST INBOX & QUOTATIONS */}
      {activeTab === "customs" && (
        <div className="space-y-6 animate-fade-in text-xs text-navy-950">
          <h3 className="font-serif text-base font-bold text-burgundy-800 border-b border-gold-500/10 pb-2.5">
            صندوق الوارد لطلبات التفصيل والأعمال الخشبية المحفورة بالطلب
          </h3>

          <div className="space-y-4">
            {customs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gold-500/10 p-12 text-center text-navy-900/40">
                لا توجد طلبات تفصيل أو حفر خشب مخصصة حتى الآن.
              </div>
            ) : (
              customs.map((c) => (
                <div key={c.id} className="bg-white rounded-xl border border-gold-500/15 p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-start border-b border-gold-500/5 pb-2">
                    <div>
                      <h4 className="font-bold text-sm text-burgundy-800">{c.type}</h4>
                      <p className="text-[10px] text-navy-900/40 mt-0.5">
                        العميل: {c.name} | هاتف للتواصل: <a href={`tel:${c.phone}`} className="font-bold hover:underline">{c.phone}</a> | {new Date(c.created_at).toLocaleString("ar-EG")}
                      </p>
                    </div>
                    <div>
                      <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold ${
                        c.status === "quoted" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        الحالة: {c.status === "pending" ? "بانتظار عرض السعر" : `تم التسعير بـ ${c.quote_amount} ج.م`}
                      </span>
                    </div>
                  </div>

                  <div className="whitespace-pre-wrap leading-relaxed bg-ivory-200/50 p-4 rounded border border-gold-500/5">
                    {c.details}
                  </div>

                  {/* Submission quote field */}
                  {c.status === "pending" && (
                    <div>
                      {selectedCustomId === c.id ? (
                        <form onSubmit={(e) => handleCustomQuoteSubmit(e, c.id)} className="flex gap-2 items-center max-w-sm">
                          <input
                            type="number"
                            value={quoteVal}
                            onChange={(e) => setQuoteVal(e.target.value)}
                            placeholder="المبلغ الإجمالي بالجنيه..."
                            className="bg-ivory-200 border border-gold-500/20 rounded p-2.5 text-xs text-center w-full focus:outline-none"
                            required
                          />
                          <button
                            type="submit"
                            className="bg-burgundy-800 text-gold-300 font-bold px-4 py-2.5 rounded border border-gold-500/20 text-xs shrink-0 cursor-pointer"
                          >
                            تأكيد السعر
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedCustomId(null)}
                            className="bg-white border rounded px-3 py-2.5 text-xs text-navy-900/60"
                          >
                            إلغاء
                          </button>
                        </form>
                      ) : (
                        <button
                          onClick={() => setSelectedCustomId(c.id)}
                          className="bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold px-4 py-2 rounded text-xs border border-gold-400 cursor-pointer"
                        >
                          تحديد وعرض السعر المالي للعميل
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
