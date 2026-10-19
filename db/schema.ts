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
  packageId: text("package_id").notNull(),
  volume: integer("volume").notNull(),
  price: integer("price").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  district: text("district").notNull(),
  address: text("address").notNull(),
  deliveryType: text("delivery_type").notNull(),
  paymentType: text("payment_type").notNull(),
  status: text("status").notNull().default("HAZIRLANIYOR"),
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
export type Lot = typeof lots.$inferSelect;
export type District = typeof districts.$inferSelect;
export type PackageRow = typeof packages.$inferSelect;
export type CoaRecord = typeof coaRecords.$inferSelect;
export type Story = typeof stories.$inferSelect;
