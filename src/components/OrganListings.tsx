
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrganDonation } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

interface OrganListingsProps {
  selectedTab?: string;
  type?: 'donation' | 'request';
}

// Create an extended type that includes the userName property
interface ExtendedOrganDonation extends OrganDonation {
  userName?: string;
}

export default function OrganListings({ selectedTab = 'all', type }: OrganListingsProps) {
  const [donations, setDonations] = useState<ExtendedOrganDonation[]>([]);
  const [requests, setRequests] = useState<ExtendedOrganDonation[]>([]);
  const [activeTab, setActiveTab] = useState(selectedTab);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchOrganData = async () => {
      try {
        setLoading(true);
        
        // Fetch donations
        const { data: donationData, error: donationError } = await supabase
          .from('organ_donations')
          .select('*')
          .eq('type', 'donation')
          .order('created_at', { ascending: false });
        
        if (donationError) {
          throw donationError;
        }
        
        // Fetch requests
        const { data: requestData, error: requestError } = await supabase
          .from('organ_donations')
          .select('*')
          .eq('type', 'request')
          .order('created_at', { ascending: false });
        
        if (requestError) {
          throw requestError;
        }
        
        // Get user profiles for the donation data
        const donationUserIds = donationData.map(item => item.user_id);
        const { data: donationProfiles } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', donationUserIds);
        
        // Get user profiles for the request data
        const requestUserIds = requestData.map(item => item.user_id);
        const { data: requestProfiles } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', requestUserIds);
          
        // Create a map of user IDs to names for quick lookup
        const profileMap = new Map();
        [...(donationProfiles || []), ...(requestProfiles || [])].forEach(profile => {
          if (profile && profile.id) {
            profileMap.set(profile.id, profile.name);
          }
        });
        
        // Transform donation data to match our ExtendedOrganDonation type
        const formattedDonations: ExtendedOrganDonation[] = donationData.map(item => {
          const donation: ExtendedOrganDonation = item as ExtendedOrganDonation;
          donation.userName = profileMap.get(item.user_id) || 'Anonymous';
          return donation;
        });
        
        // Transform request data to match our ExtendedOrganDonation type
        const formattedRequests: ExtendedOrganDonation[] = requestData.map(item => {
          const request: ExtendedOrganDonation = item as ExtendedOrganDonation;
          request.userName = profileMap.get(item.user_id) || 'Anonymous';
          return request;
        });
        
        setDonations(formattedDonations);
        setRequests(formattedRequests);
      } catch (error) {
        console.error('Error fetching organ donation data:', error);
        toast('Failed to load organ donation data', {
          position: 'top-center',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrganData();
  }, []);
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-gray-900';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const OrganCard = ({ organ }: { organ: ExtendedOrganDonation }) => (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">{organ.organ_type}</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Posted by: {organ.userName || 'Anonymous'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`uppercase ${getUrgencyColor(organ.urgency || 'low')}`}>
            {organ.urgency || 'low'}
          </Badge>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(organ.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-200">
          Blood Type: {organ.blood_type}
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          Hospital: {organ.hospital || 'Not specified'}
        </p>
        {isAuthenticated && user?.role === 'ngo' && (
          <p className="text-gray-700 dark:text-gray-200">
            Notes: {organ.notes || 'None'}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    if (loading) {
      return <div className="text-center">Loading organ donation data...</div>;
    }

    let filteredData: ExtendedOrganDonation[];
    
    // If type prop is provided, show only that type regardless of active tab
    if (type === 'donation') {
      filteredData = donations;
    } else if (type === 'request') {
      filteredData = requests;
    } else if (activeTab === 'donations') {
      filteredData = donations;
    } else if (activeTab === 'requests') {
      filteredData = requests;
    } else {
      filteredData = [...donations, ...requests];
    }

    if (filteredData.length === 0) {
      return <div className="text-center">No organ data available.</div>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((organ) => (
          <OrganCard key={organ.id} organ={organ} />
        ))}
      </div>
    );
  };

  // If a specific type is provided, don't show the tabs
  if (type) {
    return (
      <div className="container mx-auto py-8">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="justify-center">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {renderContent()}
        </TabsContent>
        <TabsContent value="donations" className="mt-6">
          {renderContent()}
        </TabsContent>
        <TabsContent value="requests" className="mt-6">
          {renderContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
