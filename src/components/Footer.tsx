
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold">Impact Beacon</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Connecting donors with NGOs to make a meaningful impact in communities around the world.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-blue-500 text-sm">Home</Link></li>
              <li><Link to="/map" className="text-gray-600 hover:text-blue-500 text-sm">Find NGOs</Link></li>
              <li><Link to="/needs" className="text-gray-600 hover:text-blue-500 text-sm">Browse Needs</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-blue-500 text-sm">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">For NGOs</h3>
            <ul className="space-y-2">
              <li><Link to="/signup" className="text-gray-600 hover:text-blue-500 text-sm">Register</Link></li>
              <li><Link to="/verification" className="text-gray-600 hover:text-blue-500 text-sm">Get Verified</Link></li>
              <li><Link to="/post-need" className="text-gray-600 hover:text-blue-500 text-sm">Post a Need</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-blue-500 text-sm">NGO Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">contact@impactbeacon.org</li>
              <li className="text-gray-600 text-sm">+1 (555) 123-4567</li>
              <li className="text-gray-600 text-sm">123 Impact Street, San Francisco, CA 94103</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2023 Impact Beacon. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-600 hover:text-blue-500 text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-500 text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
