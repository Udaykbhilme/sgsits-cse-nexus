import AlumniCard from "./AlumniCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import alumni1 from "@/assets/alumni-1.jpg";
import alumni2 from "@/assets/alumni-2.jpg";
import alumni3 from "@/assets/alumni-3.jpg";
import alumni4 from "@/assets/alumni-4.jpg";
import alumni5 from "@/assets/alumni-5.jpg";

const FeaturedAlumni = () => {
  const featuredAlumni = [
    {
      name: "Rajesh Kumar",
      image: alumni1,
      achievement: "Founded TechCorp, a billion-dollar fintech startup serving 50M+ users across India",
      batchYear: "2010",
      currentRole: "CEO & Founder",
      company: "TechCorp",
      location: "Bangalore, India",
      linkedinUrl: "#",
      profileUrl: "#",
      tags: ["Fintech", "Entrepreneurship", "Leadership", "Startup"]
    },
    {
      name: "Priya Sharma",
      image: alumni2,
      achievement: "Led the AI division at Google, contributing to breakthrough advances in machine learning",
      batchYear: "2012",
      currentRole: "Director of AI",
      company: "Google",
      location: "Mountain View, USA",
      linkedinUrl: "#",
      profileUrl: "#",
      tags: ["AI/ML", "Google", "Research", "Tech Lead"]
    },
    {
      name: "Anita Patel",
      image: alumni3,
      achievement: "Pioneer in blockchain technology, architect of India's largest cryptocurrency exchange",
      batchYear: "2015",
      currentRole: "CTO",
      company: "CryptoIndia",
      location: "Mumbai, India",
      linkedinUrl: "#",
      profileUrl: "#",
      tags: ["Blockchain", "Cryptocurrency", "Technology", "Innovation"]
    },
    {
      name: "Vikram Singh",
      image: alumni4,
      achievement: "Built India's first unicorn edtech platform, revolutionizing online education",
      batchYear: "2008",
      currentRole: "Co-founder",
      company: "EduTech Solutions",
      location: "Delhi, India",
      linkedinUrl: "#",
      profileUrl: "#",
      tags: ["EdTech", "Startup", "Education", "Unicorn"]
    },
    {
      name: "Dr. Kavya Reddy",
      image: alumni5,
      achievement: "Leading AI researcher at MIT, published 50+ papers in top-tier conferences",
      batchYear: "2013",
      currentRole: "Research Scientist",
      company: "MIT AI Lab",
      location: "Boston, USA",
      linkedinUrl: "#",
      profileUrl: "#",
      tags: ["Research", "Academia", "AI", "MIT"]
    }
  ];

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

        {/* Alumni Grid */}
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
            <Button size="lg" variant="hero" className="group">
              Browse Alumni Directory
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAlumni;