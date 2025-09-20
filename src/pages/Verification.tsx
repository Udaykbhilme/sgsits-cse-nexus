import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const Verification = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [verificationType, setVerificationType] = useState<'college_id' | 'marksheet' | 'email'>('college_id');
  const [emailQuery, setEmailQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setVerificationType(file.name.toLowerCase().includes('id') ? 'college_id' : 'marksheet');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (verificationType === 'email') {
        // Handle email query submission
        toast({
          title: "Email Query Submitted",
          description: "Your query has been noted. Please send an email to csealumniplus1952@gmail.com with your verification request.",
        });
      } else if (selectedFile) {
        // Handle file upload
        toast({
          title: "Document Submitted",
          description: "Your verification document has been submitted. Admin will review it shortly.",
        });
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-100 mb-4">
            Account Verification
          </h1>
          <p className="text-lg text-yellow-200/80 max-w-2xl mx-auto">
            Verify your identity to unlock all features of the SGSITS Alumni+ platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Upload */}
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-100 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Verification
              </CardTitle>
              <CardDescription className="text-yellow-200/70">
                Upload one of the following documents for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-200">College ID Card</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-200">Marksheet/Transcript</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document-upload" className="text-yellow-200">
                      Upload Document
                    </Label>
                    <div className="border-2 border-dashed border-yellow-500/30 rounded-lg p-6 text-center hover:border-yellow-400/50 transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                      <p className="text-yellow-200/70 mb-2">
                        {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                      </p>
                      <Input
                        id="document-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('document-upload')?.click()}
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border-yellow-500/30"
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!selectedFile || isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold"
                >
                  {isSubmitting ? "Submitting..." : "Submit for Verification"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Email Query */}
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-100 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Alternative Verification
              </CardTitle>
              <CardDescription className="text-yellow-200/70">
                Don't have the required documents? Send us a query
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">Need Help?</h4>
                      <p className="text-blue-200/70 text-sm">
                        If you don't have a College ID or Marksheet, send an email with your query to:
                      </p>
                      <p className="text-blue-300 font-mono text-sm mt-2">
                        csealumniplus1952@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-query" className="text-yellow-200">
                      Your Query
                    </Label>
                    <Textarea
                      id="email-query"
                      placeholder="Describe your situation and why you need alternative verification..."
                      value={emailQuery}
                      onChange={(e) => setEmailQuery(e.target.value)}
                      className="bg-black/30 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/50"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!emailQuery.trim() || isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Query"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Information */}
        <Card className="mt-8 bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-100 mb-2">
                Verification Status
              </h3>
              <p className="text-yellow-200/70 mb-4">
                Your account is currently unverified. Once verified, you'll have access to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-yellow-300">
                  <CheckCircle className="w-4 h-4" />
                  Full Alumni Directory
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <CheckCircle className="w-4 h-4" />
                  Messaging System
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <CheckCircle className="w-4 h-4" />
                  Job Postings
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <CheckCircle className="w-4 h-4" />
                  Mentorship Programs
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <CheckCircle className="w-4 h-4" />
                  Event Participation
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <CheckCircle className="w-4 h-4" />
                  Support Requests
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Verification;
