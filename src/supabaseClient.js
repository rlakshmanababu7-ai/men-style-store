import { createClient } from '@supabase/supabase-js'

// ============================================================
// SUPABASE SETUP INSTRUCTIONS:
// ============================================================
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Go to Settings > API
// 4. Copy your Project URL and anon/public key
// 5. Replace the values below with your own
//
// Then create these tables in the SQL Editor:
//
// CREATE TABLE cart (
//   id BIGSERIAL PRIMARY KEY,
//   product_id INTEGER NOT NULL,
//   product_name TEXT NOT NULL,
//   price NUMERIC NOT NULL,
//   size TEXT NOT NULL,
//   color TEXT NOT NULL,
//   image TEXT NOT NULL,
//   quantity INTEGER DEFAULT 1,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// CREATE TABLE orders (
//   id BIGSERIAL PRIMARY KEY,
//   customer_name TEXT NOT NULL,
//   phone TEXT NOT NULL,
//   address TEXT NOT NULL,
//   items JSONB NOT NULL,
//   total NUMERIC NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
//
// IMPORTANT: After creating tables, go to:
// Authentication > Policies
// And add a policy for each table to allow all operations:
// - Enable RLS on each table
// - Add policy: allow all for anon role
//
// Or disable RLS for demo purposes:
// ALTER TABLE cart DISABLE ROW LEVEL SECURITY;
// ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
// ============================================================

// NOTE: You must replace these with your actual Supabase Project URL and Anon Key
const supabaseUrl = 'https://mbwaifdkewfhuahhfrqw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1id2FpZmRrZXdmaHVhaGhmcnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjM0NjUsImV4cCI6MjA5MjMzOTQ2NX0.uGSiK19602_0x2h1kps9Mb8OxvViHQ-fZyOAIF0FGZo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)