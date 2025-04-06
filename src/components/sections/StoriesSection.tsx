/**
 * Stories Section Component
 * 
 * This section displays developer stories fetched from DEV.to API.
 * It features:
 * - Filter controls for "All", "WeCoded", and "SheCoded" categories
 * - Magazine-style layout with featured story
 * - Interactive cards with hover effects
 * - Parallax scrolling animations
 * - Loading states and empty results handling
 * 
 * Visual Elements:
 * - Bold, stacked typography with animated text elements
 * - Minimalist, high-contrast card design
 * - Category badges with distinct colors
 * - Interactive hover states on all elements
 * - Responsive grid layout (3 columns on desktop, 1 on mobile)
 */

import { useState, useEffect } from "react";
import { ArrowRight, Users, Calendar, ExternalLink, Heart, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Interface for DEV.to article data structure
 * Defines the shape of article objects fetched from the API
 */
interface DevToArticle {
  id: number;               // Unique article identifier
  title: string;            // Article title
  description: string;      // Short description/summary
  user: {
    name: string;           // Author's name
  };
  published_at: string;     // Publication date (ISO format)
  tag_list: string[];       // Array of tags
  canonical_url: string;    // Original URL if cross-posted
  cover_image: string;      // Featured image URL
  url: string;              // Article URL on DEV.to
}

const StoriesSection: React.FC = () => {
  // Current filter category (all/wecoded/shecoded)
  const [filter, setFilter] = useState("all");
  // Array of stories fetched from DEV.to
  const [stories, setStories] = useState<DevToArticle[]>([]);
  // Loading state for API requests
  const [isLoading, setIsLoading] = useState(true);
  // Tracks which card is currently hovered
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  // Tracks scroll percentage for parallax effects
  const [scrollPercent, setScrollPercent] = useState(0);
  // Toast notification system
  const { toast } = useToast();
  
  /**
   * Formats ISO date strings to a readable format
   * Example: "2023-04-15T08:30:00Z" → "Apr 15, 2023"
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  /**
   * Track scroll position for parallax animations
   * Calculates how far the user has scrolled through this section
   * and updates scrollPercent state (0-1 value)
   */
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('stories');
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
  
  /**
   * Fetch stories from DEV.to API on component mount
   * Gets articles tagged with "wecoded"
   * Shows error toast if the fetch fails
   */
  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        // Fetch both wecoded and shecoded articles
        const [wecodedResponse, shecodedResponse] = await Promise.all([
          fetch('https://dev.to/api/articles?tag=wecoded'),
          fetch('https://dev.to/api/articles?tag=shecoded')
        ]);

        if (!wecodedResponse.ok || !shecodedResponse.ok) {
          throw new Error('Failed to fetch stories');
        }

        const wecodedData = await wecodedResponse.json();
        const shecodedData = await shecodedResponse.json();

        // Combine both arrays and remove duplicates based on article id
        const combinedStories = [...wecodedData, ...shecodedData];
        const uniqueStories = Array.from(new Map(combinedStories.map(story => [story.id, story])).values());

        setStories(uniqueStories);
      } catch (error) {
        console.error("Error fetching stories:", error);
        toast({
          title: "Error loading stories",
          description: "We couldn't load the latest stories. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, [toast]);

  /**
   * Filter stories based on selected category
   * - "all": shows all stories
   * - "shecoded": only shows stories with the "shecoded" tag
   * - "wecoded": shows stories with "wecoded" but not "shecoded"
   */
  const filteredStories = filter === "all" 
    ? stories 
    : stories.filter(story => {
        if (filter === "shecoded") {
          return story.tag_list.includes("shecoded");
        }
        return story.tag_list.includes("wecoded") && !story.tag_list.includes("shecoded");
      });

  // Display loading spinner while fetching stories
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
    <section id="stories" className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background grid with parallax effect */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translateY(${scrollPercent * 40}px)`
        }}>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 py-24">
        {/* Section header with typography effects */}
        <div className="mb-20 px-6">
          <div className="max-w-screen-xl mx-auto">
            {/* Animated title with parallax text elements */}
            <div className="relative mb-10">
              <h1 
                className="text-9xl md:text-[15rem] font-black text-white tracking-tight leading-none uppercase font-mono"
                style={{ transform: `translateX(${scrollPercent * -80}px)` }}
              >
                STORIES
              </h1>
              <div 
                className="absolute -top-4 -left-2 text-4xl md:text-6xl font-bold text-[#CCEA71] uppercase rotate-3 font-mono"
                style={{ transform: `translateX(${scrollPercent * 90}px)` }}
              >
                CODED
              </div>
              <div 
                className="absolute bottom-5 right-0 text-6xl md:text-8xl font-bold text-[#9D00E5] uppercase -rotate-6 font-mono"
                style={{ transform: `translateX(${scrollPercent * 60}px)` }}
              >
                DEV
              </div>
            </div>
            
            {/* Section subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mt-10 max-w-3xl font-mono uppercase">
              AUTHENTIC NARRATIVES FROM THE TECH FRONTLINES
            </p>
            
            {/* Filter controls with active state styling */}
            <div className="mt-12 flex flex-wrap items-center gap-4 md:gap-8 uppercase font-mono text-sm">
              <span className="text-gray-500">FILTER BY:</span>
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2 border-2 ${filter === "all" ? "border-white bg-white text-black" : "border-white text-white"} uppercase hover:bg-white hover:text-black transition-colors`}
              >
                ALL
              </button>
              <button 
                onClick={() => setFilter("wecoded")}
                className={`px-4 py-2 border-2 ${filter === "wecoded" ? "border-[#4531EA] bg-[#4531EA] text-white" : "border-[#4531EA] text-[#4531EA]"} uppercase hover:bg-[#4531EA] hover:text-white transition-colors`}
              >
                WE CODED
              </button>
              <button 
                onClick={() => setFilter("shecoded")}
                className={`px-4 py-2 border-2 ${filter === "shecoded" ? "border-[#9D00E5] bg-[#9D00E5] text-white" : "border-[#9D00E5] text-[#9D00E5]"} uppercase hover:bg-[#9D00E5] hover:text-white transition-colors`}
              >
                SHE CODED
              </button>
            </div>
          </div>
        </div>

        {/* No results message when filtered stories is empty */}
        {filteredStories.length === 0 ? (
          <div className="min-h-[400px] border-2 border-white/50 bg-black/30 flex items-center justify-center">
            <div className="text-center p-12">
              <div className="text-[150px] font-black text-white/10 mb-4">404</div>
              <h3 className="text-3xl font-bold text-white mb-2 font-mono uppercase">No Stories Found</h3>
              <p className="text-gray-400 max-w-md font-mono">TRY CHANGING YOUR FILTER OR CHECK BACK LATER</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured story - full width with large display */}
            {filteredStories.length > 0 && (
              <div className="md:col-span-3 group" onClick={() => window.open(filteredStories[0].url, '_blank')}>
                <div 
                  className="relative h-[500px] overflow-hidden border-4 border-white cursor-pointer"
                  style={{
                    transform: `translateY(${scrollPercent * -20}px)`
                  }}
                >
                  {/* Overlay gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
                  
                  {/* Featured story content layout */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="absolute top-8 left-8">
                      <div className={`inline-block px-4 py-2 font-bold ${
                        filteredStories[0].tag_list.includes("shecoded") 
                          ? "bg-[#FF00C7] text-black" 
                          : "bg-[#CCEA71] text-black"
                      } uppercase text-xs font-mono`}>
                        {filteredStories[0].tag_list.includes("shecoded") ? "SHE CODED" : "WE CODED"}
                      </div>
                    </div>
                    
                    <h2 className="text-5xl font-black mb-6 uppercase leading-tight group-hover:text-[#4531EA] transition-colors duration-300">
                      {filteredStories[0].title}
                    </h2>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-gray-300 line-clamp-2 mb-4 text-xl max-w-3xl">
                          {filteredStories[0].description}
                        </p>
                        <div className="flex items-center text-sm text-gray-400 uppercase font-mono">
                          <span className="mr-6">{filteredStories[0].user.name}</span>
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-2" />
                            {formatDate(filteredStories[0].published_at)}
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-white text-black flex items-center justify-center group-hover:bg-[#4531EA] group-hover:text-white transition-colors">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Regular story cards in a grid layout */}
            {filteredStories.slice(1).map((story, index) => {
              const isSheCoded = story.tag_list.includes("shecoded");
              const isActive = activeCardId === story.id;
              
              // Create visual variety with larger cards every 5th item
              const isHighlighted = index % 5 === 0;
              const highlightSpan = isHighlighted ? "md:col-span-2 md:row-span-2" : "";

              return (
                <div 
                  key={story.id} 
                  className={`${highlightSpan} group relative`}
                  onMouseEnter={() => setActiveCardId(story.id)}
                  onMouseLeave={() => setActiveCardId(null)}
                  onClick={() => window.open(story.url, '_blank')}
                >
                  <div 
                    className={`h-full border-2 ${isActive ? 'border-[#4531EA]' : 'border-white/30'} hover:border-[#4531EA] overflow-hidden transition-colors duration-300 cursor-pointer`}
                    style={{
                      transform: `translateY(${scrollPercent * (10 * (index % 3))}px)`
                    }}
                  >
                    {/* Story card content */}
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <span className={`inline-block px-3 py-1 text-xs font-bold ${
                          isSheCoded
                            ? "bg-[#FF00C7] text-black" 
                              : "bg-[#CCEA71] text-black"
                        } uppercase font-mono`}>
                          {isSheCoded ? "SHE CODED" : "WE CODED"}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          {formatDate(story.published_at)}
                        </span>
                      </div>
                      
                      <h3 className={`text-2xl ${isHighlighted ? 'text-3xl' : ''} font-bold mb-4 uppercase group-hover:text-[#4531EA] transition-colors duration-300 leading-tight`}>
                        {story.title}
                      </h3>
                      
                      {/* Show description only on highlighted or hovered cards */}
                      {(isHighlighted || isActive) && (
                        <p className="text-gray-300 text-sm my-4 line-clamp-3">
                          {story.description || "Explore this developer's unique journey and perspective in tech."}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                        <span className="text-sm font-mono uppercase text-gray-400">
                          {story.user.name}
                        </span>
                        
                        <div className={`w-8 h-8 ${isActive ? 'bg-[#4531EA]' : 'bg-white'} flex items-center justify-center group-hover:bg-[#4531EA] transition-colors duration-300`}>
                          <ExternalLink size={16} className={`${isActive ? 'text-white' : 'text-black'} group-hover:text-white`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Bottom call-to-action link to DEV.to */}
        <div className="mt-24 flex justify-center">
          <a 
            href="https://dev.to/t/wecoded" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden"
          >
            <div className="relative z-10 border-4 border-white px-10 py-6 uppercase font-bold font-mono text-xl flex items-center gap-4 group-hover:bg-white group-hover:text-black transition-colors duration-300">
              EXPLORE ALL STORIES
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#4531EA] group-hover:w-full transition-all duration-500"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
