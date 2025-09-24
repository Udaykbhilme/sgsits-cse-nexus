import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User, Mail, MessageCircle, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useMentorship } from '@/hooks/useMentorship';
import { useUserRoleManager } from '@/hooks/useUserRoleManager';

const MentorshipRequests = () => {
  const { requests, loading } = useMentorship();
  const { userType } = useUserRoleManager();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRequests = requests.filter(request => {
    if (statusFilter === 'all') return true;
    return request.status === statusFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'accepted':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-yellow-200">Loading mentorship requests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-100 mb-4">
            Mentorship Requests
          </h1>
          <p className="text-lg text-yellow-200/80">
            {userType === 'admin' || userType === 'faculty' 
              ? 'Review and manage student mentorship requests'
              : 'Track your mentorship request timeline'
            }
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-black/30 border-yellow-500/30 text-yellow-100">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredRequests.length === 0 ? (
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold text-yellow-100 mb-2">
                  No Requests Found
                </h3>
                <p className="text-yellow-200/70">
                  {statusFilter === 'all' 
                    ? 'No mentorship requests have been submitted yet.'
                    : `No ${statusFilter} requests found.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-yellow-100 flex items-center gap-3">
                        {request.title}
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1 capitalize">{request.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-yellow-200/70 mt-2">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(request.created_at).toLocaleDateString()}
                          </span>
                          {request.preferred_meeting_frequency && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {request.preferred_meeting_frequency}
                            </span>
                          )}
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-yellow-200 mb-2">Description</h4>
                    <p className="text-yellow-100/80 leading-relaxed">
                      {request.description}
                    </p>
                  </div>

                  {request.goals && request.goals.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-yellow-200 mb-2">Goals</h4>
                      <div className="space-y-1">
                        {request.goals.map((goal, index) => (
                          <div key={index} className="flex items-start gap-2 text-yellow-100/70">
                            <span className="text-yellow-500 mt-1">•</span>
                            <span>{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(userType === 'admin' || userType === 'faculty') && request.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-yellow-500/20">
                      <Button 
                        size="sm"
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/30"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message Student
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequests;