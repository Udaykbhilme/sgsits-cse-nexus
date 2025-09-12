import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Award, Building } from "lucide-react";

const About = () => {
  const milestones = [
    { year: "1957", event: "SGSITS founded as Government Engineering College" },
    { year: "1984", event: "Computer Engineering department established" },
    { year: "2000", event: "First batch of CS graduates" },
    { year: "2010", event: "Alumni association officially formed" },
    { year: "2020", event: "Digital transformation initiative launched" },
    { year: "2024", event: "Alumni+ portal launched" },
  ];

  const teamMembers = [
    { name: "Dr. Rajesh Gupta", role: "Head of Department", expertise: "Computer Networks" },
    { name: "Prof. Priya Sharma", role: "Alumni Coordinator", expertise: "Software Engineering" },
    { name: "Dr. Vikram Singh", role: "Industry Relations", expertise: "Data Science" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                🏛️ Our Legacy
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  SGSITS CSE
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Shri Govindram Seksaria Institute of Technology and Science (SGSITS) has been at the forefront 
                of engineering education for over six decades, producing leaders who shape the future of technology.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground">67+</div>
                <div className="text-muted-foreground">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-secondary rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground">2,500+</div>
                <div className="text-muted-foreground">Alumni Worldwide</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground">100+</div>
                <div className="text-muted-foreground">Awards & Recognition</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-muted-foreground">Industry Partners</div>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary-glow"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <Card className="ml-8 flex-1">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-foreground">{milestone.event}</div>
                          <Badge variant="outline">{milestone.year}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="card-gradient text-center">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.expertise}</p>
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

export default About;