import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Camera,
  Edit,
  Save,
  X,
  Linkedin,
  Github,
  Globe,
  Award,
  Building
} from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    batch: "2015",
    currentRole: "Senior Software Engineer",
    company: "Tech Innovations Inc",
    location: "Bangalore, India",
    bio: "Passionate software engineer with 8+ years of experience in full-stack development. Love building scalable applications and mentoring junior developers.",
    skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    website: "johndoe.dev",
    achievements: [
      "Led a team of 5 developers in building a microservices architecture",
      "Reduced system latency by 40% through optimization",
      "Mentored 15+ junior developers"
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the data to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
              <p className="text-muted-foreground">Manage your profile information and settings</p>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button variant="hero" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="hero" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="card-gradient">
                <CardContent className="p-6 text-center">
                  {/* Profile Picture */}
                  <div className="relative inline-block mb-6">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button 
                        size="sm" 
                        variant="hero" 
                        className="absolute bottom-0 right-0 w-10 h-10 rounded-full p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-4">
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="text-center text-xl font-bold"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
                    )}

                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-sm">
                        Class of {profileData.batch}
                      </Badge>
                      
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            value={profileData.currentRole}
                            onChange={(e) => handleInputChange('currentRole', e.target.value)}
                            placeholder="Current Role"
                          />
                          <Input
                            value={profileData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            placeholder="Company"
                          />
                        </div>
                      ) : (
                        <>
                          <p className="text-lg font-medium text-primary">{profileData.currentRole}</p>
                          <p className="text-muted-foreground">{profileData.company}</p>
                        </>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={profileData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="flex-1"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{profileData.email}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="flex-1"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{profileData.phone}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={profileData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="flex-1"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{profileData.location}</span>
                        )}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        {isEditing ? (
                          <Input
                            value={profileData.linkedin}
                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            className="flex-1"
                            placeholder="LinkedIn URL"
                          />
                        ) : (
                          <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer" 
                             className="text-sm text-blue-600 hover:underline">
                            {profileData.linkedin}
                          </a>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Github className="w-4 h-4 text-gray-800" />
                        {isEditing ? (
                          <Input
                            value={profileData.github}
                            onChange={(e) => handleInputChange('github', e.target.value)}
                            className="flex-1"
                            placeholder="GitHub URL"
                          />
                        ) : (
                          <a href={`https://${profileData.github}`} target="_blank" rel="noopener noreferrer"
                             className="text-sm text-muted-foreground hover:underline">
                            {profileData.github}
                          </a>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-green-600" />
                        {isEditing ? (
                          <Input
                            value={profileData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="flex-1"
                            placeholder="Website URL"
                          />
                        ) : (
                          <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer"
                             className="text-sm text-green-600 hover:underline">
                            {profileData.website}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
                  )}
                </CardContent>
              </Card>

              {/* Skills Section */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Skills (comma-separated)
                      </Label>
                      <Input
                        value={profileData.skills.join(', ')}
                        onChange={(e) => handleInputChange('skills', e.target.value)}
                        placeholder="React, Node.js, Python..."
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Professional Details */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Professional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Batch Year</Label>
                      {isEditing ? (
                        <Select value={profileData.batch} onValueChange={(value) => handleInputChange('batch', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-muted-foreground">{profileData.batch}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Industry</Label>
                      {isEditing ? (
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-muted-foreground">Technology</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Key Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={profileData.achievements.join('\n')}
                      onChange={(e) => handleInputChange('achievements', e.target.value)}
                      rows={4}
                      placeholder="List your key achievements (one per line)..."
                    />
                  ) : (
                    <ul className="space-y-2">
                      {profileData.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;