-- Drop and recreate RLS policies with correct syntax
DROP POLICY IF EXISTS contacts_insert_anon ON contacts;
DROP POLICY IF EXISTS contacts_service ON contacts;

-- Anon can insert only
CREATE POLICY "Allow anon insert" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anon cannot select/update/delete
CREATE POLICY "Deny anon select" ON contacts
  FOR SELECT
  TO anon
  USING (false);

-- Service role full access
CREATE POLICY "Service role full access" ON contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
