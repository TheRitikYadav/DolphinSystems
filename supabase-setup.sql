-- ============================================
-- DolphinSystems Database Setup
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  platforms TEXT[] DEFAULT '{}',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-400',
  icon TEXT NOT NULL DEFAULT 'Code2',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Code2',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-400',
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view active products/services)
CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active services" ON services
  FOR SELECT USING (is_active = true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access to products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

-- Seed products
INSERT INTO products (name, description, tags, platforms, color, icon) VALUES
  ('DolphinCRM', 'Streamline customer relationships with AI-powered insights, pipeline management, and automated follow-ups.', ARRAY['Web Apps', 'SaaS'], ARRAY['Web', 'iOS', 'Android'], 'from-blue-500 to-cyan-400', 'Users'),
  ('DolphinAnalytics', 'Real-time dashboards and predictive analytics to turn raw data into actionable business intelligence.', ARRAY['Analytics', 'SaaS'], ARRAY['Web'], 'from-violet-500 to-purple-400', 'BarChart3'),
  ('DolphinAuth', 'Enterprise-grade authentication with SSO, MFA, and role-based access control out of the box.', ARRAY['APIs', 'SaaS'], ARRAY['Web'], 'from-emerald-500 to-green-400', 'Shield'),
  ('DolphinDeploy', 'One-click CI/CD pipelines with zero-downtime deployments, rollback support, and infrastructure monitoring.', ARRAY['Automation', 'Web Apps'], ARRAY['Web'], 'from-orange-500 to-amber-400', 'Rocket'),
  ('DolphinChat', 'Embeddable real-time messaging with file sharing, video calls, and AI-powered chatbot integration.', ARRAY['Mobile Apps', 'SaaS'], ARRAY['Web', 'iOS', 'Android'], 'from-pink-500 to-rose-400', 'MessageCircle'),
  ('DolphinStore', 'Full-featured e-commerce platform with inventory management, payment processing, and multi-channel selling.', ARRAY['Web Apps', 'Mobile Apps'], ARRAY['Web', 'iOS', 'Android'], 'from-teal-500 to-cyan-400', 'ShoppingCart'),
  ('DolphinFlow', 'Visual workflow builder for automating business processes — connect apps, trigger actions, zero code required.', ARRAY['Automation', 'SaaS'], ARRAY['Web'], 'from-indigo-500 to-blue-400', 'Workflow'),
  ('DolphinAPI', 'Unified API gateway with rate limiting, caching, documentation generation, and developer portal.', ARRAY['APIs', 'Web Apps'], ARRAY['Web'], 'from-slate-600 to-gray-400', 'Code2');

-- Seed services
INSERT INTO services (name, description, icon, color, features) VALUES
  ('Web Development', 'Custom web applications built with modern frameworks and best practices.', 'Globe', 'from-blue-500 to-cyan-400', ARRAY['React / Next.js', 'Responsive Design', 'SEO Optimized', 'Performance Tuned']),
  ('Mobile Development', 'Native and cross-platform mobile apps for iOS and Android.', 'Smartphone', 'from-violet-500 to-purple-400', ARRAY['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support']),
  ('Cloud Infrastructure', 'Scalable cloud architecture and DevOps automation.', 'Cloud', 'from-emerald-500 to-green-400', ARRAY['AWS / GCP / Azure', 'CI/CD Pipelines', 'Auto Scaling', 'Monitoring']),
  ('API Development', 'RESTful and GraphQL APIs with comprehensive documentation.', 'Code2', 'from-orange-500 to-amber-400', ARRAY['REST & GraphQL', 'Rate Limiting', 'Versioning', 'Documentation']),
  ('AI & Automation', 'Intelligent automation and AI integration for business processes.', 'Workflow', 'from-pink-500 to-rose-400', ARRAY['Machine Learning', 'NLP', 'Process Automation', 'Data Pipelines']),
  ('Consulting', 'Strategic technology consulting and digital transformation.', 'MessageCircle', 'from-indigo-500 to-blue-400', ARRAY['Architecture Review', 'Tech Strategy', 'Team Training', 'Code Audit']);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
