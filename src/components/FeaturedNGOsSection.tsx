
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ngos } from '@/data/mockData';
import { MapPin, Shield, Star } from 'lucide-react';

const FeaturedNGOsSection = () => {
  // Get top 3 NGOs (highest rated)
  const featuredNGOs = [...ngos]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured NGOs</h2>
            <p className="text-gray-600">Discover organizations making a real difference</p>
          </div>
          <Link to="/map" className="mt-4 md:mt-0">
            <Button variant="outline">Explore All NGOs</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredNGOs.map(ngo => (
            <Card key={ngo.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="p-0">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${ngo.id === '1' ? '1488521787991-ed7bbaae773c' : 
                           ngo.id === '2' ? '1523240795612-9a054b0db644' : 
                           '1568839857221-5cd685815604'}?q=80&w=600`} 
                    alt={ngo.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center bg-white/90 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span className="text-sm font-semibold">{ngo.rating.toFixed(1)}</span>
                  </div>
                  {ngo.verified && (
                    <div className="absolute bottom-3 left-3 flex items-center bg-blue-500/90 text-white px-2 py-1 rounded-full">
                      <Shield className="h-4 w-4 mr-1" />
                      <span className="text-xs font-semibold">Verified</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <h3 className="font-bold text-xl mb-2">{ngo.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{ngo.location.address.split(',').slice(-2).join(',').trim()}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">{ngo.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {ngo.cause.map(cause => (
                    <span key={cause} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {cause}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t py-3">
                <div className="w-full grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Active Needs</p>
                    <p className="font-semibold">{ngo.needsCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Fulfilled</p>
                    <p className="font-semibold">{ngo.fulfilledCount}</p>
                  </div>
                </div>
              </CardFooter>
              <div className="px-4 pb-4">
                <Link to={`/ngo/${ngo.id}`}>
                  <Button variant="outline" className="w-full">View Profile</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNGOsSection;
