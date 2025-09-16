-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship');
CREATE TYPE public.experience_level AS ENUM ('entry', 'mid', 'senior', 'lead', 'executive');
CREATE TYPE public.mentorship_status AS ENUM ('pending', 'accepted', 'completed', 'cancelled');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  graduation_year INTEGER,
  current_position TEXT,
  current_company TEXT,
  location TEXT,
  bio TEXT,
  skills TEXT[],
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  avatar_url TEXT,
  is_mentor BOOLEAN DEFAULT FALSE,
  is_looking_for_mentor BOOLEAN DEFAULT FALSE,
  years_of_experience INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  posted_by UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  job_type job_type NOT NULL,
  experience_level experience_level NOT NULL,
  salary_range TEXT,
  description TEXT NOT NULL,
  requirements TEXT[],
  skills_required TEXT[],
  application_url TEXT,
  application_email TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create mentorship_requests table
CREATE TABLE public.mentorship_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mentee_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  mentor_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  goals TEXT[],
  preferred_meeting_frequency TEXT,
  status mentorship_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create endowment_contributions table
CREATE TABLE public.endowment_contributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contributor_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  message TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.endowment_contributions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for jobs
CREATE POLICY "Jobs are viewable by everyone" 
ON public.jobs FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create jobs" 
ON public.jobs FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Users can update their own jobs" 
ON public.jobs FOR UPDATE 
USING (auth.uid() = posted_by);

CREATE POLICY "Users can delete their own jobs" 
ON public.jobs FOR DELETE 
USING (auth.uid() = posted_by);

-- Create RLS policies for mentorship_requests
CREATE POLICY "Users can view their own mentorship requests" 
ON public.mentorship_requests FOR SELECT 
USING (auth.uid() = mentee_id OR auth.uid() = mentor_id);

CREATE POLICY "Users can create mentorship requests" 
ON public.mentorship_requests FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Mentors can update requests sent to them" 
ON public.mentorship_requests FOR UPDATE 
USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

-- Create RLS policies for endowment_contributions
CREATE POLICY "Contributions are viewable by everyone (except anonymous ones)" 
ON public.endowment_contributions FOR SELECT 
USING (NOT is_anonymous OR auth.uid() = contributor_id);

CREATE POLICY "Users can create their own contributions" 
ON public.endowment_contributions FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = contributor_id);

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Create storage policies for profile pictures
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentorship_requests_updated_at
  BEFORE UPDATE ON public.mentorship_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_graduation_year ON public.profiles(graduation_year);
CREATE INDEX idx_profiles_is_mentor ON public.profiles(is_mentor);
CREATE INDEX idx_jobs_posted_by ON public.jobs(posted_by);
CREATE INDEX idx_jobs_job_type ON public.jobs(job_type);
CREATE INDEX idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX idx_mentorship_requests_mentee_id ON public.mentorship_requests(mentee_id);
CREATE INDEX idx_mentorship_requests_mentor_id ON public.mentorship_requests(mentor_id);
CREATE INDEX idx_mentorship_requests_status ON public.mentorship_requests(status);
CREATE INDEX idx_endowment_contributions_contributor_id ON public.endowment_contributions(contributor_id);