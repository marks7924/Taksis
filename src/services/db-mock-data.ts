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
  { id: "cat-1", name_ar: "آلات الكنيسة", name_en: "Church Instruments", slug: "church-instruments", image_url: "/images/دف نحاس.jpg" },
  { id: "cat-2", name_ar: "التونية", name_en: "Deacon Tonia", slug: "deacon-tonia", image_url: "/images/تونيه.jpg" },
  { id: "cat-3", name_ar: "البطراشيل", name_en: "Batrashil (Stoles)", slug: "batrashil", image_url: "/images/بطراشيل.jpg" },
  { id: "cat-4", name_ar: "ملابس الكهنوت", name_en: "Clergy Vestments", slug: "clergy-vestments", image_url: "" },
  { id: "cat-5", name_ar: "الشورية", name_en: "Shoria (Censer)", slug: "shoria", image_url: "/images/شوريه.jpg" },
  { id: "cat-6", name_ar: "أواني المذبح", name_en: "Liturgical Vessels", slug: "liturgical-vessels", image_url: "/images/اواني مذبح.jpg" },
  { id: "cat-7", name_ar: "كتب الكنيسة", name_en: "Church Liturgy Books", slug: "liturgical-books", image_url: "" },
  { id: "cat-8", name_ar: "الصلبان", name_en: "Crosses", slug: "crosses", image_url: "/images/صليب عاج (1).jpg" },
  { id: "cat-9", name_ar: "مستلزمات المذبح", name_en: "Altar Supplies", slug: "altar-supplies", image_url: "/images/فرش مذبج.jpg" },
  { id: "cat-10", name_ar: "الأعمال الخشبية والحفر", name_en: "Engraved Woodworks & Carving", slug: "engraved-woodworks", image_url: "/images/حفر كوستر خشب.jpg" },
  { id: "cat-11", name_ar: "منتجات أخرى", name_en: "Others", slug: "others", image_url: "" }
];

