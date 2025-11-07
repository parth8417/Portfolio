
import { Github, ExternalLink, Code, FileCode, Briefcase, Layout, 
  Laptop, MonitorSmartphone, Globe } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  
  const projects = [
    {
      title: "HireSpot - Job Portal",
      description: "A comprehensive job portal web application that connects job seekers with employers. Features user authentication, job search, application tracking, and employer dashboard for managing job postings and applications.",
      tags: ["React", "Node.js", "Clerk API", "Supabase", "Tailwind CSS"],
      image: "https://placehold.co/600x400/1a365d/FFFFFF/webp?text=Job+Portal",
      github: "https://github.com/parth8417/HireSpot.git",
      demo: "https://hire-spot-nu.vercel.app",
      icon: <Briefcase className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Personal Portfolio Website",
      description: "A modern, responsive portfolio website built with React and TypeScript. Features smooth animations, contact form integration, and optimized performance for showcasing professional work.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "MongoDB"],
      image: "https://placehold.co/600x400/0f172a/FFFFFF/webp?text=Portfolio+Website",
      github: "https://github.com/parth8417/portfolio",
      demo: "https://www.theparth.me/",
      icon: <Layout className="h-5 w-5 text-indigo-500" />
    },
    {
      title: "MyFoodis",
      description: "An online food ordering platform with responsive UI, dynamic product listings, cart & checkout, and an integrated admin panel for seamless management.",
      tags: ["React", "MongoDB", "Express Js", "JavaScript"],
      image: "https://placehold.co/600x400/1a365d/FFFFFF/webp?text=MyFoodis",
      github: "https://github.com/parth8417/Myfoodie",
      demo: "https://myfoodie.vercel.app/",
      icon: <Laptop className="h-5 w-5 text-green-500" />
    },
    {
      title: "WebBuzz",
      description: "A dynamic web platform designed for providing professional services including Web Development, Graphic Designing, and Digital Marketing, with responsive design and smooth functionality.",
      tags: ["Next.js", "Firebase", "Tailwind CSS", "JavaScript"],
      image: "https://placehold.co/600x400/1a365d/FFFFFF/webp?text=WebBuzz",
      github: "https://github.com/parth8417/WebBuzz",
      demo: "https://webbuzz.tech/",
      icon: <Globe className="h-5 w-5 text-sky-500" />
    },
    // {
    //   title: "Task Management System",
    //   description: "A collaborative task management application with features like project creation, task assignment, progress tracking, and team collaboration tools.",
    //   tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    //   image: "https://placehold.co/600x400/0f172a/FFFFFF/webp?text=Task+Manager",
    //   github: "https://github.com/parth8417",
    //   demo: "#",
    //   icon: <Code className="h-5 w-5 text-amber-500" />
    // },
    // {
    //   title: "Blog CMS Platform",
    //   description: "A content management system for blogs with features like post creation, editing, publishing, user authentication, and comment system.",
    //   tags: ["React", "Node.js", "Express", "MongoDB", "Rich Text Editor"],
    //   image: "https://placehold.co/600x400/2c3e50/FFFFFF/webp?text=Blog+CMS",
    //   github: "https://github.com/parth8417",
    //   demo: "#",
    //   icon: <FileCode className="h-5 w-5 text-purple-500" />
    // }
  ];

  return (
    <section 
      id="projects" 
      className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div>
          <div className="flex flex-col items-center justify-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-3">My Projects</h2>
            <div className="w-24 h-1.5 bg-primary rounded-full"></div>
            <p className="text-gray-600 mt-4 text-center max-w-2xl">
              Showcasing my recent development work and creative solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {projects.map((project, index) => (
              <div
                key={index} 
                className=""
              >
                <Card 
                  className="overflow-hidden border-0 shadow-lg h-full flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      {project.icon}
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-3 text-navy-dark">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1.5"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="h-4 w-4" />
                      Source Code
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1.5 border-primary text-primary"
                      onClick={() => window.open(project.demo, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button 
              variant="outline" 
              className="border-primary text-primary px-6 py-5 text-base"
              onClick={() => window.open("https://github.com/parth8417", "_blank")}
            >
              <Github className="mr-2 h-5 w-5" />
              View More Projects on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
