-- Create students table with relationship to profiles
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id TEXT,
  batch_year INTEGER,
  enrollment_year INTEGER,
  course TEXT DEFAULT 'Computer Engineering',
  semester INTEGER,
  cgpa DECIMAL(3,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(profile_id)
);

-- Create alumni table with relationship to profiles  
CREATE TABLE public.alumni (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id TEXT,
  graduation_year INTEGER,
  course TEXT DEFAULT 'Computer Engineering',
  final_cgpa DECIMAL(3,2),
  first_job_company TEXT,
  first_job_role TEXT,
  current_company TEXT,
  current_role TEXT,
  achievements TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(profile_id)
);

-- Create faculty table with relationship to profiles
CREATE TABLE public.faculty (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  employee_id TEXT,
  department TEXT DEFAULT 'Computer Engineering',
  designation TEXT,
  joining_date DATE,
  specialization TEXT[],
  qualification TEXT,
  experience_years INTEGER,
  publications_count INTEGER DEFAULT 0,
  research_areas TEXT[],
  office_location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(profile_id)
);

-- Create support_requests table for laptop/equipment requests
CREATE TABLE public.support_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL DEFAULT 'laptop',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  reason TEXT NOT NULL,
  financial_situation TEXT,
  urgency_level TEXT DEFAULT 'medium' CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'fulfilled')),
  requested_amount DECIMAL(10,2),
  approved_amount DECIMAL(10,2),
  reviewed_by UUID REFERENCES public.faculty(id),
  review_notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for students table
CREATE POLICY "Students can view their own record" 
ON public.students 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = students.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Students can update their own record" 
ON public.students 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = students.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Students can insert their own record" 
ON public.students 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = students.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Admins and faculty can view all students" 
ON public.students 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'moderator'::app_role) OR
  EXISTS (
    SELECT 1 FROM public.faculty f
    JOIN public.profiles p ON f.profile_id = p.id
    WHERE p.user_id = auth.uid()
  )
);

-- RLS policies for alumni table
CREATE POLICY "Alumni can view their own record" 
ON public.alumni 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = alumni.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Alumni can update their own record" 
ON public.alumni 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = alumni.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Alumni can insert their own record" 
ON public.alumni 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = alumni.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Public can view alumni records" 
ON public.alumni 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage all alumni" 
ON public.alumni 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for faculty table
CREATE POLICY "Faculty can view their own record" 
ON public.faculty 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = faculty.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Faculty can update their own record" 
ON public.faculty 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = faculty.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Faculty can insert their own record" 
ON public.faculty 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE profiles.id = faculty.profile_id 
  AND profiles.user_id = auth.uid()
));

CREATE POLICY "Public can view faculty records" 
ON public.faculty 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage all faculty" 
ON public.faculty 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for support_requests table
CREATE POLICY "Students can view their own support requests" 
ON public.support_requests 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.students s
  JOIN public.profiles p ON s.profile_id = p.id
  WHERE s.id = support_requests.student_id 
  AND p.user_id = auth.uid()
));

CREATE POLICY "Students can create their own support requests" 
ON public.support_requests 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.students s
  JOIN public.profiles p ON s.profile_id = p.id
  WHERE s.id = support_requests.student_id 
  AND p.user_id = auth.uid()
));

CREATE POLICY "Students can update their pending support requests" 
ON public.support_requests 
FOR UPDATE 
USING (
  status = 'pending' AND
  EXISTS (
    SELECT 1 FROM public.students s
    JOIN public.profiles p ON s.profile_id = p.id
    WHERE s.id = support_requests.student_id 
    AND p.user_id = auth.uid()
  )
);

CREATE POLICY "Faculty can view and manage support requests" 
ON public.support_requests 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.faculty f
  JOIN public.profiles p ON f.profile_id = p.id
  WHERE p.user_id = auth.uid()
));

CREATE POLICY "Admins can manage all support requests" 
ON public.support_requests 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alumni_updated_at
BEFORE UPDATE ON public.alumni
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faculty_updated_at
BEFORE UPDATE ON public.faculty
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_support_requests_updated_at
BEFORE UPDATE ON public.support_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_students_profile_id ON public.students(profile_id);
CREATE INDEX idx_alumni_profile_id ON public.alumni(profile_id);
CREATE INDEX idx_faculty_profile_id ON public.faculty(profile_id);
CREATE INDEX idx_support_requests_student_id ON public.support_requests(student_id);
CREATE INDEX idx_support_requests_status ON public.support_requests(status);