export const PRODUCTS: Product[] = [
  // 1- الات الكنيسه
  {
    id: "prod-daf-brass",
    sku: "TS-DAF-BRS",
    name_ar: "الدف النحاس",
    name_en: "Brass Daf (Liturgical Cymbals)",
    description_ar: "دف كنسي مصنوع من النحاس الخالص عالي الجودة متوفر بمقاسات وأوزان مختلفة.",
    description_en: "Liturgical Daf made of pure brass, available in various sizes and weights.",
    price: 100,
    category_id: "cat-1",
    stock_quantity: 50,
    images: ["/images/دف نحاس.jpg"],
    specifications: {
      "الخامة": "نحاس خالص",
      "المنشأ": "صناعة مصرية"
    },
    variants: [
      {
        type: "المقاس والوزن",
        options: [
          "مقاس ١٦ سنتيمتر (100 جنيه)",
          "مقاس ١٨ سنتيمتر تقيل ٤٠٠ جرام (200 جنيه)",
          "مقاس ١٨ سنتيمتر تقيل جدا ٥٠٠ جرام (300 جنيه)",
          "مقاس ٢٠ سنتيمتر تقيل ٤٠٠ جرام (400 جنيه)",
          "مقاس ٢٠ سنتيمتر تقيل ٥٠٠ جرام (500 جنيه)",
          "مقاس ٢٠ سنتيمتر ٦٥٠ جرام (600 جنيه)"
        ]
      }
    ],
    rating: 5.0,
    review_count: 0,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    is_limited_edition: false
  },
  {
    id: "prod-daf-nickel",
    sku: "TS-DAF-NKL",
    name_ar: "الدف النيكل",
    name_en: "Nickel Daf",
    description_ar: "دف كنسي مصنوع من النيكل عالي الجودة.",
    description_en: "Liturgical Daf made of high-quality nickel.",
    price: 150,
    category_id: "cat-1",
    stock_quantity: 30,
    images: [],
    specifications: {
      "الخامة": "نيكل"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-trianto-reg",
    sku: "TS-TRI-REG",
    name_ar: "التريانتو العادي",
    name_en: "Regular Trianto",
    description_ar: "تريانتو كنسي عادي متوفر بثلاثة مقاسات مختلفة.",
    description_en: "Regular liturgical trianto available in three different sizes.",
    price: 60,
    category_id: "cat-1",
    stock_quantity: 40,
    images: [],
    specifications: {
      "النوع": "عادي"
    },
    variants: [
      {
        type: "المقاس",
        options: [
          "صغير طول الضلع ١٥ سم (٦٠ جنيه)",
          "وسط طول الضلع ٢٠ سم (٨٠ جنيه)",
          "كبير طول الضلع ٢٥ سم (١٠٠ جنيه)"
        ]
      }
    ],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-trianto-mon",
    sku: "TS-TRI-MON",
    name_ar: "تريانتو الأديرة (التخين) المخصوص",
    name_en: "Monastery Trianto (Thick Special)",
    description_ar: "تريانتو ثقيل مخصوص للأديرة والتسبحة الطويلة متوفر بمقاسين.",
    description_en: "Thick special monastery trianto for long praises, available in two sizes.",
    price: 150,
    category_id: "cat-1",
    stock_quantity: 25,
    images: [],
    specifications: {
      "النوع": "تخين مخصوص للأديرة"
    },
    variants: [
      {
        type: "المقاس",
        options: [
          "وسط طول الضلع ٢٠ سم (١٥٠ جنيه)",
          "كبير طول الضلع ٢٥ سم (٢٠٠ جنيه)"
        ]
      }
    ],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-daf-case",
    sku: "TS-DAF-CASE",
    name_ar: "جراب دف قطيفة",
    name_en: "Velvet Daf Case",
    description_ar: "جراب لحماية الدف مصنوع من القطيفة الفاخرة.",
    description_en: "Protective case for Daf made of premium velvet.",
    price: 50,
    category_id: "cat-1",
    stock_quantity: 100,
    images: [],
    specifications: {
      "الخامة": "قطيفة فاخرة"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-laser-eng",
    sku: "TS-LASER-ENG",
    name_ar: "حفر ليزر بالكلمة",
    name_en: "Laser Engraving (Per Word)",
    description_ar: "خدمة حفر ليزر بالكلمة بحد أدنى ٥٠ جنيه للفردة.",
    description_en: "Laser engraving service per word, minimum 50 EGP per piece.",
    price: 25,
    category_id: "cat-1",
    stock_quantity: 999,
    images: [],
    specifications: {},
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-sanooj",
    sku: "TS-SAN-NEW",
    name_ar: "الصنوج",
    name_en: "Sanooj (Liturgical Cymbals)",
    description_ar: "صنوج نحاسية كنسية نغمية متناسقة للألحان والتسبحة.",
    description_en: "Tuned liturgical cymbals for church hymns and praises.",
    price: 2000,
    category_id: "cat-1",
    stock_quantity: 10,
    images: [],
    specifications: {
      "الخامة": "نحاس"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },

  // 2- التونيه
  {
    id: "prod-tonia-isis",
    sku: "TS-TON-ISIS",
    name_ar: "تونية خامة إيزيس",
    name_en: "Tonia (Isis Fabric)",
    description_ar: "تونية شماس مصنوعة من خامة إيزيس المريحة. يقاس الطول من الكتف للأرض. زيادة ٣٠ جنيه في حالة تظبيط مقاسات مخصوص.",
    description_en: "Deacon Tonia made of comfortable Isis fabric. Length is measured from shoulder to ground. +30 EGP for special custom sizing.",
    price: 225,
    category_id: "cat-2",
    stock_quantity: 100,
    images: ["/images/تونيه.jpg"],
    specifications: {
      "الخامة": "إيزيس"
    },
    variants: [
      {
        type: "الطول",
        options: [
          "طول ٨٠ سم (٢٢٥ جنيه)",
          "طول ٩٠ سم (٢٤٠ جنيه)",
          "طول ١٠٠ سم (٢٦٠ جنيه)",
          "طول ١١٠ سم (٢٧٥ جنيه)",
          "طول ١٢٠ سم (٢٩٠ جنيه)",
          "طول ١٣٠ سم (٣١٠ جنيه)",
          "طول ١٤٠ سم (٣٢٥ جنيه)",
          "طول ١٥٠ سم (٣٥٠ جنيه)",
          "طول ١٦٠ سم (٣٧٥ جنيه)"
        ]
      }
    ],
    rating: 5.0,
    review_count: 0,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-tonia-silk-normal",
    sku: "TS-TON-SLK-NORM",
    name_ar: "تونية حرير صليب عادي",
    name_en: "Silk Tonia with Normal Cross",
    description_ar: "تونية شماس حرير فاخرة مطرزة بصليب عادي. زيادة ٣٠ جنيه في حالة تظبيط مقاسات مخصوص.",
    description_en: "Luxury silk deacon Tonia embroidered with a normal cross. +30 EGP for special custom sizing.",
    price: 900,
    category_id: "cat-2",
    stock_quantity: 20,
    images: ["/images/تونيه.jpg"],
    specifications: {
      "الخامة": "حرير"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-tonia-silk-velvet",
    sku: "TS-TON-SLK-VELV",
    name_ar: "تونية حرير قطيفة أو أيقونة",
    name_en: "Silk Tonia with Velvet / Icon",
    description_ar: "تونية شماس حرير فاخرة مع قطيفة أو تطريز أيقونة كاملة. زيادة ٣٠ جنيه في حالة تظبيط مقاسات مخصوص.",
    description_en: "Luxury silk deacon Tonia with velvet details or fully embroidered icon. +30 EGP for special custom sizing.",
    price: 1000,
    category_id: "cat-2",
    stock_quantity: 15,
    images: ["/images/تونيه.jpg"],
    specifications: {
      "الخامة": "حرير مع قطيفة / أيقونة"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },

  // 3- البطراشيل
  {
    id: "prod-batrashil-fully-emb",
    sku: "TS-BAT-FULL-EMB",
    name_ar: "بطرشيل قطيفة مطرز كامل",
    name_en: "Fully Embroidered Velvet Batrashil",
    description_ar: "بطرشيل قطيفة فاخر مطرز بالكامل برسوم ونقوش قبطية دقيقة.",
    description_en: "Premium velvet Batrashil, fully embroidered with detailed Coptic iconography.",
    price: 750,
    category_id: "cat-3",
    stock_quantity: 15,
    images: ["/images/بطراشيل.jpg"],
    specifications: {
      "الخامة": "قطيفة مطرزة"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-batrashil-clerical",
    sku: "TS-BAT-CLERICAL",
    name_ar: "بطرشيل إكليريكية قطيفة",
    name_en: "Velvet Clerical Batrashil",
    description_ar: "بطرشيل قطيفة مخصص لطلبة الكلية الإكليريكية والشمامسة.",
    description_en: "Velvet Batrashil designed for clerical students and deacons.",
    price: 650,
    category_id: "cat-3",
    stock_quantity: 20,
    images: ["/images/بطراشيل.jpg"],
    specifications: {
      "الخامة": "قطيفة إكليريكية"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-batrashil-3cross",
    sku: "TS-BAT-3CROSS",
    name_ar: "بطرشيل قطيفة ٣ صليب",
    name_en: "Velvet Batrashil with 3 Crosses",
    description_ar: "بطرشيل قطيفة مزين بثلاثة صلبان مطرزة.",
    description_en: "Velvet Batrashil decorated with 3 embroidered crosses.",
    price: 500,
    category_id: "cat-3",
    stock_quantity: 25,
    images: ["/images/بطراشيل.jpg"],
    specifications: {
      "الخامة": "قطيفة"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-batrashil-fabric-cross",
    sku: "TS-BAT-FAB-CROSS",
    name_ar: "بطرشيل قماش صلبان",
    name_en: "Cross Fabric Batrashil",
    description_ar: "بطرشيل مصنوع من قماش الصلبان الفاخر متوفر بأطوال مختلفة.",
    description_en: "Batrashil made of high quality cross patterned fabric, available in multiple lengths.",
    price: 175,
    category_id: "cat-3",
    stock_quantity: 35,
    images: ["/images/بطراشيل.jpg"],
    specifications: {
      "الخامة": "قماش صلبان"
    },
    variants: [
      {
        type: "الطول",
        options: [
          "طول ٣ متر (١٧٥ جنيه)",
          "طول ٣.٥ متر (٢٠٠ جنيه)",
          "طول ٤ متر (٢٢٥ جنيه)",
          "طول ٤.٥ و ٥ متر (٢٥٠ جنيه)"
        ]
      }
    ],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },

  // 4- ملابس الكهنوت
  // No products for now as requested

  // 5- الشورية
  {
    id: "prod-shoria-greek-large",
    sku: "TS-SHO-GRK-LRG",
    name_ar: "شورية يونانى كبيرة",
    name_en: "Large Greek Shoria",
    description_ar: "شورية يونانى كبيرة الحجم بتصميم كنسي مميز متوفرة باللونين الذهبي والفضي.",
    description_en: "Large Greek Shoria with distinctive design, available in gold and silver.",
    price: 1800,
    category_id: "cat-5",
    stock_quantity: 8,
    images: ["/images/شوريه.jpg"],
    specifications: {
      "النوع": "يوناني كبيرة"
    },
    variants: [
      {
        type: "اللون",
        options: [
          "فضي (١٨٠٠ جنيه)",
          "ذهبي (٢٠٠٠ جنيه)"
        ]
      }
    ],
    rating: 5.0,
    review_count: 0,
    is_featured: true,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-shoria-large",
    sku: "TS-SHO-LRG",
    name_ar: "شورية كبيرة",
    name_en: "Large Shoria",
    description_ar: "شورية كنسية كبيرة الحجم متوفرة باللونين الذهبي والفضي.",
    description_en: "Large church Shoria, available in gold and silver.",
    price: 1100,
    category_id: "cat-5",
    stock_quantity: 12,
    images: ["/images/شوريه.jpg"],
    specifications: {
      "الحجم": "كبيرة"
    },
    variants: [
      {
        type: "اللون",
        options: [
          "فضي (١١٠٠ جنيه)",
          "ذهبي (١٢٠٠ جنيه)"
        ]
      }
    ],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-shoria-medium",
    sku: "TS-SHO-MED",
    name_ar: "شورية وسط",
    name_en: "Medium Shoria",
    description_ar: "شورية كنسية متوسطة الحجم متوفرة باللونين الذهبي والفضي.",
    description_en: "Medium church Shoria, available in gold and silver.",
    price: 900,
    category_id: "cat-5",
    stock_quantity: 15,
    images: ["/images/شوريه.jpg"],
    specifications: {
      "الحجم": "وسط"
    },
    variants: [
      {
        type: "اللون",
        options: [
          "فضي (٩٠٠ جنيه)",
          "ذهبي (١٠٠٠ جنيه)"
        ]
      }
    ],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-shoria-small",
    sku: "TS-SHO-SML",
    name_ar: "شورية صغيرة",
    name_en: "Small Shoria",
    description_ar: "شورية كنسية صغيرة الحجم متوفرة باللونين الذهبي والفضي.",
    description_en: "Small church Shoria, available in gold and silver.",
    price: 700,
    category_id: "cat-5",
    stock_quantity: 20,
    images: ["/images/شوريه.jpg"],
    specifications: {
      "الحجم": "صغيرة"
    },
    variants: [
      {
        type: "اللون",
        options: [
          "فضي (٧٠٠ جنيه)",
          "ذهبي (٨٠٠ جنيه)"
        ]
      }
    ],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-shoria-filigree",
    sku: "TS-SHO-FIL-GLD",
    name_ar: "شورية نحاس شفتشي طلاء ذهبي",
    name_en: "Filigree Brass Shoria Gold-Plated",
    description_ar: "شورية نحاس شفتشي فاخرة مع طلاء ذهبي ممتاز وتفاصيل دقيقة يدوية.",
    description_en: "Premium filigree brass Shoria, gold-plated with intricate hand-made details.",
    price: 5000,
    category_id: "cat-5",
    stock_quantity: 3,
    images: ["/images/شوريه.jpg"],
    specifications: {
      "الخامة": "نحاس شفتشي مطلي ذهب"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    is_limited_edition: true
  },

  // 6- اواني المذبح
  {
    id: "prod-vessels-brass",
    sku: "TS-VES-BRS-NEW",
    name_ar: "أواني مذبح نحاس",
    name_en: "Brass Altar Vessels",
    description_ar: "طقم أواني مذبح مصنوع من النحاس لخدمة القداس الإلهي.",
    description_en: "Altar vessels set made of brass for divine liturgy.",
    price: 1500,
    category_id: "cat-6",
    stock_quantity: 10,
    images: ["/images/اواني مذبح.jpg"],
    specifications: {
      "الخامة": "نحاس"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },

  // 7- كتب الكنيسه
  {
    id: "prod-book-khollagy-masoudi",
    sku: "TS-BOK-KHL-MAS",
    name_ar: "خولاجي عبد المسيح المسعودي",
    name_en: "Khollagy Abdel-Masih Al-Masoudi",
    description_ar: "كتاب الخولاجي المقدس بتحقيق وإعداد القمص عبد المسيح المسعودي.",
    description_en: "The Holy Khollagy book edited by Fr. Abdel-Masih Al-Masoudi.",
    price: 250,
    category_id: "cat-7",
    stock_quantity: 40,
    images: [],
    specifications: {
      "المؤلف": "القمص عبد المسيح المسعودي"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },

  // 8- الصلبان
  {
    id: "prod-cross-ivory",
    sku: "TS-CRS-IVR",
    name_ar: "صليب عاج",
    name_en: "Ivory Cross",
    description_ar: "صليب يد مصنوع من العاج الطبيعي الفاخر.",
    description_en: "Hand cross crafted from premium natural ivory.",
    price: 500,
    category_id: "cat-8",
    stock_quantity: 15,
    images: ["/images/صليب عاج (1).jpg", "/images/صليب عاج (2).jpg"],
    specifications: {
      "الخامة": "عاج طبيعي"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },

  // 9- مستلزمات المذبح
  {
    id: "prod-incense-box",
    sku: "TS-ALT-INC-BOX",
    name_ar: "درج بخور",
    name_en: "Incense Box",
    description_ar: "درج بخور خشبي فاخر لحفظ البخور على المذبح.",
    description_en: "Premium wooden incense box for altar use.",
    price: 500,
    category_id: "cat-9",
    stock_quantity: 15,
    images: [],
    specifications: {
      "الخامة": "خشب"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-altar-setup",
    sku: "TS-ALT-COMP-SET",
    name_ar: "تجهيز مذبح كامل",
    name_en: "Complete Altar Setup",
    description_ar: "تجهيز مذبح كامل يشتمل على: درج بخور، كرسي كاس، صليب افنوتي ناي نان، صليبين وبشارة.",
    description_en: "Complete altar setup including: incense box, chalice throne, Evnouti Nai Nan cross, two crosses, and a Bishara.",
    price: 2500,
    category_id: "cat-9",
    stock_quantity: 5,
    images: ["/images/فرش مذبج.jpg", "/images/كرسي الكاس.jpg", "/images/صليب افنوتي ناي نان.jpg"],
    specifications: {
      "المشتملات": "درج بخور، كرسي كاس، صليب افنوتي ناي نان، صليبين وبشارة"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: true,
    is_limited_edition: false
  },

  // 10- الاعمال الخشبيه والحفر
  {
    id: "prod-eng-coaster",
    sku: "TS-WOD-COASTER",
    name_ar: "حفر كوستر",
    name_en: "Engraved Coaster",
    description_ar: "كوستر خشبي محفور ليزر برسومات كنسية وصور القديسين.",
    description_en: "Laser engraved wooden coaster with church ornaments and saints.",
    price: 20,
    category_id: "cat-10",
    stock_quantity: 300,
    images: ["/images/حفر كوستر خشب.jpg"],
    specifications: {
      "الخامة": "خشب طبيعي"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: true,
    is_best_seller: true,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-eng-pen",
    sku: "TS-WOD-PEN",
    name_ar: "حفر قلم",
    name_en: "Engraved Touch Pen",
    description_ar: "قلم تاتش محفور بالليزر بالاسم أو الإهداء.",
    description_en: "Touch pen laser engraved with names or custom dedication.",
    price: 20,
    category_id: "cat-10",
    stock_quantity: 500,
    images: ["/images/حفر قلم تاتش.jpg"],
    specifications: {},
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-eng-medals",
    sku: "TS-WOD-MEDALS",
    name_ar: "حفر ميداليات",
    name_en: "Engraved Medallions",
    description_ar: "ميداليات خشبية محفورة ليزر بتصاميم وشعارات مسيحية.",
    description_en: "Laser engraved wooden medallions with Christian designs and logos.",
    price: 20,
    category_id: "cat-10",
    stock_quantity: 400,
    images: ["/images/حفر ميدليات.jpg"],
    specifications: {
      "الخامة": "خشب"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },
  {
    id: "prod-eng-bracelets",
    sku: "TS-WOD-BRACELET",
    name_ar: "حفر حظاظات جلد",
    name_en: "Engraved Leather Bracelets",
    description_ar: "حظاظات جلدية محفورة بالليزر مع صلبان أو آيات.",
    description_en: "Laser engraved leather bracelets with crosses or verses.",
    price: 20,
    category_id: "cat-10",
    stock_quantity: 250,
    images: ["/images/حفر حظاظات جلد.jpg"],
    specifications: {
      "الخامة": "جلد"
    },
    variants: [],
    rating: 5.0,
    review_count: 0,
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    is_limited_edition: false
  },

  // 11- Others
  {
    id: "prod-bishara",
    sku: "TS-OTH-BISHARA",
    name_ar: "بشارة",
    name_en: "Bishara (Gospel Cover)",
    description_ar: "بشارة الإنجيل المقدس مطرزة أو معدنية فاخرة.",
    description_en: "Liturgical Gospel cover (Bishara), embroidered or metal.",
    price: 0,
    category_id: "cat-11",
    stock_quantity: 10,
    images: [],
    specifications: {},
    variants: [],
    rating: 5.0,
    review_count: 0,
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
    image: ""
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
    image: ""
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
