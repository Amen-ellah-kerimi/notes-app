-- Add content column to notes table
ALTER TABLE "notes" ADD COLUMN "content" text;

-- Add timestamps to notes table
ALTER TABLE "notes" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "notes" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "notes" ADD COLUMN "deleted_at" timestamp;

-- Make title and ownerId not null
ALTER TABLE "notes" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "notes" ALTER COLUMN "owner_id" SET NOT NULL;

-- Add owner index
CREATE INDEX "owner_idx" ON "notes" USING btree ("owner_id");
