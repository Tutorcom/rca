import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    // Or redirect to login
    return <p>Please log in to view this page.</p>;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
        <div className="text-center p-10 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-danger">Access Denied</h2>
            <p className="text-slate-500 mt-2">You do not have permission to view this page.</p>
        </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
