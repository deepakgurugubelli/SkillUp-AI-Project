import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Clock, Trophy, Users, Star, PlayCircle, MessageSquare, Download, Calendar, CheckCircle, Video, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { toast } from "sonner";

type CourseType = {
  title: string;
  description: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  price: string;
  features: string[];
  materials: Array<{
    title: string;
    type: "video" | "document";
    duration?: string;
    size?: string;
  }>;
  reviews: Array<{
    name: string;
    rating: number;
    comment: string;
  }>;
  liveSessionSchedule: Array<{
    topic: string;
    day: string;
    time: string;
  }>;
};

const courseData: Record<string, CourseType> = {
  "full-stack": {
    title: "Full Stack Development",
    description: "Master MERN stack and modern web development practices with hands-on projects and real-world applications. Learn from industry experts and build a professional portfolio.",
    duration: "6 months",
    lessons: 120,
    students: 2500,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    price: "Free",
    features: [
      "Comprehensive MERN Stack Coverage",
      "Real-world Project Development",
      "Industry Best Practices",
      "Portfolio Building",
    ],
    materials: [
      { title: "Introduction to Web Development", type: "video", duration: "45 min" },
      { title: "React Fundamentals Guide", type: "document", size: "2.5 MB" },
    ],
    reviews: [
      { name: "John Doe", rating: 5, comment: "Excellent course structure!" },
      { name: "Jane Smith", rating: 4, comment: "Very practical approach" },
    ],
    liveSessionSchedule: [
      { topic: "Advanced React Patterns", day: "Monday", time: "10:00 AM" },
      { topic: "Node.js Best Practices", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "ai-ml": {
    title: "AI & Machine Learning",
    description: "Deep dive into artificial intelligence and machine learning concepts. Learn Python, TensorFlow, and PyTorch while building real AI applications.",
    duration: "8 months",
    lessons: 150,
    students: 1800,
    rating: 4.9,
    instructor: "Dr. Michael Chen",
    price: "Free",
    features: [
      "Deep Learning Fundamentals",
      "Neural Network Architecture",
      "Computer Vision Applications",
      "Natural Language Processing",
    ],
    materials: [
      { title: "Introduction to AI", type: "video", duration: "60 min" },
      { title: "Machine Learning Basics", type: "document", size: "3.2 MB" },
    ],
    reviews: [
      { name: "Alex Johnson", rating: 5, comment: "Comprehensive AI coverage!" },
      { name: "Sarah Lee", rating: 5, comment: "Excellent practical examples" },
    ],
    liveSessionSchedule: [
      { topic: "Neural Networks Deep Dive", day: "Tuesday", time: "11:00 AM" },
      { topic: "Advanced ML Algorithms", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "aws": {
    title: "Cloud Computing (AWS)",
    description: "Master AWS services and cloud architecture through hands-on projects. Learn EC2, S3, Lambda, and other essential AWS services while building scalable cloud solutions.",
    duration: "5 months",
    lessons: 90,
    students: 2100,
    rating: 4.7,
    instructor: "Dr. Mark Anderson",
    price: "Free",
    features: [
      "AWS Core Services Deep Dive",
      "Cloud Architecture Design",
      "Security Best Practices",
      "Cost Optimization Strategies",
    ],
    materials: [
      { title: "Introduction to AWS", type: "video", duration: "45 min" },
      { title: "Cloud Architecture Guide", type: "document", size: "2.8 MB" },
    ],
    reviews: [
      { name: "Michael Chen", rating: 5, comment: "Excellent AWS coverage!" },
      { name: "Sarah Wilson", rating: 4, comment: "Very practical approach" },
    ],
    liveSessionSchedule: [
      { topic: "AWS Services Overview", day: "Monday", time: "10:00 AM" },
      { topic: "Cloud Security Workshop", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "devops": {
    title: "DevOps & CI/CD",
    description: "Master modern DevOps practices and tools to streamline your development process.",
    duration: "4 months",
    lessons: 80,
    students: 1500,
    rating: 4.8,
    instructor: "Dr. Alex Smith",
    price: "Free",
    features: [
      "CI/CD Pipeline Setup",
      "Containerization with Docker",
      "Infrastructure as Code",
      "Monitoring and Logging",
    ],
    materials: [
      { title: "Introduction to DevOps", type: "video", duration: "30 min" },
      { title: "CI/CD Best Practices", type: "document", size: "1.5 MB" },
    ],
    reviews: [
      { name: "Chris Green", rating: 5, comment: "Very practical and hands-on!" },
      { name: "Anna Taylor", rating: 4, comment: "Good insights into DevOps" },
    ],
    liveSessionSchedule: [
      { topic: "Docker Fundamentals", day: "Monday", time: "10:00 AM" },
      { topic: "Kubernetes Basics", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "blockchain": {
    title: "Blockchain Development",
    description: "Build decentralized apps and smart contracts while learning blockchain technology.",
    duration: "6 months",
    lessons: 90,
    students: 1200,
    rating: 4.6,
    instructor: "Dr. Lisa White",
    price: "Free",
    features: [
      "Blockchain Fundamentals",
      "Smart Contract Development",
      "Decentralized Applications",
      "Real-world Use Cases",
    ],
    materials: [
      { title: "Blockchain Basics", type: "video", duration: "40 min" },
      { title: "Smart Contracts Guide", type: "document", size: "2.8 MB" },
    ],
    reviews: [
      { name: "David Black", rating: 5, comment: "Excellent course!" },
      { name: "Sophia Blue", rating: 4, comment: "Very informative" },
    ],
    liveSessionSchedule: [
      { topic: "Ethereum Development", day: "Tuesday", time: "11:00 AM" },
      { topic: "Blockchain Security", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "ui-ux": {
    title: "UI/UX Design",
    description: "Create stunning user interfaces and experiences through design principles and tools.",
    duration: "3 months",
    lessons: 60,
    students: 3000,
    rating: 4.9,
    instructor: "Dr. John Brown",
    price: "Free",
    features: [
      "User Research Techniques",
      "Wireframing and Prototyping",
      "Visual Design Principles",
      "Usability Testing",
    ],
    materials: [
      { title: "UI/UX Basics", type: "video", duration: "35 min" },
      { title: "Design Tools Overview", type: "document", size: "1.2 MB" },
    ],
    reviews: [
      { name: "Emma Wilson", rating: 5, comment: "Great insights into design!" },
      { name: "Liam Johnson", rating: 4, comment: "Very practical" },
    ],
    liveSessionSchedule: [
      { topic: "Design Thinking Workshop", day: "Monday", time: "10:00 AM" },
      { topic: "Prototyping with Figma", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "data-science": {
    title: "Data Science",
    description: "Master data analysis and visualization techniques using Python and R.",
    duration: "5 months",
    lessons: 110,
    students: 2200,
    rating: 4.8,
    instructor: "Dr. Sarah Lee",
    price: "Free",
    features: [
      "Data Analysis with Python",
      "Data Visualization Techniques",
      "Machine Learning Basics",
      "Real-world Projects",
    ],
    materials: [
      { title: "Data Science Basics", type: "video", duration: "50 min" },
      { title: "Data Visualization Guide", type: "document", size: "2.0 MB" },
    ],
    reviews: [
      { name: "Oliver Brown", rating: 5, comment: "Very comprehensive!" },
      { name: "Ava Davis", rating: 4, comment: "Good practical examples" },
    ],
    liveSessionSchedule: [
      { topic: "Data Analysis with Pandas", day: "Tuesday", time: "11:00 AM" },
      { topic: "Machine Learning with Scikit-learn", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "cybersecurity": {
    title: "Cybersecurity",
    description: "Learn ethical hacking and security practices to protect systems and networks.",
    duration: "4 months",
    lessons: 70,
    students: 1600,
    rating: 4.7,
    instructor: "Dr. Kevin Green",
    price: "Free",
    features: [
      "Network Security Fundamentals",
      "Ethical Hacking Techniques",
      "Incident Response",
      "Real-world Case Studies",
    ],
    materials: [
      { title: "Cybersecurity Basics", type: "video", duration: "45 min" },
      { title: "Ethical Hacking Guide", type: "document", size: "2.5 MB" },
    ],
    reviews: [
      { name: "Mia White", rating: 5, comment: "Very informative!" },
      { name: "James Black", rating: 4, comment: "Good insights" },
    ],
    liveSessionSchedule: [
      { topic: "Network Security Best Practices", day: "Monday", time: "10:00 AM" },
      { topic: "Ethical Hacking Workshop", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "mobile-dev": {
    title: "Mobile App Development",
    description: "Build iOS and Android apps with React Native and modern development practices.",
    duration: "6 months",
    lessons: 100,
    students: 2800,
    rating: 4.8,
    instructor: "Dr. Rachel Adams",
    price: "Free",
    features: [
      "React Native Fundamentals",
      "Mobile UI Design",
      "APIs and Backend Integration",
      "Real-world Projects",
    ],
    materials: [
      { title: "Mobile Development Basics", type: "video", duration: "50 min" },
      { title: "React Native Guide", type: "document", size: "2.0 MB" },
    ],
    reviews: [
      { name: "Lucas Green", rating: 5, comment: "Excellent course!" },
      { name: "Sophia Taylor", rating: 4, comment: "Very practical" },
    ],
    liveSessionSchedule: [
      { topic: "Building Your First App", day: "Tuesday", time: "11:00 AM" },
      { topic: "Advanced React Native Techniques", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "python": {
    title: "Python Programming",
    description: "Master Python for automation and development through hands-on projects.",
    duration: "3 months",
    lessons: 50,
    students: 3500,
    rating: 4.9,
    instructor: "Dr. Mark Wilson",
    price: "Free",
    features: [
      "Python Basics",
      "Data Structures and Algorithms",
      "Web Development with Flask",
      "Real-world Projects",
    ],
    materials: [
      { title: "Python Basics", type: "video", duration: "30 min" },
      { title: "Flask Web Development Guide", type: "document", size: "1.5 MB" },
    ],
    reviews: [
      { name: "Ella Johnson", rating: 5, comment: "Great course!" },
      { name: "Liam Brown", rating: 4, comment: "Very informative" },
    ],
    liveSessionSchedule: [
      { topic: "Python for Data Analysis", day: "Monday", time: "10:00 AM" },
      { topic: "Web Development with Flask", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Learn SEO, SEM, and social media marketing strategies to grow your business.",
    duration: "4 months",
    lessons: 80,
    students: 2600,
    rating: 4.7,
    instructor: "Dr. Anna Taylor",
    price: "Free",
    features: [
      "SEO Fundamentals",
      "Social Media Strategies",
      "Content Marketing",
      "Real-world Case Studies",
    ],
    materials: [
      { title: "Digital Marketing Basics", type: "video", duration: "40 min" },
      { title: "SEO Guide", type: "document", size: "2.0 MB" },
    ],
    reviews: [
      { name: "Oliver White", rating: 5, comment: "Very practical!" },
      { name: "Ava Green", rating: 4, comment: "Good insights" },
    ],
    liveSessionSchedule: [
      { topic: "SEO Best Practices", day: "Tuesday", time: "11:00 AM" },
      { topic: "Social Media Marketing Strategies", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "iot": {
    title: "IoT Development",
    description: "Build smart devices and IoT solutions using modern technologies.",
    duration: "5 months",
    lessons: 90,
    students: 1100,
    rating: 4.6,
    instructor: "Dr. Chris Martinez",
    price: "Free",
    features: [
      "IoT Fundamentals",
      "Device Communication Protocols",
      "Cloud Integration",
      "Real-world Projects",
    ],
    materials: [
      { title: "IoT Basics", type: "video", duration: "50 min" },
      { title: "Cloud Integration Guide", type: "document", size: "2.5 MB" },
    ],
    reviews: [
      { name: "Mason Brown", rating: 5, comment: "Excellent course!" },
      { name: "Isabella Davis", rating: 4, comment: "Very informative" },
    ],
    liveSessionSchedule: [
      { topic: "Building IoT Solutions", day: "Monday", time: "10:00 AM" },
      { topic: "IoT Security Best Practices", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "game-dev": {
    title: "Game Development",
    description: "Create games with Unity and C# while learning game design principles.",
    duration: "6 months",
    lessons: 120,
    students: 1900,
    rating: 4.8,
    instructor: "Dr. Jessica Thompson",
    price: "Free",
    features: [
      "Game Design Principles",
      "Unity Fundamentals",
      "C# Programming",
      "Real-world Projects",
    ],
    materials: [
      { title: "Game Development Basics", type: "video", duration: "60 min" },
      { title: "Unity Guide", type: "document", size: "3.0 MB" },
    ],
    reviews: [
      { name: "Ethan Wilson", rating: 5, comment: "Great course!" },
      { name: "Mia Johnson", rating: 4, comment: "Very practical" },
    ],
    liveSessionSchedule: [
      { topic: "Creating Your First Game", day: "Tuesday", time: "11:00 AM" },
      { topic: "Advanced Unity Techniques", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "cloud-native": {
    title: "Cloud Native Development",
    description: "Master Kubernetes and microservices for scalable applications.",
    duration: "5 months",
    lessons: 100,
    students: 1400,
    rating: 4.7,
    instructor: "Dr. Brian Harris",
    price: "Free",
    features: [
      "Kubernetes Fundamentals",
      "Microservices Architecture",
      "Real-world Projects",
      "Cloud Deployment",
    ],
    materials: [
      { title: "Cloud Native Basics", type: "video", duration: "50 min" },
      { title: "Kubernetes Guide", type: "document", size: "2.5 MB" },
    ],
    reviews: [
      { name: "Aiden Brown", rating: 5, comment: "Excellent course!" },
      { name: "Charlotte Green", rating: 4, comment: "Very informative" },
    ],
    liveSessionSchedule: [
      { topic: "Kubernetes for Beginners", day: "Monday", time: "10:00 AM" },
      { topic: "Microservices Best Practices", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "data-engineering": {
    title: "Data Engineering",
    description: "Build robust data pipelines and infrastructure for data-driven applications.",
    duration: "6 months",
    lessons: 110,
    students: 1300,
    rating: 4.8,
    instructor: "Dr. Emily Clark",
    price: "Free",
    features: [
      "Data Pipeline Fundamentals",
      "ETL Processes",
      "Data Warehousing",
      "Real-world Projects",
    ],
    materials: [
      { title: "Data Engineering Basics", type: "video", duration: "60 min" },
      { title: "ETL Guide", type: "document", size: "3.0 MB" },
    ],
    reviews: [
      { name: "James Wilson", rating: 5, comment: "Great course!" },
      { name: "Olivia Johnson", rating: 4, comment: "Very practical" },
    ],
    liveSessionSchedule: [
      { topic: "Building Data Pipelines", day: "Tuesday", time: "11:00 AM" },
      { topic: "Data Warehousing Best Practices", day: "Thursday", time: "3:00 PM" },
    ],
  }
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleEnroll = () => {
    toast.success("Successfully enrolled! Check your email for next steps.");
  };

  const handleDownload = () => {
    toast.success("Materials downloading...");
  };

  const handleWatchDemo = () => {
    toast.success("Loading demo video...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
      <Navigation />
      
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="fixed top-24 left-4 z-50"
      >
        <ArrowLeft className="mr-2" />
        Back
      </Button>
      
      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <h1 className="text-4xl font-bold mb-4 gradient-text">{course.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4 text-primary" />
                <span>{course.lessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{course.students} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{course.rating}</span>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex space-x-4 mb-6 border-b">
              {["overview", "materials", "reviews", "schedule"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-2 px-4 ${
                    selectedTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {selectedTab === "overview" && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
                  <p className="text-muted-foreground mb-6">{course.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.features.map((feature, index) => (
                      <Card key={index} className="glass border-none">
                        <CardContent className="flex items-center gap-3 p-4">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span>{feature}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === "materials" && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">Course Materials</h2>
                  <div className="space-y-4">
                    {course.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-4 glass rounded-xl">
                        <div className="flex items-center gap-3">
                          {material.type === "video" ? (
                            <Video className="w-5 h-5 text-primary" />
                          ) : (
                            <FileText className="w-5 h-5 text-primary" />
                          )}
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {material.duration || material.size}
                            </p>
                          </div>
                        </div>
                        <Button onClick={handleDownload} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === "reviews" && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>
                  <div className="space-y-4">
                    {course.reviews.map((review, index) => (
                      <div key={index} className="glass rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === "schedule" && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">Live Sessions Schedule</h2>
                  <div className="space-y-4">
                    {course.liveSessionSchedule.map((session, index) => (
                      <div key={index} className="glass rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{session.topic}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.day} at {session.time}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Join Session</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="text-3xl font-bold mb-6 text-center text-primary">{course.price}</div>
              
              <div className="space-y-4">
                <Button className="w-full" size="lg" onClick={handleEnroll}>
                  <PlayCircle className="mr-2" />
                  Enroll Now
                </Button>
                
                <Button variant="outline" className="w-full" size="lg" onClick={handleWatchDemo}>
                  <Video className="mr-2" />
                  Watch Demo
                </Button>

                <Button variant="outline" className="w-full" size="lg">
                  <MessageSquare className="mr-2" />
                  Chat with AI Assistant
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <h3 className="font-semibold mb-4">Instructor</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-sm text-muted-foreground">Senior Developer & Educator</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
