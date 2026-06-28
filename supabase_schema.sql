-- Supabase Database Schema with Row Level Security (RLS)
-- Run this script in the Supabase SQL Editor to bootstrap your database securely.

-- 1. Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    role TEXT DEFAULT 'Client' CHECK (role IN ('Client', 'Admin', 'Super Admin', 'Staff')),
    register_date TIMESTAMPTZ DEFAULT now(),
    last_login TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Leads Table (For prospective project enquiries)
CREATE TABLE IF NOT EXISTS public.leads (
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

-- Enable RLS on leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. Inquiries Table (For general contact form submissions)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    replied BOOLEAN DEFAULT false,
    "replyText" TEXT,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 5. Projects Table (For client portal project tracking)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    "userId" UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    "userName" TEXT,
    "userEmail" TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    "serviceType" TEXT,
    budget TEXT,
    timeline TEXT,
    progress INTEGER DEFAULT 10,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analysis', 'UI/UX Design', 'Development', 'Testing', 'Completed')),
    "submissionDate" TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 6. Project Messages Table (For real-time architect-client communication)
CREATE TABLE IF NOT EXISTS public.project_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "projectId" TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
    sender TEXT CHECK (sender IN ('user', 'admin')),
    text TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on project_messages
ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;

-- 7. Project Files Table (For shared project documents)
CREATE TABLE IF NOT EXISTS public.project_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "projectId" TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    size TEXT,
    "uploadedAt" TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on project_files
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

-- 8. Admin OTP Table (For 2FA administrative codes)
CREATE TABLE IF NOT EXISTS public.admin_otp (
    email TEXT PRIMARY KEY,
    otp_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on admin_otp
ALTER TABLE public.admin_otp ENABLE ROW LEVEL SECURITY;

-- 9. Admin Audit Log Table (For security tracing)
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID,
    email TEXT NOT NULL,
    ip_address TEXT,
    action TEXT NOT NULL,
    status TEXT NOT NULL,
    user_agent TEXT,
    severity TEXT DEFAULT 'INFO' CHECK (severity IN ('INFO', 'WARNING', 'CRITICAL')),
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on admin_audit_log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;


-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Helper function to check if the current user is an Administrator or Staff
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
          AND role IN ('Admin', 'Super Admin', 'Staff')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- --- PROFILES POLICIES ---
CREATE POLICY "Allow users to read their own profiles" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own profiles" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id) 
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow admins all access to profiles" 
    ON public.profiles FOR ALL 
    USING (public.is_admin());


-- --- LEADS POLICIES ---
CREATE POLICY "Allow anyone to submit leads" 
    ON public.leads FOR INSERT 
    TO anon, authenticated
    WITH CHECK (name IS NOT NULL AND email IS NOT NULL);

CREATE POLICY "Allow admins all access to leads" 
    ON public.leads FOR ALL 
    USING (public.is_admin());


-- --- INQUIRIES POLICIES ---
CREATE POLICY "Allow anyone to submit inquiries" 
    ON public.inquiries FOR INSERT 
    TO anon, authenticated
    WITH CHECK (name IS NOT NULL AND email IS NOT NULL AND message IS NOT NULL);

CREATE POLICY "Allow admins all access to inquiries" 
    ON public.inquiries FOR ALL 
    USING (public.is_admin());


-- --- PROJECTS POLICIES ---
CREATE POLICY "Allow clients to read their own projects" 
    ON public.projects FOR SELECT 
    USING (auth.uid() = "userId");

CREATE POLICY "Allow clients to create their own projects" 
    ON public.projects FOR INSERT 
    WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Allow admins all access to projects" 
    ON public.projects FOR ALL 
    USING (public.is_admin());


-- --- PROJECT MESSAGES POLICIES ---
CREATE POLICY "Allow clients to read messages for their own projects" 
    ON public.project_messages FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.projects 
        WHERE projects.id = "projectId" 
          AND projects."userId" = auth.uid()
    ));

CREATE POLICY "Allow clients to post messages to their own projects" 
    ON public.project_messages FOR INSERT 
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.projects 
        WHERE projects.id = "projectId" 
          AND projects."userId" = auth.uid()
    ) AND sender = 'user');

CREATE POLICY "Allow admins all access to project messages" 
    ON public.project_messages FOR ALL 
    USING (public.is_admin());


-- --- PROJECT FILES POLICIES ---
CREATE POLICY "Allow clients to read files for their own projects" 
    ON public.project_files FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM public.projects 
        WHERE projects.id = "projectId" 
          AND projects."userId" = auth.uid()
    ));

CREATE POLICY "Allow clients to upload files to their own projects" 
    ON public.project_files FOR INSERT 
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.projects 
        WHERE projects.id = "projectId" 
          AND projects."userId" = auth.uid()
    ));

CREATE POLICY "Allow admins all access to project files" 
    ON public.project_files FOR ALL 
    USING (public.is_admin());


-- --- ADMIN OTP POLICIES ---
-- Allowed for backend server operations (checked using hashed matches or email)
CREATE POLICY "Allow inserting OTPs" 
    ON public.admin_otp FOR INSERT 
    TO anon, authenticated
    WITH CHECK (expires_at > now() AND used = false);

CREATE POLICY "Allow selecting OTPs" 
    ON public.admin_otp FOR SELECT 
    TO anon, authenticated
    USING (expires_at > now() AND used = false);

CREATE POLICY "Allow updating OTPs" 
    ON public.admin_otp FOR UPDATE 
    TO anon, authenticated
    USING (expires_at > now() AND used = false)
    WITH CHECK (used = true);

CREATE POLICY "Allow deleting OTPs" 
    ON public.admin_otp FOR DELETE 
    TO anon, authenticated
    USING (false);


-- --- ADMIN AUDIT LOG POLICIES ---
CREATE POLICY "Allow anyone to append audit logs" 
    ON public.admin_audit_log FOR INSERT 
    TO anon, authenticated
    WITH CHECK (email IS NOT NULL AND action IS NOT NULL);

CREATE POLICY "Allow admins to read audit logs" 
    ON public.admin_audit_log FOR SELECT 
    USING (public.is_admin());


-- =========================================================================
-- AUTOMATED AUTH TO PROFILES TRIGGER
-- =========================================================================

-- Trigger function to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, phone, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'phone', ''),
        COALESCE(new.raw_user_meta_data->>'role', 'Client')
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create the trigger
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =========================================================================
-- FUNCTION EXECUTION PRIVILEGES LOCKDOWN
-- =========================================================================

-- Revoke default public/anonymous/authenticated execute access on security definer functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon, authenticated;

-- Also revoke execution on public.rls_auto_enable if it exists in the database
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc 
        JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid 
        WHERE proname = 'rls_auto_enable' AND nspname = 'public'
    ) THEN
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;';
    END IF;
END $$;
