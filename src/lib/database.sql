-- Database Schema for Sattva Space
-- Run these commands in your Supabase SQL editor

-- Create blog_posts table
CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  excerpt text NOT NULL,
  image_url text,
  video_url text,
  author text NOT NULL,
  slug text UNIQUE NOT NULL,
  published_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for contact_messages
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for newsletter_subscribers
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);