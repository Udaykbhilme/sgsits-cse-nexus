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
        <Card key={person.id} className="alumni-card group bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-black font-bold text-lg border-2 border-yellow-400 shadow-lg">
                {person.full_name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-yellow-100 truncate">
                  {person.full_name}
                </h3>
                <p className="text-yellow-400 font-medium text-sm truncate">
                  {person.current_position}
                </p>
                <p className="text-yellow-200/70 text-sm truncate">
                  {person.current_company}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm text-yellow-200/70">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                Class of {person.graduation_year}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                {person.location}
              </div>
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-yellow-400" />
                {person.years_of_experience} years exp.
              </div>
            </div>

            <p className="text-sm text-yellow-200/70 mb-4 line-clamp-2">
              {person.bio}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {person.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} className="text-xs bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  {skill}
                </Badge>
              ))}
              {person.skills.length > 3 && (
                <Badge className="text-xs bg-gray-700/50 text-yellow-200 border-gray-600/50">
                  +{person.skills.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect
              </Button>
              <Button size="sm" className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold border-2 border-yellow-400">
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