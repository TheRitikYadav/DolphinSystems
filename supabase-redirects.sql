-- ============================================
-- Redirects & Social Links Management
-- Run this in Supabase SQL Editor
-- ============================================

-- Redirects Table
CREATE TABLE IF NOT EXISTS redirects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_path TEXT NOT NULL UNIQUE,
  to_url TEXT NOT NULL,
  status_code INTEGER DEFAULT 301,
  is_active BOOLEAN DEFAULT true,
  hits INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT DEFAULT 'Link',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Public can read active social links
CREATE POLICY "Public can view active social links" ON social_links
  FOR SELECT USING (is_active = true);

-- Admin full access
CREATE POLICY "Admin full access to redirects" ON redirects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to social_links" ON social_links
  FOR ALL USING (auth.role() = 'authenticated');

-- Triggers for updated_at
CREATE TRIGGER redirects_updated_at BEFORE UPDATE ON redirects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER social_links_updated_at BEFORE UPDATE ON social_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to increment redirect hits
CREATE OR REPLACE FUNCTION increment_redirect_hits(path TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE redirects
  SET hits = hits + 1
  WHERE from_path = path;
END;
$$ LANGUAGE plpgsql;

-- Seed some social links
INSERT INTO social_links (platform, url, icon, display_order) VALUES
('LinkedIn', 'https://linkedin.com/company/dolphinsystems', 'Linkedin', 1),
('GitHub', 'https://github.com/dolphinsystems', 'Github', 2),
('X', 'https://x.com/dolphinsystems', 'Twitter', 3),
('Discord', 'https://discord.gg/dolphinsystems', 'MessageCircle', 4);
