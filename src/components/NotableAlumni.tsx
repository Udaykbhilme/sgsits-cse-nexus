import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, MessageCircle, MapPin, Briefcase, Award } from "lucide-react";
import { Link } from "react-router-dom";

const NotableAlumni = () => {
  const notableAlumni = [
    {
      id: "1",
      name: "Dr. Rajesh Kumar Sharma",
      position: "Chief Technology Officer",
      company: "Microsoft India",
      location: "Bangalore, India",
      graduation_year: 2005,
      achievements: [
        "Led development of Azure Cloud Services",
        "Published 25+ research papers in AI/ML",
        "TEDx Speaker on Future of Technology",
        "Winner of Microsoft Excellence Award 2023"
      ],
      avatar_url: null,
      linkedin_url: "https://linkedin.com/in/rajesh-kumar",
      bio: "Leading AI/ML initiatives at Microsoft and driving digital transformation across enterprise solutions."
    },
    {
      id: "2", 
      name: "Priya Mehta",
      position: "Founder & CEO",
      company: "TechVenture AI Solutions",
      location: "San Francisco, USA",
      graduation_year: 2010,
      achievements: [
        "Founded $100M+ valuation startup",
        "Forbes 30 Under 30 Technology 2018",
        "Raised $50M in Series B funding",
        "Pioneer in Healthcare AI solutions"
      ],
      avatar_url: null,
      linkedin_url: "https://linkedin.com/in/priya-mehta",
      bio: "Revolutionizing healthcare through AI-powered diagnostic solutions and democratizing medical technology."
    },
    {
      id: "3",
      name: "Amit Patel",
      position: "Principal Software Engineer",
      company: "Google DeepMind",
      location: "London, UK", 
      graduation_year: 2008,
      achievements: [
        "Core contributor to AlphaFold project",
        "15+ patents in Machine Learning",
        "Google Distinguished Engineer",
        "Nature Magazine published researcher"
      ],
      avatar_url: null,
      linkedin_url: "https://linkedin.com/in/amit-patel-ai",
      bio: "Contributing to breakthrough AI research in protein folding and advancing computational biology frontiers."
    },
    {
      id: "4",
      name: "Sarah Johnson",
      position: "VP of Engineering",
      company: "Tesla Autopilot",
      location: "Palo Alto, USA",
      graduation_year: 2012,
      achievements: [
        "Led Autopilot software development",
        "Expert in Computer Vision & Robotics",
        "MIT Technology Review Innovator",
        "20+ autonomous vehicle patents"
      ],
      avatar_url: null,
      linkedin_url: "https://linkedin.com/in/sarah-johnson-tesla",
      bio: "Pioneering autonomous vehicle technology and shaping the future of transportation systems."
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-100 mb-4">
            Notable Alumni
          </h2>
          <p className="text-lg text-yellow-200/80 max-w-2xl mx-auto">
            Meet our exceptional graduates who are leading innovation and making significant impact worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notableAlumni.map((alumni) => (
            <Card key={alumni.id} className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xl">
                      {getInitials(alumni.name)}
                    </span>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-yellow-100 mb-1">
                    {alumni.name}
                  </h3>
                  <p className="text-yellow-300 font-medium text-sm mb-1">
                    {alumni.position}
                  </p>
                  <p className="text-yellow-200/70 text-sm mb-2">
                    {alumni.company}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xs text-yellow-300/70 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {alumni.location}
                    </div>
                    <Badge variant="secondary" className="text-xs bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      {alumni.graduation_year}
                    </Badge>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-yellow-200/60 text-xs text-center mb-4 line-clamp-3">
                  {alumni.bio}
                </p>

                {/* Key Achievements */}
                <div className="mb-4">
                  <h4 className="text-yellow-200 font-semibold text-xs mb-2 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Key Achievements
                  </h4>
                  <div className="space-y-1">
                    {alumni.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="text-yellow-300/70 text-xs flex items-start gap-1">
                        <span className="text-yellow-500 text-xs">•</span>
                        <span className="line-clamp-2">{achievement}</span>
                      </div>
                    ))}
                    {alumni.achievements.length > 2 && (
                      <div className="text-yellow-400/60 text-xs">
                        +{alumni.achievements.length - 2} more achievements
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    asChild
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold text-xs"
                  >
                    <Link to={`/messaging?recipient=${alumni.name}`}>
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Message
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30 text-xs"
                  >
                    <a href={alumni.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotableAlumni;