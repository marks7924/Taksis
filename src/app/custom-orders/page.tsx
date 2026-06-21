"use client";

import React, { useState } from "react";
import { Sparkles, Scissors, Hammer, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { createCustomRequest } from "@/services/api";
import { useApp } from "@/services/store";

export default function CustomOrders() {
  const { addNotification, language } = useApp();
  
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

  const isAr = language === "ar";

  const handleVestmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vestmentName || !vestmentPhone || !vestmentEmail) return;
    
    setLoading(true);
    try {
      const detailsText = `Type: ${vestmentType}
Fabric: ${fabricType}
Embroidery: ${embroideryType}
Measurements: Height ${sizeHeight} cm, Chest ${sizeChest} cm, Sleeve ${sizeSleeve} cm.
Notes: ${vestmentNotes}`;

      await createCustomRequest({
        name: vestmentName,
        email: vestmentEmail,
        phone: vestmentPhone,
        type: isAr ? "ملابس كهنوتية وشماس مخصصة" : "Bespoke Vestments Request",
        details: detailsText
      });

      setSuccessMsg(
        isAr 
          ? "تم تسجيل طلب تفصيل ملابس الخدمة الكهنوتية بنجاح! كادر المقاسات في طاكسيس سيتواصل معك هاتفياً خلال 24 ساعة."
          : "Tailoring sizing request registered successfully! The Taxsis tailoring team will call you within 24 hours."
      );
      addNotification(isAr ? "تم إرسال طلب تفصيل ملابس الخدمة بنجاح" : "Tailoring request submitted successfully");
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
      const detailsText = `Carving Type: ${carvingType}
Wood Type: ${woodType}
Dimensions: ${dimensions}
Carvings/Notes: ${carvingNotes}`;

      await createCustomRequest({
        name: carvingName,
        email: carvingEmail,
        phone: carvingPhone,
        type: isAr ? "حفر خشب وأعمال كنسية مخصصة" : "Bespoke Church Woodwork Request",
        details: detailsText
      });

      setSuccessMsg(
        isAr 
          ? "تم إرسال طلب حفر الأخشاب الكنسية المخصصة بنجاح! مهندس التصميم وصياغة الهياكل سيتواصل معك لعرض نماذج ثنائية الأبعاد."
          : "Custom church wood carving request submitted successfully! Our structural designer will contact you to showcase 2D schematics."
      );
      addNotification(isAr ? "تم إرسال طلب حفر الأخشاب بنجاح" : "Wood carving request submitted successfully");
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
      const detailsText = `Monastery/Church Name: ${monasteryName}
Items List & Quantities: ${bulkDetails}`;

      await createCustomRequest({
        name: bulkName,
        email: bulkEmail,
        phone: bulkPhone,
        type: isAr ? "طلبيات وتوريدات أديرة وكنائس بالجملة" : "Church & Monastery Bulk Supplies",
        details: detailsText
      });

      setSuccessMsg(
        isAr 
          ? "تم تسجيل طلب التوريد الديري بنجاح! مسؤول التعاقدات والمشتريات بطاكسيس سيتواصل معك لإرسال عرض أسعار متكامل."
          : "Monastery bulk supplies request registered successfully! The procurement officer at Taxsis will contact you with a full quote."
      );
      addNotification(isAr ? "تم إرسال طلب توريد الأديرة بنجاح" : "Monastery bulk supplies request submitted");
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

  // Dictionaries
  const dict = {
    title: isAr ? "التصنيع المخصص والطلبات الخاصة" : "Bespoke Liturgical Crafts & Sizing",
    subtitle: isAr
      ? "نوفر لآبائنا الكهنة الأجلاء والشمامسة الأحباء والأديرة العامرة خدمة تفصيل وصياغة كافة مستلزمات الخدمة الكنسية والمذبح بمقاييس دقيقة بالطلب الخاص."
      : "We provide our reverend fathers, beloved deacons, and monasteries with bespoke tailoring, carving, and forging of all altar supplies with precise specifications.",
    tabVestment: isAr ? "تفصيل ملابس الكهنوت والشماس" : "Tailor Vestments & Tonias",
    tabCarving: isAr ? "حفر الأخشاب وهياكل المذبح" : "Liturgical Wood Carvings",
    tabBulk: isAr ? "توريدات أديرة ومؤسسات كنسية" : "Monastery Bulk Supplies",
    successHeading: isAr ? "تم إرسال طلبكم بنجاح" : "Request Submitted Successfully",
    formVestmentTitle: isAr ? "نموذج أخذ قياسات تفصيل ملابس الخدمة" : "Vestment Sizing & Tailoring Measurement Form",
    formCarvingTitle: isAr ? "طلب حفر وتجهيز أعمال خشبية كنسية" : "Church Custom Wood Carving Request",
    formBulkTitle: isAr ? "طلبات توريد الكنائس والأديرة بكميات كبيرة" : "Church & Monastery Bulk Supplies Request",
    fullName: isAr ? "الاسم بالكامل:" : "Full Name:",
    fullNamePlaceholder: isAr ? "الاسم الثلاثي..." : "Full three-segment name...",
    phone: isAr ? "رقم الهاتف المحمول (واتساب):" : "Mobile Phone Number (WhatsApp):",
    phonePlaceholder: isAr ? "رقم للتواصل وتأكيد المقاسات..." : "Contact number for size verification...",
    email: isAr ? "البريد الإلكتروني للعميل:" : "Client Email Address:",
    emailPlaceholder: isAr ? "البريد الإلكتروني..." : "Email address...",
    vestmentType: isAr ? "نوع الملبس الكنسي:" : "Liturgical Vestment Type:",
    fabricType: isAr ? "خامة القماش المفضلة:" : "Preferred Fabric Type:",
    embroideryType: isAr ? "نوع خيوط التطريز:" : "Embroidery Thread Type:",
    heightLabel: isAr ? "الطول الإجمالي (سم):" : "Total Height (cm):",
    chestLabel: isAr ? "عرض الصدر (سم):" : "Chest Width (cm):",
    sleeveLabel: isAr ? "طول الكم من الكتف (سم):" : "Sleeve Length from Shoulder (cm):",
    heightPlaceholder: isAr ? "مثال: ١٤٥ سم" : "e.g. 145 cm",
    chestPlaceholder: isAr ? "مثال: ٦٢ سم" : "e.g. 62 cm",
    sleevePlaceholder: isAr ? "مثال: ٦٠ سم" : "e.g. 60 cm",
    vestmentNotes: isAr ? "تفاصيل إضافية أو مقاس الياقة ورسم الصلبان:" : "Additional specifications, collar size, and cross graphics:",
    vestmentNotesPlaceholder: isAr 
      ? "اكتب أي ملاحظات أو أسماء قديسين ترغب في تطريزهم على البطرشيل..."
      : "Write notes, collar sizes, or names of saints to embroider on stoles...",
    submitVestment: isAr ? "إرسال طلب تفصيل ملابس الخدمة" : "Submit Sizing Tailoring Request",
    submitVestmentLoading: isAr ? "جاري تسجيل طلبك..." : "Registering request details...",
    carvingType: isAr ? "نوع الأثاث / العمل الخشبي:" : "Liturgical Furniture / Wood Item:",
    woodType: isAr ? "نوع الخشب المفضل:" : "Preferred Wood Type:",
    dimensionsLabel: isAr ? "الأبعاد المطلوبة (ارتفاع × عرض × عمق):" : "Requested Dimensions (Height x Width x Depth):",
    dimensionsPlaceholder: isAr ? "مثال: ١١٠ × ٤٠ × ٤٠ سم" : "e.g. 110 x 40 x 40 cm",
    carvingNotes: isAr ? "وصف النقوش والرموز المطلوبة (مثل حمامة الروح القدس، عناقيد العنب):" : "Description of requested icons & motifs (e.g., Holy Spirit dove, grapes):",
    carvingNotesPlaceholder: isAr 
      ? "اكتب هنا قائمة التوريدات والكميات المطلوبة بالتقريب..."
      : "Specify carving details, borders, Coptic crosses, etc...",
    submitCarving: isAr ? "إرسال طلب صياغة وتجهيز الأخشاب" : "Submit Custom Woodwork Request",
    submitCarvingLoading: isAr ? "جاري إرسال طلب الحفر..." : "Submitting wood carving details...",
    bulkCoordinator: isAr ? "اسم المنسق / الكاهن المسؤول:" : "Coordinator / Priest Name:",
    bulkCoordinatorPlaceholder: isAr ? "اسم الشخص المسؤول عن التوريد..." : "Name of official handling bulk procurement...",
    monasteryName: isAr ? "اسم الكنيسة أو الدير بالكامل والمحافظة:" : "Full Church / Monastery Name & Location:",
    monasteryNamePlaceholder: isAr ? "مثال: دير السريان العامر - وادي النطرون..." : "e.g., Syrian Monastery - Wadi El Natrun...",
    bulkDetails: isAr 
      ? "تفاصيل الطلبات المطلوبة بالكامل (مثال: بخور ديري، شمع، دروع تذكارية، صلبان معمودية، أغطية مذبح):" 
      : "Specify all items required (e.g. monastic incense, candles, plaques, baptism crosses, altar covers):",
    bulkDetailsPlaceholder: isAr 
      ? "اكتب هنا قائمة التوريدات والكميات المطلوبة بالتقريب..."
      : "Enter quantities, specific packaging, and deadline dates...",
    submitBulk: isAr ? "إرسال طلب تسعير الجملة والتوريدات" : "Submit Bulk Supplies Inquiry",
    submitBulkLoading: isAr ? "جاري تسجيل توريدات الدير..." : "Logging bulk supplies inquiry...",
    portfolioHeading: isAr ? "كتالوج المشروعات المخصصة التي قمنا بتنفيذها" : "Catalog of Bespoke Completed Projects",
    portfolioSub: isAr 
      ? "عرض حي لبعض الهياكل الخشبية والملابس التي تم تسليمها مؤخراً للكنائس القبطية" 
      : "Live display of wooden structures, altars, and vestments recently delivered to Coptic churches."
  };

  const pastWorksList = isAr ? [
    {
      title: "حوامل الإنجيل (المنجليات) للمذبح",
      desc: "تجهيز 4 منجليات من خشب الأرو الأمريكي المحفور يدوياً بالكامل بشعار الصليب القبطي لصالح كنيسة العذراء بالزيتون.",
      img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "أردية وملابس الآباء المطارنة والكهنة",
      desc: "صياغة وتفصيل بدلة كهنوتية كاملة بالحرير الطبيعي والتطريز البارز لصالح كنيسة الملاك سوريال ومارمينا العمرانية بمناسبة سيامة كاهن جديد.",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "صياغة أواني المذبح المذهبة",
      desc: "تصنيع وصياغة طقم أواني قداس إلهي مذهب بالكامل عيار 24 ومقاوم للتفاعل لخدمة المذبح بأحد أديرة وادي النطرون العامرة.",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
    }
  ] : [
    {
      title: "Altar Lecterns (Mangaleya)",
      desc: "Delivered 4 oak Bible lecterns fully hand-carved with Coptic cross designs for St. Mary Church in Zaytoun.",
      img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Clergy & Bishop Phelonion Vestments",
      desc: "Tailored full vestments with natural brocade silk and detailed embroidery for Archangel Suriel & St. Mina Church.",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Gilded Altar Liturgical Vessels",
      desc: "Crafted a 24K gold-plated rust-resistant chalice, paten, and spoon set for the divine liturgy in Wadi El Natrun monastery.",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Editorial Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Sparkles className="w-10 h-10 text-gold-500 mx-auto animate-pulse" />
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-burgundy-800">
          {dict.title}
        </h1>
        <p className="text-sm text-navy-900/60 leading-relaxed font-medium">
          {dict.subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gold-500/10 pb-1">
        <div className="flex flex-wrap gap-2 bg-ivory-200 p-1.5 rounded-xl border border-gold-500/10 justify-center">
          <button
            onClick={() => { setActiveTab("vestment"); setSuccessMsg(""); }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "vestment"
                ? "bg-burgundy-800 text-gold-300 border border-gold-500/10 shadow-md"
                : "text-navy-800 hover:bg-gold-500/10"
            }`}
          >
            <Scissors className="w-4 h-4 text-gold-500" />
            <span>{dict.tabVestment}</span>
          </button>
          
          <button
            onClick={() => { setActiveTab("carving"); setSuccessMsg(""); }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "carving"
                ? "bg-burgundy-800 text-gold-300 border border-gold-500/10 shadow-md"
                : "text-navy-800 hover:bg-gold-500/10"
            }`}
          >
            <Hammer className="w-4 h-4 text-gold-500" />
            <span>{dict.tabCarving}</span>
          </button>

          <button
            onClick={() => { setActiveTab("monastery"); setSuccessMsg(""); }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "monastery"
                ? "bg-burgundy-800 text-gold-300 border border-gold-500/10 shadow-md"
                : "text-navy-800 hover:bg-gold-500/10"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>{dict.tabBulk}</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="max-w-xl mx-auto bg-gold-500/15 border-2 border-gold-500/25 p-6 rounded-2xl text-center space-y-3 animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-gold-600 mx-auto" />
          <h4 className="font-serif text-lg font-bold text-burgundy-800">{dict.successHeading}</h4>
          <p className="text-xs text-navy-900/80 leading-relaxed font-semibold">{successMsg}</p>
        </div>
      )}

      {/* Forms Switcher */}
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-2xl border border-gold-500/10 shadow-md">
        
        {/* TAB 1: VESTMENT FORM */}
        {activeTab === "vestment" && !successMsg && (
          <form onSubmit={handleVestmentSubmit} className={`space-y-6 ${isAr ? "text-right" : "text-left"}`}>
            <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-2 mb-4">
              {dict.formVestmentTitle}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-navy-950">
              <div className="space-y-1">
                <label className="font-bold">{dict.fullName}</label>
                <input
                  type="text"
                  value={vestmentName}
                  onChange={(e) => setVestmentName(e.target.value)}
                  placeholder={dict.fullNamePlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.phone}</label>
                <input
                  type="tel"
                  value={vestmentPhone}
                  onChange={(e) => setVestmentPhone(e.target.value)}
                  placeholder={dict.phonePlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.email}</label>
                <input
                  type="email"
                  value={vestmentEmail}
                  onChange={(e) => setVestmentEmail(e.target.value)}
                  placeholder={dict.emailPlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.vestmentType}</label>
                <select
                  value={vestmentType}
                  onChange={(e) => setVestmentType(e.target.value)}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 font-bold focus:outline-none focus:border-gold-500 ${isAr ? "text-right" : "text-left"}`}
                >
                  <option value="بدلة كهنوتية بيضاء مذهبة">{isAr ? "بدلة كهنوتية بيضاء مذهبة (كاملة)" : "Full White Gilded Priest Vestment"}</option>
                  <option value="بدلة كهنوتية حمراء ملكية">{isAr ? "بدلة كهنوتية حمراء ملكية (برنص وبطرشيل)" : "Royal Red Priest Vestment (Phelonion & Stole)"}</option>
                  <option value="طونية شماس مطرزة سيرما">{isAr ? "طونية شماس مطرزة بالكامل" : "Fully Embroidered Deacon Sticharia (Tonia)"}</option>
                  <option value="بطرشيل كاهن خاص">{isAr ? "بطرشيل كاهن خاص (شغل يدوي)" : "Hand-worked Priest Stole (Batrashil)"}</option>
                  <option value="أكمام ومنطقة كهنوتية">{isAr ? "أكمام ومنطقة كهنوتية" : "Priest Liturgical Cuffs & Zone"}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.fabricType}</label>
                <select
                  value={fabricType}
                  onChange={(e) => setFabricType(e.target.value)}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                >
                  <option value="حرير بروكار سوري فاخر">{isAr ? "حرير بروكار سوري فاخر ذو نقوش قبطية" : "Premium Coptic-patterned Syrian Brocade Silk"}</option>
                  <option value="كريب ياباني مستورد">{isAr ? "كريب ياباني مستورد (مقاوم للتجعد)" : "Imported Japanese Crepe (Wrinkle-resistant)"}</option>
                  <option value="قطيفة إيطالي ملكي">{isAr ? "قطيفة إيطالي ملكي (للبرانس والبطراشيل)" : "Royal Italian Velvet (For winter vestments)"}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.embroideryType}</label>
                <select
                  value={embroideryType}
                  onChange={(e) => setEmbroideryType(e.target.value)}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                >
                  <option value="خيوط سيرما ذهبية بالكامل">{isAr ? "خيوط سيرما ذهبية فرنسية لامعة" : "法国 Shiny French Gold Thread"}</option>
                  <option value="خيوط سيرما فضية ناصعة">{isAr ? "خيوط سيرما فضية ناصعة" : "Bright Silver Metallic Thread"}</option>
                  <option value="تطريز ملون بالخيوط والخرز">{isAr ? "تطريز ملون بالخيوط والخرز (شغل يدوي)" : "Hand-sewn colored beads & threads"}</option>
                </select>
              </div>

              {/* Sizing Details */}
              <div className="space-y-1">
                <label className="font-bold">{dict.heightLabel}</label>
                <input
                  type="number"
                  value={sizeHeight}
                  onChange={(e) => setSizeHeight(e.target.value)}
                  placeholder={dict.heightPlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.chestLabel}</label>
                <input
                  type="number"
                  value={sizeChest}
                  onChange={(e) => setSizeChest(e.target.value)}
                  placeholder={dict.chestPlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.sleeveLabel}</label>
                <input
                  type="number"
                  value={sizeSleeve}
                  onChange={(e) => setSizeSleeve(e.target.value)}
                  placeholder={dict.sleevePlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-xs text-navy-950">
              <label className="font-bold">{dict.vestmentNotes}</label>
              <textarea
                value={vestmentNotes}
                onChange={(e) => setVestmentNotes(e.target.value)}
                placeholder={dict.vestmentNotesPlaceholder}
                rows={3}
                className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none resize-none ${isAr ? "text-right" : "text-left"}`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? dict.submitVestmentLoading : dict.submitVestment}</span>
            </button>
          </form>
        )}

        {/* TAB 2: WOOD CARVING FORM */}
        {activeTab === "carving" && !successMsg && (
          <form onSubmit={handleCarvingSubmit} className={`space-y-6 ${isAr ? "text-right" : "text-left"}`}>
            <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-2 mb-4">
              {dict.formCarvingTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-navy-950">
              <div className="space-y-1">
                <label className="font-bold">{dict.fullName}</label>
                <input
                  type="text"
                  value={carvingName}
                  onChange={(e) => setCarvingName(e.target.value)}
                  placeholder={dict.fullNamePlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.phone}</label>
                <input
                  type="tel"
                  value={carvingPhone}
                  onChange={(e) => setCarvingPhone(e.target.value)}
                  placeholder={dict.phonePlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.email}</label>
                <input
                  type="email"
                  value={carvingEmail}
                  onChange={(e) => setCarvingEmail(e.target.value)}
                  placeholder={dict.emailPlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.carvingType}</label>
                <select
                  value={carvingType}
                  onChange={(e) => setCarvingType(e.target.value)}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 font-bold focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                >
                  <option value="حامل إنجيل (منجلية) للمذبح">{isAr ? "حامل إنجيل (منجلية) للمذبح" : "Gospel Lectern (Mangaleya)"}</option>
                  <option value="صليب يدوي خشبي محفور">{isAr ? "صليب يدوي خشبي محفور" : "Hand-carved wooden cross"}</option>
                  <option value="كرسي كاهن أو أسقف محفور">{isAr ? "كرسي كاهن أو أسقف محفور" : "Carved Priest or Bishop Throne chair"}</option>
                  <option value="صندوق أواني كنسية مبطن">{isAr ? "صندوق أواني كنسية مبطن" : "Padded Altar vessels storage box"}</option>
                  <option value="هيكل مذبح خشبي كامل">{isAr ? "هيكل مذبح خشبي كامل بالصياغة" : "Complete wooden sanctuary screen structure"}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.woodType}</label>
                <select
                  value={woodType}
                  onChange={(e) => setWoodType(e.target.value)}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                >
                  <option value="خشب أرو أحمر أمريكي">{isAr ? "خشب أرو أحمر أمريكي فاخر" : "Premium American Red Oak Wood"}</option>
                  <option value="خشب زان معالج">{isAr ? "خشب زان معالج ثقيل" : "Heavy treated Beech Wood"}</option>
                  <option value="خشب زيتون طبيعي">{isAr ? "خشب زيتون طبيعي مبارك" : "Blessed natural Olive Wood"}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.dimensionsLabel}</label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder={dict.dimensionsPlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-xs text-navy-950">
              <label className="font-bold">{dict.carvingNotes}</label>
              <textarea
                value={carvingNotes}
                onChange={(e) => setCarvingNotes(e.target.value)}
                placeholder={isAr ? "اكتب هنا تفاصيل الحفر والزخرفة المرغوبة على القطعة..." : "Write engraving patterns, crosses, dates to engrave..."}
                rows={4}
                className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none resize-none ${isAr ? "text-right" : "text-left"}`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? dict.submitCarvingLoading : dict.submitCarving}</span>
            </button>
          </form>
        )}

        {/* TAB 3: MONASTERY BULK FORM */}
        {activeTab === "monastery" && !successMsg && (
          <form onSubmit={handleBulkSubmit} className={`space-y-6 ${isAr ? "text-right" : "text-left"}`}>
            <h3 className="font-serif text-lg font-bold text-burgundy-800 border-b border-gold-500/15 pb-2 mb-4">
              {dict.formBulkTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-navy-950">
              <div className="space-y-1">
                <label className="font-bold">{dict.bulkCoordinator}</label>
                <input
                  type="text"
                  value={bulkName}
                  onChange={(e) => setBulkName(e.target.value)}
                  placeholder={dict.bulkCoordinatorPlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.phone}</label>
                <input
                  type="tel"
                  value={bulkPhone}
                  onChange={(e) => setBulkPhone(e.target.value)}
                  placeholder={dict.phonePlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.email}</label>
                <input
                  type="email"
                  value={bulkEmail}
                  onChange={(e) => setBulkEmail(e.target.value)}
                  placeholder={dict.emailPlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">{dict.monasteryName}</label>
                <input
                  type="text"
                  value={monasteryName}
                  onChange={(e) => setMonasteryName(e.target.value)}
                  placeholder={dict.monasteryNamePlaceholder}
                  className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none ${isAr ? "text-right" : "text-left"}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-xs text-navy-950">
              <label className="font-bold">{dict.bulkDetails}</label>
              <textarea
                value={bulkDetails}
                onChange={(e) => setBulkDetails(e.target.value)}
                placeholder={dict.bulkDetailsPlaceholder}
                rows={5}
                className={`w-full bg-ivory-200 border border-gold-500/10 rounded-lg p-2.5 focus:outline-none resize-none ${isAr ? "text-right" : "text-left"}`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-burgundy-800 hover:bg-burgundy-900 text-gold-300 font-extrabold py-3.5 rounded-xl border border-gold-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? dict.submitBulkLoading : dict.submitBulk}</span>
            </button>
          </form>
        )}

      </div>

      {/* Completed Works Portfolio Section */}
      <div className="space-y-6 pt-10 border-t border-gold-500/10">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl font-bold text-burgundy-800">
            {dict.portfolioHeading}
          </h2>
          <p className="text-xs text-navy-900/60">{dict.portfolioSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pastWorksList.map((work, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gold-500/10 shadow-sm space-y-3 p-4">
              <img src={work.img} alt={work.title} className="w-full h-48 object-cover rounded" />
              <h4 className="font-bold text-sm text-burgundy-800 text-center">{work.title}</h4>
              <p className={`text-xs text-navy-900/60 leading-relaxed text-justify ${isAr ? "text-right" : "text-left"}`}>
                {work.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
