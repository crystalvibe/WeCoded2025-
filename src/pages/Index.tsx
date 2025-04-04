import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StoriesSection from "@/components/sections/StoriesSection";
import HistorySection from "@/components/sections/HistorySection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import CommunitySection from "@/components/sections/CommunitySection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <StoriesSection />
        <HistorySection />
        <ResourcesSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
