
import { CheckCircle, FileText, Search, User } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <User className="h-12 w-12 text-blue-500" />,
      title: 'Create an Account',
      description: 'Sign up as a donor or as a representative of an NGO. Complete your profile to help us connect you with the right opportunities.',
    },
    {
      icon: <FileText className="h-12 w-12 text-orange-500" />,
      title: 'Post or Find Needs',
      description: 'NGOs can post their urgent needs. Donors can browse needs by location, category, and urgency level.',
    },
    {
      icon: <Search className="h-12 w-12 text-green-500" />,
      title: 'Get Matched',
      description: 'Our system matches donors with NGOs based on location, donation preferences, and urgency of needs.',
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-purple-500" />,
      title: 'Donate & Track Impact',
      description: 'Make your donation and track its journey. See photos and updates showing how your contribution is making a difference.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our platform makes it easy to connect donors with NGOs that need support. Here's how the process works:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number */}
              <div className="absolute -left-4 -top-4 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              
              {/* Card content */}
              <div className="bg-gray-50 rounded-lg p-6 h-full border border-gray-100 transition-all hover:shadow-md">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {/* Connector (except for the last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
