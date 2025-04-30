
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { needs, categories, priorities } from '@/data/mockData';
import { Need } from '@/types';
import { Link } from 'react-router-dom';

const UrgentNeeds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');

  // Filter needs based on filters and search
  const filteredNeeds = needs.filter(need => {
    const matchesSearch = 
      need.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      need.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || need.category === categoryFilter;
    const matchesPriority = priorityFilter === '' || need.priority === priorityFilter;
    const matchesStatus = statusFilter === '' || need.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  // Sort needs by priority (high first)
  const sortedNeeds = [...filteredNeeds].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Urgent Needs</h1>
            <p className="text-gray-600">Help NGOs fulfill their most pressing requirements</p>
          </div>
          
          {/* Add need button for NGOs */}
          <Button className="mt-4 md:mt-0">
            <Link to="/create-need">Post New Need</Link>
          </Button>
        </div>

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search needs by title or description"
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {Object.entries(categories).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All priorities</SelectItem>
                  {Object.entries(priorities).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Needs listing */}
        <div className="space-y-6">
          {sortedNeeds.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No needs found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results</p>
            </div>
          ) : (
            sortedNeeds.map(need => {
              const progress = (need.quantityFulfilled / need.quantity) * 100;
              const category = categories[need.category];
              const priority = priorities[need.priority];
              
              return (
                <Card key={need.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">{need.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge className={`${priority.color} capitalize`}>
                            {priority.label} Priority
                          </Badge>
                          
                          <Badge variant="outline" className="capitalize">
                            {category.label}
                          </Badge>
                          
                          <Badge variant={need.status === 'active' ? 'default' : 
                                 need.status === 'fulfilled' ? 'secondary' : 'destructive'}
                            className="capitalize">
                            {need.status}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Date info */}
                      <div className="mt-2 sm:mt-0 text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Posted on {new Date(need.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-grow">
                        <p className="text-gray-600 mb-4">{need.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          {need.location.address}
                        </div>
                        
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
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t bg-gray-50 py-3">
                    <div className="w-full flex flex-col sm:flex-row justify-between gap-3">
                      <div>
                        <span className="text-sm text-gray-500">NGO: </span>
                        <Link to={`/ngo/${need.ngoId}`} className="text-blue-600 hover:underline">
                          {/* In a real app, we'd display the NGO name here */}
                          NGO ID: {need.ngoId}
                        </Link>
                      </div>
                      
                      <Link to={`/needs/${need.id}`} className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UrgentNeeds;
