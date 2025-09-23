import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HandHeart, Loader2 } from "lucide-react";
import { useSupportRequests } from "@/hooks/useSupportRequests";

interface SupportRequestDialogProps {
  trigger?: React.ReactNode;
  studentId: string;
}

const SupportRequestDialog = ({ trigger, studentId }: SupportRequestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createSupportRequest } = useSupportRequests();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reason: '',
    financial_situation: '',
    urgency_level: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    request_type: 'laptop',
    requested_amount: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createSupportRequest({
        student_id: studentId,
        title: formData.title,
        description: formData.description,
        reason: formData.reason,
        financial_situation: formData.financial_situation,
        urgency_level: formData.urgency_level,
        request_type: formData.request_type,
        requested_amount: formData.requested_amount ? parseFloat(formData.requested_amount) : null,
      });

      setOpen(false);
      setFormData({
        title: '',
        description: '',
        reason: '',
        financial_situation: '',
        urgency_level: 'medium',
        request_type: 'laptop',
        requested_amount: ''
      });
    } catch (error) {
      console.error('Error submitting support request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            <HandHeart className="w-4 h-4 mr-2" />
            Request Support
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HandHeart className="w-5 h-5" />
            Request Financial Support
          </DialogTitle>
          <DialogDescription>
            Submit a request for financial assistance for educational equipment or needs.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title</Label>
              <Input
                id="title"
                placeholder="e.g., Laptop for Studies"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="request_type">Support Type</Label>
              <Select value={formData.request_type} onValueChange={(value) => handleInputChange('request_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="internet">Internet Connection</SelectItem>
                  <SelectItem value="other">Other Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="urgency_level">Urgency Level</Label>
              <Select value={formData.urgency_level} onValueChange={(value) => handleInputChange('urgency_level', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requested_amount">Requested Amount (₹)</Label>
              <Input
                id="requested_amount"
                type="number"
                placeholder="e.g., 50000"
                value={formData.requested_amount}
                onChange={(e) => handleInputChange('requested_amount', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what you need and how it will help your studies..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request</Label>
            <Textarea
              id="reason"
              placeholder="Explain why you need this support..."
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="financial_situation">Financial Situation</Label>
            <Textarea
              id="financial_situation"
              placeholder="Please describe your current financial situation..."
              value={formData.financial_situation}
              onChange={(e) => handleInputChange('financial_situation', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <HandHeart className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupportRequestDialog;