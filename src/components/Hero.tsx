
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              <span className="text-blue-500">Connect</span>, <span className="text-orange-500">Donate</span>, and <span className="text-green-500">Track</span> <br />Your Impact
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Impact Beacon connects donors with NGOs in real-time based on urgent needs. See exactly how your donations make a difference in communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              {isAuthenticated ? (
                <Link to="/needs">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Urgent Needs
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Join Now
                  </Button>
                </Link>
              )}
              <Link to="/map">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore NGOs
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 rounded-full w-80 h-80"></div>
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600" 
              alt="Donation impact" 
              className="relative z-20 rounded-lg shadow-xl transform rotate-3 mx-auto"
            />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 z-30 max-w-xs">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <p className="text-sm font-medium">247 urgent needs fulfilled this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-24 h-24 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 right-0 w-20 h-20 bg-green-200 rounded-full opacity-20 blur-xl"></div>
    </div>
  );
};

export default Hero;
