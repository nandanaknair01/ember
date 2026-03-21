-- Migration to rename states column to India_state
-- Run this in your Supabase SQL editor

-- First, add the new column
ALTER TABLE profiles ADD COLUMN India_state TEXT;

-- Copy data from old column to new column
UPDATE profiles SET India_state = states;

-- Drop the old column
ALTER TABLE profiles DROP COLUMN states;

-- Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND column_name = 'India_state';
