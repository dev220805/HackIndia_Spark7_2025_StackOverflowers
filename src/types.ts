
export type UserRole = 'donor' | 'ngo' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: string;
  verified: boolean;
}

export interface DonorProfile extends User {
  role: 'donor';
  donations: Donation[];
  totalDonated: number;
  preferredCauses: string[];
}

export interface NGOProfile extends User {
  role: 'ngo';
  description: string;
  cause: string[];
  needsCount: number;
  fulfilledCount: number;
  activeNeeds: Need[];
  verificationDocuments?: string[];
  rating: number;
}

export type NeedPriority = 'low' | 'medium' | 'high';
export type NeedCategory = 'food' | 'clothing' | 'education' | 'medical' | 'shelter' | 'financial' | 'other';
export type NeedStatus = 'active' | 'fulfilled' | 'expired';

export interface Need {
  id: string;
  ngoId: string;
  title: string;
  description: string;
  category: NeedCategory;
  priority: NeedPriority;
  quantity: number;
  quantityFulfilled: number;
  status: NeedStatus;
  createdAt: string;
  expiresAt: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface Donation {
  id: string;
  donorId: string;
  ngoId: string;
  needId: string;
  amount: number;
  type: 'item' | 'money';
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  proofImages?: string[];
  notes?: string;
}

export type OrganType = 'kidney' | 'liver' | 'heart' | 'lung' | 'pancreas' | 'cornea' | 'bone_marrow' | 'blood' | 'plasma' | 'skin' | 'tissue';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UrgencyLevel = 'low' | 'medium' | 'high';
export type OrganDonationStatus = 'active' | 'matched' | 'completed' | 'cancelled';

export interface OrganDonation {
  id: string;
  user_id: string;
  type: 'donation' | 'request';
  organ_type: OrganType;
  blood_type: BloodType;
  urgency?: UrgencyLevel;
  medical_history?: string;
  patient_details?: string;
  hospital?: string;
  notes?: string;
  status: OrganDonationStatus;
  created_at: string;
  updated_at?: string;
}
