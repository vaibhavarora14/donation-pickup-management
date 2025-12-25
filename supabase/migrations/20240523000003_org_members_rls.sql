-- Create organization_members table
CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- Enable RLS
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own membership
CREATE POLICY "Users can view own membership" ON organization_members
    FOR SELECT USING (auth.uid() = user_id);

-- Updated Policies for Donations Table
-- First, ensure RLS is enabled (it should be, but just in case)
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- 1. Allow public Insert (already exists, but reaffirming logic)
-- existing policy: "Enable insert for everyone"

-- 2. Allow Read for Organization Members
CREATE POLICY "Org members can view their org donations" ON donations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = donations.organization_id
            AND om.user_id = auth.uid()
        )
    );

-- 3. Allow Update for Organization Members
CREATE POLICY "Org members can update their org donations" ON donations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = donations.organization_id
            AND om.user_id = auth.uid()
        )
    );
