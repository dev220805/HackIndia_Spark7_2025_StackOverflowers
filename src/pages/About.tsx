
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MapPin, Heart, AlertTriangle, Search, HelpCircle, Flag } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      bio: 'Former nonprofit executive with 15 years of experience in humanitarian aid.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      bio: 'Full-stack developer passionate about technology for social impact.'
    },
    {
      name: 'Priya Patel',
      role: 'COO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      bio: 'Operations expert with a background in international development.'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <section className="py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <Heart className="h-12 w-12 text-blue-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-gray-600 mb-8">
              Impact Beacon connects donors directly with verified NGOs, ensuring your contributions 
              make a real difference where they're needed most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg">Join The Movement</Button>
              </Link>
              <Link to="/needs">
                <Button variant="outline" size="lg">Browse Urgent Needs</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-gray-50 rounded-lg">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg">
              <p>
                Impact Beacon was founded in 2023 with a simple yet powerful vision: to bridge the gap between 
                willing donors and legitimate NGOs that need support. 
              </p>
              <p>
                We noticed that many donors wanted to help but were uncertain about how their donations were used 
                or if they were reaching those in need. Simultaneously, smaller yet impactful NGOs struggled to 
                gain visibility and funding.
              </p>
              <p>
                Our platform addresses both problems by creating a transparent ecosystem where verified NGOs can list 
                their specific needs, and donors can choose exactly what to support. From essential supplies to 
                funding for specific programs, donors know precisely how their contributions are making an impact.
              </p>
              <p>
                With Impact Beacon, we're not just facilitating donations—we're building a community that connects 
                those who want to help with those who know how.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Search className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-2">Find NGOs</h3>
                <p className="text-gray-600">
                  Discover verified NGOs working in causes you care about, from education to healthcare to emergency relief.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-2">View Needs</h3>
                <p className="text-gray-600">
                  See specific needs posted by NGOs, with details on what's required and how your contribution will help.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-2">Make an Impact</h3>
                <p className="text-gray-600">
                  Donate directly to fulfill needs and receive updates on how your contribution made a difference.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50 rounded-lg">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Flag className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency in how donations are used and their impact.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <HelpCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accountability</h3>
              <p className="text-gray-600">
                We verify all NGOs and ensure they meet our strict standards for responsible management.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Heart className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compassion</h3>
              <p className="text-gray-600">
                We are driven by genuine concern for the well-being of communities in need.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Impact</h3>
              <p className="text-gray-600">
                We support grassroots efforts that understand the unique needs of their communities.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50 rounded-lg mb-16">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of donors and NGOs working together to create positive change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg">Sign Up Now</Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" size="lg">Explore NGOs</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
