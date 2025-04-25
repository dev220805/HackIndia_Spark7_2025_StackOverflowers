
import { Need, NGOProfile, DonorProfile, NeedCategory, NeedPriority } from '@/types';

// Categories with their corresponding colors
export const categories: Record<NeedCategory, { label: string, color: string }> = {
  food: { label: 'Food', color: 'bg-orange-500' },
  clothing: { label: 'Clothing', color: 'bg-blue-500' },
  education: { label: 'Education', color: 'bg-purple-500' },
  medical: { label: 'Medical', color: 'bg-red-500' },
  shelter: { label: 'Shelter', color: 'bg-green-500' },
  financial: { label: 'Financial', color: 'bg-yellow-500' },
  other: { label: 'Other', color: 'bg-gray-500' }
};

// Priorities with their corresponding colors
export const priorities: Record<NeedPriority, { label: string, color: string }> = {
  low: { label: 'Low', color: 'bg-green-500' },
  medium: { label: 'Medium', color: 'bg-orange-500' },
  high: { label: 'High', color: 'bg-red-500' }
};

// Sample NGOs
export const ngos: NGOProfile[] = [
  {
    id: '1',
    name: 'Global Food Bank',
    email: 'contact@globalfoodbank.org',
    role: 'ngo',
    avatar: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=100',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '123 Main St, San Francisco, CA'
    },
    description: 'Providing food to communities in need around the world.',
    cause: ['food', 'poverty'],
    needsCount: 8,
    fulfilledCount: 23,
    activeNeeds: [],
    verified: true,
    createdAt: '2023-01-15T12:00:00Z',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Education First',
    email: 'info@educationfirst.org',
    role: 'ngo',
    avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=100',
    location: {
      lat: 37.7739,
      lng: -122.4312,
      address: '456 Oak St, San Francisco, CA'
    },
    description: 'Bringing education to underprivileged children worldwide.',
    cause: ['education', 'children'],
    needsCount: 5,
    fulfilledCount: 17,
    activeNeeds: [],
    verified: true,
    createdAt: '2023-02-10T12:00:00Z',
    rating: 4.5
  },
  {
    id: '3',
    name: 'Medical Aid International',
    email: 'support@medicalaid.org',
    role: 'ngo',
    avatar: 'https://images.unsplash.com/photo-1576671267364-7efa19725c7f?q=80&w=100',
    location: {
      lat: 37.7833,
      lng: -122.4167,
      address: '789 Pine St, San Francisco, CA'
    },
    description: 'Providing medical assistance in crisis zones and developing regions.',
    cause: ['medical', 'disaster-relief'],
    needsCount: 12,
    fulfilledCount: 34,
    activeNeeds: [],
    verified: true,
    createdAt: '2023-03-05T12:00:00Z',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Shelter Solutions',
    email: 'hello@sheltersolutions.org',
    role: 'ngo',
    avatar: 'https://images.unsplash.com/photo-1518707967464-6c97d31f0ca5?q=80&w=100',
    location: {
      lat: 37.7869,
      lng: -122.4000,
      address: '101 Market St, San Francisco, CA'
    },
    description: 'Building sustainable housing for homeless and displaced populations.',
    cause: ['shelter', 'poverty'],
    needsCount: 6,
    fulfilledCount: 11,
    activeNeeds: [],
    verified: true,
    createdAt: '2023-04-20T12:00:00Z',
    rating: 4.6
  },
  {
    id: '5',
    name: 'Clean Water Initiative',
    email: 'info@cleanwaterinitiative.org',
    role: 'ngo',
    avatar: 'https://images.unsplash.com/photo-1615634376658-c80abf877da2?q=80&w=100',
    location: {
      lat: 37.7879,
      lng: -122.4074,
      address: '202 Mission St, San Francisco, CA'
    },
    description: 'Providing clean water solutions to communities in need.',
    cause: ['water', 'health'],
    needsCount: 9,
    fulfilledCount: 28,
    activeNeeds: [],
    verified: true,
    createdAt: '2023-05-15T12:00:00Z',
    rating: 4.7
  }
];

// Sample needs
export const needs: Need[] = [
  {
    id: '1',
    ngoId: '1',
    title: 'Emergency Food Supplies',
    description: 'Need non-perishable food items for families affected by recent flooding.',
    category: 'food',
    priority: 'high',
    quantity: 500,
    quantityFulfilled: 250,
    status: 'active',
    createdAt: '2023-10-01T12:00:00Z',
    expiresAt: '2024-06-01T12:00:00Z',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '123 Main St, San Francisco, CA'
    }
  },
  {
    id: '2',
    ngoId: '2',
    title: 'School Supplies for Children',
    description: 'Notebooks, pencils, and other basic school supplies needed for underprivileged students.',
    category: 'education',
    priority: 'medium',
    quantity: 200,
    quantityFulfilled: 75,
    status: 'active',
    createdAt: '2023-10-05T12:00:00Z',
    expiresAt: '2024-05-15T12:00:00Z',
    location: {
      lat: 37.7739,
      lng: -122.4312,
      address: '456 Oak St, San Francisco, CA'
    }
  },
  {
    id: '3',
    ngoId: '3',
    title: 'Medical Supplies Needed',
    description: 'First aid kits, bandages, and basic medical supplies for our community health program.',
    category: 'medical',
    priority: 'high',
    quantity: 100,
    quantityFulfilled: 30,
    status: 'active',
    createdAt: '2023-10-10T12:00:00Z',
    expiresAt: '2024-05-10T12:00:00Z',
    location: {
      lat: 37.7833,
      lng: -122.4167,
      address: '789 Pine St, San Francisco, CA'
    }
  },
  {
    id: '4',
    ngoId: '4',
    title: 'Winter Clothing Drive',
    description: 'Collecting warm clothing for homeless individuals during the winter months.',
    category: 'clothing',
    priority: 'medium',
    quantity: 300,
    quantityFulfilled: 150,
    status: 'active',
    createdAt: '2023-10-15T12:00:00Z',
    expiresAt: '2024-04-15T12:00:00Z',
    location: {
      lat: 37.7869,
      lng: -122.4000,
      address: '101 Market St, San Francisco, CA'
    }
  },
  {
    id: '5',
    ngoId: '5',
    title: 'Water Purification Tablets',
    description: 'Urgent need for water purification tablets for communities with contaminated water sources.',
    category: 'other',
    priority: 'high',
    quantity: 1000,
    quantityFulfilled: 300,
    status: 'active',
    createdAt: '2023-10-20T12:00:00Z',
    expiresAt: '2024-04-20T12:00:00Z',
    location: {
      lat: 37.7879,
      lng: -122.4074,
      address: '202 Mission St, San Francisco, CA'
    }
  },
  {
    id: '6',
    ngoId: '1',
    title: 'Monthly Food Distribution',
    description: 'Regular food packages for 200 families in the local community.',
    category: 'food',
    priority: 'medium',
    quantity: 200,
    quantityFulfilled: 0,
    status: 'active',
    createdAt: '2023-10-25T12:00:00Z',
    expiresAt: '2024-05-25T12:00:00Z',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '123 Main St, San Francisco, CA'
    }
  },
  {
    id: '7',
    ngoId: '2',
    title: 'Educational Books',
    description: 'Books for our community library program serving underprivileged children.',
    category: 'education',
    priority: 'low',
    quantity: 500,
    quantityFulfilled: 200,
    status: 'active',
    createdAt: '2023-10-30T12:00:00Z',
    expiresAt: '2024-06-30T12:00:00Z',
    location: {
      lat: 37.7739,
      lng: -122.4312,
      address: '456 Oak St, San Francisco, CA'
    }
  },
  {
    id: '8',
    ngoId: '3',
    title: 'Vaccine Drive Support',
    description: 'Support for our upcoming community vaccine drive including volunteers and supplies.',
    category: 'medical',
    priority: 'high',
    quantity: 1,
    quantityFulfilled: 0,
    status: 'active',
    createdAt: '2023-11-01T12:00:00Z',
    expiresAt: '2024-05-01T12:00:00Z',
    location: {
      lat: 37.7833,
      lng: -122.4167,
      address: '789 Pine St, San Francisco, CA'
    }
  },
  {
    id: '9',
    ngoId: '4',
    title: 'Temporary Housing Assistance',
    description: 'Funds needed to provide temporary housing for 50 individuals displaced by recent fire.',
    category: 'shelter',
    priority: 'high',
    quantity: 50000,
    quantityFulfilled: 15000,
    status: 'active',
    createdAt: '2023-11-05T12:00:00Z',
    expiresAt: '2024-05-05T12:00:00Z',
    location: {
      lat: 37.7869,
      lng: -122.4000,
      address: '101 Market St, San Francisco, CA'
    }
  },
  {
    id: '10',
    ngoId: '5',
    title: 'Water Well Construction',
    description: 'Funding for construction of a new water well in a rural community without access to clean water.',
    category: 'other',
    priority: 'medium',
    quantity: 25000,
    quantityFulfilled: 10000,
    status: 'active',
    createdAt: '2023-11-10T12:00:00Z',
    expiresAt: '2024-06-10T12:00:00Z',
    location: {
      lat: 37.7879,
      lng: -122.4074,
      address: '202 Mission St, San Francisco, CA'
    }
  }
];

// Connect needs to NGOs
ngos.forEach(ngo => {
  ngo.activeNeeds = needs.filter(need => need.ngoId === ngo.id);
});

// Sample donor
export const sampleDonor: DonorProfile = {
  id: '1',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: 'donor',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100',
  location: {
    lat: 37.7700,
    lng: -122.4200,
    address: '555 Market St, San Francisco, CA'
  },
  createdAt: '2023-01-01T12:00:00Z',
  verified: true,
  donations: [],
  totalDonated: 0,
  preferredCauses: ['education', 'food']
};

// Initialize current user as sample donor for development
export const currentUser = sampleDonor;
