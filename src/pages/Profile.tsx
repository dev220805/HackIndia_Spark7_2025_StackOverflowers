
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import { User, Settings, MapPin, History, Package } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // In a real app, this would update the user's profile in the database
    toast('Profile updated successfully', {
      description: 'Your profile information has been saved.',
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[70vh]">
          <div className="w-6 h-6 border-2 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <span className="ml-2">Loading profile...</span>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please log in to view your profile.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <a href="/login">Log In</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile sidebar */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
                    <p className="text-gray-600 mb-4">{user?.email}</p>
                    
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4 capitalize">
                      {user?.role}
                    </div>
                    
                    <div className="w-full">
                      {user?.location?.address && (
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin size={16} className="mr-2" />
                          <span className="text-sm">{user.location.address}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center text-gray-600">
                        <User size={16} className="mr-2" />
                        <span className="text-sm">Member since {new Date(user?.createdAt || '').toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="profile">
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  {user?.role === 'donor' && <TabsTrigger value="donations">My Donations</TabsTrigger>}
                  {user?.role === 'ngo' && <TabsTrigger value="needs">My Needs</TabsTrigger>}
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Personal Information</CardTitle>
                          <CardDescription>Manage your personal details</CardDescription>
                        </div>
                        <Button 
                          variant={isEditing ? "outline" : "secondary"} 
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          {isEditing ? "Cancel" : "Edit"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            placeholder="Your name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="Your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            disabled={!isEditing}
                          />
                        </div>
                        
                        {user?.role === 'ngo' && (
                          <div>
                            <Label htmlFor="verified">Verification Status</Label>
                            <div className="mt-1 flex items-center">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${user.verified ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                {user.verified ? 'Verified NGO' : 'Verification Pending'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    {isEditing && (
                      <CardFooter>
                        <Button onClick={handleSave}>Save Changes</Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>
                
                {user?.role === 'donor' && (
                  <TabsContent value="donations">
                    <Card>
                      <CardHeader>
                        <CardTitle>My Donations</CardTitle>
                        <CardDescription>Track your donation history</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-gray-500">
                          <History className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                          <p>You haven't made any donations yet.</p>
                          <Button className="mt-4" asChild>
                            <a href="/urgent-needs">Browse Urgent Needs</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
                
                {user?.role === 'ngo' && (
                  <TabsContent value="needs">
                    <Card>
                      <CardHeader>
                        <CardTitle>My Posted Needs</CardTitle>
                        <CardDescription>Manage your organization's needs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-gray-500">
                          <Package className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                          <p>You haven't posted any needs yet.</p>
                          <Button className="mt-4" asChild>
                            <a href="/create-need">Post a New Need</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your account preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Change Password</h4>
                              <p className="text-sm text-gray-500">Update your password regularly for security</p>
                            </div>
                            <Button variant="outline">Change</Button>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Notification Preferences</h4>
                              <p className="text-sm text-gray-500">Manage how you receive notifications</p>
                            </div>
                            <Button variant="outline">Configure</Button>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-red-600">Delete Account</h4>
                              <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                            </div>
                            <Button variant="destructive">Delete</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
