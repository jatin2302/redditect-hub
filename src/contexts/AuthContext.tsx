import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/lib/mock-data';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('client');
  const userName = role === 'admin' ? 'Admin' : 'John D.';
  
  const logout = () => {
    console.log('Logging out...');
    window.location.href = '/login'; // Mock logout redirect
  };

  return (
    <AuthContext.Provider value={{ role, setRole, userName, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
