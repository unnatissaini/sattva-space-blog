-- Add language support to blog posts
ALTER TABLE public.blog_posts 
ADD COLUMN language VARCHAR(5) DEFAULT 'en',
ADD COLUMN title_hi TEXT,
ADD COLUMN excerpt_hi TEXT,
ADD COLUMN content_hi TEXT;