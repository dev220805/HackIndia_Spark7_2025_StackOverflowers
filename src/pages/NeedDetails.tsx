
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { needs, categories, priorities } from '@/data/mockData';
import { Heart, MapPin, Calendar, Clock, User, AlertCircle } from 'lucide-react';
import { Need } from '@/types';

const NeedDetails = () => {
  const { id } = useParams();
  const [need, setNeed] = useState<Need | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchNeed = () => {
      setLoading(true);
      const foundNeed = needs.find(n => n.id === id);
      setNeed(foundNeed || null);
      setLoading(false);
    };
    
    fetchNeed();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="w-6 h-6 border-2 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <span className="ml-2">Loading need details...</span>
        </div>
      </Layout>
    );
  }

  if (!need) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-3xl mx-auto text-center py-8">
            <CardContent>
              <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Need Not Found</h2>
              <p className="text-gray-600 mb-6">The requested need could not be found or has been removed.</p>
              <Button asChild>
                <Link to="/needs">Browse All Needs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const progress = (need.quantityFulfilled / need.quantity) * 100;
  const category = categories[need.category];
  const priority = priorities[need.priority];
  const createdDate = new Date(need.createdAt).toLocaleDateString();
  const expiryDate = new Date(need.expiresAt).toLocaleDateString();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/needs" className="hover:text-blue-600">Needs</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{need.title}</span>
          </div>

          {/* Need Header Card */}
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                  <Badge className={`${priority.color} capitalize`}>
                    {priority.label} Priority
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {category.label}
                  </Badge>
                  <Badge 
                    variant={need.status === 'active' ? 'default' : 
                           need.status === 'fulfilled' ? 'secondary' : 'destructive'} 
                    className="capitalize"
                  >
                    {need.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Posted on {createdDate}</span>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">{need.title}</CardTitle>
            </CardHeader>
          </Card>

          {/* Main content and sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="donors">Donors</TabsTrigger>
                </TabsList>

                <TabsContent value="about">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose max-w-none">
                        <h3 className="text-xl font-semibold mb-4">Description</h3>
                        <p className="mb-6 text-gray-700">{need.description}</p>

                        <h3 className="text-xl font-semibold mb-4">Location</h3>
                        <div className="flex items-center mb-6">
                          <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                          <span>{need.location.address}</span>
                        </div>

                        <h3 className="text-xl font-semibold mb-4">Timeline</h3>
                        <div className="flex items-center space-x-6 mb-6">
                          <div>
                            <p className="text-sm text-gray-500">Created on</p>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                              <span>{createdDate}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Expires on</p>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                              <span>{expiryDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline">
                  <Card>
                    <CardContent className="pt-6">
                      <ul className="space-y-4">
                        <li className="border-l-2 border-green-500 pl-4 pb-4">
                          <div className="text-sm text-gray-500">{createdDate}</div>
                          <div className="font-medium">Need Created</div>
                          <div className="text-gray-600">This need was posted by the NGO</div>
                        </li>
                        {need.quantityFulfilled > 0 && (
                          <li className="border-l-2 border-blue-500 pl-4 pb-4">
                            <div className="text-sm text-gray-500">{new Date(need.createdAt).getDate() + 2}</div>
                            <div className="font-medium">First Donation Received</div>
                            <div className="text-gray-600">The first donation was made for this need</div>
                          </li>
                        )}
                        <li className="border-l-2 border-gray-300 pl-4">
                          <div className="text-sm text-gray-500">{expiryDate}</div>
                          <div className="font-medium">Expiry Date</div>
                          <div className="text-gray-600">This need will expire if not fulfilled</div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="donors">
                  <Card>
                    <CardContent className="pt-6">
                      {need.quantityFulfilled > 0 ? (
                        <ul className="space-y-4">
                          <li className="flex items-center p-3 border-b">
                            <User className="h-10 w-10 bg-gray-100 rounded-full p-2 mr-4" />
                            <div>
                              <div className="font-medium">Anonymous Donor</div>
                              <div className="text-sm text-gray-500">Donated 2 days ago</div>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-gray-500">No donations yet</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Donation Progress</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Needed: {need.quantity}</span>
                      <span>Fulfilled: {need.quantityFulfilled}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full flex items-center justify-center" asChild>
                    <Link to={`/donate/${need.id}`}>
                      <Heart className="mr-2 h-4 w-4" />
                      Donate Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">NGO Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">NGO #{need.ngoId}</div>
                      <div className="text-sm text-gray-500">Verified Organization</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/ngo/${need.ngoId}`}>
                      View NGO Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NeedDetails;
