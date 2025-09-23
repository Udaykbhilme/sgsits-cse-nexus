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
  MessageCircle,
  HandHeart,
  Laptop
} from "lucide-react";
import SupportRequestDialog from "@/components/SupportRequestDialog";
import { useSupportRequests } from "@/hooks/useSupportRequests";
import { useState, useEffect } from "react";

const Mentorship = () => {
  const { user } = useAuth();
  const { supportRequests } = useSupportRequests();
  const [userSupportRequests, setUserSupportRequests] = useState([]);
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

        {/* Support Needs Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                <HandHeart className="w-8 h-8 mx-auto mb-4 text-primary" />
                Student Support Program
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Need financial assistance for educational equipment? Our faculty and alumni community 
                is here to help students who need support with laptops, books, and other essentials.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Request Support */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Laptop className="w-5 h-5" />
                    Request Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Submit a request for financial assistance with educational equipment. 
                    Our faculty will review your application and help connect you with resources.
                  </p>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">What we can help with:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Laptops and computers for studies</li>
                      <li>• Technical books and learning materials</li>
                      <li>• Software licenses and subscriptions</li>
                      <li>• Internet connectivity support</li>
                      <li>• Other educational equipment</li>
                    </ul>
                  </div>

                  {user ? (
                    <SupportRequestDialog
                      studentId="dummy-student-id" // This would be dynamically set based on user
                      trigger={
                        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                          <HandHeart className="w-4 h-4 mr-2" />
                          Submit Support Request
                        </Button>
                      }
                    />
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => window.location.href = '/auth'}
                    >
                      Sign In to Request Support
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Track Requests */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Your Support Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <div className="space-y-4">
                      {userSupportRequests.length > 0 ? (
                        userSupportRequests.map((request: any, index) => (
                          <div key={index} className="border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{request.title}</h4>
                              <Badge variant={request.status === 'approved' ? 'default' : 'secondary'}>
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {request.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Submitted: {new Date(request.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <HandHeart className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                          <p className="text-muted-foreground">No support requests yet</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Submit a request above to get started
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Sign in to view your support requests</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mentorship;