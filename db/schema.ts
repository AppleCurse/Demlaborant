import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const packages = pgTable("packages", {
  id: text("id").primaryKey(),
  volume: integer("volume").notNull(),
  price: integer("price").notNull(),
  title: text("title").notNull(),
  badge: text("badge"),
  isPopular: boolean("is_popular").notNull().default(false),
  courierEligible: boolean("courier_eligible").notNull().default(false),
  description: text("description").notNull(),
});

export const districts = pgTable("districts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  etaMin: integer("eta_min").notNull(),
  etaMax: integer("eta_max").notNull(),
  courierEligible: boolean("courier_eligible").notNull().default(true),
  note: text("note"),
});

export const lots = pgTable("lots", {
  id: serial("id").primaryKey(),
  lotCode: text("lot_code").notNull().unique(),
  abv: text("abv").notNull(),
  residue: text("residue").notNull(),
  volatileAcidity: text("volatile_acidity").notNull(),
  heavyMetals: text("heavy_metals").notNull(),
  testDate: text("test_date").notNull(),
  method: text("method").notNull(),
  status: text("status").notNull().default("ANALİTİK UYGUNLUK ONAYLI"),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNo: text("order_no").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  district: text("district").notNull(),
  address: text("address").notNull(),
  deliveryNotes: text("delivery_notes"),
  invoiceType: text("invoice_type").notNull().default("individual"),
  companyName: text("company_name"),
  taxOffice: text("tax_office"),
  taxNumber: text("tax_number"),
  deliveryType: text("delivery_type").notNull(),
  paymentType: text("payment_type").notNull(),
  subtotal: integer("subtotal").notNull(),
  vatAmount: integer("vat_amount").notNull(),
  shippingFee: integer("shipping_fee").notNull(),
  grandTotal: integer("grand_total").notNull(),
  status: text("status").notNull().default("SİPARİŞ ALINDI"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productSlug: text("product_slug").notNull(),
  productName: text("product_name").notNull(),
  size: text("size").notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
  lineTotal: integer("line_total").notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  referenceNo: text("reference_no").notNull().unique(),
  companyName: text("company_name").notNull(),
  taxOffice: text("tax_office"),
  taxNumber: text("tax_number"),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  productName: text("product_name").notNull(),
  quantity: text("quantity").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("YENİ"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const coaRecords = pgTable("coa_records", {
  id: serial("id").primaryKey(),
  lotNo: text("lot_no").notNull().unique(),
  purity: text("purity").notNull(),
  residue: text("residue").notNull(),
  acidity: text("acidity").notNull(),
  heavyMetal: text("heavy_metal").notNull(),
  testDate: text("test_date").notNull(),
  verified: boolean("verified").notNull().default(true),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  lotNo: text("lot_no").notNull(),
  documentType: text("document_type").notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull().unique(),
  publicUrl: text("public_url").notNull(),
  uploadedBy: text("uploaded_by").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  mood: text("mood").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  transformation: text("transformation"),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
export type Lot = typeof lots.$inferSelect;
export type District = typeof districts.$inferSelect;
export type PackageRow = typeof packages.$inferSelect;
export type CoaRecord = typeof coaRecords.$inferSelect;
export type DocumentRecord = typeof documents.$inferSelect;
export type Story = typeof stories.$inferSelect;
