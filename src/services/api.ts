"use server";

import fs from "fs/promises";
import path from "path";
import { CATEGORIES, PRODUCTS, BRANCHES, TESTIMONIALS, FAQS } from "./db-mock-data";
import type { Product, Category, Branch, Testimonial, FAQ } from "./db-mock-data";
export type { Product, Category, Branch, Testimonial, FAQ };

// JSON DB file path
const DB_FILE_PATH = path.join(process.cwd(), "src", "services", "db.json");

export interface Order {
  id: string;
  tracking_number: string;
  status: "pending" | "processing" | "completed" | "cancelled" | "returned";
  shipping_address: {
    fullName: string;
    phone: string;
    email: string;
    governorate: string;
    cityAddress: string;
  };
  payment_method: "cod" | "instapay" | "card";
  payment_status: "pending" | "paid" | "failed";
  items: {
    id: string;
    name_ar: string;
    name_en: string;
    price: number;
    quantity: number;
    selectedVariant?: string;
  }[];
  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount: number;
  total: number;
  coupon_code?: string;
  customer_notes?: string;
  admin_notes?: string;
  created_at: string;
}

export interface CustomRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  details: string;
  reference_images?: string[];
  status: "pending" | "reviewed" | "quoted" | "completed";
  quote_amount?: number;
  created_at: string;
}

export interface UserSession {
  id: string;
  fullName: string;
  email: string;
  role: "customer" | "admin" | "priest" | "deacon";
  phone?: string;
  addresses?: any[];
  wishlist?: string[];
}

export interface DatabaseState {
  products: Product[];
  categories: Category[];
  branches: Branch[];
  orders: Order[];
  customRequests: CustomRequest[];
  users: UserSession[];
}

// Read database file
async function readDB(): Promise<DatabaseState> {
  try {
    await fs.mkdir(path.dirname(DB_FILE_PATH), { recursive: true });
    try {
      const data = await fs.readFile(DB_FILE_PATH, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      // File doesn't exist, create it with seed data
      const initialState: DatabaseState = {
        products: PRODUCTS,
        categories: CATEGORIES,
        branches: BRANCHES,
        orders: [],
        customRequests: [],
        users: [
          {
            id: "admin-id",
            fullName: "المدير العام طاكسيس",
            email: "taksisdaf@gmail.com",
            role: "admin",
            phone: "01220201204"
          }
        ]
      };
      await fs.writeFile(DB_FILE_PATH, JSON.stringify(initialState, null, 2), "utf-8");
      return initialState;
    }
  } catch (err) {
    console.error("Failed to read JSON DB, falling back to static", err);
    return {
      products: PRODUCTS,
      categories: CATEGORIES,
      branches: BRANCHES,
      orders: [],
      customRequests: [],
      users: []
    };
  }
}

// Write database file
async function writeDB(state: DatabaseState): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(DB_FILE_PATH), { recursive: true });
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(state, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write to JSON DB", err);
    return false;
  }
}

// =================== CATEGORIES ===================
export async function getCategories(): Promise<Category[]> {
  const db = await readDB();
  return db.categories;
}

// =================== PRODUCTS ===================
export async function getProducts(): Promise<Product[]> {
  const db = await readDB();
  return db.products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const db = await readDB();
  return db.products.find(p => p.id === id);
}

export async function saveProduct(productData: Partial<Product> & { id?: string }): Promise<Product> {
  const db = await readDB();
  if (productData.id) {
    // Edit
    const index = db.products.findIndex(p => p.id === productData.id);
    if (index !== -1) {
      db.products[index] = { ...db.products[index], ...productData } as Product;
    } else {
      throw new Error("Product not found");
    }
  } else {
    // Add new
    const newProduct: Product = {
      id: "prod-" + Math.random().toString(36).substr(2, 9),
      sku: productData.sku || "TS-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      name_ar: productData.name_ar || "",
      name_en: productData.name_en || "",
      description_ar: productData.description_ar || "",
      description_en: productData.description_en || "",
      price: Number(productData.price) || 0,
      discount_price: productData.discount_price ? Number(productData.discount_price) : undefined,
      category_id: productData.category_id || "cat-19",
      stock_quantity: Number(productData.stock_quantity) || 0,
      images: productData.images || ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"],
      specifications: productData.specifications || {},
      variants: productData.variants || [],
      rating: 5.0,
      review_count: 0,
      is_featured: !!productData.is_featured,
      is_best_seller: !!productData.is_best_seller,
      is_new_arrival: !!productData.is_new_arrival,
      is_limited_edition: !!productData.is_limited_edition
    };
    db.products.push(newProduct);
    productData.id = newProduct.id;
  }
  await writeDB(db);
  return db.products.find(p => p.id === productData.id) as Product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = await readDB();
  db.products = db.products.filter(p => p.id !== id);
  return await writeDB(db);
}

// =================== ORDERS ===================
export async function getOrders(): Promise<Order[]> {
  const db = await readDB();
  return db.orders;
}

export async function getOrderByTracking(trackingNumber: string): Promise<Order | undefined> {
  const db = await readDB();
  return db.orders.find(o => o.tracking_number.toUpperCase() === trackingNumber.toUpperCase());
}

