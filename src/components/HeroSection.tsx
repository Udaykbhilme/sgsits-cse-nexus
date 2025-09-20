import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Briefcase, Heart, Star } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const stats = [
    { label: "Active Alumni", value: "2,500+", icon: Users },
    { label: "Job Postings", value: "150+", icon: Briefcase },
    { label: "Mentorship Sessions", value: "300+", icon: Star },
    { label: "Donations Raised", value: "₹50L+", icon: Heart },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="SGSITS Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/10 rounded-full blur-lg animate-glow" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-amber-500/15 rounded-full blur-lg animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Main Heading */}
        <div className="mb-8 animate-fade-in">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30">
            🎓 Official Alumni Network
          </Badge>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Alumni+
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            The official Computer Engineering alumni network of SGSITS
          </p>
          <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto">
            Connect, collaborate, and contribute to a thriving community of innovators, 
            entrepreneurs, and industry leaders.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up">
          <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300">
            Join the Network
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" className="text-lg px-8 py-4 bg-black/30 hover:bg-black/50 text-yellow-300 border-2 border-yellow-500/50 font-bold shadow-lg hover:shadow-xl transition-all duration-300">
            Explore Alumni Directory
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 animate-scale-in">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm border-2 border-yellow-500/30 p-4 sm:p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 hover:border-yellow-400/50 hover:bg-black/40"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-yellow-200/75">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-500/50 rounded-full">
          <div className="w-1.5 h-3 bg-yellow-400 rounded-full mx-auto mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;