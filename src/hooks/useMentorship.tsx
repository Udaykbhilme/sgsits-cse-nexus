import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface MentorshipRequest {
  id: string;
  mentee_id: string;
  mentor_id: string;
  title: string;
  description: string;
  goals?: string[];
  preferred_meeting_frequency?: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  created_at: string;
}

export function useMentorship() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch mentorship requests for current user
      const { data: requestsData } = await supabase
        .from('mentorship_requests')
        .select('*')
        .or(`mentee_id.eq.${user?.id},mentor_id.eq.${user?.id}`)
        .order('created_at', { ascending: false });

      // Fetch available mentors
      const { data: mentorsData } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_mentor', true);

      setRequests(requestsData || []);
      setMentors(mentorsData || []);
    } catch (error) {
      console.error('Error fetching mentorship data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async (requestData: Omit<MentorshipRequest, 'id' | 'mentee_id' | 'created_at' | 'status'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('mentorship_requests')
        .insert({ ...requestData, mentee_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setRequests(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Mentorship request sent successfully!",
      });

      return data;
    } catch (error) {
      console.error('Error creating request:', error);
      toast({
        title: "Error",
        description: "Failed to send mentorship request.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return { requests, mentors, loading, createRequest, refetch: fetchData };
}