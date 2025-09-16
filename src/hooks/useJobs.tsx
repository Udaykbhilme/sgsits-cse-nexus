import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience_level: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  salary_range?: string;
  description: string;
  requirements?: string[];
  skills_required?: string[];
  application_url?: string;
  application_email?: string;
  is_active: boolean;
  posted_by: string;
  created_at: string;
}

export function useJobs() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load jobs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: Omit<Job, 'id' | 'posted_by' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert({ ...jobData, posted_by: user.id })
        .select()
        .single();

      if (error) throw error;

      setJobs(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Job posted successfully!",
      });

      return data;
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: "Failed to post job.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { jobs, loading, createJob, refetch: fetchJobs };
}