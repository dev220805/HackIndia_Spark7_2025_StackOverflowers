
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

type OrganRequestFormProps = {
  onComplete: () => void;
};

const OrganRequestForm = ({ onComplete }: OrganRequestFormProps) => {
  const { user } = useAuth();
  const [organType, setOrganType] = useState<string>("");
  const [bloodType, setBloodType] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("medium");
  const [patientDetails, setPatientDetails] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!organType || !bloodType || !hospitalName) {
      toast('Please fill in all required fields', {
        description: 'Organ type, blood type and hospital name are required',
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
        type: 'request',
        organ_type: organType,
        blood_type: bloodType,
        urgency: urgency,
        patient_details: patientDetails,
        hospital: hospitalName,
        notes: additionalNotes,
        status: 'active'
      });
      
      if (error) throw error;
      
      toast('Donation request posted successfully', {
        description: 'Your request has been posted and is now visible to potential donors',
        position: 'top-center',
      });
      
      onComplete();
    } catch (error) {
      console.error('Error submitting donation request:', error);
      toast('Failed to post donation request', {
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
        <CardTitle>Request Organ Donation</CardTitle>
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
            <Label htmlFor="urgency">Urgency Level *</Label>
            <Select value={urgency} onValueChange={setUrgency} required>
              <SelectTrigger id="urgency">
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Within months</SelectItem>
                <SelectItem value="medium">Medium - Within weeks</SelectItem>
                <SelectItem value="high">High - Urgent (days)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hospitalName">Hospital Name *</Label>
            <Input 
              id="hospitalName"
              placeholder="Enter hospital name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="patientDetails">Patient Details</Label>
            <Textarea 
              id="patientDetails"
              placeholder="Age, relevant medical history, etc."
              value={patientDetails}
              onChange={(e) => setPatientDetails(e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea 
              id="additionalNotes"
              placeholder="Any additional information"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Donation Request'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrganRequestForm;
