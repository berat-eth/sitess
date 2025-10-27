import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AIFeaturesSection from '@/components/AIFeaturesSection';
import PricingSection from '@/components/PricingSection';
import AboutSectionPreview from '@/components/AboutSectionPreview';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AIFeaturesSection />
      <PricingSection />
      <AboutSectionPreview />
    </>
  );
}
