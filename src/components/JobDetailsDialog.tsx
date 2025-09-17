import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Job } from "@/hooks/useJobs";
import { MapPin, Clock, DollarSign, Users, Calendar, Building, ExternalLink } from "lucide-react";

interface JobDetailsDialogProps {
  job: Job;
  children: React.ReactNode;
}

const JobDetailsDialog = ({ job, children }: JobDetailsDialogProps) => {
  const handleApply = () => {
    if (job.application_url) {
      window.open(job.application_url, '_blank');
    } else if (job.application_email) {
      window.open(`mailto:${job.application_email}?subject=Application for ${job.title}`, '_blank');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Company Info */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-primary">{job.company}</h3>
              <div className="flex items-center mt-2 text-muted-foreground">
                <Building className="w-4 h-4 mr-2" />
                {job.location}
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {job.job_type}
            </Badge>
          </div>

          <Separator />

          {/* Job Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{job.experience_level} level</span>
            </div>
            {job.salary_range && (
              <div className="flex items-center text-sm">
                <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{job.salary_range}</span>
              </div>
            )}
            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
              <span>{new Date(job.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Job Description</h4>
            <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
          </div>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {job.skills_required && job.skills_required.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Skills Required</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills_required.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Application Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleApply}
              className="flex-1" 
              variant="hero"
              disabled={!job.application_url && !job.application_email}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Apply Now
            </Button>
            <Button variant="outline" className="flex-1">
              Save Job
            </Button>
          </div>

          {/* Application Instructions */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h5 className="font-medium mb-2">How to Apply</h5>
            <div className="text-sm text-muted-foreground space-y-1">
              {job.application_url && (
                <p>• Apply online: <span className="text-primary">{job.application_url}</span></p>
              )}
              {job.application_email && (
                <p>• Send your resume to: <span className="text-primary">{job.application_email}</span></p>
              )}
              <p>• Make sure to mention you found this opportunity through the SGSITS Alumni Network</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;