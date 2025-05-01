
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { organTypes, bloodTypes } from '@/data/organData';

type OrganDonationFormProps = {
  onComplete: () => void;
};

const OrganDonationForm = ({ onComplete }: OrganDonationFormProps) => {
  const { user } = useAuth();
  const [organType, setOrganType] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!organType || !bloodType) {
      toast('Please fill in all required fields', {
        description: 'Organ type and blood type are required',
        position: 'top-center',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      const { error } = await supabase.from('organ_donations').insert({
        user_id: user.id,
        type: 'donation',
        organ_type: organType,
        blood_type: bloodType,
        medical_history: medicalHistory,
        notes: additionalNotes,
        status: 'active'
      });
      
      if (error) throw error;
      
      toast('Donation offer posted successfully', {
        description: 'Thank you for your generous offer to help others',
        position: 'top-center',
      });
      
      onComplete();
    } catch (error) {
      console.error('Error submitting donation offer:', error);
      toast('Failed to post donation offer', {
        description: 'Please try again later',
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offer Organ Donation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="organType">Organ Type *</Label>
            <Select value={organType} onValueChange={setOrganType} required>
              <SelectTrigger id="organType">
                <SelectValue placeholder="Select organ type" />
              </SelectTrigger>
              <SelectContent>
                {organTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bloodType">Blood Type *</Label>
            <Select value={bloodType} onValueChange={setBloodType} required>
              <SelectTrigger id="bloodType">
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea 
              id="medicalHistory"
              placeholder="Brief medical history relevant to donation"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea 
              id="additionalNotes"
              placeholder="Any additional information you'd like to share"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Donation Offer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrganDonationForm;
