
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, LogOut, Menu, Search, User, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if the current path matches
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold">Impact Beacon</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`transition-colors ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}>
            Home
          </Link>
          <Link to="/map" className={`transition-colors ${isActive('/map') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}>
            Find NGOs
          </Link>
          <Link to="/urgent-needs" className={`transition-colors ${isActive('/urgent-needs') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}>
            Urgent Needs
          </Link>
          <Link to="/about" className={`transition-colors ${isActive('/about') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}>
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full p-0 w-10 h-10">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="rounded-full w-9 h-9 object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs text-gray-500">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/donations" className="cursor-pointer">My Donations</Link>
                </DropdownMenuItem>
                {user?.role === 'ngo' && (
                  <DropdownMenuItem asChild>
                    <Link to="/manage-needs" className="cursor-pointer">Manage Needs</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 py-2 px-4 space-y-3">
          <Link 
            to="/" 
            className={`block py-2 transition-colors ${isActive('/') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/map" 
            className={`block py-2 transition-colors ${isActive('/map') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Find NGOs
          </Link>
          <Link 
            to="/urgent-needs" 
            className={`block py-2 transition-colors ${isActive('/urgent-needs') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Urgent Needs
          </Link>
          <Link 
            to="/about" 
            className={`block py-2 transition-colors ${isActive('/about') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          
          {isAuthenticated ? (
            <>
              <div className="border-t pt-2 mt-2">
                <Link 
                  to="/profile" 
                  className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/donations" 
                  className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Donations
                </Link>
                {user?.role === 'ngo' && (
                  <Link 
                    to="/manage-needs" 
                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Manage Needs
                  </Link>
                )}
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  className="flex items-center py-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-2 border-t mt-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
