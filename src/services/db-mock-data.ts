export interface Category {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  image_url: string;
}

export interface Product {
  id: string;
  sku: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  price: number;
  discount_price?: number;
  category_id: string;
  stock_quantity: number;
  images: string[];
  specifications: Record<string, string>;
  variants: {
    type: string; // 'size' | 'color' | 'material'
    options: string[];
  }[];
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_limited_edition: boolean;
}

export interface Branch {
  id: string;
  name_ar: string;
  name_en: string;
  address_ar: string;
  address_en: string;
  working_hours_ar: string;
  working_hours_en: string;
  phone: string;
  google_maps_url: string;
  coordinates: { lat: number; lng: number };
  image: string;
}

export interface Testimonial {
  id: string;
  name_ar: string;
  name_en: string;
  role_ar: string;
  role_en: string;
  text_ar: string;
  text_en: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
}

export const CATEGORIES: Category[] = [
  { id: "cat-1", name_ar: "الدفوف الكنسية", name_en: "Liturgical Cymbals (Daf)", slug: "church-daf", image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-2", name_ar: "التريانتو", name_en: "Trianto", slug: "trianto", image_url: "https://images.unsplash.com/photo-1484755560693-a4074577af3a?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-3", name_ar: "الصنوج", name_en: "Sanooj (Cymbals)", slug: "sanooj", image_url: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-4", name_ar: "الطونية", name_en: "Tonia (Deacon Vestments)", slug: "tonia", image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-5", name_ar: "البطراشيل", name_en: "Batrashil (Stoles)", slug: "batrashil", image_url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-6", name_ar: "الملابس الكهنوتية", name_en: "Clergy Vestments", slug: "clergy-vestments", image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-7", name_ar: "الشورية", name_en: "Shoria (Censer)", slug: "shoria", image_url: "https://images.unsplash.com/photo-1590076212558-86d7950efc47?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-8", name_ar: "الأواني الكنسية", name_en: "Liturgical Vessels", slug: "liturgical-vessels", image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-9", name_ar: "الكتب الكنسية", name_en: "Church Liturgy Books", slug: "liturgical-books", image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-10", name_ar: "الأيقونات", name_en: "Coptic Icons", slug: "coptic-icons", image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-11", name_ar: "الصلبان", name_en: "Crosses", slug: "crosses", image_url: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-12", name_ar: "مستلزمات المذبح", name_en: "Altar Supplies", slug: "altar-supplies", image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-13", name_ar: "الأعمال الخشبية المحفورة", name_en: "Engraved Woodworks", slug: "engraved-woodworks", image_url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-14", name_ar: "الهدايا والتذكارات الروحية", name_en: "Spiritual Gifts & Souvenirs", slug: "spiritual-gifts", image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-15", name_ar: "أدوات الشمامسة", name_en: "Deacon Accessories", slug: "deacon-accessories", image_url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-16", name_ar: "مستلزمات الكنائس", name_en: "Church Furnishings", slug: "church-furnishings", image_url: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-17", name_ar: "مستلزمات الأديرة", name_en: "Monastery Supplies", slug: "monastery-supplies", image_url: "https://images.unsplash.com/photo-1548625361-155de6c7f54d?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-18", name_ar: "منتجات مخصصة", name_en: "Custom Made Products", slug: "custom-made", image_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-19", name_ar: "منتجات أخرى", name_en: "Other Products", slug: "other-products", image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    sku: "TS-DAF-GLD-01",
    name_ar: "دف كنسي نحاسي مذهب فاخر",
    name_en: "Premium Golden Brass Liturgical Cymbals (Daf)",
    description_ar: "دف كنسي مصنوع يدوياً من النحاس الخالص عالي الجودة مع طلاء ذهبي مقاوم للصدأ. يتميز بنقوش قبطية كنسية دقيقة وصوت رنان وقوي متناغم مع ألحان الكنيسة القبطية الأرثوذكسية.",
    description_en: "Handcrafted liturgical cymbals (Daf) made of premium solid brass with a rust-resistant gold plating. Features intricate Coptic engravings and a resonant, clear acoustic tone tailored for Coptic Orthodox liturgical hymns.",
    price: 1850,
    discount_price: 1600,
    category_id: "cat-1",
    stock_quantity: 15,
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "نحاس خالص مذهب",
      "القطر": "٢٢ سم",
      "الوزن": "٨٠٠ جرام",
      "المنشأ": "صناعة يدوية مصرية بورش طاكسيس"
    },
    variants: [
      { type: "size", options: ["صغير (١٨ سم)", "متوسط (٢٢ سم)", "كبير (٢٦ سم)"] }
    ],
    rating: 4.8,
    review_count: 12,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-2",
    sku: "TS-TRI-ORN-01",
    name_ar: "تريانتو كنسي مزخرف بالصلبان",
    name_en: "Ornate Liturgical Trianto with Crosses",
    description_ar: "تريانتو (مثلث كنسي) مصمم خصيصاً للتسبحة والألحان الكنسية، مصنوع من الحديد المصقول والمطلي بطبقة واقية، ويأتي مع ذراع نحاسي متين وصليب معلق.",
    description_en: "Liturgical Trianto (triangle instrument) designed specifically for Coptic praises and hymns. Made of polished steel with a protective coating, comes with a sturdy brass striker and a dangling cross accent.",
    price: 450,
    category_id: "cat-2",
    stock_quantity: 30,
    images: [
      "https://images.unsplash.com/photo-1484755560693-a4074577af3a?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "حديد مصقول ومطلي بمقاوم الصدأ",
      "الطول": "٢٠ سم",
      "الملحقات": "ذراع ضرب نحاسي وحبل تعليق"
    },
    variants: [],
    rating: 4.5,
    review_count: 7,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: true,
    is_limited_edition: false
  },
  {
    id: "prod-3",
    sku: "TS-SAN-BRS-01",
    name_ar: "صنوج نحاسية يدوية متناغمة",
    name_en: "Handcrafted Brass Sanooj (Cymbals)",
    description_ar: "زوج من الصنوج النحاسية المصنوعة يدوياً لضمان نقاء الصوت وثبات النغمة. مناسبة جداً للاستخدام في كافة الصلوات والألحان الكنسية اليومية.",
    description_en: "A pair of handcrafted brass cymbals (Sanooj) tuned to perfection for Coptic liturgy. Essential for rhythm keeping in prayers and daily divine services.",
    price: 950,
    discount_price: 850,
    category_id: "cat-3",
    stock_quantity: 25,
    images: [
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "نحاس مسبوك يدوياً",
      "القطر": "١٥ سم",
      "العدد": "زوج (قطعتين)"
    },
    variants: [],
    rating: 4.9,
    review_count: 18,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-4",
    sku: "TS-TON-EMB-01",
    name_ar: "طونية شماس مطرزة بالخيوط الذهبية",
    name_en: "Embroidered Gold-Thread Deacon Tonia",
    description_ar: "طونية شماس فاخرة مصنوعة من قماش الكريب الياباني الفاخر المقاوم للتجعد، مطرزة بالكامل بخيوط ذهبية وتصاميم صلبان قبطية أصيلة. مريحة وتناسب جميع الفئات العمرية.",
    description_en: "Luxury deacon Tonia made of high-quality Japanese crepe fabric. Fully embroidered with gold thread showing Coptic cross motifs. Highly comfortable and designed to last.",
    price: 1200,
    category_id: "cat-4",
    stock_quantity: 20,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "نوع القماش": "كريب ياباني فاخر",
      "التطريز": "خيوط ذهبية وسيرما سورية ممتازة",
      "اللون": "أبيض ناصع مع تطريز ذهبي وريد"
    },
    variants: [
      { type: "size", options: ["١٢٠ سم", "١٣٠ سم", "١٤٠ سم", "١٥٠ سم", "١٦٠ سم"] }
    ],
    rating: 4.7,
    review_count: 9,
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: true,
    is_limited_edition: false
  },
  {
    id: "prod-5",
    sku: "TS-BAT-VEL-01",
    name_ar: "بطرشيل كهنوتي قطيفة ملكي أحمر",
    name_en: "Royal Red Velvet Priest Batrashil (Stole)",
    description_ar: "بطرشيل كهنوتي مصنوع من القطيفة الإيطالية الفاخرة باللون الأحمر الملكي، مطرز بالكامل بصور القديسين والصلبان بخيوط ذهبية بارزة ونقية. شغل يدوي عالي الدقة.",
    description_en: "Priest Batrashil (stole) made of rich royal red Italian velvet. Fully embroidered with holy Coptic cross designs and iconic saint portraits in detailed gold threads. Premium craftsmanship.",
    price: 3200,
    discount_price: 2800,
    category_id: "cat-5",
    stock_quantity: 5,
    images: [
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "قطيفة إيطالي مستوردة مع بطانة ستان فاخرة",
      "الخيوط": "سيرما ذهبية فرنسية",
      "الطول": "١٤٥ سم"
    },
    variants: [
      { type: "color", options: ["أحمر ملكي", "أبيض ملائكي", "أزرق كحلي"] }
    ],
    rating: 5.0,
    review_count: 4,
    is_featured: true,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: true
  },
  {
    id: "prod-6",
    sku: "TS-VES-WHT-01",
    name_ar: "ملابس كهنوتية بيضاء مذهبة متكاملة",
    name_en: "Gold-Embroidered Complete White Clergy Vestment",
    description_ar: "بدلة كهنوتية كاملة تشمل التاج والطونية والبرنص والبطرشيل والأكمام والمنطقة، مصنوعة من قماش البروكار الحريري الفاخر ذو النقوش البارزة ومطرزة بالكامل بخيوط السيرما الذهبية.",
    description_en: "Full clergy vestment set including the crown, tonia, phelonion (burnus), stole (batrashil), cuffs, and belt. Crafted from premium patterned silk brocade fabric and embroidered with fine gold thread.",
    price: 12500,
    discount_price: 11000,
    category_id: "cat-6",
    stock_quantity: 3,
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "المكونات": "طاقية/تاج + برنص + بطرشيل + أكمام + منطقة + طونية بيضاء",
      "القماش": "حرير بروكار سوري فاخر",
      "الوزن الكلي": "٣.٥ كجم"
    },
    variants: [
      { type: "size", options: ["S (كاهن قصير)", "M (كاهن متوسط)", "L (كاهن طويل)"] }
    ],
    rating: 5.0,
    review_count: 3,
    is_featured: true,
    is_best_seller: false,
    is_new_arrival: true,
    is_limited_edition: true
  },
  {
    id: "prod-7",
    sku: "TS-SHO-BRS-01",
    name_ar: "شورية نحاسية منقوشة يدوياً بالصلبان",
    name_en: "Hand-Engraved Brass Censer (Shoria)",
    description_ar: "شورية (مجمرة) كنسية مصنوعة من النحاس الأصفر الثقيل المنقوش يدوياً بالصلبان والزخارف النباتية القبطية. مجهزة بسلاسل قوية متينة وأجراس ذات صوت عذب ونقي ترن أثناء التبخير.",
    description_en: "Liturgical censer (Shoria) made of heavy yellow brass, hand-engraved with crosses and Coptic floral borders. Equipped with strong, high-durability chains and sweet-ringing bells that chime gently during censing.",
    price: 2400,
    category_id: "cat-7",
    stock_quantity: 8,
    images: [
      "https://images.unsplash.com/photo-1590076212558-86d7950efc47?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "نحاس أصفر مصمت",
      "الارتفاع": "٣٢ سم",
      "عدد السلاسل": "٣ سلاسل رئيسية + سلسلة متوسطة للغطاء + ١٢ جرس تعبيراً عن الرسل الاثني عشر"
    },
    variants: [],
    rating: 4.9,
    review_count: 15,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-8",
    sku: "TS-VES-GLD-01",
    name_ar: "طقم أواني كنسية مذهبة للمذبح",
    name_en: "Gold-Plated Altar Vessels Set",
    description_ar: "طقم متكامل لخدمة القداس الإلهي مطلي بالذهب عيار ٢٤ المقاوم للتفاعل مع عصير الكرم، يشتمل على الكأس والصينية والنجم والملعقة (المستير) والقبة. مصنوع طبقاً للمقاييس الكنسية الأرثوذكسية الدقيقة.",
    description_en: "A comprehensive communion vessels set plated in 24k chemical-resistant gold. Includes the Chalice, Paten (Diskos), Asterisk (Star), and Communion Spoon (Mystir). Manufactured strictly following liturgical guidelines.",
    price: 8900,
    category_id: "cat-8",
    stock_quantity: 4,
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "فضة أو نحاس مطلي بذهب عيار ٢٤",
      "المكونات": "كأس، صينية، نجم، ملعقة، قبة حماية",
      "مقاومة التفاعل": "عالية ومطابقة للمواصفات الغذائية والطقسية"
    },
    variants: [],
    rating: 4.8,
    review_count: 5,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: true
  },
  {
    id: "prod-9",
    sku: "TS-BOK-KHG-01",
    name_ar: "كتاب الخولاجي المقدس جلد طبيعي منقوش",
    name_en: "Engraved Genuine Leather Coptic Khollagy Book",
    description_ar: "كتاب الخولاجي المقدس (كتاب الصلوات والقداسات الثلاثة الباسيلى والغريغورى والكيرلسى) مغلف بجلد طبيعي فاخر ذو لون بني محروق ومنقوش عليه صليب بارز بالذهب.",
    description_en: "The Holy Khollagy Book (containing the three liturgies: St. Basil, St. Gregory, and St. Cyril) bound in premium genuine dark brown leather with a gold-leaf embossed Coptic cross.",
    price: 380,
    category_id: "cat-9",
    stock_quantity: 50,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الغلاف": "جلد طبيعي بقري ١٠٠٪ يدوي التجليد",
      "الورق": "أبيض فاخر كريمي مريح للعين أثناء القراءة",
      "اللغة": "عربي وقبطي متوازي"
    },
    variants: [
      { type: "size", options: ["جيب (صغير)", "متوسط", "كبير (مذبح)"] }
    ],
    rating: 4.9,
    review_count: 22,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-10",
    sku: "TS-ICO-MAR-01",
    name_ar: "أيقونة قبطية أثرية للعذراء مريم رسم يدوي",
    name_en: "Hand-painted Antique Coptic Icon of St. Mary",
    description_ar: "أيقونة قبطية كلاسيكية للسيدة العذراء تحمل السيد المسيح، مرسومة يدوياً بألوان البيجمنت الطبيعية وصفار البيض (التمبرا) على خشب معالج ومغطاة بورق ذهب عيار ٢٢. تحفة فنية روحية.",
    description_en: "A classical Coptic icon of Saint Mary holding Child Jesus. Hand-painted using natural pigment and egg tempera on treated wood, detailed with 22k gold leaf. A spiritual masterpiece.",
    price: 3500,
    discount_price: 3200,
    category_id: "cat-10",
    stock_quantity: 2,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الرسام": "أحد فناني الأديرة القبطية المعتمدين",
      "الخامة": "خشب زان معالج + ألوان تمبرا + ورق ذهب عيار ٢٢",
      "الأبعاد": "٣٠ × ٤٠ سم"
    },
    variants: [],
    rating: 5.0,
    review_count: 8,
    is_featured: true,
    is_best_seller: false,
    is_new_arrival: true,
    is_limited_edition: true
  },
  {
    id: "prod-11",
    sku: "TS-CRS-WOD-01",
    name_ar: "صليب يدوي خشبي محفور بدقة",
    name_en: "Finely Carved Wooden Hand Cross",
    description_ar: "صليب يد للآباء الكهنة محفور يدوياً من خشب الزيتون الطبيعي، يشتمل على نقوش معقدة للصلبان القبطية المتشابكة مع ملمس ناعم وحجم مريح للقبضة.",
    description_en: "A priest's hand cross finely hand-carved from natural olive wood. Features intricate interlocking Coptic cross designs with a smooth finish and a comfortable grip size.",
    price: 350,
    category_id: "cat-11",
    stock_quantity: 45,
    images: [
      "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخشب": "خشب زيتون طبيعي مبارك",
      "الطول": "١٨ سم",
      "الصناعة": "محفور يدوياً بالأراضي المقدسة"
    },
    variants: [],
    rating: 4.6,
    review_count: 14,
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-12",
    sku: "TS-ALT-COV-01",
    name_ar: "أغطية مذبح حرير مطرزة بالذهبي (٣ قطع)",
    name_en: "Silk Embroidered Altar Covers Set (3 pcs)",
    description_ar: "طقم أغطية المذبح المقدس (الأبروسفارين واللفائف) مصنوع من الحرير الطبيعي ذو اللون الأبيض والذهبي، ومطرز بالخيوط اللامعة بعبارات التقديس ورسومات الصليب القبطي الأرثوذكسي.",
    description_en: "Holy altar covers set (including the Prospharin and veils) made of fine white and gold silk, embroidered with holy texts and Coptic Orthodox cross patterns. Elegant and liturgical.",
    price: 1950,
    category_id: "cat-12",
    stock_quantity: 12,
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "ستان حريري ثقيل",
      "العدد": "٣ قطع (أبروسفارين + لفيفتين)",
      "التطريز": "خيوط ذهبية وفضية ناصعة"
    },
    variants: [],
    rating: 4.8,
    review_count: 9,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-13",
    sku: "TS-WOD-LEC-01",
    name_ar: "حامل إنجيل خشبي منقوش بالصلبان والأركان",
    name_en: "Hand-Carved Wooden Altar Lectern",
    description_ar: "منجلية صغيرة (حامل إنجيل) للمذبح مصنوعة من خشب الأرو الفاخر، محفور عليها يدوياً الصليب القبطي وزخارف كنسية من كافة الجوانب، قابلة لتعديل زاوية القراءة.",
    description_en: "Small altar lectern/analogion hand-crafted from luxury oak wood. Featuring hand-carved Coptic crosses and traditional ornaments on all sides, with adjustable angles for easy reading.",
    price: 2600,
    discount_price: 2400,
    category_id: "cat-13",
    stock_quantity: 6,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "نوع الخشب": "خشب أرو أحمر أمريكي",
      "الارتفاع": "٣٥ سم (مطوي)",
      "العرض": "٣٠ سم"
    },
    variants: [],
    rating: 4.9,
    review_count: 11,
    is_featured: true,
    is_best_seller: false,
    is_new_arrival: true,
    is_limited_edition: false
  },
  {
    id: "prod-14",
    sku: "TS-GIF-CRS-01",
    name_ar: "ميدالية صليب فضة قبطي تذكاري",
    name_en: "Coptic Silver Cross Commemorative Medallion",
    description_ar: "ميدالية وقلادة صليب قبطي كلاسيكي مصنوعة من الفضة الخالصة عيار ٩٢٥ مع علبة قطيفة فاخرة. هدية تذكارية رائعة للمناسبات الكنسية كالمعمودية والزيجة المترفة.",
    description_en: "A Coptic silver cross pendant made of genuine 925 sterling silver, comes in a luxury velvet gift box. An elegant spiritual gift for baptisms, weddings, and special events.",
    price: 580,
    category_id: "cat-14",
    stock_quantity: 40,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "فضة استرليني عيار ٩٢٥",
      "الوزن": "١٢ جرام",
      "الملحقات": "سلسلة فضية + علبة قطيفة حمراء بفرش أبيض"
    },
    variants: [],
    rating: 4.7,
    review_count: 20,
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-15",
    sku: "TS-DEA-BOK-01",
    name_ar: "كتاب خدمة الشماس المقدس والألحان",
    name_en: "The Deacon's Service Liturgical Handbook",
    description_ar: "كتاب شامل يجمع كافة مردودات الشماس للقداسات والصلوات الطقسية وعشية وباكر باللغتين القبطية والعربية مع شرح مبسط للطقوس والحركات بالمذبح.",
    description_en: "A comprehensive handbook compiling all deacon responses for liturgies, vespers, and morning prayers in both parallel Coptic and Arabic, alongside brief explanations of altar rituals.",
    price: 120,
    category_id: "cat-15",
    stock_quantity: 100,
    images: [
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "التجليد": "جلد كرتوني قوي مقوى",
      "عدد الصفحات": "٣٤٠ صفحة",
      "الناشر": "مكتبة طاكسيس القبطية"
    },
    variants: [],
    rating: 4.8,
    review_count: 35,
    is_featured: false,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-16",
    sku: "TS-CHU-CAN-01",
    name_ar: "شمع دان كنسي نحاسي كبير للمذبح",
    name_en: "Large Liturgical Brass Altar Candelabra",
    description_ar: "شمع دان كنسي من النحاس المسبوك الثقيل واللامع، مزود بـ ٣ شمعات تعلوها صلبان قبطية منقوشة بدقة. مخصص ليوضع على جانبي المذبح أو أمام الهيكل.",
    description_en: "A heavy cast-brass church candelabra holding 3 candles, topped with finely engraved Coptic crosses. Designed for placement flanking the altar or in front of the sanctuary.",
    price: 4800,
    category_id: "cat-16",
    stock_quantity: 4,
    images: [
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "نحاس أصفر ثقيل مصقول",
      "الارتفاع": "٨٥ سم",
      "عدد الشموع": "٣ شمعات (قاعدة مخصصة)"
    },
    variants: [],
    rating: 5.0,
    review_count: 2,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: true
  },
  {
    id: "prod-17",
    sku: "TS-MON-INC-01",
    name_ar: "بخور ديري طبيعي فاخر برائحة الياسمين",
    name_en: "Premium Natural Monastery Jasmine Incense",
    description_ar: "بخور طبيعي فاخر يتم تحضيره وتعبئته يدوياً بأيدي آباء الرهبان بالأديرة المصرية. يتميز برائحة ذكية تدوم طويلاً ودخان خفيف مريح للتنفس داخل الكنيسة.",
    description_en: "Premium natural incense hand-prepared and packaged by monks in historic Egyptian monasteries. Features a long-lasting jasmine aroma and a gentle, respiratory-friendly smoke.",
    price: 150,
    category_id: "cat-17",
    stock_quantity: 120,
    images: [
      "https://images.unsplash.com/photo-1548625361-155de6c7f54d?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "نوع الرائحة": "ياسمين ملكي (متوفر صندل وبخور بري)",
      "الوزن": "٢٥٠ جرام (ربع كيلو)",
      "المنشأ": "دير السريان العامر"
    },
    variants: [
      { type: "color", options: ["ياسمين", "بخور بري", "صندل فاخر"] }
    ],
    rating: 4.9,
    review_count: 42,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-18",
    sku: "TS-CUS-PEC-01",
    name_ar: "صليب صدر مخصص للآباء الكهنة فضة مذهبة",
    name_en: "Custom Pectoral Cross for Priests (Silver-Gold)",
    description_ar: "صليب صدر كهنوتي يصنع بالطلب الخاص، مصنوع من الفضة ومطلي بطبقة سميكة من الذهب، ويطعم بالأحجار الكريمة الحمراء أو الخضراء حسب الرغبة. يشتمل على سلسلة فضية طويلة.",
    description_en: "A priest's pectoral cross custom-crafted to order. Made of sterling silver and plated in a thick layer of gold, set with red or green gemstone cabochons as requested. Comes with a matching silver chain.",
    price: 7500,
    category_id: "cat-18",
    stock_quantity: 10,
    images: [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الخامة": "فضة ٩٢٥ مطلية ذهب عيار ٢١",
      "الأحجار": "زركون أحمر ياقوتي عالي الجودة",
      "مدة التصنيع": "٧ إلى ١٠ أيام عمل"
    },
    variants: [],
    rating: 5.0,
    review_count: 6,
    is_featured: true,
    is_best_seller: false,
    is_new_arrival: true,
    is_limited_edition: true
  },
  {
    id: "prod-19",
    sku: "TS-OTH-OIL-01",
    name_ar: "زيت زيتون نقي معصور على البارد للمذبح",
    name_en: "Cold-Pressed Pure Olive Oil for Altar Lamps",
    description_ar: "زيت زيتون بكر نقي ١٠٠٪ معصور على البارد ومنقى خصيصاً لإيقاد قناديل المذبح وهياكل القديسين. يتميز بالثبات وعدم انبعاث روائح أو دخان كثيف.",
    description_en: "100% pure extra virgin cold-pressed olive oil, filtered specifically for burning in altar sanctuary lamps. Provides a clean, steady burn without heavy smoke or chemical fumes.",
    price: 180,
    category_id: "cat-19",
    stock_quantity: 60,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    ],
    specifications: {
      "الحجم": "١ لتر",
      "التعبئة": "عبوة بلاستيكية معتمة لحفظ الجودة",
      "المنشأ": "مزارع أديرة وادي النطرون"
    },
    variants: [],
    rating: 4.8,
    review_count: 28,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  }
];

