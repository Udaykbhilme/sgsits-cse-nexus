import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import JobPostDialog from "@/components/JobPostDialog";
import JobDetailsDialog from "@/components/JobDetailsDialog";
import { useJobs } from "@/hooks/useJobs";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building,
  Search,
  Filter,
  Plus,
  ExternalLink,
  Calendar,
  Star
} from "lucide-react";

const Jobs = () => {
  const { jobs } = useJobs();
  const jobCategories = [
    { name: "Software Engineering", count: 45, color: "from-blue-500 to-cyan-500" },
    { name: "Data Science", count: 32, color: "from-green-500 to-emerald-500" },
    { name: "Product Management", count: 28, color: "from-purple-500 to-violet-500" },
    { name: "DevOps", count: 23, color: "from-orange-500 to-red-500" },
    { name: "AI/ML Engineering", count: 38, color: "from-pink-500 to-rose-500" },
    { name: "Cybersecurity", count: 19, color: "from-indigo-500 to-blue-500" },
  ];

  const featuredJobs = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      postedBy: "Rajesh Kumar (2010)",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹15-25 LPA",
      tags: ["React", "Node.js", "AWS"],
      applicants: 23,
      deadline: "2024-02-15",
      verified: true
    },
    {
      title: "Data Scientist Intern",
      company: "AI Innovations Ltd",
      postedBy: "Priya Sharma (2012)",
      location: "Remote",
      type: "Internship",
      experience: "0-1 years",
      salary: "₹25-30k/month",
      tags: ["Python", "ML", "Statistics"],
      applicants: 45,
      deadline: "2024-02-20",
      verified: true
    },
    {
      title: "Product Manager",
      company: "StartupXYZ",
      postedBy: "Vikram Singh (2008)",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹18-28 LPA",
      tags: ["Strategy", "Analytics", "Leadership"],
      applicants: 12,
      deadline: "2024-02-25",
      verified: false
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
                💼 Career Opportunities
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Find Your{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Dream Job
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Exclusive job opportunities and internships posted by our alumni network. 
                Access positions that aren't available anywhere else.
              </p>
            </div>

            {/* Search and Actions */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by job title, company, or skills..."
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button variant="outline" size="lg">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <JobPostDialog>
                  <Button variant="hero" size="lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Job
                  </Button>
                </JobPostDialog>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  All Jobs
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  Full-time
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  Internships
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  Remote
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Job Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobCategories.map((category, index) => (
                <Card key={index} className="alumni-card group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center`}>
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.count} open positions
                    </p>
                    <Button variant="outline" size="sm">
                      Browse Jobs
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Featured Opportunities
            </h2>
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <Card key={index} className="card-gradient hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-semibold text-foreground">
                                {job.title}
                              </h3>
                            </div>
                            <p className="text-primary font-medium text-lg">{job.company}</p>
                            <p className="text-sm text-muted-foreground">Posted by Alumni</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {job.job_type}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {job.experience_level}
                          </div>
                          {job.salary_range && (
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-2" />
                              {job.salary_range}
                            </div>
                          )}
                        </div>

                        {job.skills_required && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills_required.map((skill, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          Posted: {new Date(job.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row lg:flex-col gap-3">
                        <Button variant="hero" className="lg:w-32">
                          Apply Now
                        </Button>
                        <JobDetailsDialog job={job}>
                          <Button variant="outline" size="sm" className="lg:w-32">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                        </JobDetailsDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </div>
        </section>

        {/* Post a Job CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="card-gradient p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Hiring? Post Your Job Opening
              </h3>
              <p className="text-muted-foreground mb-6">
                Connect with talented SGSITS graduates and help them advance their careers. 
                Alumni job postings get priority visibility and verification.
              </p>
              <JobPostDialog>
                <Button variant="hero" size="lg">
                  Post a Job Opening
                </Button>
              </JobPostDialog>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Jobs;