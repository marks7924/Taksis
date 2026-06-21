"use client";

import React, { useState } from "react";
import { Sparkles, Scissors, Hammer, Send, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { createCustomRequest } from "@/services/api";
import { useApp } from "@/services/store";

export default function CustomOrders() {
  const { addNotification } = useApp();
  
  // Tab control
  const [activeTab, setActiveTab] = useState<"vestment" | "carving" | "monastery">("vestment");
  
  // Vestment Form States
  const [vestmentName, setVestmentName] = useState("");
  const [vestmentPhone, setVestmentPhone] = useState("");
  const [vestmentEmail, setVestmentEmail] = useState("");
  const [vestmentType, setVestmentType] = useState("بدلة كهنوتية بيضاء");
  const [fabricType, setFabricType] = useState("حرير بروكار سوري فاخر");
  const [embroideryType, setEmbroideryType] = useState("خيوط سيرما ذهبية بالكامل");
  const [sizeHeight, setSizeHeight] = useState("");
  const [sizeChest, setSizeChest] = useState("");
  const [sizeSleeve, setSizeSleeve] = useState("");
  const [vestmentNotes, setVestmentNotes] = useState("");

  // Wood Carving Form States
  const [carvingName, setCarvingName] = useState("");
  const [carvingPhone, setCarvingPhone] = useState("");
  const [carvingEmail, setCarvingEmail] = useState("");
  const [carvingType, setCarvingType] = useState("حامل إنجيل (منجلية)");
  const [woodType, setWoodType] = useState("خشب أرو أحمر أمريكي");
  const [dimensions, setDimensions] = useState("");
  const [carvingNotes, setCarvingNotes] = useState("");

  // Monastery Bulk Form States
  const [bulkName, setBulkName] = useState("");
  const [bulkPhone, setBulkPhone] = useState("");
  const [bulkEmail, setBulkEmail] = useState("");
  const [monasteryName, setMonasteryName] = useState("");
  const [bulkDetails, setBulkDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleVestmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vestmentName || !vestmentPhone || !vestmentEmail) return;
    
    setLoading(true);
    try {
      const detailsText = `النوع: ${vestmentType}
القماش: ${fabricType}
التطريز: ${embroideryType}
القياسات: الطول ${sizeHeight} سم، الصدر ${sizeChest} سم، الكم ${sizeSleeve} سم.
ملاحظات إضافية: ${vestmentNotes}`;

      await createCustomRequest({
        name: vestmentName,
        email: vestmentEmail,
        phone: vestmentPhone,
        type: "ملابس كهنوتية وشماس مخصصة",
        details: detailsText
      });

      setSuccessMsg("تم تسجيل طلب تفصيل ملابس الخدمة الكهنوتية بنجاح! كادر المقاسات في طاكسيس سيتواصل معك هاتفياً خلال 24 ساعة.");
      addNotification("تم إرسال طلب تفصيل ملابس الخدمة بنجاح");
      clearVestmentForm();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCarvingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carvingName || !carvingPhone || !carvingEmail) return;

    setLoading(true);
    try {
      const detailsText = `نوع العمل الخشبي: ${carvingType}
نوع الخشب: ${woodType}
الأبعاد المطلوبة: ${dimensions}
التفاصيل والنقوش: ${carvingNotes}`;

      await createCustomRequest({
        name: carvingName,
        email: carvingEmail,
        phone: carvingPhone,
        type: "حفر خشب وأعمال كنسية مخصصة",
        details: detailsText
      });

      setSuccessMsg("تم إرسال طلب حفر الأخشاب الكنسية المخصصة بنجاح! مهندس التصميم وصياغة الهياكل سيتواصل معك لعرض نماذج ثنائية الأبعاد.");
      addNotification("تم إرسال طلب حفر الأخشاب بنجاح");
      clearCarvingForm();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkName || !bulkPhone || !bulkEmail) return;

    setLoading(true);
    try {
      const detailsText = `اسم الدير/الكنيسة: ${monasteryName}
التفاصيل والكميات المطلوبة: ${bulkDetails}`;

      await createCustomRequest({
        name: bulkName,
        email: bulkEmail,
        phone: bulkPhone,
        type: "طلبيات وتوريدات أديرة وكنائس بالجملة",
        details: detailsText
      });

      setSuccessMsg("تم تسجيل طلب التوريد الديري بنجاح! مسؤول التعاقدات والمشتريات بطاكسيس سيتواصل معك لإرسال عرض أسعار متكامل.");
      addNotification("تم إرسال طلب توريد الأديرة بنجاح");
      clearBulkForm();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearVestmentForm = () => {
    setVestmentName("");
    setVestmentPhone("");
    setVestmentEmail("");
    setSizeHeight("");
    setSizeChest("");
    setSizeSleeve("");
    setVestmentNotes("");
  };

  const clearCarvingForm = () => {
    setCarvingName("");
    setCarvingPhone("");
    setCarvingEmail("");
    setDimensions("");
    setCarvingNotes("");
  };

  const clearBulkForm = () => {
    setBulkName("");
    setBulkPhone("");
    setBulkEmail("");
    setMonasteryName("");
    setBulkDetails("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Editorial Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Sparkles className="w-10 h-10 text-gold-500 mx-auto animate-pulse" />
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-burgundy-800">
          التصنيع المخصص والطلبات الخاصة
        </h1>
        <p className="text-sm text-navy-900/60 leading-relaxed font-medium">
          نوفر لآبائنا الكهنة الأجلاء والشمامسة الأحباء والأديرة العامرة خدمة تفصيل وصياغة كافة مستلزمات الخدمة الكنسية والمذبح بمقاييس دقيقة بالطلب الخاص.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gold-500/10 pb-1">
        <div className="flex gap-2 bg-ivory-200 p-1.5 rounded-xl border border-gold-500/10">
          <button
            onClick={() => { setActiveTab("vestment"); setSuccessMsg(""); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "vestment"
                ? "bg-burgundy-800 text-gold-300 border border-gold-500/10 shadow-md"
                : "text-navy-800 hover:bg-gold-500/10"
            }`}
          >
            <Scissors className="w-4 h-4 text-gold-500" />
            <span>تفصيل ملابس الكهنوت والشماس</span>
          </button>
          
          <button
            onClick={() => { setActiveTab("carving"); setSuccessMsg(""); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "carving"
                ? "bg-burgundy-800 text-gold-300 border border-gold-500/10 shadow-md"
                : "text-navy-800 hover:bg-gold-500/10"
            }`}
          >
            <Hammer className="w-4 h-4 text-gold-500" />
            <span>حفر الأخشاب وهياكل المذبح</span>
          </button>

          <button
            onClick={() => { setActiveTab("monastery"); setSuccessMsg(""); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "monastery"
                ? "bg-burgundy-800 text-gold-300 border border-gold-500/10 shadow-md"
                : "text-navy-800 hover:bg-gold-500/10"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>توريدات أديرة ومؤسسات كنسية</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="max-w-xl mx-auto bg-gold-500/15 border-2 border-gold-500/25 p-6 rounded-2xl text-center space-y-3 animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-gold-600 mx-auto" />
          <h4 className="font-serif text-lg font-bold text-burgundy-800">تم إرسال طلبكم بنجاح</h4>
          <p className="text-xs text-navy-900/80 leading-relaxed font-semibold">{successMsg}</p>
        </div>
      )}

      {/* Forms Switcher */}
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-2xl border border-gold-500/10 shadow-md">
        
        {/* TAB 1: VESTMENT FORM */}
        {activeTab === "vestment" && !successMsg && (
          <form onSubmit={handleVestmentSubmit} className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-2 mb-4">
              نموذج أخذ قياسات تفصيل ملابس الخدمة
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">الاسم بالكامل:</label>
                <input
                  type="text"
                  value={vestmentName}
                  onChange={(e) => setVestmentName(e.target.value)}
                  placeholder="الاسم الثلاثي..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">رقم الهاتف المحمول (واتساب):</label>
                <input
                  type="tel"
                  value={vestmentPhone}
                  onChange={(e) => setVestmentPhone(e.target.value)}
                  placeholder="رقم للتواصل وتأكيد المقاسات..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">البريد الإلكتروني للعميل:</label>
                <input
                  type="email"
                  value={vestmentEmail}
                  onChange={(e) => setVestmentEmail(e.target.value)}
                  placeholder="البريد الإلكتروني..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">نوع الملبس الكنسي:</label>
                <select
                  value={vestmentType}
                  onChange={(e) => setVestmentType(e.target.value)}
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right font-bold focus:outline-none focus:border-gold-500"
                >
                  <option value="بدلة كهنوتية بيضاء مذهبة">بدلة كهنوتية بيضاء مذهبة (كاملة)</option>
                  <option value="بدلة كهنوتية حمراء ملكية">بدلة كهنوتية حمراء ملكية (برنص وبطرشيل)</option>
                  <option value="طونية شماس مطرزة سيرما">طونية شماس مطرزة بالكامل</option>
                  <option value="بطرشيل كاهن خاص">بطرشيل كاهن خاص (شغل يدوي)</option>
                  <option value="أكمام ومنطقة كهنوتية">أكمام ومنطقة كهنوتية</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">خامة القماش المفضلة:</label>
                <select
                  value={fabricType}
                  onChange={(e) => setFabricType(e.target.value)}
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                >
                  <option value="حرير بروكار سوري فاخر">حرير بروكار سوري فاخر ذو نقوش قبطية</option>
                  <option value="كريب ياباني مستورد">كريب ياباني مستورد (مقاوم للتجعد)</option>
                  <option value="قطيفة إيطالي ملكي">قطيفة إيطالي ملكي (للبرانس الشتوية والبطراشيل)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">نوع خيوط التطريز:</label>
                <select
                  value={embroideryType}
                  onChange={(e) => setEmbroideryType(e.target.value)}
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                >
                  <option value="خيوط سيرما ذهبية بالكامل">خيوط سيرما ذهبية فرنسية لامعة</option>
                  <option value="خيوط سيرما فضية ناصعة">خيوط سيرما فضية ناصعة</option>
                  <option value="تطريز ملون بالخيوط والخرز">تطريز ملون بالخيوط والخرز (شغل يدوي)</option>
                </select>
              </div>

              {/* Sizing Details */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">الطول الإجمالي (سم):</label>
                <input
                  type="number"
                  value={sizeHeight}
                  onChange={(e) => setSizeHeight(e.target.value)}
                  placeholder="مثال: ١٤٥ سم"
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">عرض الصدر (سم):</label>
                <input
                  type="number"
                  value={sizeChest}
                  onChange={(e) => setSizeChest(e.target.value)}
                  placeholder="مثال: ٦٢ سم"
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">طول الكم من الكتف (سم):</label>
                <input
                  type="number"
                  value={sizeSleeve}
                  onChange={(e) => setSizeSleeve(e.target.value)}
                  placeholder="مثال: ٦٠ سم"
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-950">تفاصيل إضافية أو مقاس الياقة ورسم الصلبان:</label>
              <textarea
                value={vestmentNotes}
                onChange={(e) => setVestmentNotes(e.target.value)}
                placeholder="اكتب أي ملاحظات أو أسماء قديسين ترغب في تطريزهم على البطرشيل..."
                rows={3}
                className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "جاري تسجيل طلبك..." : "إرسال طلب تفصيل ملابس الخدمة"}</span>
            </button>
          </form>
        )}

        {/* TAB 2: WOOD CARVING FORM */}
        {activeTab === "carving" && !successMsg && (
          <form onSubmit={handleCarvingSubmit} className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-2 mb-4">
              طلب حفر وتجهيز أعمال خشبية كنسية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">الاسم بالكامل:</label>
                <input
                  type="text"
                  value={carvingName}
                  onChange={(e) => setCarvingName(e.target.value)}
                  placeholder="اسم مقدم الطلب..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">رقم الهاتف المحمول:</label>
                <input
                  type="tel"
                  value={carvingPhone}
                  onChange={(e) => setCarvingPhone(e.target.value)}
                  placeholder="رقم للتأكيد..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">البريد الإلكتروني:</label>
                <input
                  type="email"
                  value={carvingEmail}
                  onChange={(e) => setCarvingEmail(e.target.value)}
                  placeholder="البريد..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">نوع الأثاث / العمل الخشبي:</label>
                <select
                  value={carvingType}
                  onChange={(e) => setCarvingType(e.target.value)}
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right font-bold focus:outline-none"
                >
                  <option value="حامل إنجيل (منجلية) للمذبح">حامل إنجيل (منجلية) للمذبح</option>
                  <option value="صليب يدوي خشبي محفور">صليب يدوي خشبي محفور</option>
                  <option value="كرسي كاهن أو أسقف محفور">كرسي كاهن أو أسقف محفور</option>
                  <option value="صندوق أواني كنسية مبطن">صندوق أواني كنسية مبطن</option>
                  <option value="هيكل مذبح خشبي كامل">هيكل مذبح خشبي كامل بالصياغة</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">نوع الخشب المفضل:</label>
                <select
                  value={woodType}
                  onChange={(e) => setWoodType(e.target.value)}
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                >
                  <option value="خشب أرو أحمر أمريكي">خشب أرو أحمر أمريكي فاخر</option>
                  <option value="خشب زان معالج">خشب زان معالج ثقيل</option>
                  <option value="خشب زيتون طبيعي">خشب زيتون طبيعي مبارك</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">الأبعاد المطلوبة (ارتفاع × عرض × عمق):</label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="مثال: ١١٠ × ٤٠ × ٤٠ سم"
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-950">وصف النقوش والرموز المطلوبة (مثل حمامة الروح القدس، عناقيد العنب):</label>
              <textarea
                value={carvingNotes}
                onChange={(e) => setCarvingNotes(e.target.value)}
                placeholder="اكتب هنا تفاصيل الحفر والزخرفة المرغوبة على القطعة..."
                rows={4}
                className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "جاري إرسال طلب الحفر..." : "إرسال طلب صياغة وتجهيز الأخشاب"}</span>
            </button>
          </form>
        )}

        {/* TAB 3: MONASTERY BULK FORM */}
        {activeTab === "monastery" && !successMsg && (
          <form onSubmit={handleBulkSubmit} className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-2 mb-4">
              طلبات توريد الكنائس والأديرة بكميات كبيرة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">اسم المنسق / الكاهن المسؤول:</label>
                <input
                  type="text"
                  value={bulkName}
                  onChange={(e) => setBulkName(e.target.value)}
                  placeholder="اسم الشخص المسؤول عن التوريد..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">رقم الهاتف للتواصل:</label>
                <input
                  type="tel"
                  value={bulkPhone}
                  onChange={(e) => setBulkPhone(e.target.value)}
                  placeholder="رقم للتأكيد..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">البريد الإلكتروني:</label>
                <input
                  type="email"
                  value={bulkEmail}
                  onChange={(e) => setBulkEmail(e.target.value)}
                  placeholder="البريد..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-950">اسم الكنيسة أو الدير بالكامل والمحافظة:</label>
                <input
                  type="text"
                  value={monasteryName}
                  onChange={(e) => setMonasteryName(e.target.value)}
                  placeholder="مثال: دير السريان العامر - وادي النطرون..."
                  className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-950">تفاصيل الطلبات المطلوبة بالكامل (مثال: بخور ديري، شمع، دروع تذكارية، صلبان معمودية، أغطية مذبح):</label>
              <textarea
                value={bulkDetails}
                onChange={(e) => setBulkDetails(e.target.value)}
                placeholder="اكتب هنا قائمة التوريدات والكميات المطلوبة بالتقريب..."
                rows={5}
                className="w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 text-xs text-right focus:outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "جاري تسجيل توريدات الدير..." : "إرسال طلب تسعير الجملة والتوريدات"}</span>
            </button>
          </form>
        )}

      </div>

      {/* Completed Works Portfolio Section */}
      <div className="space-y-6 pt-10 border-t border-gold-500/10">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl font-bold text-burgundy-800">
            كتالوج المشروعات المخصصة التي قمنا بتنفيذها
          </h2>
          <p className="text-xs text-navy-900/60">عرض حي لبعض الهياكل الحشبية والملابس التي تم تسليمها مؤخراً للكنائس القبطية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl overflow-hidden border border-gold-500/10 shadow-sm space-y-3 p-4">
            <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-48 object-cover rounded" />
            <h4 className="font-bold text-sm text-burgundy-800 text-center">حوامل الإنجيل (المنجليات) للمذبح</h4>
            <p className="text-xs text-navy-900/60 leading-relaxed text-justify">
              تجهيز 4 منجليات من خشب الأرو الأمريكي المحفور يدوياً بالكامل بشعار الصليب القبطي لصالح كنيسة العذراء بالزيتون.
            </p>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-gold-500/10 shadow-sm space-y-3 p-4">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-48 object-cover rounded" />
            <h4 className="font-bold text-sm text-burgundy-800 text-center">أردية وملابس الآباء المطارنة والكهنة</h4>
            <p className="text-xs text-navy-900/60 leading-relaxed text-justify">
              صياغة وتفصيل بدلة كهنوتية كاملة بالحرير الطبيعي والتطريز البارز لصالح كنيسة الملاك سوريال ومارمينا العمرانية بمناسبة سيامة كاهن جديد.
            </p>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-gold-500/10 shadow-sm space-y-3 p-4">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-48 object-cover rounded" />
            <h4 className="font-bold text-sm text-burgundy-800 text-center">صياغة أواني المذبح المذهبة</h4>
            <p className="text-xs text-navy-900/60 leading-relaxed text-justify">
              تصنيع وصياغة طقم أواني قداس إلهي مذهب بالكامل عيار 24 ومقاوم للتفاعل لخدمة المذبح بأحد أديرة وادي النطرون العامرة.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
