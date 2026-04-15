-- Migration: Add year-wise fee columns
-- Run this in Supabase SQL Editor

ALTER TABLE fees ADD COLUMN IF NOT EXISTS year1_fee NUMERIC(12,2);
ALTER TABLE fees ADD COLUMN IF NOT EXISTS year2_fee NUMERIC(12,2);
ALTER TABLE fees ADD COLUMN IF NOT EXISTS four_year_total NUMERIC(12,2);

-- Seed year1_fee from existing tuition_fee data
UPDATE fees SET year1_fee = tuition_fee WHERE year1_fee IS NULL;

-- Verify
SELECT count(*) AS total_rows, count(year1_fee) AS rows_with_year1 FROM fees;
