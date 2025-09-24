import React from 'react';
import { useUserRoleManager } from '@/hooks/useUserRoleManager';
import Navigation from './Navigation';
import AdminNavigation from './AdminNavigation';
import FacultyNavigation from './FacultyNavigation';

interface UserTypeHandlerProps {
  children: React.ReactNode;
}

const UserTypeHandler: React.FC<UserTypeHandlerProps> = ({ children }) => {
  const { userType, loading } = useUserRoleManager();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const renderNavigation = () => {
    switch (userType) {
      case 'admin':
        return <AdminNavigation />;
      case 'faculty':
        return <FacultyNavigation />;
      default:
        return <Navigation />;
    }
  };

  return (
    <>
      {renderNavigation()}
      {children}
    </>
  );
};

export default UserTypeHandler;