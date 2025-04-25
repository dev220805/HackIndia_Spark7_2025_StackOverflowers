
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import UrgentNeedsSection from '@/components/UrgentNeedsSection';
import FeaturedNGOsSection from '@/components/FeaturedNGOsSection';
import HowItWorksSection from '@/components/HowItWorksSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <UrgentNeedsSection />
      <FeaturedNGOsSection />
      <HowItWorksSection />
    </Layout>
  );
};

export default Index;
