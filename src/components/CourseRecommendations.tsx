import { motion } from "framer-motion";
import { Book, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getRecommendedCourses } from "@/utils/courseRecommendations";

interface CourseRecommendationsProps {
  strengths: string[];
  weaknesses: string[];
}

export const CourseRecommendations = ({ strengths, weaknesses }: CourseRecommendationsProps) => {
  const recommendations = getRecommendedCourses(strengths, weaknesses);

  return (
    <div className="space-y-4">
      {recommendations.map((course, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-4 p-4 glass rounded-lg hover:scale-105 transition-transform"
        >
          <Book className="text-primary" />
          <div className="flex-1">
            <h4 className="font-semibold">{course.title}</h4>
            <p className="text-sm text-muted-foreground">{course.reason}</p>
          </div>
          <Link 
            to={`/course/${course.path}`}
            className="flex items-center gap-2 text-primary hover:underline"
          >
            View Course
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ))}
      {recommendations.length === 0 && (
        <p className="text-center text-muted-foreground">
          Add some strengths and weaknesses to your profile to get personalized course recommendations!
        </p>
      )}
    </div>
  );
};