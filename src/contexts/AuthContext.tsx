
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast('Failed to fetch profile', {
            description: profileError.message,
            position: 'top-center',
          });
        } else {
          const userRole = profileData?.role as UserRole;
          
          // Safely handle location data with type checking
          let locationData;
          if (profileData?.location && typeof profileData.location === 'object') {
            const location = profileData.location as Record<string, any>;
            locationData = {
              lat: typeof location.lat === 'number' ? location.lat : 0,
              lng: typeof location.lng === 'number' ? location.lng : 0,
              address: typeof location.address === 'string' ? location.address : '',
            };
          }

          setUser({
            id: session.user.id,
            name: profileData?.name || session.user.email || 'User',
            email: session.user.email || '',
            role: userRole,
            avatar: profileData?.avatar_url || '',
            location: locationData,
            createdAt: profileData?.created_at || new Date().toISOString(),
            verified: profileData?.verified || false,
          });
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
    };

    getSession();

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast('Failed to fetch profile', {
            description: profileError.message,
            position: 'top-center',
          });
        } else {
          const userRole = profileData?.role as UserRole;
          
          // Safely handle location data with type checking
          let locationData;
          if (profileData?.location && typeof profileData.location === 'object') {
            const location = profileData.location as Record<string, any>;
            locationData = {
              lat: typeof location.lat === 'number' ? location.lat : 0,
              lng: typeof location.lng === 'number' ? location.lng : 0,
              address: typeof location.address === 'string' ? location.address : '',
            };
          }

          setUser({
            id: session.user.id,
            name: profileData?.name || session.user.email || 'User',
            email: session.user.email || '',
            role: userRole,
            avatar: profileData?.avatar_url || '',
            location: locationData,
            createdAt: profileData?.created_at || new Date().toISOString(),
            verified: profileData?.verified || false,
          });
          setIsAuthenticated(true);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, [navigate]);

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setLoading(true);
      console.log('Signing up with role:', role); // Debug log
      
      // First, sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            role: role,
          },
        },
      });
      
      if (error) throw error;

      if (data.user) {
        // Check if the user already has a profile
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();
          
        if (profileError) {
          console.error('Error checking profile:', profileError);
        }
          
        // If no profile exists, create one
        if (!existingProfile) {
          // Convert UserRole to database enum type
          const dbRole = role === 'donor' ? 'donor' : 'ngo';
          
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              name: name,
              role: dbRole
            });
            
          if (insertError) {
            console.error('Error creating profile:', insertError);
            throw insertError;
          }
        }
        
        toast('Account created successfully', {
          description: 'Please check your email to verify your account',
          position: 'top-center',
        });
        setIsAuthenticated(true);
        setUser({
          id: data.user.id,
          name: name,
          email: data.user.email || '',
          role: role,
          createdAt: new Date().toISOString(),
          verified: false
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      const errorMessage = (error as Error).message || 'An error occurred during signup';
      toast('Signup failed', {
        description: errorMessage,
        position: 'top-center',
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast('Failed to fetch profile', {
            description: profileError.message,
            position: 'top-center',
          });
        } else {
          const userRole = profileData?.role as UserRole;
          
          // Safely handle location data with type checking
          let locationData;
          if (profileData?.location && typeof profileData.location === 'object') {
            const location = profileData.location as Record<string, any>;
            locationData = {
              lat: typeof location.lat === 'number' ? location.lat : 0,
              lng: typeof location.lng === 'number' ? location.lng : 0,
              address: typeof location.address === 'string' ? location.address : '',
            };
          }
          
          setUser({
            id: data.user.id,
            name: profileData?.name || data.user.email || 'User',
            email: data.user.email || '',
            role: userRole,
            avatar: profileData?.avatar_url || '',
            location: locationData,
            createdAt: profileData?.created_at || new Date().toISOString(),
            verified: profileData?.verified || false,
          });
          setIsAuthenticated(true);
          navigate('/');
          toast('Login successful', {
            position: 'top-center',
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast('Login failed', {
        description: (error as Error).message || 'Invalid credentials',
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
      toast('Logout successful', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast('Logout failed', {
        description: (error as Error).message || 'An error occurred',
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
