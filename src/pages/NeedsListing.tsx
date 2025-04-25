
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { needs, categories, priorities } from '@/data/mockData';
import { SearchIcon, Filter, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NeedCategory, NeedPriority } from '@/types';

const NeedsListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');

  // Filter needs based on search and filters
  const filteredNeeds = needs.filter(need => {
    // Search by title or description
    const matchesSearch = !searchQuery || 
      need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      need.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = !selectedCategory || need.category === selectedCategory;
    
    // Filter by priority
    const matchesPriority = !selectedPriority || need.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Urgent Needs</h1>
            <p className="text-gray-600">
              Discover where your help is needed most and make a real difference by fulfilling specific needs from verified NGOs.
            </p>
          </div>
          
          {/* Filters */}
          <div className="mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search needs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Category filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {Object.entries(categories).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Priority filter */}
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Priorities</SelectItem>
                    {Object.entries(priorities).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNeeds.length > 0 ? (
              filteredNeeds.map(need => {
                const progress = (need.quantityFulfilled / need.quantity) * 100;
                const category = categories[need.category];
                const priority = priorities[need.priority];
                
                // Calculate days remaining
                const expiryDate = new Date(need.expiresAt);
                const today = new Date();
                const daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card key={need.id} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{need.title}</CardTitle>
                        <Badge className={`${priority.color} capitalize`}>{priority.label}</Badge>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{need.location.address.split(',').slice(-2).join(',').trim()}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-4">
                      <Badge variant="outline" className="capitalize mb-3">
                        {category.label}
                      </Badge>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {need.description}
                      </p>
                      
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
                        
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{daysRemaining} days remaining</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t bg-gray-50 py-3">
                      <Link to={`/needs/${need.id}`} className="w-full">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No needs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedPriority('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NeedsListing;
