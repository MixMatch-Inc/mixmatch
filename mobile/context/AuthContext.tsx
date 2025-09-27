import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import authStorage from '../utils/authStorage';

interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {

    const loadToken = async () => {
      const storedToken = await authStorage.getToken();
      if (storedToken) {
        setToken(storedToken);
      }
      setIsLoading(false);
    };

    loadToken();
  }, []);
  
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (token && inAuthGroup) {
    
    
      router.replace('/');
    } else if (!token && !inAuthGroup) {
    
    
      router.replace('/login');
    }
  }, [token, segments, isLoading]);


  const login = async (newToken: string) => {
    setToken(newToken);
    await authStorage.storeToken(newToken);
    router.replace('/');
  };

  const logout = async () => {
    setToken(null);
    await authStorage.removeToken();
    router.replace('/login');
  };
  
  const value = {
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}