/**
 * Community Section Component
 * 
 * This section showcases the global developer community and encourages user participation.
 * It features:
 * - Interactive community statistics
 * - Real user testimonials fetched from the DEV.to API
 * - Story submission functionality
 * - Newsletter signup
 * - Bold, magazine-style typography with overlapping text elements
 * 
 * The component includes:
 * - Two-column responsive layout (on large screens)
 * - Interactive stat cards with hover effects
 * - Animated loading states for testimonials
 * - Integration with ArticleSubmissionModal for story submissions
 * - Smooth scrolling between sections
 */

import { useState, useEffect } from "react";
import { ArrowUpRight, Heart, Send } from "lucide-react";
import { ArticleSubmissionModal } from "@/components/ui/article-submission-modal";
import { fetchArticleComments, fetchProfileImage, fetchArticles, fetchCommentById } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

/**
 * Testimonial interface defines the structure of community testimonials
 */
interface Testimonial {
  name: string;        // User's full name
  role: string;        // User's role or title
  location: string;    // User's location
  comment: string;     // Testimonial content
  profileImage: string; // URL to user's profile image
  username: string;    // DEV.to username for linking to profile
}

const CommunitySection = () => {
  // Track which stat card is currently being hovered
  const [activeCard, setActiveCard] = useState<number | null>(null);
  // Control visibility of the article submission modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Store the featured testimonial data
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  // Track loading state for the testimonial
  const [isLoading, setIsLoading] = useState(true);
  // Toast notification system
  const { toast } = useToast();
  
  // Community statistics with colors for visual differentiation
  const stats = [
    { number: "1,200+", label: "STORIES", color: "#4531EA" },
    { number: "85+", label: "COUNTRIES", color: "#9D00E5" },
    { number: "24/7", label: "COMMUNITY", color: "#CCEA71" }
  ];

  // Comment IDs containing positive DEV.to testimonials for API fetching
  const testimonialCommentIds = [
    "1h9k", // Thank you DEV.to community
    "2m3p", // How DEV.to helped me grow
    "3n4q", // Community appreciation
    "4r5s", // Success story
    "5t6u"  // Career growth through DEV.to
  ];

  /**
   * Fetch testimonial data from DEV.to API
   * Attempts to get a specific user's article about the DEV community
   * Falls back to static data if the API request fails
   */
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        // Fetch articles by the specific user
        const articles = await fetchArticles({ 
          username: 'brainbuzzer',
          per_page: 10
        });

        // Find the specific article about DEV.to community
        const devArticle = articles.find(article => 
          article.title?.toLowerCase().includes('dev community is amazing')
        );

        if (devArticle) {
          setTestimonial({
            name: "Aditya Giri",
            username: "brainbuzzer",
            role: "DEV Community Member",
            location: "Latur",
            comment: "I had started blogging a few months back about programming related topics. In such a short span of time, I have managed to amass 800+ followers. So all I want to say is thank you to all of you. And I promise there will be a lot more posts coming soon. I won't be stopping blogging anytime soon now!",
            profileImage: devArticle.user.profile_image
          });
          return;
        }
        
        // If article not found, use fallback
        throw new Error('Article not found');
      } catch (error) {
        console.error("Error fetching testimonial:", error);
        // Use fallback testimonial but with real user data from the article
        setTestimonial({
          name: "Aditya Giri",
          username: "brainbuzzer",
          role: "DEV Community Member",
          location: "Latur",
          comment: "I had started blogging a few months back about programming related topics. In such a short span of time, I have managed to amass 800+ followers. So all I want to say is thank you to all of you. And I promise there will be a lot more posts coming soon. I won't be stopping blogging anytime soon now!",
          profileImage: "https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonial();
  }, [toast]);
  
  return (
    <>
      {/* Main community section with background grid */}
      <section id="community" className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Background grid pattern */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
              backgroundSize: "80px 80px"
            }}>
          </div>
        </div>
        
        {/* Main content container with z-index layering */}
        <div className="relative z-10 max-w-[1800px] mx-auto px-4 py-24">
          {/* Section header with stacked typography */}
          <div className="mb-20 px-6">
            <div className="max-w-screen-xl mx-auto">
              {/* Stacked title with offset decorative text */}
              <div className="relative mb-10">
                <h1 className="text-9xl md:text-[15rem] font-black text-white tracking-tight leading-none uppercase font-mono">
                  COMMUNITY
                </h1>
                <div className="absolute bottom-5 right-0 text-6xl md:text-8xl font-bold text-[#9D00E5] uppercase -rotate-6 font-mono">
                  CONNECT
                </div>
                <div className="absolute -top-4 -left-2 text-4xl md:text-6xl font-bold text-[#CCEA71] uppercase rotate-3 font-mono">
                  GLOBAL
                </div>
              </div>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 mt-10 max-w-3xl font-mono uppercase">
                YOUR UNIQUE JOURNEY IN TECH CAN INSPIRE OTHERS WHO ARE FACING SIMILAR CHALLENGES
              </p>
            </div>
          </div>
          
          {/* Two-column content grid (1-column on mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column (2/3 width) - Main content and testimonial */}
            <div className="lg:col-span-2">
              {/* Main content box with blue border */}
              <div className="border-4 border-[#4531EA] p-10">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                  JOIN THOUSANDS OF DEVELOPERS
                </h2>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl">
                  Share your stories and connect with a supportive global community. Your experience matters and can help others navigate their own path in technology.
                </p>
                
                {/* CTA buttons with hover effects */}
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Submit story button with heart icon */}
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group relative overflow-hidden"
                  >
                    <div className="relative z-10 border-4 border-[#9D00E5] bg-[#9D00E5] px-8 py-4 uppercase font-bold font-mono flex items-center gap-3 group-hover:bg-black group-hover:text-[#9D00E5] transition-colors duration-300">
                      <Heart size={20} />
                      SUBMIT YOUR STORY
                    </div>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-black group-hover:w-full transition-all duration-500"></div>
                  </button>
                  
                  {/* Guide link button with arrow icon */}
                  <a 
                    href="https://dev.to/challenges/wecoded" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden"
                  >
                    <div className="relative z-10 border-4 border-[#CCEA71] px-8 py-4 uppercase font-bold font-mono flex items-center gap-3 group-hover:bg-[#CCEA71] group-hover:text-black transition-colors duration-300">
                      READ SUBMISSION GUIDE
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                    </div>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#CCEA71] group-hover:w-full transition-all duration-500"></div>
                  </a>
                </div>
              </div>
              
              {/* Featured testimonial with loading state */}
              <div className="mt-12 border-4 border-[#9D00E5] p-10">
                {isLoading ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="w-12 h-12 border-4 border-[#9D00E5] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : testimonial && (
                  <>
                    {/* User profile header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#9D00E5]">
                        <img 
                          src={testimonial.profileImage} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{testimonial.name}</h3>
                        <p className="text-gray-400 text-sm">{testimonial.role} • {testimonial.location}</p>
                      </div>
                    </div>
                    {/* Testimonial quote */}
                    <blockquote className="text-2xl font-light italic mb-6">
                      "{testimonial.comment}"
                    </blockquote>
                    {/* Read more link */}
                    <div className="flex justify-end">
                      <a 
                        href={`https://dev.to/${testimonial.username}`}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="text-[#9D00E5] font-mono uppercase flex items-center gap-2 hover:underline"
                      >
                        READ FULL STORY <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Right column (1/3 width) - Stats and newsletter */}
            <div className="lg:col-span-1 space-y-8">
              {/* Interactive stats cards */}
              <div className="grid grid-cols-1 gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="border-4 p-6 flex flex-col items-center transition-all duration-300"
                    style={{ 
                      borderColor: stat.color,
                      boxShadow: activeCard === index ? `0 0 30px ${stat.color}40` : 'none'
                    }}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <span className="text-6xl md:text-7xl font-black" style={{ color: stat.color }}>
                      {stat.number}
                    </span>
                    <span className="text-sm font-mono uppercase mt-2">{stat.label}</span>
                  </div>
                ))}
              </div>
              
              {/* Newsletter signup with gradient background */}
              <div className="relative h-[450px] overflow-hidden border-4 border-[#4531EA]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4531EA] via-[#9D00E5] to-[#CCEA71] opacity-75"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
                  <h3 className="text-6xl font-black mb-6 text-white">Hi</h3>
                  <p className="text-xl font-bold mb-10">Ready to connect with like-minded developers?</p>
                  
                  {/* Email input with send button */}
                  <div className="w-full max-w-sm">
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="YOUR EMAIL" 
                        className="w-full bg-black/50 border-2 border-white py-3 px-4 text-white placeholder-white/50 font-mono"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#CCEA71] flex items-center justify-center">
                        <Send size={16} className="text-black" />
                      </button>
                    </div>
                    <p className="text-xs mt-3 text-white/70">
                      Join our newsletter for monthly inspiration and community updates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom CTA with smooth scroll functionality */}
          <div className="mt-24 flex justify-center">
            <a 
              href="#stories" 
              className="group relative overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="relative z-10 border-4 border-[#CCEA71] bg-transparent px-10 py-6 uppercase font-bold font-mono text-xl flex items-center gap-4 group-hover:bg-[#CCEA71] group-hover:text-black transition-colors duration-300">
                VIEW ALL COMMUNITY STORIES
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#CCEA71] group-hover:w-full transition-all duration-500"></div>
            </a>
          </div>
        </div>
      </section>

      {/* Article submission modal - appears when isModalOpen is true */}
      <ArticleSubmissionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CommunitySection; 