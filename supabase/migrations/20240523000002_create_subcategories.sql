-- Add icon to item_categories
ALTER TABLE item_categories ADD COLUMN IF NOT EXISTS icon TEXT;

-- Create item_subcategories table
CREATE TABLE item_subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES item_categories(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(category_id, value)
);

-- Enable RLS
ALTER TABLE item_subcategories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON item_subcategories FOR SELECT USING (true);

-- Clear existing categories to re-seed cleanly
TRUNCATE item_categories CASCADE;

-- Re-seed data for "Happy Soul"
DO $$
DECLARE
    org_id UUID := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    cat_id UUID;
BEGIN
    -- 1. Books
    INSERT INTO item_categories (label, value, icon, organization_id)
    VALUES ('Books', 'books', 'book', org_id) RETURNING id INTO cat_id;
    
    INSERT INTO item_subcategories (category_id, label, value) VALUES
    (cat_id, 'Higher studies books (11+)', 'higher_studies_books');

    -- 2. Electrical Items
    INSERT INTO item_categories (label, value, icon, organization_id)
    VALUES ('Electrical Items', 'electrical_items', 'plug', org_id) RETURNING id INTO cat_id;

    INSERT INTO item_subcategories (category_id, label, value) VALUES
    (cat_id, 'Washing Machine', 'washing_machine'),
    (cat_id, 'Gas Stove', 'gas_stove'),
    (cat_id, 'Microwave Oven', 'microwave'),
    (cat_id, 'Mixer Grinder', 'mixer_grinder'),
    (cat_id, 'Water Purifier', 'water_purifier'),
    (cat_id, 'Table Fan', 'table_fan'),
    (cat_id, 'Dining Table', 'dining_table'); -- User listed dining table here, though it sounds like furniture. Keeping as requested.

    -- 3. Furniture
    INSERT INTO item_categories (label, value, icon, organization_id)
    VALUES ('Furniture', 'furniture', 'sofa', org_id) RETURNING id INTO cat_id;

    INSERT INTO item_subcategories (category_id, label, value) VALUES
    (cat_id, 'Sofa', 'sofa'),
    (cat_id, 'Bed', 'bed'),
    (cat_id, 'Study Table', 'study_table');

    -- 4. Home Appliances
    INSERT INTO item_categories (label, value, icon, organization_id)
    VALUES ('Home Appliances', 'home_appliances', 'home', org_id) RETURNING id INTO cat_id;
    -- Empty subcategories for now as per prompt

    -- 5. Sports/Co-curriculum
    INSERT INTO item_categories (label, value, icon, organization_id)
    VALUES ('Sports / Co-curriculum', 'sports', 'medal', org_id) RETURNING id INTO cat_id;

    INSERT INTO item_subcategories (category_id, label, value) VALUES
    (cat_id, 'Basketball', 'basketball'),
    (cat_id, 'Football', 'football'),
    (cat_id, 'Bat', 'bat');

    -- 6. Health
    INSERT INTO item_categories (label, value, icon, organization_id)
    VALUES ('Health', 'health', 'heart-pulse', org_id) RETURNING id INTO cat_id;

    INSERT INTO item_subcategories (category_id, label, value) VALUES
    (cat_id, 'Treadmill', 'treadmill'),
    (cat_id, 'Wheel Chair', 'wheel_chair');

    -- 7. Kitchen
    INSERT INTO item_categories (label, value, icon, organization_id)
    VALUES ('Kitchen', 'kitchen', 'utensils', org_id) RETURNING id INTO cat_id;

    INSERT INTO item_subcategories (category_id, label, value) VALUES
    (cat_id, 'Utensils', 'utensils'),
    (cat_id, 'Storage', 'storage'),
    (cat_id, 'Cooking', 'cooking');

END $$;
