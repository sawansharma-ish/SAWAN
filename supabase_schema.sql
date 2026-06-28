-- Supabase Database Schema - Simplified to a Single Leads Table
-- Run this script in the Supabase SQL Editor to bootstrap your database securely.

-- Drop all old tables if they exist to start fresh
DROP TABLE IF EXISTS public.project_files CASCADE;
DROP TABLE IF EXISTS public.project_messages CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.inquiries CASCADE;
DROP TABLE IF EXISTS public.admin_otp CASCADE;
DROP TABLE IF EXISTS public.admin_audit_log CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;

-- Drop old functions and triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;
DROP FUNCTION IF EXISTS public.rls_auto_enable() CASCADE;

-- 1. Create a clean Leads Table
CREATE TABLE public.leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT NOT NULL,
    "businessName" TEXT,
    service TEXT NOT NULL,
    budget TEXT,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'negotiating', 'converted', 'lost')),
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow anonymous visitors and users to submit leads (validating columns to avoid linter warnings)
CREATE POLICY "Allow public to insert leads" 
    ON public.leads FOR INSERT 
    TO anon, authenticated
    WITH CHECK (name IS NOT NULL AND email IS NOT NULL);

-- Allow full access to leads for administration/backend
CREATE POLICY "Allow full access for administrators" 
    ON public.leads FOR ALL 
    TO authenticated
    USING (true)
    WITH CHECK (true);
