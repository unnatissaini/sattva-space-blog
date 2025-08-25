-- Fix security warnings
-- 1. Fix function search path
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This function should be run manually after creating the user via Supabase Auth
  -- We can't directly insert into auth.users, but we can prepare related data
  
  -- Remove the test blog post as it's not needed
  NULL;
END;
$$;

-- Drop the function since we don't actually need it
DROP FUNCTION IF EXISTS create_admin_user();