import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial auth state
    checkUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        navigate('/signup');
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (!session) {
        navigate('/signup');
      }
    } catch (error: any) {
      console.error('Error checking auth state:', error);
      toast.error('Authentication error. Please try logging in again.');
      navigate('/signup');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold gradient-text"
          >
            SkillUp AI
          </motion.a>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => navigate('/profile')}
              >
                <Avatar>
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => navigate('/signup')}
              >
                Sign In
              </Button>
            )}
            
            <button 
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          <div className={`${isOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-20 md:top-0 left-0 right-0 md:right-auto flex-col md:flex-row items-center space-y-4 md:space-y-0 space-x-0 md:space-x-8 bg-white/90 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none p-6 md:p-0 border-t md:border-t-0 border-white/20`}>
            {["Features", "Courses", "Community"].map((item, index) => (
              <motion.a
                key={index}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item}
              </motion.a>
            ))}
            {!isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};