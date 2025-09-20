import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Bell, Calendar, ExternalLink } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "🏆 Alumni Reunion 2024 - Registration Now Open!",
    content: "Join us for the biggest alumni gathering of the year. Special guest speakers, networking sessions, and campus tours.",
    type: "event" as const,
    priority: "high" as const,
    date: "March 15, 2024",
    link: "/events/reunion-2024"
  },
  {
    id: 2,
    title: "💎 New Scholarship Program Launched",
    content: "We've launched a new scholarship program for deserving students. Alumni can nominate candidates and contribute.",
    type: "announcement" as const,
    priority: "high" as const,
    date: "March 10, 2024",
    link: "/endowment"
  },
  {
    id: 3,
    title: "🚀 Tech Talk Series: AI in Modern Software Development",
    content: "Join our monthly tech talk featuring Rajesh Kumar (2010) discussing AI integration in software projects.",
    type: "webinar" as const,
    priority: "medium" as const,
    date: "March 20, 2024",
    link: "/events/tech-talks"
  },
  {
    id: 4,
    title: "🎓 Class of 2015 Reunion - 10 Year Celebration",
    content: "Special 10-year reunion for the Class of 2015. Campus tour, dinner, and networking event planned.",
    type: "event" as const,
    priority: "medium" as const,
    date: "April 5, 2024",
    link: "/events/class-2015"
  },
  {
    id: 5,
    title: "💼 Job Fair 2024 - 50+ Companies Participating",
    content: "Annual job fair with top tech companies. Open to current students and recent graduates.",
    type: "event" as const,
    priority: "high" as const,
    date: "April 12, 2024",
    link: "/events/job-fair"
  },
  {
    id: 6,
    title: "🌟 Alumni Achievement Award Nominations Open",
    content: "Nominate outstanding alumni for this year's achievement awards. Categories include Innovation, Leadership, and Service.",
    type: "announcement" as const,
    priority: "medium" as const,
    date: "March 25, 2024",
    link: "/awards"
  },
  {
    id: 7,
    title: "📚 New Library Resources - Digital Access for Alumni",
    content: "Alumni now have access to digital library resources including journals, e-books, and research databases.",
    type: "announcement" as const,
    priority: "low" as const,
    date: "March 18, 2024",
    link: "/resources"
  },
  {
    id: 8,
    title: "🎯 Mentorship Program - 200+ Mentors Available",
    content: "Connect with experienced alumni mentors for career guidance, industry insights, and professional development.",
    type: "webinar" as const,
    priority: "medium" as const,
    date: "March 22, 2024",
    link: "/mentorship"
  }
];

const AnnouncementBanner = () => {
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const visibleAnnouncements = announcements.filter(
    announcement => !dismissedAnnouncements.includes(announcement.id)
  );

  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    if (visibleAnnouncements.length <= 1 || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleAnnouncements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [visibleAnnouncements.length, isPaused]);

  const dismissAnnouncement = (id: number) => {
    setDismissedAnnouncements(prev => [...prev, id]);
  };

  if (visibleAnnouncements.length === 0) return null;

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
        return 'from-yellow-500 to-amber-500';
      case 'webinar':
        return 'from-yellow-600 to-orange-500';
      default:
        return 'from-amber-500 to-yellow-600';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Moving headline container */}
      <div 
        className="relative bg-gradient-to-r from-black via-gray-900 to-black border-2 border-yellow-500/30 rounded-xl shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        
        <div className="flex items-center py-5 px-6 bg-gradient-to-r from-black/50 via-gray-900/50 to-black/50">
          {/* Breaking news indicator */}
          <div className="flex items-center gap-3 mr-8 flex-shrink-0">
            <div className="relative">
              <div className={`w-4 h-4 bg-yellow-500 rounded-full ${isPaused ? '' : 'animate-pulse'}`} />
              <div className={`absolute inset-0 w-4 h-4 bg-yellow-400 rounded-full opacity-75 ${isPaused ? '' : 'animate-ping'}`} />
            </div>
            <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full border border-yellow-500/30">
              ⚡ Breaking News {isPaused && <span className="text-yellow-300">(Paused)</span>}
            </span>
          </div>
          
          {/* Scrolling announcements */}
          <div className="flex-1 overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${visibleAnnouncements.length * 100}%`
              }}
            >
              {visibleAnnouncements.map((announcement, index) => (
                <div 
                  key={announcement.id}
                  className="flex items-center gap-4 w-full flex-shrink-0 px-4"
                  style={{ width: '100%' }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(announcement.type)} rounded-full flex items-center justify-center text-black flex-shrink-0 shadow-lg border-2 border-yellow-400/50`}>
                    {getTypeIcon(announcement.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-base font-bold text-yellow-100 bg-black/20 px-3 py-1 rounded-lg border border-yellow-500/20 flex-1 min-w-0">
                        <span className="truncate block">{announcement.title}</span>
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge 
                          variant={getPriorityVariant(announcement.priority)} 
                          className={`text-xs ${
                            announcement.priority === 'high' 
                              ? 'bg-yellow-500 text-black border-yellow-400' 
                              : announcement.priority === 'medium'
                              ? 'bg-yellow-600 text-white border-yellow-500'
                              : 'bg-gray-700 text-yellow-300 border-gray-600'
                          }`}
                        >
                          {announcement.priority}
                        </Badge>
                        <span className="text-sm text-yellow-300 bg-black/30 px-2 py-1 rounded border border-yellow-500/20 whitespace-nowrap">
                          {announcement.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {announcement.link && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-shrink-0 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation dots */}
          {visibleAnnouncements.length > 1 && (
            <div className="flex items-center gap-2 ml-6 flex-shrink-0">
              {visibleAnnouncements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-yellow-500 w-8 h-2 shadow-lg' 
                      : 'bg-yellow-500/30 w-2 h-2 hover:bg-yellow-500/50'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Dismiss button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dismissAnnouncement(visibleAnnouncements[currentIndex].id)}
            className="ml-6 flex-shrink-0 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Progress bar */}
        {visibleAnnouncements.length > 1 && (
          <div className="absolute bottom-0 left-0 h-1 bg-black/50">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 transition-all duration-5000 ease-linear shadow-lg"
              style={{ 
                width: `${((currentIndex + 1) / visibleAnnouncements.length) * 100}%`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBanner;