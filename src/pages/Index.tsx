import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import FeaturedAlumni from "@/components/FeaturedAlumni";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <WhyJoinSection />
        <FeaturedAlumni />
      </main>
    </div>
  );
};

export default Index;
