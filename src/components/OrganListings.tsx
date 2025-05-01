
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { organTypes } from '@/data/organData';

type OrganDonationUser = {
  name: string;
  email: string;
};

type OrganDonation = {
  id: string;
  created_at: string;
  user_id: string;
  type: 'donation' | 'request';
  organ_type: string;
  blood_type: string;
  urgency?: 'low' | 'medium' | 'high';
  medical_history?: string;
  patient_details?: string;
  hospital?: string;
  notes?: string;
  status: 'active' | 'matched' | 'completed' | 'cancelled';
  profiles?: OrganDonationUser;
};

type OrganListingsProps = {
  type: 'donation' | 'request';
};

const OrganListings = ({ type }: OrganListingsProps) => {
  const [listings, setListings] = useState<OrganDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  const getOrganLabel = (value: string) => {
    const organ = organTypes.find(o => o.value === value);
    return organ ? organ.label : value;
  };
  
  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('organ_donations')
          .select(`
            *,
            profiles:user_id (
              name,
              email
            )
          `)
          .eq('type', type)
          .eq('status', 'active')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setListings(data || []);
      } catch (error) {
        console.error(`Error fetching ${type} listings:`, error);
        toast(`Failed to load ${type} listings`, {
          description: 'Please try again later',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchListings();
  }, [type]);

  const handleContact = (listing: OrganDonation) => {
    if (!isAuthenticated) {
      toast('Authentication required', {
        description: 'Please sign in to contact donors or requesters',
        action: {
          label: 'Sign In',
          onClick: () => window.location.href = '/login'
        }
      });
      return;
    }
    
    // In a real app, this would open a chat or contact form
    toast('Contact initiated', {
      description: `You'll be connected with ${listing.profiles?.name} shortly`,
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
        <p className="mt-4">Loading listings...</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No {type === 'donation' ? 'donation offers' : 'donation requests'} yet</h3>
        <p className="text-gray-500 mb-6">Be the first to post a {type === 'donation' ? 'donation offer' : 'donation request'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {listings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{getOrganLabel(listing.organ_type)}</CardTitle>
                <CardDescription>
                  Blood Type: {listing.blood_type} • Posted{' '}
                  {new Date(listing.created_at).toLocaleDateString()}
                </CardDescription>
              </div>
              {listing.urgency && (
                <Badge className={getUrgencyColor(listing.urgency)}>
                  {listing.urgency.charAt(0).toUpperCase() + listing.urgency.slice(1)} Priority
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {listing.patient_details && (
                <div>
                  <p className="text-sm font-medium">Patient Details:</p>
                  <p className="text-sm text-gray-600">{listing.patient_details}</p>
                </div>
              )}
              
              {listing.hospital && (
                <div>
                  <p className="text-sm font-medium">Hospital:</p>
                  <p className="text-sm text-gray-600">{listing.hospital}</p>
                </div>
              )}
              
              {listing.medical_history && (
                <div>
                  <p className="text-sm font-medium">Medical History:</p>
                  <p className="text-sm text-gray-600">{listing.medical_history}</p>
                </div>
              )}
              
              {listing.notes && (
                <div>
                  <p className="text-sm font-medium">Additional Notes:</p>
                  <p className="text-sm text-gray-600">{listing.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 p-4">
            <div className="w-full">
              <Button 
                onClick={() => handleContact(listing)}
                className="w-full"
                disabled={listing.user_id === user?.id}
              >
                {listing.user_id === user?.id ? 'Your Post' : 'Contact'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default OrganListings;
