import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useMentorship } from "@/hooks/useMentorship";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Plus, X } from "lucide-react";

interface MentorshipRequestDialogProps {
  children: React.ReactNode;
  mentorId?: string;
  category?: string;
}

const MentorshipRequestDialog = ({ children, mentorId, category }: MentorshipRequestDialogProps) => {
  const { createRequest } = useMentorship();
  const { user } = useAuth();
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goals: [] as string[],
    preferred_meeting_frequency: 'weekly',
    mentor_id: mentorId || ''
  });

  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (newGoal.trim()) {
      setFormData(prev => ({
        ...prev,
        goals: [...prev.goals, newGoal.trim()]
      }));
      setNewGoal('');
    }
  };

  const removeGoal = (index: number) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    setLoading(true);
    try {
      await createRequest({
        ...formData
      });
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        goals: [],
        preferred_meeting_frequency: 'weekly',
        mentor_id: mentorId || ''
      });
    } catch (error) {
      console.error('Error creating mentorship request:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Button onClick={() => window.location.href = '/auth'}>
        Login to Request Mentorship
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Request Mentorship</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Request Title *</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Guidance for career transition to Product Management"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Mentor (Optional)</label>
            <Input
              value={formData.mentor_id}
              onChange={(e) => setFormData(prev => ({ ...prev, mentor_id: e.target.value }))}
              placeholder="Leave empty to match with any available mentor"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Meeting Frequency Preference</label>
            <Select 
              value={formData.preferred_meeting_frequency} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_meeting_frequency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="as-needed">As needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description *</label>
            <Textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your background, current situation, and what kind of mentorship you're seeking..."
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Your Goals</label>
            <div className="flex gap-2 mb-3">
              <Input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add a specific goal"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
              />
              <Button type="button" onClick={addGoal} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.goals.map((goal, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {goal}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeGoal(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1" variant="hero">
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MentorshipRequestDialog;