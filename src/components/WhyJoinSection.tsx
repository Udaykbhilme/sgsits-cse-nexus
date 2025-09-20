import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Network,
  Award
} from "lucide-react";

const WhyJoinSection = () => {
  const benefits = [
    {
      icon: Network,
      title: "Global Network",
      description: "Connect with 2,500+ alumni across 50+ countries working in top companies worldwide",
      color: "from-blue-500 to-cyan-500",
      stats: "2,500+ Alumni"
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Access exclusive job postings, internships, and career advancement opportunities",
      color: "from-green-500 to-emerald-500",
      stats: "150+ Jobs Posted"
    },
    {
      icon: GraduationCap,
      title: "Mentorship Program",
      description: "Get guidance from industry experts and mentor the next generation of engineers",
      color: "from-purple-500 to-violet-500",
      stats: "300+ Sessions"
    },
    {
      icon: MessageCircle,
      title: "Knowledge Sharing",
      description: "Participate in tech talks, workshops, and collaborative learning sessions",
      color: "from-orange-500 to-red-500",
      stats: "Weekly Events"
    },
    {
      icon: Heart,
      title: "Give Back",
      description: "Support current students through scholarships, equipment, and infrastructure",
      color: "from-pink-500 to-rose-500",
      stats: "₹50L+ Raised"
    },
    {
      icon: TrendingUp,
      title: "Professional Growth",
      description: "Stay updated with industry trends and advance your career with peer support",
      color: "from-indigo-500 to-blue-500",
      stats: "Continuous Learning"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            🌟 Community Benefits
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-100 mb-6">
            Why Join the{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
              CSE Alumni Network?
            </span>
          </h2>
          <p className="text-lg text-yellow-200/80 max-w-3xl mx-auto">
            Be part of a thriving community that opens doors to endless opportunities, 
            meaningful connections, and the chance to make a lasting impact.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-2 border-yellow-500/20 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm animate-slide-up hover:border-yellow-400/40"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${benefit.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-2 border-yellow-400/30 shadow-lg`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-yellow-100">
                      {benefit.title}
                    </h3>
                    <Badge className="text-xs bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      {benefit.stats}
                    </Badge>
                  </div>
                  
                  <p className="text-yellow-200/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-scale-in">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-yellow-100 mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-yellow-200/80 mb-8">
              Take the first step towards connecting with a network that will accelerate 
              your career and amplify your impact in the tech industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-yellow-400">
                Register as Alumni
              </button>
              <button className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-yellow-300 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-yellow-500/50">
                Student Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;