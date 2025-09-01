export interface BlogPost {
  id: string;
  title: string;
  title_hi?: string;
  excerpt: string;
  excerpt_hi?: string;
  content: string;
  content_hi?: string;
  category: string;
  author: string;
  image_url?: string;
  video_url?: string;
  slug: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}