-- Create item_categories table
CREATE TABLE item_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    organization_id UUID REFERENCES organizations(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE item_categories ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access" ON item_categories FOR SELECT USING (true);

-- Seed default categories for "Happy Soul"
-- Using the hardcoded ID from the previous migration: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
INSERT INTO item_categories (label, value, organization_id)
VALUES 
    ('Clothes', 'clothes', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
    ('Books', 'books', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
    ('Toys', 'toys', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
    ('Electronics', 'electronics', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
    ('Furniture', 'furniture', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
    ('Other', 'other', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
