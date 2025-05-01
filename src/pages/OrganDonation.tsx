
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import OrganDonationForm from '@/components/OrganDonationForm';
import OrganRequestForm from '@/components/OrganRequestForm';
import OrganListings from '@/components/OrganListings';
import { Heart } from 'lucide-react';

const OrganDonation = () => {
  const { isAuthenticated, user } = useAuth();
  const [isPostingDonation, setIsPostingDonation] = useState(false);
  const [isPostingRequest, setIsPostingRequest] = useState(false);

  const handleCancelPost = () => {
    setIsPostingDonation(false);
    setIsPostingRequest(false);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Organ Donation</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Organ donation saves lives. You can register as a donor or post a 
              request if you or someone you know needs an organ donation.
            </p>
          </div>

          {!isPostingDonation && !isPostingRequest && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex justify-center items-center gap-2">
                    <Heart className="text-red-500" />
                    Become a Donor
                  </CardTitle>
                  <CardDescription>
                    Register as an organ donor and help save lives
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button 
                    onClick={() => setIsPostingDonation(true)} 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!isAuthenticated}
                  >
                    Post Donation Offer
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex justify-center items-center gap-2">
                    <Heart className="text-blue-500" />
                    Need an Organ
                  </CardTitle>
                  <CardDescription>
                    Post a request if you or someone you know needs an organ donation
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button 
                    onClick={() => setIsPostingRequest(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!isAuthenticated}
                  >
                    Post Donation Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {!isAuthenticated && !isPostingDonation && !isPostingRequest && (
            <Card className="mb-8">
              <CardContent className="p-6 text-center">
                <p className="mb-4">You need to sign in to post donation offers or requests</p>
                <Button asChild>
                  <a href="/login">Sign In</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {isPostingDonation && (
            <div className="mb-8">
              <Button variant="outline" onClick={handleCancelPost} className="mb-4">
                ← Back to listings
              </Button>
              <OrganDonationForm onComplete={handleCancelPost} />
            </div>
          )}

          {isPostingRequest && (
            <div className="mb-8">
              <Button variant="outline" onClick={handleCancelPost} className="mb-4">
                ← Back to listings
              </Button>
              <OrganRequestForm onComplete={handleCancelPost} />
            </div>
          )}

          {!isPostingDonation && !isPostingRequest && (
            <Tabs defaultValue="requests" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="requests">Donation Requests</TabsTrigger>
                <TabsTrigger value="offerings">Donation Offerings</TabsTrigger>
              </TabsList>
              <TabsContent value="requests">
                <OrganListings type="request" />
              </TabsContent>
              <TabsContent value="offerings">
                <OrganListings type="donation" />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrganDonation;
