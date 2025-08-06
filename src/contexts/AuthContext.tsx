import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { users as allUsers } from '../constants';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (userId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userId: number) => {
    const userToLogin = allUsers.find((u: User) => u.id === userId);
    if (userToLogin) {
      setUser(userToLogin);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users: allUsers, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};