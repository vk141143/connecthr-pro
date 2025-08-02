import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'employee' | 'hr' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  employeeId: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@company.com',
    role: 'employee',
    department: 'Engineering',
    employeeId: 'EMP001'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@company.com',
    role: 'hr',
    department: 'Human Resources',
    employeeId: 'HR001'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@company.com',
    role: 'admin',
    department: 'Administration',
    employeeId: 'ADM001'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}