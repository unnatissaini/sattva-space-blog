import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type BlogPost = {
  id: string
  title: string
  title_hi?: string
  content: string
  content_hi?: string
  category: string
  excerpt: string
  excerpt_hi?: string
  image_url?: string
  video_url?: string
  author: string
  published_at: string
  created_at: string
  updated_at: string
  slug: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export type NewsletterSubscriber = {
  id: string
  email: string
  created_at: string
}