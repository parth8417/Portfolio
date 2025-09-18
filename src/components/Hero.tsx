
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
      "Web Application Developer",
      "MERN stack Developer",
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
      {/* Professional multi-layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-light via-navy to-navy-dark opacity-95 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 z-0"></div>
      {/* Noise texture overlay for added depth */}
      <div className="absolute inset-0 opacity-5 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      {/* Animated floating elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full animate-float blur-sm" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-36 h-36 bg-gradient-to-tr from-primary/15 to-primary/5 rounded-full animate-float blur-sm" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full animate-float blur-sm" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-tl from-primary/15 to-primary/5 rounded-full animate-float blur-sm" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/5 w-24 h-24 bg-gradient-to-bl from-primary/15 to-primary/5 rounded-full animate-float blur-sm" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/10 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-primary/10 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAgTSA2MCAxMCBMIDYwIDAgNTAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjA0MjgwIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10"></div>
      </div>
      <div className="container mx-auto px-4 z-10 text-center">
        <div className={`flex flex-col items-center mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Avatar with animated ring and shadow */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full animate-spin-slow border-4 border-primary/40 border-dashed"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-blue-400/60 rounded-full blur-xl opacity-40 animate-pulse-soft"></div>
            <Avatar className="h-40 w-40 border-4 border-primary/80 shadow-2xl relative">
              <AvatarImage 
                src="/profile-pic.jpg" 
                alt="Parth Panchal" 
                className="object-cover object-center h-full w-full"
              />
              <AvatarFallback className="bg-primary text-white text-3xl font-bold">PP</AvatarFallback>
            </Avatar>
          </div>
          {/* Name and animated typing effect */}
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-2 animate-fade-in">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">Parth Panchal</span>
          </h1>
          <div className="flex justify-center items-center gap-2 mb-4 min-h-[40px]">
            <span className="text-primary font-semibold text-xl md:text-2xl tracking-wide animate-fade-in" style={{animationDelay: '0.1s'}}>
              {typedText}
              <span className={`ml-1 inline-block w-2 h-7 align-middle bg-primary rounded-sm ${isPaused ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}></span>
            </span>
          </div>
          <div className="w-32 h-1.5 bg-gradient-to-r from-primary to-blue-400 mx-auto rounded-full mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-400 rounded-full blur-sm opacity-70"></div>
          </div>
          {/* Short impactful subtitle */}
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Passionate about building modern, scalable web applications and delivering seamless user experiences.
          </p>
          {/* Social links row */}
          <div className="flex justify-center gap-4 mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <a href="https://github.com/parth8417" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group p-3 rounded-full bg-white/10 hover:bg-primary/80 transition-all duration-300 shadow-lg text-white">
              <Github size={22} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://linkedin.com/in/parth-panchal-8417" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group p-3 rounded-full bg-white/10 hover:bg-blue-500 transition-all duration-300 shadow-lg text-white">
              <Linkedin size={22} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:parthpanchal8417@gmail.com" aria-label="Email" className="group p-3 rounded-full bg-white/10 hover:bg-green-500 transition-all duration-300 shadow-lg text-white">
              <Mail size={22} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="/Parth_Panchal_Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume" className="group p-3 rounded-full bg-white/10 hover:bg-yellow-500 transition-all duration-300 shadow-lg text-white">
              <FileText size={22} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/30 relative group overflow-hidden font-semibold text-lg px-8 py-3"
            onClick={scrollToProjects}
          >
            <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700"></span>
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} 
            className="border-white/30 text-slate-50 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg relative group overflow-hidden font-semibold text-lg px-8 py-3"
          >
            <span className="absolute inset-0 w-full h-full bg-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700"></span>
            Contact Me
          </Button>
        </div>
        {/* Scroll down button */}
        <div className="absolute bottom-10 left-0 right-0 mx-auto flex justify-center">
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} 
            className="bg-white/5 backdrop-blur-sm hover:bg-primary/80 p-3 rounded-full text-white shadow-lg transition-all duration-500 hover:scale-110 relative group" 
            aria-label="Scroll down"
          >
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <ArrowDown size={24} className="relative z-10 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
