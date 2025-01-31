import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7')] bg-cover bg-center opacity-5" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-secondary/10 text-secondary rounded-full"
        >
          Empower Your Future with AI-Driven Learning
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight gradient-text"
        >
          Learn. Grow.
          <br />
          Transform.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Join our AI-powered learning platform designed specifically for rural areas. 
          Unlock your potential with personalized courses and expert guidance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="group px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:scale-105 transform transition-all duration-200 flex items-center justify-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-xl glass hover:bg-white/20 transition-all duration-200 hover:scale-105 transform">
            Watch Demo
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};