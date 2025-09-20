import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Building,
  Upload,
  Shield,
  Crown
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, Profile as ProfileType } from "@/hooks/useProfile";
import { useUserRole } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, updateProfile, uploadAvatar } = useProfile();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    graduation_year: new Date().getFullYear(),
    current_position: '',
    current_company: '',
    location: '',
    bio: '',
    skills: [] as string[],
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
    is_mentor: false,
    is_looking_for_mentor: false,
    years_of_experience: 0
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        graduation_year: profile.graduation_year || new Date().getFullYear(),
        current_position: profile.current_position || '',
        current_company: profile.current_company || '',
        location: profile.location || '',
        bio: profile.bio || '',
        skills: profile.skills || [],
        linkedin_url: profile.linkedin_url || '',
        github_url: profile.github_url || '',
        portfolio_url: profile.portfolio_url || '',
        is_mentor: profile.is_mentor || false,
        is_looking_for_mentor: profile.is_looking_for_mentor || false,
        years_of_experience: profile.years_of_experience || 0
      });
    }
  }, [profile]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth?redirectTo=/profile" replace />;
  }

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        graduation_year: profile.graduation_year || new Date().getFullYear(),
        current_position: profile.current_position || '',
        current_company: profile.current_company || '',
        location: profile.location || '',
        bio: profile.bio || '',
        skills: profile.skills || [],
        linkedin_url: profile.linkedin_url || '',
        github_url: profile.github_url || '',
        portfolio_url: profile.portfolio_url || '',
        is_mentor: profile.is_mentor || false,
        is_looking_for_mentor: profile.is_looking_for_mentor || false,
        years_of_experience: profile.years_of_experience || 0
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      await uploadAvatar(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <main className="pb-16">
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
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                        {getInitials(formData.full_name || 'User')}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      variant="hero" 
                      className="absolute bottom-0 right-0 w-10 h-10 rounded-full p-0"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-4">
                    {isEditing ? (
                      <Input
                        value={formData.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        className="text-center text-xl font-bold"
                        placeholder="Your full name"
                      />
                    ) : (
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-foreground">{formData.full_name || 'User'}</h2>
                        {isAdmin && (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <Crown className="w-5 h-5 text-yellow-500" />
                            <span className="text-lg font-bold text-yellow-500">The God</span>
                            <Crown className="w-5 h-5 text-yellow-500" />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      {isEditing ? (
                        <Select value={formData.graduation_year.toString()} onValueChange={(value) => handleInputChange('graduation_year', parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>
                                Class of {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant="secondary" className="text-sm">
                          Class of {formData.graduation_year}
                        </Badge>
                      )}
                      
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            value={formData.current_position}
                            onChange={(e) => handleInputChange('current_position', e.target.value)}
                            placeholder="Current Role"
                          />
                          <Input
                            value={formData.current_company}
                            onChange={(e) => handleInputChange('current_company', e.target.value)}
                            placeholder="Company"
                          />
                        </div>
                      ) : (
                        <>
                          <p className="text-lg font-medium text-primary">{formData.current_position || 'Not specified'}</p>
                          <p className="text-muted-foreground">{formData.current_company || 'Not specified'}</p>
                        </>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="flex-1"
                            type="email"
                            placeholder="your@email.com"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{formData.email || 'Not provided'}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="flex-1"
                            placeholder="+91 9876543210"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{formData.phone || 'Not provided'}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="flex-1"
                            placeholder="City, Country"
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">{formData.location || 'Not provided'}</span>
                        )}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        {isEditing ? (
                          <Input
                            value={formData.linkedin_url}
                            onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                            className="flex-1"
                            placeholder="LinkedIn URL"
                          />
                        ) : (
                          formData.linkedin_url ? (
                            <a href={formData.linkedin_url} target="_blank" rel="noopener noreferrer" 
                               className="text-sm text-blue-600 hover:underline">
                              LinkedIn Profile
                            </a>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not provided</span>
                          )
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Github className="w-4 h-4 text-gray-800" />
                        {isEditing ? (
                          <Input
                            value={formData.github_url}
                            onChange={(e) => handleInputChange('github_url', e.target.value)}
                            className="flex-1"
                            placeholder="GitHub URL"
                          />
                        ) : (
                          formData.github_url ? (
                            <a href={formData.github_url} target="_blank" rel="noopener noreferrer"
                               className="text-sm text-muted-foreground hover:underline">
                              GitHub Profile
                            </a>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not provided</span>
                          )
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-green-600" />
                        {isEditing ? (
                          <Input
                            value={formData.portfolio_url}
                            onChange={(e) => handleInputChange('portfolio_url', e.target.value)}
                            className="flex-1"
                            placeholder="Portfolio/Website URL"
                          />
                        ) : (
                          formData.portfolio_url ? (
                            <a href={formData.portfolio_url} target="_blank" rel="noopener noreferrer"
                               className="text-sm text-green-600 hover:underline">
                              Portfolio
                            </a>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not provided</span>
                          )
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
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {formData.bio || 'No bio provided yet. Click Edit Profile to add your story!'}
                    </p>
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
                        value={formData.skills.join(', ')}
                        onChange={(e) => handleInputChange('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                        placeholder="React, Node.js, Python, Machine Learning..."
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.length > 0 ? (
                        formData.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No skills added yet.</p>
                      )}
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
                      <Label className="text-sm font-medium mb-2 block">Years of Experience</Label>
                      {isEditing ? (
                        <Select value={formData.years_of_experience.toString()} onValueChange={(value) => handleInputChange('years_of_experience', parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 21 }, (_, i) => i).map(years => (
                              <SelectItem key={years} value={years.toString()}>
                                {years === 0 ? 'Fresher' : `${years} year${years > 1 ? 's' : ''}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-muted-foreground">
                          {formData.years_of_experience === 0 ? 'Fresher' : `${formData.years_of_experience} year${formData.years_of_experience > 1 ? 's' : ''}`}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mentorship Preferences */}
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Mentorship Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Available as Mentor</Label>
                          <p className="text-xs text-muted-foreground">Help guide junior alumni</p>
                        </div>
                        <Switch
                          checked={formData.is_mentor}
                          onCheckedChange={(checked) => handleInputChange('is_mentor', checked)}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Looking for Mentor</Label>
                          <p className="text-xs text-muted-foreground">Seeking guidance from experienced alumni</p>
                        </div>
                        <Switch
                          checked={formData.is_looking_for_mentor}
                          onCheckedChange={(checked) => handleInputChange('is_looking_for_mentor', checked)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Section */}
              {!isAdmin && (
                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Account Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {profile?.is_verified ? (
                      <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-700">Verified Account</h4>
                          <p className="text-sm text-green-600">Your account has been verified by admin</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <h4 className="font-semibold text-yellow-700 mb-2">Account Not Verified</h4>
                          <p className="text-sm text-yellow-600 mb-3">
                            Get verified to unlock full access to the alumni network including messaging, mentorship, and job postings.
                          </p>
                        </div>
                        <Button asChild className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold">
                          <Link to="/verification">
                            <Shield className="w-4 h-4 mr-2" />
                            Get Verified
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;