export const BRANCHES: Branch[] = [
  {
    id: "branch-omraniya",
    name_ar: "فرع العمرانية",
    name_en: "Omraniya Branch",
    address_ar: "الهرم - العمرانية - بجوار كنيسة الملاك سوريال ومارمينا العمرانية - خلف سنترال العمرانية",
    address_en: "Haram - Omraniya - Adjacent to Archangel Suriel & St. Mina Church - Behind Omraniya Central Exchange",
    working_hours_ar: "يومياً من 8 صباحاً حتى 10 مساءً",
    working_hours_en: "Daily from 8 AM to 10 PM",
    phone: "0235469946",
    google_maps_url: "https://maps.app.goo.gl/awRQwkFZ7hssuEky7",
    coordinates: { lat: 29.9984, lng: 31.2023 },
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "branch-zaytoun",
    name_ar: "فرع الزيتون",
    name_en: "Zaytoun Branch",
    address_ar: "26أ شارع سنان أمام كازينو سنان - خلف كنيسة العذراء بالزيتون - أول الأصبغ من سنان",
    address_en: "26A Sinan St. in front of Sinan Casino - Behind St. Mary Church in Zaytoun - Start of Al-Asbagh from Sinan St.",
    working_hours_ar: "يومياً من 10 صباحاً حتى 10 مساءً (الأحد إجازة)",
    working_hours_en: "Daily from 10 AM to 10 PM (Closed on Sunday)",
    phone: "0226394044",
    google_maps_url: "https://maps.app.goo.gl/Ue7yZRSDnKj8yAE89",
    coordinates: { lat: 30.1032, lng: 31.3094 },
    image: "https://images.unsplash.com/photo-1548625361-155de6c7f54d?auto=format&fit=crop&w=500&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name_ar: "القمص بطرس أنور",
    name_en: "Fr. Boutros Anwar",
    role_ar: "كاهن كنيسة بالمنيا",
    role_en: "Priest in Minya",
    text_ar: "تعاملت مع طاكسيس لتفصيل ملابس الخدمة والبرنص الكهنوتي، وخامة الحرير سوري والتطريز بالخيوط الذهبية يفوق الوصف. دقة متناهية والتزام كامل بالمواعيد والطقس الكنسي السليم.",
    text_en: "I commissioned Taxsis to tailor my liturgical vestments and priest phelonion (burnus). The Syrian silk and detailed golden embroidery are beyond description. Complete accuracy, timely delivery, and correct liturgical styling.",
    rating: 5
  },
  {
    id: "t-2",
    name_ar: "الشماس يوحنا كمال",
    name_en: "Deacon John Kamal",
    role_ar: "مرتل بكنيسة العذراء",
    role_en: "Cantor at St. Mary Church",
    text_ar: "الدفوف النحاسية من طاكسيس صوتها نقي ورنان جداً في الألحان والتسبحة. أشتري منهم أدوات الخدمة منذ سنوات وهي دائماً الخيار الأول لنا.",
    text_en: "The brass cymbals from Taxsis produce an incredibly pure and resonant acoustic tone for liturgy and praises. I have been buying our service instruments from them for years, and they are always our first choice.",
    rating: 5
  },
  {
    id: "t-3",
    name_ar: "م. مايكل نجيب",
    name_en: "Eng. Michael Naguib",
    role_ar: "أمين خدمة الكشافة بمصر الجديدة",
    role_en: "Scouts Service Leader in Heliopolis",
    text_ar: "قمنا بطلب دروع خشبية محفورة وهدايا تذكارية للشباب في الكنيسة، وتجاوبهم مع التعديلات كان ممتازاً والأسعار مناسبة جداً للكميات الكبيرة.",
    text_en: "We ordered engraved wooden plaques and spiritual souvenirs for the youth scouts. Their response to design revisions was excellent, and the pricing is very reasonable for bulk orders.",
    rating: 4.8
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    question_ar: "هل يمكنني طلب مقاسات وتطريزات خاصة بالملابس الكهنوتية؟",
    question_en: "Can I request custom sizes and embroideries for clergy vestments?",
    answer_ar: "نعم بكل تأكيد، نوفر قسماً خاصاً للمنتجات المخصصة وتفصيل الملابس الكهنوتية وطونيات الشمامسة بكافة المقاسات والتطريزات بالطلب المسبق عبر الموقع أو الواتساب.",
    answer_en: "Yes, definitely. We offer custom tailoring for clergy vestments and deacon tonias in all sizes and custom embroideries by request via the website or WhatsApp."
  },
  {
    id: "faq-2",
    question_ar: "ما هي فترات عمل معارض طاكسيس وطرق التواصل؟",
    question_en: "What are Taxsis showrooms working hours and contact methods?",
    answer_ar: "فرع العمرانية يعمل يومياً من 8 صباحاً حتى 10 مساءً. فرع الزيتون يعمل يومياً من 10 صباحاً حتى 10 مساءً ما عدا يوم الأحد. يمكنكم التواصل هاتفياً أو عبر الواتساب على رقم 01220201204.",
    answer_en: "Omraniya branch is open daily from 8 AM to 10 PM. Zaytoun branch is open daily from 10 AM to 10 PM, except Sunday (weekly off). You can call or text on WhatsApp at 01220201204."
  },
  {
    id: "faq-3",
    question_ar: "هل تقومون بالشحن لجميع المحافظات وخارج مصر؟",
    question_en: "Do you ship to all governorates and outside Egypt?",
    answer_ar: "نعم، نقوم بالشحن والتوصيل لجميع المحافظات المصرية بأسعار شحن تنافسية، كما نوفر شحناً دولياً لجميع الدول العربية ودول المهجر لخدمة الكنائس القبطية في الخارج.",
    answer_en: "Yes, we ship to all Egyptian governorates with competitive rates, and we also provide international shipping to serve Coptic churches worldwide."
  },
  {
    id: "faq-4",
    question_ar: "هل توفرون خدمة حفر أثرية ورسم أيقونات مخصصة؟",
    question_en: "Do you offer custom antique wood carvings and custom painted icons?",
    answer_ar: "نعم، نتعامل مع أفضل فناني كتابة الأيقونات القبطية وورش الحفر على الأخشاب المعتمدة لدى الكنيسة. يمكنك ملء نموذج 'طلب منتج مخصص' وتحديد التفاصيل والمقاسات.",
    answer_en: "Yes, we collaborate with certified Coptic iconographers and church-approved wood-carving workshops. You can fill out the 'Custom Request' form with your design and size specs."
  }
];
