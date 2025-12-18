import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { contactService } from "@/services/contactService";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
    if (!accessKey) {
      toast({
        title: 'Configuration error',
        description: 'Email service is not configured.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const payload = {
        access_key: accessKey,
        subject: `Portfolio Contact: ${formData.subject}`,
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        botcheck: '',
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const raw = await res.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        console.error('Web3Forms response (not JSON):', raw.substring(0, 500));
        throw new Error('Invalid response from email service');
      }

      if (!res.ok || !data?.success) {
        const msg = data?.message || data?.error || 'Failed to send message';
        throw new Error(msg);
      }
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Your message could not be sent. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-3">Get In Touch</h2>
          <div className="w-24 h-1.5 bg-primary rounded-full"></div>
          <p className="text-gray-600 mt-4 text-center max-w-2xl">
            Feel free to reach out if you have any questions or want to discuss potential collaborations
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card className="border-0 shadow-lg h-full">
            <CardContent className="p-8 h-full flex flex-col">
              <h3 className="text-2xl font-semibold text-navy-dark mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                I'm always open to new opportunities and interesting projects. Let's connect and create something amazing together.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-navy-dark">Location</h4>
                    <p className="text-gray-600">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-navy-dark">Email</h4>
                    <a href="mailto:ParthPanchal5447@gmail.com" className="text-primary">
                      ParthPanchal5447@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-navy-dark">Phone</h4>
                    <a href="tel:+916354033831" className="text-primary">
                      +91 6354033831
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium text-navy-dark mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/parth8417" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/parth-panchal-665990322/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href="https://wa.me/916354033831" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                  <a 
                    href="https://www.instagram.com/parth_panchal_1694/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#E4405F] text-white flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-navy-dark mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
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
                    rows={5}
                    className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white font-semibold shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
