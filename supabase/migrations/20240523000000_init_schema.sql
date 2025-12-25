-- Create organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    theme_config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- insert default organization (Happy Soul)
INSERT INTO organizations (id, name, slug, theme_config)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Happy Soul',
    'happy-soul',
    '{"primary_color": "#ff6b6b", "logo_url": null}'::jsonb
);

-- Create donations table
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    latitude FLOAT,
    longitude FLOAT,
    pickup_date DATE NOT NULL,
    vehicle_type TEXT,
    helpers_needed INTEGER DEFAULT 0,
    items JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Policies for organizations
-- Public read access for organizations (so frontend can load theme/config)
CREATE POLICY "Allow public read access" ON organizations FOR SELECT USING (true);

-- Policies for donations
-- Public insert access (for the form)
CREATE POLICY "Allow public insert" ON donations FOR INSERT WITH CHECK (true);

-- Admin read access (placeholder for future auth)
-- In a real app, this would check auth.uid() against an organization_members table
CREATE POLICY "Allow organization read" ON donations FOR SELECT USING (true); 
