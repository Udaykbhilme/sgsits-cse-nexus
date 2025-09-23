import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type SupportRequest = Tables<'support_requests'>;
type SupportRequestInsert = TablesInsert<'support_requests'>;
type SupportRequestUpdate = TablesUpdate<'support_requests'>;

export const useSupportRequests = () => {
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSupportRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('support_requests')
        .select(`
          *,
          students!inner(
            *,
            profiles!inner(
              full_name,
              email
            )
          ),
          faculty(
            *,
            profiles!inner(
              full_name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSupportRequests(data || []);
    } catch (error) {
      console.error('Error fetching support requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch support requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createSupportRequest = async (request: SupportRequestInsert) => {
    try {
      const { data, error } = await supabase
        .from('support_requests')
        .insert(request)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "Your support request has been submitted successfully",
      });

      await fetchSupportRequests();
      return data;
    } catch (error) {
      console.error('Error creating support request:', error);
      toast({
        title: "Error",
        description: "Failed to submit support request",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSupportRequest = async (id: string, updates: SupportRequestUpdate) => {
    try {
      const { data, error } = await supabase
        .from('support_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Request Updated",
        description: "Support request has been updated successfully",
      });

      await fetchSupportRequests();
      return data;
    } catch (error) {
      console.error('Error updating support request:', error);
      toast({
        title: "Error",
        description: "Failed to update support request",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteSupportRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from('support_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Request Deleted",
        description: "Support request has been deleted successfully",
      });

      await fetchSupportRequests();
    } catch (error) {
      console.error('Error deleting support request:', error);
      toast({
        title: "Error",
        description: "Failed to delete support request",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  return {
    supportRequests,
    loading,
    createSupportRequest,
    updateSupportRequest,
    deleteSupportRequest,
    refetch: fetchSupportRequests,
  };
};