export async function createOrder(orderData: Omit<Order, "id" | "tracking_number" | "status" | "created_at" | "payment_status">): Promise<Order> {
  const db = await readDB();
  const tracking = "TAX-" + Math.floor(100000 + Math.random() * 900000);
  
  const newOrder: Order = {
    ...orderData,
    id: "ord-" + Math.random().toString(36).substr(2, 9),
    tracking_number: tracking,
    status: "pending",
    payment_status: orderData.payment_method === "cod" ? "pending" : "paid",
    created_at: new Date().toISOString()
  };

  // Adjust stock quantity of ordered products
  for (const item of newOrder.items) {
    const prod = db.products.find(p => p.id === item.id);
    if (prod) {
      prod.stock_quantity = Math.max(0, prod.stock_quantity - item.quantity);
    }
  }

  db.orders.push(newOrder);
  await writeDB(db);
  return newOrder;
}

export async function updateOrderStatus(orderId: string, status: Order["status"], paymentStatus?: Order["payment_status"], adminNotes?: string): Promise<Order> {
  const db = await readDB();
  const index = db.orders.findIndex(o => o.id === orderId);
  if (index === -1) throw new Error("Order not found");
  
  db.orders[index].status = status;
  if (paymentStatus) {
    db.orders[index].payment_status = paymentStatus;
  }
  if (adminNotes !== undefined) {
    db.orders[index].admin_notes = adminNotes;
  }
  
  await writeDB(db);
  return db.orders[index];
}

// =================== CUSTOM REQUESTS ===================
export async function getCustomRequests(): Promise<CustomRequest[]> {
  const db = await readDB();
  return db.customRequests;
}

export async function createCustomRequest(requestData: Omit<CustomRequest, "id" | "status" | "created_at">): Promise<CustomRequest> {
  const db = await readDB();
  const newRequest: CustomRequest = {
    ...requestData,
    id: "cust-" + Math.random().toString(36).substr(2, 9),
    status: "pending",
    created_at: new Date().toISOString()
  };
  db.customRequests.push(newRequest);
  await writeDB(db);
  return newRequest;
}

export async function updateCustomRequestStatus(requestId: string, status: CustomRequest["status"], quoteAmount?: number): Promise<CustomRequest> {
  const db = await readDB();
  const index = db.customRequests.findIndex(r => r.id === requestId);
  if (index === -1) throw new Error("Custom request not found");
  
  db.customRequests[index].status = status;
  if (quoteAmount !== undefined) {
    db.customRequests[index].quote_amount = quoteAmount;
  }
  await writeDB(db);
  return db.customRequests[index];
}

// =================== BRANCHES ===================
export async function getBranches(): Promise<Branch[]> {
  const db = await readDB();
  return db.branches;
}

// =================== REVIEWS ===================
export async function addProductReview(productId: string, review: { name: string; rating: number; text: string }): Promise<Product> {
  const db = await readDB();
  const prod = db.products.find(p => p.id === productId);
  if (!prod) throw new Error("Product not found");

  // Recalculate average rating
  const currentTotal = prod.rating * prod.review_count;
  prod.review_count += 1;
  prod.rating = Number(((currentTotal + review.rating) / prod.review_count).toFixed(1));

  await writeDB(db);
  return prod;
}

// =================== MOCK AUTH ===================
export async function mockRegister(user: Omit<UserSession, "id"> & { password?: string }): Promise<UserSession> {
  const db = await readDB();
  const existing = db.users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (existing) throw new Error("البريد الإلكتروني مسجل بالفعل");

  const newUser: UserSession = {
    ...user,
    id: "usr-" + Math.random().toString(36).substr(2, 9),
    addresses: [],
    wishlist: []
  };

  db.users.push(newUser);
  await writeDB(db);
  return newUser;
}

export async function mockLogin(email: string, role?: string): Promise<UserSession> {
  const db = await readDB();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;

  // Fallback for easy login in demo
  const newUser: UserSession = {
    id: "usr-" + Math.random().toString(36).substr(2, 9),
    fullName: email.split("@")[0],
    email: email,
    role: (email === "taksisdaf@gmail.com" || role === "admin") ? "admin" : "customer",
    addresses: [],
    wishlist: []
  };
  db.users.push(newUser);
  await writeDB(db);
  return newUser;
}

// =================== CATEGORY CRUD OPERATIONS ===================
export async function saveCategory(categoryData: Partial<Category> & { id?: string }): Promise<Category> {
  const db = await readDB();
  if (categoryData.id) {
    // Edit
    const index = db.categories.findIndex(c => c.id === categoryData.id);
    if (index !== -1) {
      db.categories[index] = { ...db.categories[index], ...categoryData } as Category;
    } else {
      throw new Error("Category not found");
    }
  } else {
    // Add new
    const newCategory: Category = {
      id: "cat-" + Math.random().toString(36).substr(2, 9),
      name_ar: categoryData.name_ar || "",
      name_en: categoryData.name_en || "",
      slug: categoryData.slug || "cat-" + Math.random().toString(36).substr(2, 6),
      image_url: categoryData.image_url || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80"
    };
    db.categories.push(newCategory);
    categoryData.id = newCategory.id;
  }
  await writeDB(db);
  return db.categories.find(c => c.id === categoryData.id) as Category;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const db = await readDB();
  db.categories = db.categories.filter(c => c.id !== id);
  // Re-assign products under this category to cat-19
  db.products = db.products.map(p => p.category_id === id ? { ...p, category_id: "cat-19" } : p);
  return await writeDB(db);
}

