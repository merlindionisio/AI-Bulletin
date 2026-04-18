-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Weekly Digests (Sunday Newsletters)
CREATE TABLE IF NOT EXISTS "WeeklyDigests" (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. The Gamification Reactions Table
CREATE TABLE IF NOT EXISTS "Reactions" (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_url TEXT NOT NULL UNIQUE,
  upvotes INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Simple Row-Level Security (RLS) configuration for anonymous frontend access
-- This allows our Next.js edge functions to read/write publicly for now.
ALTER TABLE "WeeklyDigests" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON "WeeklyDigests" FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON "WeeklyDigests" FOR INSERT WITH CHECK (true);

ALTER TABLE "Reactions" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable public access for reactions" ON "Reactions" FOR ALL USING (true);
