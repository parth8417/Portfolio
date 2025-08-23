
import { User, MapPin, FileText, Download, Briefcase, GraduationCap, Code, ExternalLink, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-3">About Me</h2>
            <div className="w-24 h-1.5 bg-primary rounded-full"></div>
            <p className="text-gray-600 mt-4 text-center max-w-2xl">
              Full-stack developer passionate about creating elegant, efficient, and user-friendly web applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            {/* Left column - About me text */}
            <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                
                <h3 className="text-2xl font-bold text-navy-dark mb-6 flex items-center">
                  <User className="mr-3 text-primary" size={24} />
                  Who am I?
                </h3>
                
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    I’m <span className="font-medium text-navy-dark">Parth Panchal</span>, a 
                    <span className="font-medium"> Full-Stack Developer</span> with a Master’s degree 
                    in Information Technology from Silver Oak University. I specialize in building 
                    <span className="font-medium"> scalable and user-friendly web applications</span> 
                    using <span className="font-medium">React, Node.js, and TypeScript</span>.
                  </p>

                  <p className="text-gray-700 leading-relaxed mt-4">
                    With strong <span className="font-medium">problem-solving skills</span>, I quickly 
                    adapt to new technologies and focus on creating efficient, high-performance solutions.
                  </p>

                  <p className="text-gray-700 leading-relaxed mt-4">
                    I’m open to <span className="font-medium">full-time opportunities</span> where I can 
                    contribute to impactful projects and grow as a developer.
                  </p>

                  
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-x-6">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                      <MapPin size={18} className="text-primary" />
                      <span className="text-gray-700">Ahmedabad, Gujarat, India</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                      <Clock size={18} className="text-primary" />
                      <span className="text-gray-700">Full-time Availability</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Badge variant="secondary" className="bg-tech-react/10 text-tech-react border-tech-react/20">React</Badge>
                    <Badge variant="secondary" className="bg-tech-node/10 text-tech-node border-tech-node/20">Node.js</Badge>
                    <Badge variant="secondary" className="bg-tech-js/10 text-gray-800 border-tech-js/30">JavaScript</Badge>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 border-blue-500/20">TypeScript</Badge>
                    <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-700 border-cyan-500/20">Tailwind</Badge>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300" 
                    onClick={() => window.open('/Parth_Panchal_Resume.pdf', '_blank')}
                  >
                    <FileText className="mr-2 h-4 w-4" /> View Resume
                  </Button>
                  <Button 
                    variant="default" 
                    className="bg-primary hover:bg-primary/90 transition-all duration-300"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/Parth_Panchal_Resume.pdf';
                      link.download = 'Parth_Panchal_Resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right column - Education & Experience */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden relative">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/5 rounded-full"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/5 rounded-full"></div>
                
                <div className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold text-navy-dark mb-6 flex items-center border-b border-gray-100 pb-4">
                    <GraduationCap className="mr-3 text-primary" size={24} />
                    Education & Experience
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:bg-primary before:rounded-full before:z-10 before:ring-4 before:ring-primary/20 timeline-item">
                      <div className="absolute left-[7px] top-5 bottom-0 w-0.5 h-[calc(100%-24px)] bg-primary/30"></div>
                      
                      <h4 className="text-lg font-semibold text-navy-dark flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-primary" /> 
                        I M.Sc. in Information Technology
                      </h4>
                      <p className="text-gray-700 mt-1">Silver Oak University</p>
                      <p className="text-sm text-gray-500 mt-1">2022 - 2026 • CGPA: 8.5/10</p>
                    </div>
                    
                    <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:bg-primary before:rounded-full before:z-10 before:ring-4 before:ring-primary/20 timeline-item">
                      <div className="absolute left-[7px] top-5 bottom-0 w-0.5 h-[calc(100%-24px)] bg-primary/30"></div>
                      
                      <h4 className="text-lg font-semibold text-navy-dark flex items-center">
                        <Code className="mr-2 h-5 w-5 text-primary" /> 
                        Full Stack Web Development
                      </h4>
                      <p className="text-gray-700 mt-1">Modern Web Technologies & Frameworks</p>
                      <p className="text-sm text-gray-500 mt-1">React, Node.js, JavaScript, TypeScript</p>
                    </div>
                    
                    <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:bg-primary before:rounded-full before:z-10 before:ring-4 before:ring-primary/20 timeline-item">
                      <h4 className="text-lg font-semibold text-navy-dark flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-primary" /> 
                        Project Experience
                      </h4>
                      <p className="text-gray-700 mt-1">HireSpot Job Portal & Other Web Applications</p>
                      <div className="flex items-center text-sm text-primary hover:text-primary/80 mt-1 cursor-pointer group">
                        <span>View Project</span>
                        <ExternalLink size={14} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
