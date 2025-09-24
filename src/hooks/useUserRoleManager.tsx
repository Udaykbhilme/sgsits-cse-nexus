import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export function useUserRoleManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      determineUserType();
    } else {
      setUserType(null);
      setLoading(false);
    }
  }, [user]);

  const determineUserType = async () => {
    if (!user) return;

    try {
      // Check if user exists in students table
      const { data: studentData } = await supabase
        .from('students')
        .select('id')
        .eq('profile_id', user.id)
        .limit(1);

      if (studentData && studentData.length > 0) {
        setUserType('student');
        await ensureUserRole('user');
        setLoading(false);
        return;
      }

      // Check if user exists in alumni table
      const { data: alumniData } = await supabase
        .from('alumni')
        .select('id')
        .eq('profile_id', user.id)
        .limit(1);

      if (alumniData && alumniData.length > 0) {
        setUserType('alumni');
        await ensureUserRole('user');
        setLoading(false);
        return;
      }

      // Check if user exists in faculty table
      const { data: facultyData } = await supabase
        .from('faculty')
        .select('id')
        .eq('profile_id', user.id)
        .limit(1);

      if (facultyData && facultyData.length > 0) {
        setUserType('faculty');
        await ensureUserRole('moderator');
        setLoading(false);
        return;
      }

      // Check existing role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (roleData?.role === 'admin') {
        setUserType('admin');
        setLoading(false);
        return;
      }

      // Default to user if no specific type found
      setUserType('user');
      setLoading(false);
    } catch (error) {
      console.error('Error determining user type:', error);
      setUserType('user');
      setLoading(false);
    }
  };

  const ensureUserRole = async (role: 'admin' | 'moderator' | 'user') => {
    if (!user) return;

    try {
      // Check if role already exists
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', user.id)
        .eq('role', role)
        .single();

      if (!existingRole) {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: user.id, role: role });

        if (error && error.code !== '23505') { // Ignore duplicate key errors
          throw error;
        }
      }
    } catch (error) {
      console.error('Error ensuring user role:', error);
    }
  };

  return {
    userType,
    loading,
    refetch: determineUserType
  };
}