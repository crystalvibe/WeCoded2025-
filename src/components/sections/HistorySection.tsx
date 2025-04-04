import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const timelineEvents = [
  {
    year: "2016",
    title: "SheCoded Begins",
    description: "The first SheCoded celebration launches on International Women's Day, providing a platform for women in tech to share their journeys.",
    highlight: "150+ stories shared in the first year",
    image: "https://picsum.photos/id/1/800/450",
    color: "#4531EA"
  },
  {
    year: "2018",
    title: "Community Growth",
    description: "SheCoded expands with more international participation and introduces mentorship connections through story sharing.",
    highlight: "500+ stories across 45 countries",
    image: "https://picsum.photos/id/20/800/450",
    color: "#9D00E5"
  },
  {
    year: "2021",
    title: "Evolution to WeCoded",
    description: "Recognizing the need for greater inclusivity, SheCoded evolves into WeCoded to embrace all underrepresented voices in tech.",
    highlight: "First year with 800+ diverse stories",
    image: "https://picsum.photos/id/180/800/450",
    color: "#CCEA71"
  },
  {
    year: "2023",
    title: "Global Impact",
    description: "WeCoded becomes one of the largest annual celebrations of diversity in tech, with stories featured across major tech publications.",
    highlight: "1,200+ stories from 85+ countries",
    image: "https://picsum.photos/id/240/800/450",
    color: "#4531EA"
  },
];

const HistorySection = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('history');
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

  return (
    <section 
      id="history" 
      className="relative bg-black text-white overflow-hidden pb-24"
    >
      {/* Grid background with parallax effect */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translateY(${scrollPercent * 40}px)`
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 py-24">
        {/* Bold brutalist header */}
        <div className="mb-14 px-6" data-aos="fade-up">
          <div className="max-w-screen-xl mx-auto">
            {/* Magazine-style stacked title with overlays */}
            <div className="relative">
              <h1 
                className="text-7xl md:text-[12rem] font-black text-white tracking-tight leading-none uppercase font-mono"
                style={{ transform: `translateX(${scrollPercent * -100}px)` }}
              >
                EVOLUTION
              </h1>
              <div 
                className="absolute bottom-1 right-4 text-4xl md:text-6xl font-bold text-[#9D00E5] uppercase -rotate-6 font-mono"
                style={{ transform: `translateX(${scrollPercent * 50}px)` }}
              >
                FORWARD
              </div>
              <div 
                className="absolute -top-2 -left-1 text-2xl md:text-4xl font-bold text-[#CCEA71] uppercase rotate-3 font-mono"
                style={{ transform: `translateX(${scrollPercent * 70}px)` }}
              >
                MOVING
              </div>
            </div>
            
            <p 
              className="text-xl text-gray-300 mt-6 max-w-3xl font-mono uppercase"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              FROM SHECODED TO WECODED: OUR JOURNEY OF INCLUSIVITY
            </p>
          </div>
        </div>
        
        {/* Timeline - vertical format */}
        <div className="mx-auto max-w-6xl relative pb-8">
          {/* Vertical line running through timeline */}
          <div 
            className="absolute left-8 md:left-1/2 top-0 h-full w-[3px]" 
            style={{
              background: "linear-gradient(to bottom, #4531EA, #9D00E5, #CCEA71)",
              boxShadow: "0 0 15px rgba(69, 49, 234, 0.4)",
              height: `${Math.min(100, scrollPercent * 200)}%`,
              transition: "height 0.5s ease-out"
            }}
          />
          
          {/* Timeline events */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <div 
                key={event.year}
                className={`mb-24 relative flex flex-col md:flex-row md:justify-between items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                onMouseEnter={() => setActiveEvent(index)}
                onMouseLeave={() => setActiveEvent(null)}
              >
                {/* Year marker and dot */}
                <div 
                  className="absolute left-8 md:left-1/2 transform md:translate-x-[-50%] z-10"
                >
                  <div 
                    className="w-12 h-12 rounded-full border-[3px] flex items-center justify-center transform transition-all duration-300"
                    style={{ 
                      borderColor: event.color,
                      backgroundColor: "black",
                      boxShadow: `0 0 15px ${event.color}`,
                      transform: activeEvent === index ? 'scale(1.2)' : 'scale(1)'
                    }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: event.color }}
                    />
                  </div>
                </div>
                  
                {/* Year display */}
                <div 
                  className={`ml-24 md:ml-0 md:w-[50%] md:px-12 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} mb-6 md:mb-0`}
                >
                  <span 
                    className="text-6xl font-bold font-mono"
                    style={{ 
                      color: event.color,
                      textShadow: `0 0 15px ${event.color}80`
                    }}
                  >
                    {event.year}
                  </span>
                </div>
                
                {/* Event content - alternating sides on desktop */}
                <div 
                  className={`ml-24 md:ml-0 md:w-[50%] md:px-12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                >
                  <div 
                    className={`border-[3px] overflow-hidden hover:shadow-lg transition-all duration-500`}
                    style={{ 
                      borderColor: activeEvent === index ? event.color : 'rgba(255,255,255,0.6)',
                      boxShadow: activeEvent === index ? `0 0 30px ${event.color}60` : 'none',
                      transform: activeEvent === index ? 'scale(1.03)' : 'scale(1)'
                    }}
                  >
                    <div className="flex flex-col">
                      {/* Image section */}
                      <div className="w-full h-56 md:h-72 relative overflow-hidden">
                        <div 
                          className="absolute inset-0 mix-blend-overlay bg-opacity-60" 
                          style={{ backgroundColor: `${event.color}30` }}
                        />
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700"
                          style={{
                            transform: `scale(1.05) translateY(${(scrollPercent * 10) - (index * 5)}px)`
                          }}
                        />
                      </div>
                      
                      {/* Content section */}
                      <div className="p-8 bg-black">
                        <h3 
                          className="text-3xl md:text-4xl font-black uppercase mb-4 leading-tight"
                          style={{ 
                            color: 'white',
                            textShadow: activeEvent === index ? `0 0 10px ${event.color}50` : 'none' 
                          }}
                        >
                          {event.title}
                        </h3>
                        
                        <p 
                          className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg"
                        >
                          {event.description}
                        </p>
                        
                        <div 
                          className="inline-block px-4 py-2 font-mono text-sm uppercase" 
                          style={{ 
                            backgroundColor: `${event.color}20`, 
                            color: event.color,
                            border: `1px solid ${event.color}`,
                            boxShadow: `0 0 10px ${event.color}30` 
                          }}
                        >
                          {event.highlight}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div 
          className="mt-10 flex justify-center"
          data-aos="fade-up"
          data-aos-offset="0"
        >
          <a 
            href="#stories" 
            className="group relative overflow-hidden"
          >
            <div className="relative z-10 border-4 border-white px-8 py-4 uppercase font-bold font-mono text-lg flex items-center gap-3 group-hover:bg-white group-hover:text-black transition-colors duration-300">
              EXPLORE OUR STORIES
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </div>
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#4531EA] group-hover:w-full transition-all duration-500"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
