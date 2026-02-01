-- =============================================
-- Vyntar Local SEO - Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Agencies
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR(255),
  email VARCHAR(255),
  plan VARCHAR(50) DEFAULT 'starter',
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days')
);

-- Clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  agency_id UUID REFERENCES agencies(id),
  business_name VARCHAR(255),
  address_line_1 VARCHAR(255),
  city VARCHAR(100),
  postcode VARCHAR(20),
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(255),
  category VARCHAR(100),
  citation_score INTEGER DEFAULT 0,
  live_citations INTEGER DEFAULT 0,
  pending_citations INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active'
);

-- Directories
CREATE TABLE directories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  url TEXT,
  tier INTEGER,
  domain_authority INTEGER,
  automation_level VARCHAR(50),
  categories TEXT[],
  is_free BOOLEAN DEFAULT true,
  uk_only BOOLEAN DEFAULT true
);

-- Citations
CREATE TABLE citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  client_id UUID REFERENCES clients(id),
  directory_id UUID REFERENCES directories(id),
  status VARCHAR(50) DEFAULT 'pending'
);

-- Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  client_id UUID REFERENCES clients(id),
  report_type VARCHAR(50),
  summary TEXT,
  insights TEXT,
  recommendations TEXT
);

-- =============================================
-- Row Level Security
-- =============================================

ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Agencies policies
CREATE POLICY "Users see own agency" ON agencies FOR SELECT USING (auth.uid() = user_id);

-- Clients policies
CREATE POLICY "Users see own clients" ON clients FOR SELECT USING (agency_id IN (SELECT id FROM agencies WHERE user_id = auth.uid()));
CREATE POLICY "Users insert own clients" ON clients FOR INSERT WITH CHECK (agency_id IN (SELECT id FROM agencies WHERE user_id = auth.uid()));

-- Citations policies
CREATE POLICY "Users see own citations" ON citations FOR SELECT USING (client_id IN (SELECT c.id FROM clients c JOIN agencies a ON c.agency_id = a.id WHERE a.user_id = auth.uid()));

-- Reports policies
CREATE POLICY "Users see own reports" ON reports FOR SELECT USING (client_id IN (SELECT c.id FROM clients c JOIN agencies a ON c.agency_id = a.id WHERE a.user_id = auth.uid()));
CREATE POLICY "Users insert own reports" ON reports FOR INSERT WITH CHECK (client_id IN (SELECT c.id FROM clients c JOIN agencies a ON c.agency_id = a.id WHERE a.user_id = auth.uid()));

-- Directories are publicly readable
ALTER TABLE directories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Directories are public" ON directories FOR SELECT USING (true);

-- =============================================
-- Auto-create agency on signup
-- =============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO agencies (user_id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'agency_name', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
