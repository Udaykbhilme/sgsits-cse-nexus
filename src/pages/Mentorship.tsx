import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MentorshipRequestDialog from "@/components/MentorshipRequestDialog";
import { useAuth } from "@/hooks/useAuth";
import { 
  Users, 
  Clock, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Star,
  Search,
  Filter,
  Calendar,
  Video,
  MessageCircle
} from "lucide-react";

const Mentorship = () => {
  const { user } = useAuth();
  const mentorshipCategories = [
    { name: "Career Guidance", count: 45, icon: Briefcase },
    { name: "Technical Skills", count: 32, icon: GraduationCap },
    { name: "Startup Advice", count: 28, icon: Star },
    { name: "Interview Prep", count: 38, icon: MessageCircle },
    { name: "Life Coaching", count: 25, icon: Users },
    { name: "Industry Insights", count: 41, icon: MapPin },
  ];

  const activeSessions = [
    {
      title: "AI/ML Career Roadmap",
      mentor: "Dr. Kavya Reddy",
      participants: 28,
      startDate: "2024-01-15",
      format: "Google Meet",
      category: "Technical Skills"
    },
    {
      title: "Startup Fundamentals",
      mentor: "Vikram Singh",
      participants: 32,
      startDate: "2024-01-20",
      format: "In-Campus",
      category: "Startup Advice"
    },
    {
      title: "FAANG Interview Prep",
      mentor: "Priya Sharma",
      participants: 30,
      startDate: "2024-01-25",
      format: "Google Meet",
      category: "Interview Prep"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                🤝 Mentorship Program
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Find Your{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Mentor
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Connect with experienced alumni for guidance in your career journey. 
                Get personalized advice from industry experts who've walked the path before you.
              </p>
            </div>

            {/* Request Mentorship Form */}
            <Card className="max-w-2xl mx-auto card-gradient">
              <CardHeader>
                <CardTitle className="text-center">Request Mentorship</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Batch Year</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select batch year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Mentorship Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mentorship area" />
                    </SelectTrigger>
                    <SelectContent>
                      {mentorshipCategories.map((category) => (
                        <SelectItem key={category.name} value={category.name.toLowerCase()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tell us about your goals</label>
                  <Textarea 
                    placeholder="Describe what you're looking to achieve and what kind of guidance you need..."
                    rows={4}
                  />
                </div>

                <MentorshipRequestDialog>
                  <Button className="w-full" variant="hero" size="lg">
                    Submit Mentorship Request
                  </Button>
                </MentorshipRequestDialog>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Mentorship Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentorshipCategories.map((category, index) => (
                <Card key={index} className="alumni-card group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.count} students interested
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Active Category
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Active Sessions */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Active Mentorship Sessions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {activeSessions.map((session, index) => (
                <Card key={index} className="card-gradient">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary">{session.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        {session.participants}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {session.title}
                    </h3>
                    
                    <p className="text-primary font-medium mb-4">
                      Mentor: {session.mentor}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Starts: {session.startDate}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        {session.format === "Google Meet" ? (
                          <Video className="w-4 h-4 mr-2" />
                        ) : (
                          <MapPin className="w-4 h-4 mr-2" />
                        )}
                        {session.format}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => {
                        if (user) {
                          alert(`Joining session: ${session.title}`);
                        } else {
                          window.location.href = '/auth';
                        }
                      }}
                    >
                      Join Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mentorship;