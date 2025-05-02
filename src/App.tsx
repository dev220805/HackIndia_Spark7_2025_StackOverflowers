
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NeedsListing from "./pages/NeedsListing";
import UrgentNeeds from "./pages/UrgentNeeds";
import NeedDetails from "./pages/NeedDetails";
import Profile from "./pages/Profile";
import Map from "./pages/Map";
import About from "./pages/About";
import DonationPage from "./pages/DonationPage";
import OrganDonation from "./pages/OrganDonation";
import ChatbotButton from "./components/ChatbotButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/needs" element={<NeedsListing />} />
            <Route path="/urgent-needs" element={<UrgentNeeds />} />
            <Route path="/needs/:id" element={<NeedDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
            <Route path="/donate/:id" element={<DonationPage />} />
            <Route path="/organ-donation" element={<OrganDonation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotButton />
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
