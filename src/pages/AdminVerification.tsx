import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  User,
  Calendar,
  Shield
} from 'lucide-react';

interface VerificationRequest {
  id: string;
  user_id: string;
  document_type: string;
  document_url: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  } | null;
}

const AdminVerification = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchVerificationRequests();
  }, []);

  const fetchVerificationRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('verification_requests')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests((data as any) || []);
    } catch (error) {
      console.error('Error fetching verification requests:', error);
      toast({
        title: "Error",
        description: "Failed to load verification requests.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId: string, status: 'approved' | 'rejected') => {
    setProcessing(true);
    try {
      const { error } = await supabase
        .from('verification_requests')
        .update({
          status,
          admin_notes: adminNotes,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      // Update profile verification status
      if (selectedRequest && status === 'approved') {
        await supabase
          .from('profiles')
          .update({
            is_verified: true,
            verification_status: 'approved'
          })
          .eq('user_id', selectedRequest.user_id);
      }

      toast({
        title: "Success",
        description: `Verification request ${status}.`,
      });

      setSelectedRequest(null);
      setAdminNotes('');
      fetchVerificationRequests();
    } catch (error) {
      console.error('Error updating verification:', error);
      toast({
        title: "Error",
        description: "Failed to update verification status.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-yellow-200">Loading verification requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-100 mb-4 flex items-center justify-center gap-3">
            <Shield className="w-8 h-8" />
            Verification Management
          </h1>
          <p className="text-lg text-yellow-200/80">
            Review and approve alumni verification requests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Requests List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-yellow-100 mb-4">
              Pending Requests ({requests.filter(r => r.status === 'pending').length})
            </h2>
            
            {requests.filter(r => r.status === 'pending').map((request) => (
              <Card key={request.id} className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-yellow-400" />
                      <div>
                        <h3 className="font-semibold text-yellow-100">
                          {request.profiles?.full_name || 'Unknown User'}
                        </h3>
                        <p className="text-sm text-yellow-200/70">
                          {request.profiles?.email}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(request.status)} className="flex items-center gap-1">
                      {getStatusIcon(request.status)}
                      {request.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-yellow-200/70 mb-3">
                    <span>Document: {request.document_type.replace('_', ' ').toUpperCase()}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(request.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRequest(request);
                      setAdminNotes(request.admin_notes || '');
                    }}
                    className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border-yellow-500/30"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review Request
                  </Button>
                </CardContent>
              </Card>
            ))}

            {requests.filter(r => r.status === 'pending').length === 0 && (
              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-yellow-100 mb-2">All Caught Up!</h3>
                  <p className="text-yellow-200/70">No pending verification requests at the moment.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Review Panel */}
          <div>
            {selectedRequest ? (
              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-yellow-100 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Review Request
                  </CardTitle>
                  <CardDescription className="text-yellow-200/70">
                    Carefully review the verification details before making a decision
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-yellow-100 mb-2">User Information</h4>
                      <div className="bg-black/30 p-3 rounded-lg border border-yellow-500/20">
                        <p className="text-yellow-200">
                          <span className="font-medium">Name:</span> {selectedRequest.profiles?.full_name}
                        </p>
                        <p className="text-yellow-200">
                          <span className="font-medium">Email:</span> {selectedRequest.profiles?.email}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-yellow-100 mb-2">Document Details</h4>
                      <div className="bg-black/30 p-3 rounded-lg border border-yellow-500/20">
                        <p className="text-yellow-200">
                          <span className="font-medium">Type:</span> {selectedRequest.document_type.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-yellow-200">
                          <span className="font-medium">Submitted:</span> {new Date(selectedRequest.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-yellow-100 mb-2">Admin Notes</h4>
                      <Textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Add any notes about your decision..."
                        className="bg-black/30 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/50"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleStatusUpdate(selectedRequest.id, 'approved')}
                      disabled={processing}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    >
                      {processing ? 'Processing...' : 'Approve'}
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(selectedRequest.id, 'rejected')}
                      disabled={processing}
                      variant="destructive"
                      className="flex-1"
                    >
                      {processing ? 'Processing...' : 'Reject'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
                <CardContent className="p-8 text-center">
                  <Eye className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-yellow-100 mb-2">Select a Request</h3>
                  <p className="text-yellow-200/70">Choose a verification request from the list to review it.</p>
                </CardContent>
              </Card>
            )}

            {/* Recent Decisions */}
            <Card className="mt-6 bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-100 text-lg">Recent Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requests.filter(r => r.status !== 'pending').slice(0, 5).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-2 bg-black/30 rounded border border-yellow-500/20">
                      <div>
                        <p className="font-medium text-yellow-100 text-sm">
                          {request.profiles?.full_name}
                        </p>
                        <p className="text-xs text-yellow-200/70">
                          {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={getStatusVariant(request.status)} className="text-xs">
                        {getStatusIcon(request.status)}
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVerification;