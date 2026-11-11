CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"lot_no" text NOT NULL,
	"document_type" text NOT NULL,
	"file_name" text NOT NULL,
	"file_path" text NOT NULL,
	"public_url" text NOT NULL,
	"uploaded_by" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "documents_file_path_unique" UNIQUE("file_path")
);
--> statement-breakpoint
ALTER TABLE "packages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "districts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "lots" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "order_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "inquiries" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "coa_records" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "stories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "documents" ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
-- The public bucket contains only administrator-uploaded, customer-facing PDFs.
-- Application tables have no anonymous RLS policies; only the server role may access them.
