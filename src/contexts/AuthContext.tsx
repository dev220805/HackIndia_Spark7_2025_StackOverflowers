
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { currentUser as mockUser } from '@/data/mockData';
import { toast } from '@/components/ui/sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage (in real app)
    // For now, we'll use our mock data
    const checkAuth = async () => {
      try {
        // In a real app, this would validate the token with the backend
        setTimeout(() => {
          setUser(mockUser);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Authentication error:', error);
        setUser(null);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock login - in real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        setUser(mockUser);
        toast('Login successful', {
          description: `Welcome back, ${mockUser.name}!`,
          position: 'top-center'
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast('Login failed', {
        description: 'Invalid email or password',
        position: 'top-center',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setLoading(true);
      // Mock signup - in real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password && name && role) {
        const newUser = {
          ...mockUser,
          name,
          email,
          role,
        };
        setUser(newUser);
        toast('Account created successfully', {
          description: `Welcome, ${name}!`,
          position: 'top-center'
        });
      } else {
        throw new Error('Invalid input');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast('Signup failed', {
        description: 'Could not create account. Please try again.',
        position: 'top-center',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // In a real app, clear tokens from localStorage
    setUser(null);
    toast('Logged out successfully', {
      position: 'top-center'
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
