import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data) {
          toast({
            title: "Success!",
            description: "Logged in successfully.",
          });
          navigate("/");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            },
          },
        });

        if (error) {
          if (error.message === "User already registered") {
            toast({
              variant: "destructive",
              title: "Account exists",
              description: "This email is already registered. Please log in instead.",
            });
            setIsLogin(true);
          } else {
            throw error;
          }
          return;
        }

        if (data) {
          toast({
            title: "Success!",
            description: "Account created successfully. Please check your email to verify your account.",
          });
          navigate("/");
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
            {isLogin ? "Welcome Back" : "Join SkillUp AI"}
          </h2>
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              {!isLogin && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="firstName" className="text-sm font-medium mb-1 block">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="pl-10"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lastName" className="text-sm font-medium mb-1 block">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="pl-10"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required={!isLogin}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-1 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? "Logging in..." : "Creating account..."}
                </>
              ) : (
                isLogin ? "Log In" : "Sign Up"
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold"
                onClick={() => setIsLogin(!isLogin)}
                type="button"
              >
                {isLogin ? "Sign up" : "Log in"}
              </Button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
