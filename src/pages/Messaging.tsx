import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Send, Users, MessageCircle, Mail, Clock, User, Search } from 'lucide-react';
import PersonSearchDialog from '@/components/PersonSearchDialog';

interface Message {
  id: string;
  sender: string;
  receiver?: string;
  batch?: string;
  subject: string;
  content: string;
  timestamp: Date;
  type: 'individual' | 'batch';
  isRead: boolean;
}

const Messaging = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState({
    receiver: '',
    batch: '',
    subject: '',
    content: '',
    type: 'individual' as 'individual' | 'batch'
  });
  const [isComposing, setIsComposing] = useState(false);
  const [userRole, setUserRole] = useState<string>('student');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showPersonSearch, setShowPersonSearch] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get user role and verification status
    const role = localStorage.getItem('userRole') || 'student';
    const verified = localStorage.getItem('isVerified') === 'true';
    setUserRole(role);
    setIsVerified(verified);

    // Load sample messages
    loadSampleMessages();
  }, []);

  const loadSampleMessages = () => {
    const sampleMessages: Message[] = [
      {
        id: '1',
        sender: 'Dr. Rajesh Kumar',
        subject: 'Tech Talk: AI in Software Development',
        content: 'Join us for an exciting tech talk on AI integration in modern software development. Date: March 25, 2024 at 6:00 PM.',
        timestamp: new Date('2024-03-20'),
        type: 'batch',
        batch: '2024',
        isRead: false
      },
      {
        id: '2',
        sender: 'Admin',
        subject: 'Alumni Reunion 2024 - Registration Open',
        content: 'Registration for the annual alumni reunion is now open. Early bird discount available until March 30, 2024.',
        timestamp: new Date('2024-03-18'),
        type: 'batch',
        batch: 'all',
        isRead: true
      },
      {
        id: '3',
        sender: 'Priya Sharma',
        receiver: 'You',
        subject: 'Mentorship Request',
        content: 'Hi! I saw your profile and would love to connect for mentorship. I\'m interested in learning about your career path in software engineering.',
        timestamp: new Date('2024-03-15'),
        type: 'individual',
        isRead: false
      }
    ];
    setMessages(sampleMessages);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!userRole) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to send messages.",
        variant: "destructive",
      });
      return;
    }

    if (newMessage.type === 'batch' && !newMessage.batch) {
      toast({
        title: "Batch Required",
        description: "Please select a batch for batch messaging.",
        variant: "destructive",
      });
      return;
    }

    if (newMessage.type === 'individual' && !newMessage.receiver) {
      toast({
        title: "Receiver Required",
        description: "Please enter a receiver for individual messages.",
        variant: "destructive",
      });
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      receiver: newMessage.receiver,
      batch: newMessage.batch,
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date(),
      type: newMessage.type,
      isRead: true
    };

    setMessages(prev => [message, ...prev]);
    setNewMessage({ receiver: '', batch: '', subject: '', content: '', type: 'individual' });
    setIsComposing(false);

    toast({
      title: "Message Sent",
      description: newMessage.type === 'batch' 
        ? `Message sent to batch ${newMessage.batch}` 
        : `Message sent to ${newMessage.receiver}`,
    });
  };

  const canSendMessages = userRole && userRole !== 'guest';
  const canSendBatchMessages = userRole === 'faculty' || userRole === 'admin';

  if (!canSendMessages) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20">
            <CardContent className="pt-6 text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h2 className="text-2xl font-bold text-yellow-100 mb-4">
                Authentication Required
              </h2>
              <p className="text-yellow-200/70 mb-6">
                You need to be logged in to access the messaging system. Please sign in first.
              </p>
              <Button 
                onClick={() => window.location.href = '/auth'}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-100 mb-4">
            Messaging System
          </h1>
          <p className="text-lg text-yellow-200/80">
            Connect with alumni, faculty, and batchmates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20 h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-yellow-100">Messages</CardTitle>
                  <Button
                    onClick={() => setIsComposing(true)}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 border-b border-yellow-500/10 cursor-pointer hover:bg-yellow-500/5 transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-yellow-500/10' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-yellow-100 text-sm">
                          {message.subject}
                        </h4>
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-yellow-200/70 text-xs mb-2">
                        From: {message.sender}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-yellow-300/60">
                        <Clock className="w-3 h-3" />
                        {message.timestamp.toLocaleDateString()}
                        {message.type === 'batch' && (
                          <Badge className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                            Batch {message.batch}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2">
            {isComposing ? (
              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20 h-[600px]">
                <CardHeader>
                  <CardTitle className="text-yellow-100">Compose Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendMessage} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-yellow-200">Message Type</Label>
                      <Select
                        value={newMessage.type}
                        onValueChange={(value: 'individual' | 'batch') => 
                          setNewMessage(prev => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger className="bg-black/30 border-yellow-500/30 text-yellow-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual Message</SelectItem>
                          {canSendBatchMessages && (
                            <SelectItem value="batch">Batch Message</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {newMessage.type === 'individual' ? (
                      <div className="space-y-2">
                        <Label className="text-yellow-200">To</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter recipient email or name"
                            value={newMessage.receiver}
                            onChange={(e) => setNewMessage(prev => ({ ...prev, receiver: e.target.value }))}
                            className="flex-1 bg-black/30 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/50"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowPersonSearch(true)}
                            className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border-yellow-500/30"
                          >
                            <Search className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label className="text-yellow-200">Batch</Label>
                        <Select
                          value={newMessage.batch}
                          onValueChange={(value) => 
                            setNewMessage(prev => ({ ...prev, batch: value }))
                          }
                        >
                          <SelectTrigger className="bg-black/30 border-yellow-500/30 text-yellow-100">
                            <SelectValue placeholder="Select batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="2024">Batch 2024</SelectItem>
                            <SelectItem value="2023">Batch 2023</SelectItem>
                            <SelectItem value="2022">Batch 2022</SelectItem>
                            <SelectItem value="2021">Batch 2021</SelectItem>
                            <SelectItem value="2020">Batch 2020</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label className="text-yellow-200">Subject</Label>
                      <Input
                        placeholder="Enter message subject"
                        value={newMessage.subject}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                        className="bg-black/30 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-yellow-200">Message</Label>
                      <Textarea
                        placeholder="Type your message here..."
                        value={newMessage.content}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                        className="bg-black/30 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/50 min-h-[200px]"
                        rows={8}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsComposing(false)}
                        className="bg-black/30 hover:bg-black/50 text-yellow-300 border-yellow-500/30"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : selectedMessage ? (
              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20 h-[600px]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-yellow-100">{selectedMessage.subject}</CardTitle>
                      <CardDescription className="text-yellow-200/70">
                        From: {selectedMessage.sender}
                        {selectedMessage.type === 'batch' && (
                          <span className="ml-2">
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                              Batch {selectedMessage.batch}
                            </Badge>
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="text-sm text-yellow-300/60">
                      {selectedMessage.timestamp.toLocaleString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-yellow-200/80 leading-relaxed">
                      {selectedMessage.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-yellow-500/20 h-[600px]">
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-yellow-100 mb-2">
                      Select a Message
                    </h3>
                    <p className="text-yellow-200/70">
                      Choose a message from the list to view its content
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <PersonSearchDialog
          open={showPersonSearch}
          onOpenChange={setShowPersonSearch}
          onPersonSelect={(person) => {
            setNewMessage(prev => ({ ...prev, receiver: person.full_name || person.email }));
          }}
        />
      </div>
    </div>
  );
};

export default Messaging;
