import React, { createContext, useContext } from 'react';
import { useAuth as useManusAuth } from '@/_core/hooks/useAuth';

// Re-export Manus auth as AuthContext for compatibility with meigu2.0 code
const AuthContext = createContext<ReturnType<typeof useManusAuth> | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useManusAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
