
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { supabase } from '@/integrations/supabase/client';
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

  // Check active session and subscribe to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      
      if (profileData) {
        // Transform the profile data to match the User type
        const userData: User = {
          id: profileData.id,
          email: '', // We need to get this from the auth.user
          name: profileData.name,
          role: profileData.role as UserRole,
          avatar: profileData.avatar_url,
          createdAt: profileData.created_at,
          verified: profileData.verified || false,
          location: profileData.location as any,
        };
        
        // Get the email from the auth user
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser?.user) {
          userData.email = authUser.user.email || '';
        }
        
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast('Error loading profile', {
        description: 'Please try refreshing the page',
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast('Login successful', {
        description: 'Welcome back!',
        position: 'top-center',
      });
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (error) throw error;

      toast('Account created successfully', {
        description: 'Please check your email to verify your account',
        position: 'top-center',
      });
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

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast('Logged out successfully', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast('Logout failed', {
        description: 'Please try again',
        position: 'top-center',
      });
    }
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
