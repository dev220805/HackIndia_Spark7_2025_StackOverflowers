
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MapView from '@/components/MapView';
import { Link } from 'react-router-dom';

// Mock data for NGOs - in a real app, this would come from Supabase
const mockNGOs = [
  {
    id: '1',
    name: 'Save the Children',
    description: 'International NGO helping children in need through health, education, and disaster relief programs.',
    cause: ['education', 'health', 'humanitarian'],
    rating: 4.8,
    verified: true,
    activeNeeds: 5,
    location: { address: 'New York, NY' }
  },
  {
    id: '2',
    name: 'Food for All',
    description: 'Providing nutritious meals to communities facing food insecurity and poverty.',
    cause: ['food', 'humanitarian'],
    rating: 4.5,
    verified: true,
    activeNeeds: 8,
    location: { address: 'Chicago, IL' }
  },
  {
    id: '3',
    name: 'Green Earth Initiative',
    description: 'Working to protect the environment through conservation and sustainable development projects.',
    cause: ['environment', 'education'],
    rating: 4.3,
    verified: true,
    activeNeeds: 3,
    location: { address: 'Seattle, WA' }
  },
  {
    id: '4',
    name: 'Healthcare for All',
    description: 'Providing medical services to underserved communities and promoting healthcare education.',
    cause: ['health', 'education'],
    rating: 4.6,
    verified: true,
    activeNeeds: 12,
    location: { address: 'Boston, MA' }
  }
];

const Map = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [causeFilter, setCauseFilter] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState<string | null>(null);

  // Filter NGOs based on search term and filters
  const filteredNGOs = mockNGOs.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCause = causeFilter === 'all' || ngo.cause.includes(causeFilter);
    const matchesVerified = !verifiedOnly || ngo.verified;
    
    return matchesSearch && matchesCause && matchesVerified;
  });

  // Handle NGO selection from the map
  const handleSelectNGO = (id: string) => {
    setSelectedNGO(id);
    // Auto-switch to list view to see the selected NGO
    const tabsList = document.querySelector('[role="tablist"]');
    const listTab = tabsList?.querySelector('[data-state="inactive"][value="list"]');
    if (listTab) {
      (listTab as HTMLElement).click();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find NGOs Near You</h1>
        
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search NGOs by name or description"
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={causeFilter} onValueChange={setCauseFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by cause" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All causes</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="humanitarian">Humanitarian</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="verified" 
                checked={verifiedOnly} 
                onChange={() => setVerifiedOnly(!verifiedOnly)}
                className="rounded text-blue-500"
              />
              <label htmlFor="verified">Verified only</label>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          {/* List View */}
          <TabsContent value="list" className="space-y-4">
            {filteredNGOs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No NGOs found matching your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNGOs.map(ngo => (
                  <Card 
                    key={ngo.id} 
                    className={`overflow-hidden hover:shadow-lg transition-shadow ${
                      selectedNGO === ngo.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{ngo.name}</CardTitle>
                        {ngo.verified && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {ngo.location.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {ngo.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ngo.cause.map(c => (
                          <Badge key={c} variant="secondary" className="capitalize">
                            {c}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-gray-50 border-t pt-3">
                      <div className="flex items-center">
                        <span className="font-medium text-amber-600">{ngo.rating}</span>
                        <span className="text-amber-600 mx-1">★</span>
                        <span className="text-sm text-gray-500">Rating</span>
                      </div>
                      <Link to={`/ngo/${ngo.id}`} className="text-sm text-blue-600">
                        {ngo.activeNeeds} active needs
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Map View - Now using the MapView component */}
          <TabsContent value="map">
            <MapView ngos={filteredNGOs} onSelectNGO={handleSelectNGO} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Map;
