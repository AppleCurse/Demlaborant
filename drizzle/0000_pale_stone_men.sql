CREATE TABLE "coa_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"lot_no" text NOT NULL,
	"purity" text NOT NULL,
	"residue" text NOT NULL,
	"acidity" text NOT NULL,
	"heavy_metal" text NOT NULL,
	"test_date" text NOT NULL,
	"verified" boolean DEFAULT true NOT NULL,
	CONSTRAINT "coa_records_lot_no_unique" UNIQUE("lot_no")
);
--> statement-breakpoint
CREATE TABLE "districts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"eta_min" integer NOT NULL,
	"eta_max" integer NOT NULL,
	"courier_eligible" boolean DEFAULT true NOT NULL,
	"note" text,
	CONSTRAINT "districts_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"reference_no" text NOT NULL,
	"company_name" text NOT NULL,
	"tax_office" text,
	"tax_number" text,
	"contact_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"city" text NOT NULL,
	"product_name" text NOT NULL,
	"quantity" text NOT NULL,
	"notes" text,
	"status" text DEFAULT 'YENİ' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "inquiries_reference_no_unique" UNIQUE("reference_no")
);
--> statement-breakpoint
CREATE TABLE "lots" (
	"id" serial PRIMARY KEY NOT NULL,
	"lot_code" text NOT NULL,
	"abv" text NOT NULL,
	"residue" text NOT NULL,
	"volatile_acidity" text NOT NULL,
	"heavy_metals" text NOT NULL,
	"test_date" text NOT NULL,
	"method" text NOT NULL,
	"status" text DEFAULT 'ANALİTİK UYGUNLUK ONAYLI' NOT NULL,
	CONSTRAINT "lots_lot_code_unique" UNIQUE("lot_code")
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_slug" text NOT NULL,
	"product_name" text NOT NULL,
	"size" text NOT NULL,
	"unit_price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"line_total" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_no" text NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"city" text NOT NULL,
	"district" text NOT NULL,
	"address" text NOT NULL,
	"delivery_notes" text,
	"invoice_type" text DEFAULT 'individual' NOT NULL,
	"company_name" text,
	"tax_office" text,
	"tax_number" text,
	"delivery_type" text NOT NULL,
	"payment_type" text NOT NULL,
	"subtotal" integer NOT NULL,
	"vat_amount" integer NOT NULL,
	"shipping_fee" integer NOT NULL,
	"grand_total" integer NOT NULL,
	"status" text DEFAULT 'SİPARİŞ ALINDI' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "orders_order_no_unique" UNIQUE("order_no")
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" text PRIMARY KEY NOT NULL,
	"volume" integer NOT NULL,
	"price" integer NOT NULL,
	"title" text NOT NULL,
	"badge" text,
	"is_popular" boolean DEFAULT false NOT NULL,
	"courier_eligible" boolean DEFAULT false NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" text NOT NULL,
	"mood" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"transformation" text,
	"likes" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;