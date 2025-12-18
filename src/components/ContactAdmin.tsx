import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Calendar, User, MessageSquare } from 'lucide-react';
import { contactService } from "@/services/contactService";

interface ContactMessage {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

const ContactAdmin = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // For development, load from localStorage
      const storedContacts = localStorage.getItem('contacts');
      if (storedContacts) {
        const contacts = JSON.parse(storedContacts);
        setMessages(contacts);
      } else {
        // In production, use the API
        const result = await contactService.getContacts();
        setMessages(result.data || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitToWeb3Forms = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
    if (!accessKey) {
      toast({
        title: 'Missing Web3Forms key',
        description: 'Set VITE_WEB3FORMS_ACCESS_KEY in your .env file and restart the dev server.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Web3Forms accepts arbitrary fields, but access_key + email + message are essential.
      // Add a simple honeypot field to reduce bot submissions.
      const payload = {
        access_key: accessKey,
        subject: `Portfolio Contact: ${formData.subject}`,
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        botcheck: '',
        // Helps Web3Forms understand where the request originated
        page: typeof window !== 'undefined' ? window.location.href : 'Portfolio'
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('Web3Forms response status:', res.status, res.statusText);

      // Web3Forms should return JSON, but when blocked upstream you might get HTML.
      const raw = await res.text();
      console.log('Web3Forms raw response:', raw.substring(0, 500));
      
      const data = (() => {
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      })();

      if (!res.ok || !data?.success) {
        // If upstream blocks (Cloudflare), raw can be HTML; show a helpful message.
        const msg =
          data?.message ||
          data?.error ||
          (raw?.includes('Just a moment')
            ? 'Request was blocked (anti-bot). Please try from the website form in a normal browser, or use the Web3Forms AJAX endpoint from client-side only.'
            : 'Failed to send message');
        throw new Error(msg);
      }

      toast({
        title: 'Message sent!',
        description: 'Your message was sent to your email successfully.'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Optional: refresh local/admin view if you still store messages locally
      // fetchMessages();
    } catch (err: any) {
      toast({
        title: 'Something went wrong',
        description: err?.message || 'Your message could not be sent. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Web3Forms: Send Me a Message */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-2xl font-semibold text-gray-800">Send Me a Message</CardTitle>
              <Button onClick={fetchMessages} variant="outline">
                Refresh messages
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitToWeb3Forms} className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can I help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-white font-semibold shadow-md" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Uses Web3Forms. Add <code className="px-1 py-0.5 bg-gray-100 rounded">VITE_WEB3FORMS_ACCESS_KEY</code> to your <code className="px-1 py-0.5 bg-gray-100 rounded">.env</code> file.
            </p>
          </CardContent>
        </Card>

        {/* Messages admin list */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
              <p className="text-gray-500">Contact messages will appear here when submitted.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {messages.map((message) => (
                <Card key={message._id || message.id} className="shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                          {message.subject}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {message.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {message.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(message.createdAt)}
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(message.status)} text-white`} variant="secondary">
                        {message.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}`)}
                      >
                        Reply via Email
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // Mark as read logic would go here
                          console.log('Mark as read:', message._id || message.id);
                        }}
                      >
                        Mark as Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactAdmin;
