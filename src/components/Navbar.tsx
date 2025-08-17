
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Code, FolderOpen, Mail } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll effect for navbar and detect active section
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Detect active section
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "hero", icon: Home },
    { name: "About", id: "about", icon: User },
    { name: "Skills", id: "skills", icon: Code },
    { name: "Projects", id: "projects", icon: FolderOpen },
    { name: "Contact", id: "contact", icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 animate-fadeIn ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-4' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Avatar className="h-11 w-11 border-2 border-primary overflow-hidden transition-all hover:scale-105 shadow-md profile-glow">
              <AvatarImage src="/profile-pic.jpg" alt="Parth Panchal" className="object-cover" />
              <AvatarFallback className="bg-primary text-white font-bold">PP</AvatarFallback>
            </Avatar>
          </div>
          <a 
            href="#hero" 
            onClick={() => scrollToSection('hero')}
            className={`text-xl md:text-2xl font-bold ${isScrolled ? 'text-navy-dark' : 'text-white'} transition-colors hover:text-primary`}
          >
            Parth <span className="text-primary">Panchal</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`navbar-item ${isActive ? 'active' : ''} ${!isScrolled ? 'text-white hover:text-white hover:bg-white/20 shadow-sm' : ''}`}
              >
                <Icon size={16} className={isActive ? 'text-primary' : 'opacity-80'} />
                <span>{item.name}</span>
              </button>
            );
          })}
          <Button
            variant={isScrolled ? "outline" : "default"}
            className={isScrolled 
              ? "ml-3 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium shadow-sm hover:shadow-md" 
              : "ml-3 bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            }
            onClick={() => scrollToSection('contact')}
          >
            Let's Connect
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden flex items-center justify-center ${isScrolled ? 'text-navy-dark hover:bg-muted' : 'text-white bg-black/30 hover:bg-black/40'} h-10 w-10 rounded-md transition-colors`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden ${isScrolled ? 'bg-white' : 'bg-white/80 backdrop-blur-md'} shadow-lg absolute w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-4">
          <div className="flex items-center gap-3 px-6 mb-6 border-b border-gray-100 pb-3">
            <div className="relative">
              <Avatar className="h-9 w-9 border-2 border-primary shadow-sm profile-glow">
                <AvatarImage src="/profile-pic.jpg" alt="Parth Panchal" className="object-cover" />
                <AvatarFallback className="bg-primary text-white font-bold">PP</AvatarFallback>
              </Avatar>
            </div>
            <span className="font-semibold text-navy-dark">Parth <span className="text-primary">Panchal</span></span>
          </div>
          <nav className="flex flex-col px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                    isActive 
                      ? 'text-primary font-medium bg-primary/10 border-l-2 border-primary' 
                      : 'text-navy-dark hover:bg-muted border-l-2 border-transparent'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-primary' : 'opacity-80'} />
                  <span>{item.name}</span>
                </button>
              );
            })}
            <div className="mt-4 px-2">
              <Button
                variant={isScrolled ? "outline" : "default"}
                className={isScrolled 
                  ? "border-primary text-primary hover:bg-primary hover:text-white w-full font-medium shadow-sm" 
                  : "bg-primary text-white hover:bg-primary/90 w-full font-medium shadow-sm"
                }
                onClick={() => scrollToSection('contact')}
              >
                Let's Connect
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
