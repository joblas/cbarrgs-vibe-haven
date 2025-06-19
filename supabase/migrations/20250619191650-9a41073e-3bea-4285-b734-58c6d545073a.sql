
-- Check current RLS status for subscribers table (using correct column names)
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'subscribers';

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'subscribers';

-- Create a policy that allows anyone to insert (recommended for newsletter signups)
CREATE POLICY "Allow anonymous subscribers" ON public.subscribers
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);
