import { motion } from "framer-motion";
import { BookOpen, Video, MessageSquare, Trophy, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const courses = [
  {
    title: "Full Stack Development",
    description: "Master MERN stack and modern web development",
    level: "Intermediate",
    rating: 4.8,
    students: 2500,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    path: "full-stack",
    demoVideo: "https://www.youtube.com/embed/bMknfKXIFA8" // Complete React course intro
  },
  {
    title: "AI & Machine Learning",
    description: "Deep dive into AI, ML, and Neural Networks",
    level: "Advanced",
    rating: 4.9,
    students: 1800,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    path: "ai-ml",
    demoVideo: "https://www.youtube.com/embed/i_LwzRVP7bg" // ML course intro
  },
  {
    title: "Cloud Computing (AWS)",
    description: "Learn AWS services and cloud architecture",
    level: "Intermediate",
    rating: 4.7,
    students: 2100,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    path: "aws",
    demoVideo: "https://www.youtube.com/embed/k1RI5locZE4" // AWS course intro
  },
  {
    title: "DevOps & CI/CD",
    description: "Master modern DevOps practices and tools",
    level: "Advanced",
    rating: 4.8,
    students: 1500,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    path: "devops",
    demoVideo: "https://www.youtube.com/embed/j5Zsa_eOXeY" // DevOps course intro
  },
  {
    title: "Blockchain Development",
    description: "Build decentralized apps and smart contracts",
    level: "Advanced",
    rating: 4.6,
    students: 1200,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    path: "blockchain",
    demoVideo: "https://www.youtube.com/embed/gyMwXuJrbJQ" // Blockchain course intro
  },
  {
    title: "UI/UX Design",
    description: "Create stunning user interfaces and experiences",
    level: "Beginner",
    rating: 4.9,
    students: 3000,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    path: "ui-ux",
    demoVideo: "https://www.youtube.com/embed/c9Wg6Cb_YlU" // UI/UX course intro
  },
  {
    title: "Data Science",
    description: "Master data analysis and visualization",
    level: "Intermediate",
    rating: 4.8,
    students: 2200,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    path: "data-science",
    demoVideo: "https://www.youtube.com/embed/ua-CiDNNj30" // Data Science course intro
  },
  {
    title: "Cybersecurity",
    description: "Learn ethical hacking and security practices",
    level: "Advanced",
    rating: 4.7,
    students: 1600,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    path: "cybersecurity",
    demoVideo: "https://www.youtube.com/embed/BsxdJTKRqNk" // Cybersecurity course intro
  },
  {
    title: "Mobile App Development",
    description: "Build iOS and Android apps with React Native",
    level: "Intermediate",
    rating: 4.8,
    students: 2800,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    path: "mobile-dev",
    demoVideo: "https://www.youtube.com/embed/0-S5a0eXPoc" // React Native course intro
  },
  {
    title: "Python Programming",
    description: "Master Python for automation and development",
    level: "Beginner",
    rating: 4.9,
    students: 3500,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
    path: "python",
    demoVideo: "https://www.youtube.com/embed/rfscVS0vtbw" // Python course intro
  },
  {
    title: "Digital Marketing",
    description: "Learn SEO, SEM, and social media marketing",
    level: "Beginner",
    rating: 4.7,
    students: 2600,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    path: "digital-marketing",
    demoVideo: "https://www.youtube.com/embed/uqJR-U1fTn8" // Digital Marketing course intro
  },
  {
    title: "IoT Development",
    description: "Build smart devices and IoT solutions",
    level: "Advanced",
    rating: 4.6,
    students: 1100,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    path: "iot",
    demoVideo: "https://www.youtube.com/embed/h0gWfVCSGQQ" // IoT course intro
  },
  {
    title: "Game Development",
    description: "Create games with Unity and C#",
    level: "Intermediate",
    rating: 4.8,
    students: 1900,
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914",
    path: "game-dev",
    demoVideo: "https://www.youtube.com/embed/gB1F9G0JXOo" // Unity course intro
  },
  {
    title: "Cloud Native Development",
    description: "Master Kubernetes and microservices",
    level: "Advanced",
    rating: 4.7,
    students: 1400,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    path: "cloud-native",
    demoVideo: "https://www.youtube.com/embed/d6WC5n9G_sM" // Kubernetes course intro
  },
  {
    title: "Data Engineering",
    description: "Build robust data pipelines and infrastructure",
    level: "Advanced",
    rating: 4.8,
    students: 1300,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    path: "data-engineering",
    demoVideo: "https://www.youtube.com/embed/qWru-b6m030" // Data Engineering course intro
  }
];

export const Courses = () => {
  const navigate = useNavigate();

  const handleWatchDemo = async (course: typeof courses[0]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to watch demo videos");
        return;
      }

      const { error } = await supabase
        .from('course_enrollments')
        .insert([
          { 
            course_id: course.path,
            status: 'demo_viewed',
            user_id: user.id
          }
        ]);

      if (error) throw error;
      
      window.open(course.demoVideo, '_blank');
      toast.success("Loading demo video...");
    } catch (error) {
      console.error("Error logging demo view:", error);
      toast.error("Failed to load demo video. Please try again.");
    }
  };

  const handleEnroll = async (course: typeof courses[0]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to enroll in courses");
        return;
      }

      // Check if user is already enrolled
      const { data: existingEnrollment } = await supabase
        .from('course_enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', course.path)
        .single();

      if (existingEnrollment) {
        toast.info("You are already enrolled in this course");
        navigate(`/course/${course.path}`);
        return;
      }

      const { error } = await supabase
        .from('course_enrollments')
        .insert([
          { 
            course_id: course.path,
            status: 'enrolled',
            user_id: user.id
          }
        ]);

      if (error) throw error;
      
      toast.success("Successfully enrolled in the course!");
      navigate(`/course/${course.path}`);
    } catch (error: any) {
      console.error("Error enrolling in course:", error);
      // Handle duplicate enrollment error specifically
      if (error.code === '23505') {
        toast.info("You are already enrolled in this course");
        navigate(`/course/${course.path}`);
      } else {
        toast.error("Failed to enroll in course. Please try again.");
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Popular Courses</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start your learning journey with our most popular and in-demand courses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </div>
                <button
                  onClick={() => handleWatchDemo(course)}
                  className="absolute bottom-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary transition-colors"
                >
                  <Video className="w-4 h-4" />
                  Watch Demo
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-sm">{course.students} students</span>
                  </div>
                </div>
                <button
                  onClick={() => handleEnroll(course)}
                  className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
