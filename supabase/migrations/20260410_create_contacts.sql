-- algorithms.technology contacts table
CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  school text,
  role text CHECK (role IN ('parent', 'teacher', 'pc_member', 'principal', 'other')),
  state text CHECK (state IN ('NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT')),
  source text DEFAULT 'schools',
  tags text[] DEFAULT '{}',
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Anon can insert (form submissions) but not read
CREATE POLICY contacts_insert_anon ON contacts
  FOR INSERT TO anon WITH CHECK (true);

-- Service role has full access
CREATE POLICY contacts_service ON contacts
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_source ON contacts(source);
CREATE INDEX idx_contacts_role ON contacts(role);
CREATE INDEX idx_contacts_state ON contacts(state);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
