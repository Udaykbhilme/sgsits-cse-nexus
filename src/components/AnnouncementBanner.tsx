import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Bell, Calendar, ExternalLink } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Alumni Reunion 2024 - Registration Now Open!",
    content: "Join us for the biggest alumni gathering of the year. Special guest speakers, networking sessions, and campus tours.",
    type: "event" as const,
    priority: "high" as const,
    date: "March 15, 2024",
    link: "/events/reunion-2024"
  },
  {
    id: 2,
    title: "New Scholarship Program Launched",
    content: "We've launched a new scholarship program for deserving students. Alumni can nominate candidates and contribute.",
    type: "announcement" as const,
    priority: "medium" as const,
    date: "March 10, 2024",
    link: "/endowment"
  },
  {
    id: 3,
    title: "Tech Talk Series: AI in Modern Software Development",
    content: "Join our monthly tech talk featuring Rajesh Kumar (2010) discussing AI integration in software projects.",
    type: "webinar" as const,
    priority: "medium" as const,
    date: "March 20, 2024",
    link: "/events/tech-talks"
  }
];

const AnnouncementBanner = () => {
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleAnnouncements = announcements.filter(
    announcement => !dismissedAnnouncements.includes(announcement.id)
  );

  const dismissAnnouncement = (id: number) => {
    setDismissedAnnouncements(prev => [...prev, id]);
  };

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % visibleAnnouncements.length);
  };

  if (visibleAnnouncements.length === 0) return null;

  const currentAnnouncement = visibleAnnouncements[currentIndex];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'webinar':
        return <Bell className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'from-blue-500 to-cyan-500';
      case 'webinar':
        return 'from-purple-500 to-violet-500';
      default:
        return 'from-green-500 to-emerald-500';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="relative mb-8">
      <Card className="card-gradient border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(currentAnnouncement.type)} rounded-full flex items-center justify-center text-white`}>
                {getTypeIcon(currentAnnouncement.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {currentAnnouncement.title}
                  </h3>
                  <Badge variant={getPriorityVariant(currentAnnouncement.priority)} className="text-xs">
                    {currentAnnouncement.priority}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-3">
                  {currentAnnouncement.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {currentAnnouncement.date}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {currentAnnouncement.link && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    )}
                    
                    {visibleAnnouncements.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={nextAnnouncement}
                      >
                        Next ({currentIndex + 1}/{visibleAnnouncements.length})
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissAnnouncement(currentAnnouncement.id)}
              className="ml-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementBanner;