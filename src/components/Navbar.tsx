import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from './ModeToggle';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { LogOut, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Needs', href: '/needs' },
    { name: 'Urgent Needs', href: '/urgent-needs' },
    { name: 'Organ Donation', href: '/organ-donation' },
    { name: 'Map', href: '/map' },
    { name: 'About', href: '/about' },
  ];

  const renderNavItems = () => (
    <>
      {navItems.map((item) => (
        <li key={item.name}>
          <Link
            to={item.href}
            className={`block py-2 px-4 rounded transition-colors duration-200 ${isActive(item.href)
              ? 'bg-gray-200 dark:bg-gray-700 font-semibold'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            onClick={closeMenu}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
          GiveHope
        </Link>

        {/* Mobile Menu Button */}
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through GiveHope
                </SheetDescription>
              </SheetHeader>
              <ul className="space-y-2 py-4">
                {renderNavItems()}
              </ul>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant="secondary">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ) : (
          <ul className="hidden md:flex space-x-4">
            {renderNavItems()}
          </ul>
        )}

        {/* Auth Links and Theme Toggle */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link to="/profile">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} alt={user?.name || 'Profile'} />
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-900 dark:text-white hover:text-blue-500">
                Login
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
