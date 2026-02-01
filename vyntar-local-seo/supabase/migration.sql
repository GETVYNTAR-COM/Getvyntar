-- ================================================
-- Vyntar Local SEO - Database Schema & Seed Data
-- Run this in your Supabase SQL Editor
-- ================================================

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

-- Enable RLS
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users see own agency" ON agencies FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own agency" ON agencies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users see own clients" ON clients FOR SELECT USING (agency_id IN (SELECT id FROM agencies WHERE user_id = auth.uid()));
CREATE POLICY "Users insert own clients" ON clients FOR INSERT WITH CHECK (agency_id IN (SELECT id FROM agencies WHERE user_id = auth.uid()));
CREATE POLICY "Users see own citations" ON citations FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE agency_id IN (SELECT id FROM agencies WHERE user_id = auth.uid())));
CREATE POLICY "Users see own reports" ON reports FOR SELECT USING (client_id IN (SELECT id FROM clients WHERE agency_id IN (SELECT id FROM agencies WHERE user_id = auth.uid())));

-- Auto-create agency on signup
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

-- ================================================
-- Seed 65 UK Directories
-- ================================================

INSERT INTO directories (name, url, tier, domain_authority, automation_level, categories, is_free, uk_only) VALUES
('Google Business Profile', 'https://business.google.com', 1, 100, 'semi_auto', ARRAY['general'], true, false),
('Bing Places', 'https://www.bingplaces.com', 1, 95, 'semi_auto', ARRAY['general'], true, false),
('Apple Maps', 'https://mapsconnect.apple.com', 1, 95, 'semi_auto', ARRAY['general'], true, false),
('Yell.com', 'https://www.yell.com', 1, 82, 'full_auto', ARRAY['general'], true, true),
('Thomson Local', 'https://www.thomsonlocal.com', 1, 73, 'full_auto', ARRAY['general'], true, true),
('192.com', 'https://www.192.com', 1, 76, 'semi_auto', ARRAY['general'], true, true),
('Scoot', 'https://www.scoot.co.uk', 1, 71, 'full_auto', ARRAY['general'], true, true),
('Yelp UK', 'https://www.yelp.co.uk', 2, 93, 'full_auto', ARRAY['general','hospitality'], true, false),
('Facebook Business', 'https://www.facebook.com/business', 2, 96, 'full_auto', ARRAY['general'], true, false),
('Trustpilot', 'https://uk.trustpilot.com', 2, 91, 'semi_auto', ARRAY['general'], true, false),
('Checkatrade', 'https://www.checkatrade.com', 2, 68, 'manual', ARRAY['trades'], false, true),
('MyBuilder', 'https://www.mybuilder.com', 2, 62, 'manual', ARRAY['trades'], false, true),
('Bark.com', 'https://www.bark.com', 2, 64, 'semi_auto', ARRAY['services'], false, true),
('FreeIndex', 'https://www.freeindex.co.uk', 2, 67, 'full_auto', ARRAY['general'], true, true),
('Hotfrog UK', 'https://www.hotfrog.co.uk', 2, 64, 'full_auto', ARRAY['general'], true, false),
('Touch Local', 'https://www.touchlocal.com', 3, 58, 'full_auto', ARRAY['general'], true, true),
('Cylex UK', 'https://uk.cylex.com', 3, 55, 'full_auto', ARRAY['general'], true, false),
('Brownbook', 'https://www.brownbook.net/gb', 3, 53, 'full_auto', ARRAY['general'], true, false),
('City Visitor', 'https://www.cityvisitor.co.uk', 3, 52, 'full_auto', ARRAY['general'], true, true),
('Tuugo UK', 'https://uk.tuugo.biz', 3, 44, 'full_auto', ARRAY['general'], true, false),
('UK Small Business Directory', 'https://www.uksmallbusinessdirectory.co.uk', 3, 45, 'full_auto', ARRAY['general'], true, true),
('Approved Business', 'https://www.approvedbusiness.co.uk', 3, 47, 'full_auto', ARRAY['general'], true, true),
('Federation of Master Builders', 'https://www.fmb.org.uk', 4, 72, 'manual', ARRAY['trades','construction'], false, true),
('TrustMark', 'https://www.trustmark.org.uk', 4, 68, 'manual', ARRAY['trades'], false, true),
('Law Society', 'https://www.lawsociety.org.uk', 4, 89, 'manual', ARRAY['legal'], false, true),
('ICAEW', 'https://www.icaew.com', 4, 78, 'manual', ARRAY['accounting'], false, false),
('NHS', 'https://www.nhs.uk', 4, 95, 'manual', ARRAY['healthcare'], true, true),
('TripAdvisor UK', 'https://www.tripadvisor.co.uk', 4, 93, 'semi_auto', ARRAY['hospitality','restaurants'], true, false),
('Rightmove', 'https://www.rightmove.co.uk', 4, 88, 'manual', ARRAY['property'], false, true),
('Zoopla', 'https://www.zoopla.co.uk', 4, 85, 'manual', ARRAY['property'], false, true),
('LinkedIn', 'https://www.linkedin.com', 2, 98, 'full_auto', ARRAY['general','b2b'], true, false),
('Instagram', 'https://business.instagram.com', 2, 96, 'full_auto', ARRAY['general'], true, false),
('YouTube', 'https://www.youtube.com', 2, 100, 'full_auto', ARRAY['general'], true, false),
('Nextdoor', 'https://nextdoor.co.uk/business', 2, 85, 'semi_auto', ARRAY['general','trades'], true, false),
('Rated People', 'https://www.ratedpeople.com', 2, 60, 'semi_auto', ARRAY['trades'], false, true),
('RAC Garages', 'https://www.rac.co.uk/approved-garages', 4, 76, 'manual', ARRAY['automotive'], false, true),
('AA Garage Guide', 'https://www.theaa.com', 4, 78, 'manual', ARRAY['automotive'], false, true),
('OpenTable UK', 'https://www.opentable.co.uk', 4, 87, 'semi_auto', ARRAY['restaurants'], false, false),
('Care Quality Commission', 'https://www.cqc.org.uk', 4, 84, 'manual', ARRAY['healthcare'], false, true),
('Opendi UK', 'https://www.opendi.co.uk', 3, 49, 'full_auto', ARRAY['general'], true, false),
('Find Open', 'https://www.findopen.co.uk', 3, 48, 'full_auto', ARRAY['general'], true, true),
('Lacartes UK', 'https://uk.lacartes.com', 3, 42, 'full_auto', ARRAY['general'], true, false),
('Good Garage Scheme', 'https://www.goodgaragescheme.com', 4, 55, 'manual', ARRAY['automotive'], false, true),
('Guild of Master Craftsmen', 'https://www.guildmc.com', 4, 58, 'manual', ARRAY['trades'], false, true),
('SRA', 'https://www.sra.org.uk', 4, 83, 'manual', ARRAY['legal'], false, true),
('Private Healthcare UK', 'https://www.privatehealth.co.uk', 4, 61, 'semi_auto', ARRAY['healthcare'], true, true),
('OnTheMarket', 'https://www.onthemarket.com', 4, 71, 'manual', ARRAY['property'], false, true),
('Pinterest Business', 'https://business.pinterest.com', 2, 94, 'full_auto', ARRAY['general'], true, false),
('TikTok Business', 'https://www.tiktok.com/business', 2, 91, 'semi_auto', ARRAY['general'], true, false);
