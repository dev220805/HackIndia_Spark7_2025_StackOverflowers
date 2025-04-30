
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { needs } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Heart } from 'lucide-react';

const DonationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Find the need with the matching ID
  const need = needs.find(n => n.id === id);
  
  if (!need) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Need Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">The requested need could not be found.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/needs')}>
                View All Needs
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }
  
  const progress = (need.quantityFulfilled / need.quantity) * 100;
  
  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would connect to a payment processor
    // For now, we'll just show a success toast
    toast.success("Thank you for your donation!", {
      description: `You've donated $${amount} to help with this need.`
    });
    
    // Redirect to the needs page after a short delay
    setTimeout(() => {
      navigate('/needs');
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Need Information */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{need.title}</CardTitle>
                <Badge className="mt-2">{need.priority} Priority</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{need.description}</p>
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
            </Card>
          </div>
          
          {/* Donation Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 text-red-500" />
                  Make a Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonation} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Donation Amount ($)</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="amount" 
                          type="number" 
                          placeholder="Enter amount" 
                          className="pl-10"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          min="1"
                          step="1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Enter your name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required={!isAnonymous}
                          disabled={isAnonymous}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="anonymous" 
                        checked={isAnonymous}
                        onChange={() => setIsAnonymous(!isAnonymous)}
                        className="rounded text-blue-500"
                      />
                      <label htmlFor="anonymous">Make this donation anonymous</label>
                    </div>
                    
                    <div>
                      <Label>Payment Method</Label>
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="creditCard" id="creditCard" />
                          <Label htmlFor="creditCard" className="cursor-pointer">Credit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                          <Label htmlFor="bankTransfer" className="cursor-pointer">Bank Transfer</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Complete Donation
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-gray-500 border-t pt-4">
                <p>Your donation will directly support this cause. Thank you for your generosity.</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonationPage;
