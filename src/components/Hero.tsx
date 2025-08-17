
import { ArrowDown, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from 'react';
import { useTypingEffect } from '@/hooks/use-typing-effect';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Custom typing effect
  const { text: typedText, isPaused } = useTypingEffect({
    words: [
      "Full Stack Developer",
      "Web Application Expert",
      "UI/UX Enthusiast",
      "IT Professional"
    ],
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 1500
  });
  
  useEffect(() => {
    // Add a slight delay to ensure animations trigger properly
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden py-0">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-light via-navy to-navy-dark opacity-95 z-0"></div>
      
      {/* Animated Background Elements with more variety */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-36 h-36 bg-primary/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-primary/8 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-primary/10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/5 w-20 h-20 bg-primary/8 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAgTSA2MCAxMCBMIDYwIDAgNTAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjA0MjgwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className={`flex flex-col items-center mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Enhanced Avatar with glowing effect */}
          <div className="relative mb-8 profile-glow">
            <Avatar className="h-40 w-40 border-4 border-primary/80 shadow-xl relative">
              <AvatarImage 
                src="/profile-pic.jpg" 
                alt="Parth Panchal" 
                className="object-cover object-center h-full w-full"
              />
              <AvatarFallback className="bg-primary text-white text-3xl font-bold">PP</AvatarFallback>
            </Avatar>
          </div>
          
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Parth Panchal</span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto rounded-full mb-6"></div>
        </div>
        <p className="text-gray-200 text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
          Full Stack Developer & IT Professional
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-primary/30 shadow-lg" 
            onClick={scrollToProjects}
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} 
            className="border-white text-slate-50 bg-gray-800/50 hover:bg-gray-700 transition-all duration-300 hover:translate-y-[-2px] shadow-md"
          >
            Contact Me
          </Button>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} 
            className="text-white opacity-80 hover:opacity-100 transition-opacity hover:text-primary" 
            aria-label="Scroll down"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
