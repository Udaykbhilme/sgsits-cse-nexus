import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp,
  Calendar,
  Award,
  Building,
  Star,
  Gift
} from "lucide-react";

const Endowment = () => {
  const donationGoals = [
    {
      title: "Student Laptop Program",
      description: "Providing laptops to deserving students for better learning outcomes",
      raised: 850000,
      goal: 1200000,
      donors: 245,
      category: "Equipment",
      urgency: "high"
    },
    {
      title: "Research Lab Upgrade",
      description: "Modernizing computer labs with latest hardware and software",
      raised: 2100000,
      goal: 3000000,
      donors: 189,
      category: "Infrastructure",
      urgency: "medium"
    },
    {
      title: "Scholarship Fund",
      description: "Supporting financially disadvantaged students with fee assistance",
      raised: 1650000,
      goal: 2500000,
      donors: 312,
      category: "Education",
      urgency: "high"
    }
  ];

  const recentDonations = [
    { donor: "Anonymous", amount: 50000, date: "2024-01-10", purpose: "Student Laptop Program" },
    { donor: "Rajesh Kumar (2010)", amount: 25000, date: "2024-01-08", purpose: "Scholarship Fund" },
    { donor: "Priya Sharma (2012)", amount: 15000, date: "2024-01-05", purpose: "Research Lab Upgrade" },
    { donor: "Anonymous", amount: 30000, date: "2024-01-03", purpose: "Student Laptop Program" },
    { donor: "Vikram Singh (2008)", amount: 40000, date: "2024-01-01", purpose: "Scholarship Fund" }
  ];

  const impactStats = [
    { label: "Total Raised", value: "₹1.2 Cr", icon: DollarSign, color: "from-green-500 to-emerald-500" },
    { label: "Active Donors", value: "580+", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Students Helped", value: "750+", icon: Star, color: "from-purple-500 to-violet-500" },
    { label: "Projects Funded", value: "12", icon: Target, color: "from-orange-500 to-red-500" }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}k`;
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                ❤️ Give Back
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Support{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Future Engineers
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Your contributions help create opportunities for the next generation of SGSITS students. 
                Every donation makes a direct impact on education and innovation.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {impactStats.map((stat, index) => (
                <Card key={index} className="card-gradient text-center">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Active Campaigns */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Active Campaigns
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {donationGoals.map((campaign, index) => (
                <Card key={index} className="card-gradient hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge 
                        variant={campaign.urgency === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {campaign.urgency === 'high' ? 'Urgent' : 'Active'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {campaign.category}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {campaign.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 text-sm">
                      {campaign.description}
                    </p>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {formatCurrency(campaign.raised)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          of {formatCurrency(campaign.goal)}
                        </span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(campaign.raised, campaign.goal)} 
                        className="h-2"
                      />
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>{Math.round(getProgressPercentage(campaign.raised, campaign.goal))}% funded</span>
                        <span>{campaign.donors} donors</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button variant="hero" className="w-full">
                        <Heart className="w-4 h-4 mr-2" />
                        Donate Now
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Donate */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Make a Quick Donation
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Every contribution counts towards building a better future for SGSITS students
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Donation Amount</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">₹1,000</SelectItem>
                        <SelectItem value="5000">₹5,000</SelectItem>
                        <SelectItem value="10000">₹10,000</SelectItem>
                        <SelectItem value="25000">₹25,000</SelectItem>
                        <SelectItem value="50000">₹50,000</SelectItem>
                        <SelectItem value="custom">Custom Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Purpose</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laptops">Student Laptop Program</SelectItem>
                        <SelectItem value="research">Research Lab Upgrade</SelectItem>
                        <SelectItem value="scholarship">Scholarship Fund</SelectItem>
                        <SelectItem value="general">General Fund</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="anonymous" className="rounded" />
                  <label htmlFor="anonymous" className="text-sm">
                    Make this donation anonymous
                  </label>
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Donate Now
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your donation is secure and will be processed through our verified payment gateway
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Donations */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Recent Contributions
            </h2>
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentDonations.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-white font-bold">
                          {donation.donor === "Anonymous" ? "A" : donation.donor.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{donation.donor}</p>
                          <p className="text-sm text-muted-foreground">{donation.purpose}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(donation.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">{donation.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Endowment;