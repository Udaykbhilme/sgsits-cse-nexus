import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m the SGSITS Alumni Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses: Record<string, string> = {
    'hello': 'Hello! Welcome to the SGSITS Alumni Portal. How can I assist you today?',
    'hi': 'Hi there! I\'m here to help you navigate the alumni portal. What would you like to know?',
    'help': 'I can help you with: \n• Finding alumni contacts\n• Job opportunities\n• Mentorship programs\n• Event information\n• Donation processes\n• Registration and login issues',
    'jobs': 'You can find job opportunities in our Jobs section. Alumni post exclusive openings there. Would you like me to guide you to the jobs page?',
    'mentorship': 'Our mentorship program connects you with experienced alumni. You can request mentorship or become a mentor yourself. Check out the Mentorship section!',
    'alumni': 'You can browse our alumni directory to connect with graduates. Use the search feature to find alumni by company, location, or expertise.',
    'events': 'Stay updated with alumni events, reunions, and networking sessions. Check the Events section for upcoming activities.',
    'donation': 'Support current students through our endowment fund. You can contribute to various causes like student laptops, scholarships, and lab upgrades.',
    'register': 'To register, click on the Register button in the navigation. You\'ll need to provide your graduation year and other details to verify your alumni status.',
    'login': 'You can log in using the Login button in the navigation. If you forgot your password, use the password reset option.',
    'contact': 'For specific queries, you can reach out to the alumni office at alumni@sgsits.ac.in or call +91-731-2583156.'
  };

  const getQuickReplies = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
      return ['View Jobs', 'Post a Job', 'Career Guidance'];
    }
    if (lowerMessage.includes('mentor')) {
      return ['Find Mentor', 'Become Mentor', 'Mentorship FAQ'];
    }
    if (lowerMessage.includes('alumni')) {
      return ['Browse Alumni', 'Connect with Alumni', 'Alumni Directory'];
    }
    return ['Help', 'Jobs', 'Mentorship', 'Alumni Directory'];
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Contextual responses
    if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('work')) {
      return 'Great! Our alumni network offers exclusive job opportunities. You can browse current openings, post your own job listings, or connect with alumni in your field. Would you like me to guide you to the jobs section?';
    }
    
    if (lowerMessage.includes('mentor') || lowerMessage.includes('guidance') || lowerMessage.includes('advice')) {
      return 'Our mentorship program is one of our most valuable features! You can request mentorship from experienced alumni or offer to mentor others. We have mentors across various industries and specializations.';
    }
    
    if (lowerMessage.includes('alumni') || lowerMessage.includes('graduate') || lowerMessage.includes('classmate')) {
      return 'You can explore our alumni directory to find and connect with fellow graduates. Use the search filters to find alumni by graduation year, current company, location, or area of expertise.';
    }
    
    if (lowerMessage.includes('event') || lowerMessage.includes('reunion') || lowerMessage.includes('meeting')) {
      return 'We regularly organize alumni events, reunions, and networking sessions. Keep an eye on our events section for upcoming activities in your area!';
    }
    
    if (lowerMessage.includes('donate') || lowerMessage.includes('contribute') || lowerMessage.includes('give')) {
      return 'Thank you for your interest in giving back! Our endowment fund supports various initiatives like student laptops, scholarships, and research lab upgrades. Every contribution makes a difference!';
    }
    
    // Default response
    return 'I\'m here to help you navigate the SGSITS Alumni Portal. You can ask me about jobs, mentorship, alumni directory, events, donations, or any other questions about our platform. How can I assist you?';
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          variant="hero"
          className="rounded-full h-14 w-14 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 h-96">
      <Card className="h-full flex flex-col shadow-xl">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">Alumni Assistant</CardTitle>
                <Badge variant="secondary" className="text-xs">Online</Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-4 pt-0">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === 'bot' && (
                      <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                    <span className="whitespace-pre-line">{message.content}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg text-sm flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length > 1 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {getQuickReplies(messages[messages.length - 1]?.content || '').map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              className="text-sm"
            />
            <Button
              onClick={() => sendMessage(inputValue)}
              size="sm"
              variant="hero"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;