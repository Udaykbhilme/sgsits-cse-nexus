import UserTypeHandler from "@/components/UserTypeHandler";
import HeroSection from "@/components/HeroSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import NotableAlumni from "@/components/NotableAlumni";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import AdminAnnouncementManager from "@/components/AdminAnnouncementManager";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const { isAdmin } = useUserRole();
  const [showAnnouncementManager, setShowAnnouncementManager] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <UserTypeHandler>
        <main>
          <HeroSection />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AnnouncementBanner />
            
            {isAdmin && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setShowAnnouncementManager(!showAnnouncementManager)}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {showAnnouncementManager ? 'Hide' : 'Manage'} Announcements
                </Button>
              </div>
            )}
            
            {isAdmin && showAnnouncementManager && (
              <div className="mt-6 p-6 bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20 rounded-xl">
                <AdminAnnouncementManager onAnnouncementUpdate={() => window.location.reload()} />
              </div>
            )}
          </div>
          <NotableAlumni />
          <WhyJoinSection />
        </main>
      </UserTypeHandler>
    </div>
  );
};

export default Index;
