CREATE TABLE "content_blocks" (
	"id" text PRIMARY KEY NOT NULL,
	"page" text NOT NULL,
	"key" text NOT NULL,
	"label" text,
	"value" text,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX "content_blocks_page_key_idx" ON "content_blocks" USING btree ("page","key");