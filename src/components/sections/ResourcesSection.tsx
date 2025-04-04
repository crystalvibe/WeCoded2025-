import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Video, Link as LinkIcon, Download, ArrowUpRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchArticles, fetchVideos, DevArticle, DevVideo } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  tags: string[];
  url: string;
  color: string;
}

const ResourceIcon = ({ type, color }: { type: string; color: string }) => {
  switch (type) {
    case "article":
      return <BookOpen className="h-5 w-5" style={{ color }} />;
    case "video":
      return <Video className="h-5 w-5" style={{ color }} />;
    case "link":
      return <LinkIcon className="h-5 w-5" style={{ color }} />;
    case "download":
      return <Download className="h-5 w-5" style={{ color }} />;
    default:
      return <BookOpen className="h-5 w-5" style={{ color }} />;
  }
};

const ResourcesSection = () => {
  const [filter, setFilter] = useState("all");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch resources from DEV.to
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const [articles, videos] = await Promise.all([
          fetchArticles({ per_page: 6, tag: 'wecoded' }),
          fetchVideos({ per_page: 3 })
        ]);

        // Transform articles and videos into resources
        const transformedResources: Resource[] = [
          ...articles.map((article): Resource => ({
            id: article.id,
            title: article.title,
            description: article.description || '',
            type: 'article',
            tags: article.tag_list,
            url: article.url || `https://dev.to/${article.id}`,
            color: '#4531EA'
          })),
          ...videos.map((video): Resource => ({
            id: video.id,
            title: video.title,
            description: 'Video content from the DEV community',
            type: 'video',
            tags: ['video', 'dev'],
            url: `https://dev.to${video.path}`,
            color: '#9D00E5'
          }))
        ];

        setResources(transformedResources);
      } catch (error) {
        console.error('Error fetching resources:', error);
        toast({
          title: "Error loading resources",
          description: "We couldn't load the latest resources. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [toast]);

  // Filter resources based on selected filter
  const filteredResources = filter === "all" 
    ? resources 
    : resources.filter(resource => resource.type === filter);
  
  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('resources');
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate percentage scrolled within this section
        const scrolled = scrollTop - sectionTop + windowHeight;
        const percent = Math.min(Math.max(scrolled / sectionHeight, 0), 1);
        setScrollPercent(percent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-8 border-dashed border-[#4531EA] rounded-full animate-spin-slow"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg font-mono">
            LOADING
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="resources" className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Avant-garde background patterns with parallax */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translateY(${scrollPercent * 40}px)`
        }}>
      </div>
      
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 py-24">
        {/* Bold brutalist header */}
        <div className="mb-20 px-6" data-aos="fade-up">
          <div className="max-w-screen-xl mx-auto">
            {/* Magazine-style stacked title with overlays */}
            <div className="relative mb-10">
              <h1 
                className="text-9xl md:text-[15rem] font-black text-white tracking-tight leading-none uppercase font-mono"
                style={{ transform: `translateX(${scrollPercent * -80}px)` }}
              >
                RESOURCES
              </h1>
              <div 
                className="absolute bottom-5 right-0 text-6xl md:text-8xl font-bold text-[#9D00E5] uppercase -rotate-6 font-mono"
                style={{ transform: `translateX(${scrollPercent * 60}px)` }}
              >
                DEV
              </div>
              <div 
                className="absolute -top-4 -left-2 text-4xl md:text-6xl font-bold text-[#CCEA71] uppercase rotate-3 font-mono"
                style={{ transform: `translateX(${scrollPercent * 90}px)` }}
              >
                CODED
              </div>
            </div>
            
            <p 
              className="text-xl md:text-2xl text-gray-300 mt-10 max-w-3xl font-mono uppercase"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              TOOLS AND KNOWLEDGE FOR INCLUSIVE DEVELOPMENT
            </p>
            
            {/* Minimalist, brutal filter controls */}
            <div 
              className="mt-12 flex flex-wrap items-center gap-4 md:gap-8 uppercase font-mono text-sm"
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              <span className="text-gray-500">FILTER BY:</span>
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2 border-2 ${filter === "all" ? "border-white bg-white text-black" : "border-white text-white"} uppercase hover:bg-white hover:text-black transition-colors`}
              >
                ALL
              </button>
              <button 
                onClick={() => setFilter("article")}
                className={`px-4 py-2 border-2 ${filter === "article" ? "border-[#4531EA] bg-[#4531EA] text-white" : "border-[#4531EA] text-[#4531EA]"} uppercase hover:bg-[#4531EA] hover:text-white transition-colors`}
              >
                ARTICLES
              </button>
              <button 
                onClick={() => setFilter("video")}
                className={`px-4 py-2 border-2 ${filter === "video" ? "border-[#9D00E5] bg-[#9D00E5] text-white" : "border-[#9D00E5] text-[#9D00E5]"} uppercase hover:bg-[#9D00E5] hover:text-white transition-colors`}
              >
                VIDEOS
              </button>
            </div>
          </div>
        </div>
        
        {filteredResources.length === 0 ? (
          <div 
            className="min-h-[400px] border-2 border-[#4531EA] bg-black/30 flex items-center justify-center"
            data-aos="fade-up"
          >
            <div className="text-center p-12">
              <div className="text-[150px] font-black text-[#4531EA]/10 mb-4">404</div>
              <h3 className="text-3xl font-bold text-white mb-2 font-mono uppercase">No Resources Found</h3>
              <p className="text-gray-400 max-w-md font-mono">TRY CHANGING YOUR FILTER OR CHECK BACK LATER</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <div 
                key={resource.id}
                className="group relative"
                onMouseEnter={() => setActiveCardId(resource.id)}
                onMouseLeave={() => setActiveCardId(null)}
              >
                <div 
                  className={`h-full border-4 p-8 transition-all duration-300`}
                  style={{ 
                    borderColor: activeCardId === resource.id ? resource.color : 'rgba(255,255,255,0.3)',
                    boxShadow: activeCardId === resource.id ? `0 0 30px ${resource.color}40` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <ResourceIcon type={resource.type} color={resource.color} />
                    <div 
                      className="text-sm font-mono uppercase"
                      style={{ color: resource.color }}
                    >
                      {resource.type}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{resource.title}</h3>
                  <p className="text-gray-400 mb-6 line-clamp-3">{resource.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs font-mono px-2 py-1 border"
                        style={{ 
                          borderColor: resource.color,
                          color: resource.color
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/10">
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="group/link inline-flex items-center gap-2 font-mono uppercase"
                      style={{ color: resource.color }}
                    >
                      VIEW RESOURCE
                      <ExternalLink 
                        size={16} 
                        className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" 
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
