import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import FeaturedAlumni from "@/components/FeaturedAlumni";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnnouncementBanner />
        </div>
        <WhyJoinSection />
        <FeaturedAlumni />
      </main>
      <Chatbot />
    </div>
  );
};

export default Index;
