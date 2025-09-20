import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, ExternalLink, MapPin, Calendar } from "lucide-react";

interface AlumniCardProps {
  name: string;
  image: string;
  achievement: string;
  batchYear: string;
  currentRole: string;
  company: string;
  location: string;
  linkedinUrl?: string;
  profileUrl?: string;
  tags: string[];
}

const AlumniCard = ({
  name,
  image,
  achievement,
  batchYear,
  currentRole,
  company,
  location,
  linkedinUrl,
  profileUrl,
  tags,
}: AlumniCardProps) => {
  return (
    <Card className="alumni-card group cursor-pointer overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:shadow-2xl">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            {linkedinUrl && (
              <Button size="sm" className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            )}
            {profileUrl && (
              <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold border-2 border-yellow-400">
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-yellow-100 group-hover:text-yellow-300 transition-colors duration-200">
                {name}
              </h3>
              <p className="text-sm text-yellow-200/70">{currentRole}</p>
              <p className="text-sm font-medium text-yellow-400">{company}</p>
            </div>
            <Badge className="text-xs bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              {batchYear}
            </Badge>
          </div>

          {/* Achievement */}
          <p className="text-sm text-yellow-200/70 mb-4 line-clamp-2">
            {achievement}
          </p>

          {/* Location */}
          <div className="flex items-center text-xs text-yellow-200/70 mb-4">
            <MapPin className="w-3 h-3 mr-1 text-yellow-400" />
            {location}
            <Calendar className="w-3 h-3 ml-4 mr-1 text-yellow-400" />
            Class of {batchYear}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge className="text-xs px-2 py-0.5 bg-gray-700/50 text-yellow-200 border-gray-600/50">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlumniCard;