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
}

export default function OrganListings({ selectedTab = 'all' }: OrganListingsProps) {
  const [donations, setDonations] = useState<OrganDonation[]>([]);
  const [requests, setRequests] = useState<OrganDonation[]>([]);
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
          .select(`*, profiles:user_id(name)`)
          .eq('type', 'donation')
          .order('created_at', { ascending: false });
        
        if (donationError) {
          throw donationError;
        }
        
        // Fetch requests
        const { data: requestData, error: requestError } = await supabase
          .from('organ_donations')
          .select(`*, profiles:user_id(name)`)
          .eq('type', 'request')
          .order('created_at', { ascending: false });
        
        if (requestError) {
          throw requestError;
        }
        
        // Transform the data to match OrganDonation type
        const formattedDonations = donationData.map(item => ({
          id: item.id,
          userId: item.user_id,
          type: 'donation' as const,
          organType: item.organ_type,
          bloodType: item.blood_type,
          hospital: item.hospital,
          patientDetails: item.patient_details,
          medicalHistory: item.medical_history,
          urgency: item.urgency,
          status: item.status,
          notes: item.notes,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          userName: item.profiles?.name || 'Anonymous'
        }));
        
        const formattedRequests = requestData.map(item => ({
          id: item.id,
          userId: item.user_id,
          type: 'request' as const,
          organType: item.organ_type,
          bloodType: item.blood_type,
          hospital: item.hospital,
          patientDetails: item.patient_details,
          medicalHistory: item.medical_history,
          urgency: item.urgency,
          status: item.status,
          notes: item.notes,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          userName: item.profiles?.name || 'Anonymous'
        }));
        
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

  const OrganCard = ({ organ }: { organ: OrganDonation }) => (
    <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">{organ.organType}</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Posted by: {organ.userName}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`uppercase ${getUrgencyColor(organ.urgency)}`}>
            {organ.urgency}
          </Badge>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(organ.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-700 dark:text-gray-200">
          Blood Type: {organ.bloodType}
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          Hospital: {organ.hospital}
        </p>
        {isAuthenticated && user?.role === 'ngo' && (
          <p className="text-gray-700 dark:text-gray-200">
            Notes: {organ.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    if (loading) {
      return <div className="text-center">Loading organ data...</div>;
    }

    let filteredData: OrganDonation[];
    if (activeTab === 'donations') {
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
