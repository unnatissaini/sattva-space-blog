-- Create admin user function for one-time setup
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This function should be run manually after creating the user via Supabase Auth
  -- We can't directly insert into auth.users, but we can prepare related data
  
  -- Insert a note about the admin setup
  INSERT INTO blog_posts (
    title,
    content,
    category,
    excerpt,
    author,
    slug
  ) VALUES (
    'Admin Setup Complete',
    'Admin user has been configured for the Sattva Space platform.',
    'System',
    'System setup notification',
    'System',
    'admin-setup-complete'
  );
END;
$$;