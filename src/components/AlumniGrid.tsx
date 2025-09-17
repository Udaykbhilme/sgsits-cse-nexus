import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alumni } from "@/hooks/useAlumni";
import { MapPin, Briefcase, ExternalLink, Calendar } from "lucide-react";

interface AlumniGridProps {
  alumni: Alumni[];
}

const AlumniGrid = ({ alumni }: AlumniGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {alumni.map((person) => (
        <Card key={person.id} className="alumni-card group">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-white font-bold text-lg">
                {person.full_name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {person.full_name}
                </h3>
                <p className="text-primary font-medium text-sm truncate">
                  {person.current_position}
                </p>
                <p className="text-muted-foreground text-sm truncate">
                  {person.current_company}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Class of {person.graduation_year}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {person.location}
              </div>
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                {person.years_of_experience} years exp.
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {person.bio}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {person.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {person.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{person.skills.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect
              </Button>
              <Button variant="hero" size="sm" className="flex-1">
                Message
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AlumniGrid;