-- ============================================
-- Blog Posts Table
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  read_time TEXT DEFAULT '5 min read',
  featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  featured_image TEXT DEFAULT '',
  color TEXT DEFAULT 'from-blue-600 to-cyan-500',
  -- SEO fields
  seo_title TEXT DEFAULT '',
  seo_description TEXT DEFAULT '',
  seo_keywords TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Authenticated (admin) can do everything
CREATE POLICY "Admin full access to blog_posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Updated_at trigger
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, tags, read_time, featured, is_published, color, seo_title, seo_description, published_at) VALUES
(
  'The Future of SaaS: Trends Shaping 2026 and Beyond',
  'future-of-saas-trends-2026',
  'From AI-native products to usage-based pricing, we explore the defining trends that will reshape the SaaS landscape this year and into the future.',
  '<p>The SaaS landscape is evolving at an unprecedented pace. In 2026, we''re seeing fundamental shifts in how software is built, delivered, and consumed. Here are the key trends shaping our industry.</p><h2>AI-Native Products</h2><p>Gone are the days of bolting AI onto existing products. The new wave of SaaS is built from the ground up with AI at its core, enabling truly intelligent workflows and decision-making.</p><h2>Usage-Based Pricing</h2><p>More companies are moving away from per-seat pricing toward consumption-based models that better align cost with value delivered.</p><h2>Vertical SaaS</h2><p>Industry-specific solutions continue to outperform horizontal platforms, offering deeper integrations and purpose-built features.</p>',
  'Ritik Sharma',
  ARRAY['SaaS', 'Business'],
  '8 min read',
  true,
  true,
  'from-blue-600 to-cyan-500',
  'The Future of SaaS: Trends Shaping 2026 | DolphinSystems',
  'Explore the defining SaaS trends of 2026 — from AI-native products to usage-based pricing and vertical SaaS solutions.',
  '2026-02-28T00:00:00Z'
),
(
  'Building Scalable APIs with Edge Functions',
  'building-scalable-apis-edge-functions',
  'Learn how to architect blazing-fast APIs using edge computing, serverless functions, and intelligent caching strategies.',
  '<p>Edge computing has revolutionized how we think about API architecture. By moving computation closer to users, we can achieve sub-50ms response times globally.</p><h2>Why Edge?</h2><p>Traditional centralized APIs suffer from latency for global users. Edge functions solve this by running your code in data centers closest to each request.</p><h2>Getting Started</h2><p>Most modern platforms support edge functions out of the box. Here''s how to architect your APIs for edge deployment.</p>',
  'Alex Chen',
  ARRAY['Development', 'Tutorial'],
  '12 min read',
  false,
  true,
  'from-violet-600 to-purple-500',
  'Building Scalable APIs with Edge Functions | DolphinSystems',
  'A practical guide to building high-performance APIs using edge computing and serverless functions.',
  '2026-02-22T00:00:00Z'
),
(
  'DolphinCRM 3.0: What''s New',
  'dolphincrm-3-whats-new',
  'AI-powered lead scoring, smart pipelines, and a completely redesigned dashboard — here''s everything in our biggest release yet.',
  '<p>We''re thrilled to announce DolphinCRM 3.0, our most ambitious update ever. This release brings AI-powered intelligence to every aspect of your sales workflow.</p><h2>AI Lead Scoring</h2><p>Our new ML model analyzes hundreds of signals to predict which leads are most likely to convert.</p><h2>Smart Pipelines</h2><p>Pipelines now adapt dynamically based on deal characteristics and historical patterns.</p>',
  'Sofia Lindqvist',
  ARRAY['Updates', 'SaaS'],
  '5 min read',
  false,
  true,
  'from-pink-600 to-rose-500',
  'DolphinCRM 3.0: What''s New | DolphinSystems',
  'Discover AI-powered lead scoring, smart pipelines, and a redesigned dashboard in DolphinCRM 3.0.',
  '2026-02-15T00:00:00Z'
),
(
  'Zero-Downtime Deployments: A Complete Guide',
  'zero-downtime-deployments-guide',
  'Blue-green, canary, and rolling deployments explained — plus how DolphinDeploy handles them automatically for you.',
  '<p>Downtime during deployments is unacceptable in today''s always-on world. Here''s how to achieve zero-downtime deployments using modern strategies.</p><h2>Blue-Green Deployments</h2><p>Maintain two identical production environments and switch traffic between them.</p><h2>Canary Releases</h2><p>Gradually roll out changes to a small subset of users before full deployment.</p>',
  'Carlos Mendes',
  ARRAY['Development', 'Tutorial'],
  '10 min read',
  false,
  true,
  'from-emerald-600 to-green-500',
  'Zero-Downtime Deployments: A Complete Guide | DolphinSystems',
  'Learn blue-green, canary, and rolling deployment strategies for zero-downtime releases.',
  '2026-02-08T00:00:00Z'
),
(
  'How We Reduced Churn by 40% Using Data',
  'reduced-churn-40-percent-data',
  'A deep dive into the analytics-driven approach we used to identify at-risk customers and proactively retain them.',
  '<p>Customer churn is the silent killer of SaaS businesses. Here''s how we used data analytics to identify at-risk customers early and take proactive action.</p><h2>Identifying Signals</h2><p>We tracked engagement metrics, support ticket patterns, and usage trends to build a churn prediction model.</p>',
  'Sofia Rodriguez',
  ARRAY['Business', 'SaaS'],
  '7 min read',
  false,
  true,
  'from-amber-600 to-orange-500',
  'How We Reduced Churn by 40% Using Data | DolphinSystems',
  'A data-driven approach to identifying at-risk customers and reducing SaaS churn by 40%.',
  '2026-01-30T00:00:00Z'
),
(
  'Securing Your App: Authentication Best Practices',
  'authentication-best-practices',
  'From OAuth 2.0 to passkeys — a comprehensive overview of modern authentication strategies for web and mobile apps.',
  '<p>Authentication is the front door of your application. Getting it wrong can be catastrophic. Here''s a comprehensive guide to modern auth strategies.</p><h2>OAuth 2.0 and OIDC</h2><p>The gold standard for third-party authentication. Understand the flows and when to use each.</p><h2>Passkeys</h2><p>The future of passwordless authentication is here. Learn how to implement passkeys today.</p>',
  'Alex Chen',
  ARRAY['Technology', 'Development'],
  '9 min read',
  false,
  true,
  'from-red-600 to-pink-500',
  'Securing Your App: Authentication Best Practices | DolphinSystems',
  'A comprehensive overview of modern authentication — OAuth 2.0, passkeys, and more.',
  '2026-01-22T00:00:00Z'
),
(
  'Why We Chose a Microservices Architecture',
  'why-we-chose-microservices',
  'The tradeoffs, migration strategy, and lessons learned from moving DolphinSystems to a fully distributed architecture.',
  '<p>Moving from a monolith to microservices was one of the biggest technical decisions we''ve made. Here''s why we did it and what we learned.</p><h2>The Decision</h2><p>Our monolith was becoming a bottleneck. Deploy times were increasing, and teams were stepping on each other''s toes.</p><h2>Lessons Learned</h2><p>Start with clear service boundaries. Don''t create too many services too fast.</p>',
  'Ritik Sharma',
  ARRAY['Technology', 'Development'],
  '11 min read',
  false,
  true,
  'from-indigo-600 to-blue-500',
  'Why We Chose Microservices | DolphinSystems',
  'The tradeoffs and lessons learned from migrating DolphinSystems to a microservices architecture.',
  '2026-01-14T00:00:00Z'
),
(
  'Introducing DolphinFlow: No-Code Automation',
  'introducing-dolphinflow',
  'Automate repetitive tasks across your entire stack without writing a single line of code. Here''s how DolphinFlow works.',
  '<p>We''re excited to introduce DolphinFlow, our no-code automation platform that connects your tools and automates workflows without any coding.</p><h2>How It Works</h2><p>DolphinFlow uses a visual drag-and-drop builder where you connect triggers, actions, and conditions.</p><h2>Integrations</h2><p>Connect with 100+ apps including Slack, Gmail, Stripe, and of course all DolphinSystems products.</p>',
  'Sofia Lindqvist',
  ARRAY['Updates', 'SaaS'],
  '6 min read',
  false,
  true,
  'from-teal-600 to-cyan-500',
  'Introducing DolphinFlow: No-Code Automation | DolphinSystems',
  'Automate your workflows without code using DolphinFlow — connect apps, trigger actions, and save time.',
  '2026-01-05T00:00:00Z'
);
