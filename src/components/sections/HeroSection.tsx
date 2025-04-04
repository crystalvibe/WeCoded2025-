/**
 * Hero Section Component
 * 
 * This is the main landing section of the website featuring:
 * - Parallax scrolling effects
 * - Animated background grid
 * - Dynamic text positioning based on scroll
 * - Interactive CTA (Call to Action) button
 * - Animated statistics display
 * - Article submission modal integration
 * 
 * Visual Elements:
 * - Logo with border
 * - Main "CODED" text with offset "CANVAS" and "DEV" accents
 * - Animated grid background
 * - Stats cards with hover effects
 * 
 * The component uses:
 * - AOS (Animate on Scroll) for element animations
 * - Custom scroll-based parallax effects
 * - TailwindCSS for styling
 * - Responsive design for all screen sizes
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ArticleSubmissionModal } from "@/components/ui/article-submission-modal";

const HeroSection = () => {
  // Track scroll position for parallax animations
  const [scrollPercent, setScrollPercent] = useState(0);
  // Control visibility of article submission modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Scroll event handler for parallax effects
   * Calculates the scroll percentage within the hero section
   * Used to create dynamic movement of elements based on scroll position
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate percentage scrolled (0 to 1) within hero section
      const percent = Math.min(scrollTop / windowHeight, 1);
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Full-screen hero section with overflow control */}
      <section className="relative h-screen flex items-center overflow-hidden bg-black text-white">
        {/* Animated background grid with parallax effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              transform: `translateY(${scrollPercent * 40}px)`
            }}>
          </div>
        </div>

        {/* Main content container with z-index for layering */}
        <div className="relative z-10 w-full mx-auto px-4">
          <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
            {/* Logo with border animation */}
            <img 
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nfcn6junu8xg5e9910ip.png" 
              alt="Logo" 
              className="h-14 w-auto mb-6 border-2 border-white p-2" 
              data-aos="fade-down" 
            />

            {/* Main title with animated offset text elements */}
            <div className="relative mb-8" data-aos="fade-up">
              <h1 
                className="text-7xl md:text-[10rem] font-black text-white tracking-tight leading-none uppercase font-mono"
                style={{ transform: `translateX(${scrollPercent * -50}px)` }}
              >
                CODED
              </h1>
              <div 
                className="absolute bottom-3 right-0 text-3xl md:text-5xl font-bold text-[#9D00E5] uppercase -rotate-6 font-mono"
                style={{ transform: `translateX(${scrollPercent * 30}px)` }}
              >
                CANVAS
              </div>
              <div 
                className="absolute -top-3 -left-2 text-2xl md:text-4xl font-bold text-[#CCEA71] uppercase rotate-3 font-mono"
                style={{ transform: `translateX(${scrollPercent * 40}px)` }}
              >
                DEV
              </div>
            </div>

            {/* Tagline with fade animation */}
            <p 
              className="text-base md:text-xl text-gray-300 text-center mb-8 max-w-2xl font-mono uppercase"
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              A space where every developer's journey becomes part of our collective story
            </p>

            {/* Interactive CTA button with hover effects */}
            <div 
              className="group relative overflow-hidden mb-8"
              data-aos="fade-up" 
              data-aos-delay="200"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="relative z-10 border-2 border-white px-8 py-3 uppercase font-bold font-mono text-lg flex items-center gap-3 group-hover:bg-white group-hover:text-black transition-colors duration-300 cursor-pointer">
                START YOUR STORY
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#4531EA] group-hover:w-full transition-all duration-500"></div>
            </div>

            {/* Statistics grid with hover and parallax effects */}
            <div 
              className="mt-8 grid grid-cols-3 gap-4 w-full max-w-2xl"
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              <div 
                className="border-2 border-white/30 p-4 text-center hover:border-[#4531EA] transition-colors"
                style={{ transform: `translateY(${scrollPercent * -15}px)` }}
              >
                <div className="text-2xl md:text-3xl font-black text-[#CCEA71] mb-1 font-mono">1,200+</div>
                <div className="text-gray-400 text-xs uppercase font-mono">Stories Shared</div>
              </div>
              <div 
                className="border-2 border-white/30 p-4 text-center hover:border-[#9D00E5] transition-colors"
                style={{ transform: `translateY(${scrollPercent * -25}px)` }}
              >
                <div className="text-2xl md:text-3xl font-black text-[#4531EA] mb-1 font-mono">85+</div>
                <div className="text-gray-400 text-xs uppercase font-mono">Countries</div>
              </div>
              <div 
                className="border-2 border-white/30 p-4 text-center hover:border-[#CCEA71] transition-colors"
                style={{ transform: `translateY(${scrollPercent * -15}px)` }}
              >
                <div className="text-2xl md:text-3xl font-black text-[#9D00E5] mb-1 font-mono">24/7</div>
                <div className="text-gray-400 text-xs uppercase font-mono">Community</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article submission modal */}
      <ArticleSubmissionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default HeroSection;
