import AlumniCard from "./AlumniCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AlumniData {
  name: string;
  image?: string;
  achievement: string;
  batchYear: string;
  currentRole: string;
  company: string;
  location: string;
  linkedinUrl?: string;
  profileUrl?: string;
  tags: string[];
}

const FeaturedAlumni = () => {
  const [featuredAlumni, setFeaturedAlumni] = useState<AlumniData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlumniFromDatabase();
  }, []);

  const fetchAlumniFromDatabase = async () => {
    try {
      // Fetch alumni data from database
      const { data: alumniData, error } = await supabase
        .from('alumni')
        .select(`
          *,
          profiles!inner(
            full_name,
            avatar_url,
            current_company,
            current_position,
            location,
            linkedin_url,
            skills
          )
        `)
        .limit(5);

      if (error) {
        console.error('Error fetching alumni:', error);
        setFeaturedAlumni([]);
        return;
      }

      if (alumniData && alumniData.length > 0) {
        // Transform database data to component format
        const transformedAlumni: AlumniData[] = alumniData.map((alumni) => ({
          name: alumni.profiles.full_name || 'Unknown',
          image: alumni.profiles.avatar_url || undefined,
          achievement: `Graduated in ${alumni.graduation_year} from ${alumni.course}`,
          batchYear: alumni.graduation_year?.toString() || 'Unknown',
          currentRole: alumni.profiles.current_position || alumni.current_job_role || 'Professional',
          company: alumni.profiles.current_company || alumni.current_company_name || 'Various Companies',
          location: alumni.profiles.location || 'India',
          linkedinUrl: alumni.profiles.linkedin_url || "#",
          profileUrl: "#",
          tags: alumni.profiles.skills?.slice(0, 4) || ["Alumni", "Professional"]
        }));
        setFeaturedAlumni(transformedAlumni);
      } else {
        // No data in database, show empty state
        setFeaturedAlumni([]);
      }
    } catch (error) {
      console.error('Error fetching alumni:', error);
      setFeaturedAlumni([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Distinguished Alumni
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">Loading alumni data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Distinguished Alumni
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the visionaries, innovators, and leaders who started their journey at SGSITS 
            and are now shaping the future of technology worldwide.
          </p>
        </div>

        {/* Alumni Grid or Empty State */}
        {featuredAlumni.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
              {featuredAlumni.map((alumni, index) => (
                <div
                  key={index}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AlumniCard {...alumni} />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center animate-scale-in">
              <div className="glass-effect p-8 rounded-2xl max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Discover More Success Stories
                </h3>
                <p className="text-muted-foreground mb-6">
                  Explore our complete alumni directory to connect with thousands of 
                  SGSITS graduates making impact across industries.
                </p>
                <Button size="lg" variant="hero" className="group" asChild>
                  <a href="/alumni">
                    Browse Alumni Directory
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="glass-effect p-8 rounded-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Alumni Database Ready
              </h3>
              <p className="text-muted-foreground mb-6">
                The alumni database is ready for data import. Contact the admin to upload alumni information.
              </p>
              <Button size="lg" variant="hero" className="group" asChild>
                <a href="/alumni">
                  View Alumni Section
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedAlumni;