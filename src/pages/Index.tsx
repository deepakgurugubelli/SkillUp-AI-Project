import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Courses } from "@/components/Courses";
import { Community } from "@/components/Community";
import { AIChat } from "@/components/AIChat";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Courses />
      <Community />
      <AIChat />
      <Footer />
    </main>
  );
};

export default Index;