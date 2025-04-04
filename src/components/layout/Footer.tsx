/**
 * Footer Component
 * 
 * The site footer displays branding, social links, and copyright information.
 * It features:
 * - Site logo/branding with custom typography
 * - Social media links with hover effects (GitHub and DEV.to)
 * - Copyright information with current year
 * - Responsive layout (stacks vertically on mobile, horizontal on desktop)
 * 
 * Visual Elements:
 * - Bold monospace typography
 * - Accent colors matching the site's color scheme
 * - Interactive hover effects on social links
 * - Top border in brand color for visual separation
 */

import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-4 border-[#4531EA] py-10">
      <div className="container mx-auto px-6">
        {/* Main footer content area with responsive layout */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Branding section */}
          <div className="mb-8 md:mb-0">
            <div className="font-mono uppercase text-2xl font-bold tracking-wider">
              CODED
              <span className="text-[#9D00E5]">_</span>
              CANVAS
            </div>
            <div className="mt-2 text-[#CCEA71] font-mono uppercase text-sm tracking-wide">
              CELEBRATING DIVERSITY IN TECH
            </div>
          </div>
          
          {/* Social media links with hover effects */}
          <div className="flex items-center space-x-4">
            {/* GitHub link */}
            <a 
              href="https://github.com/crystalvibe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 border-2 border-[#4531EA] flex items-center justify-center hover:bg-[#4531EA] hover:text-black transition-colors"
            >
              <Github size={20} />
            </a>
            {/* DEV.to link */}
            <a 
              href="https://dev.to/vibha_parashar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 border-2 border-[#9D00E5] flex items-center justify-center hover:bg-[#9D00E5] hover:text-black transition-colors"
            >
              <span className="font-mono font-bold">DEV</span>
            </a>
          </div>
        </div>
        
        {/* Copyright section with dynamic year */}
        <div className="mt-10 pt-6 border-t border-white/20 flex justify-center items-center font-mono text-xs text-[#CCEA71]">
          <div className="flex items-center">
            <span>CODED_CANVAS © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
