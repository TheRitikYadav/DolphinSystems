export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  read_time: string;
  featured: boolean;
  is_published: boolean;
  featured_image: string;
  color: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  og_image: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Redirect {
  id: string;
  from_path: string;
  to_url: string;
  status_code: number;
  is_active: boolean;
  hits: number;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
