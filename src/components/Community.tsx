import { motion } from "framer-motion";
import { Users, MessageSquare, Heart } from "lucide-react";

const discussions = [
  {
    title: "How to start with React?",
    author: "Sarah Johnson",
    replies: 23,
    likes: 45,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    title: "Best practices for Python",
    author: "Mike Chen",
    replies: 18,
    likes: 32,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    title: "Career switch to IT",
    author: "Priya Sharma",
    replies: 34,
    likes: 67,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  }
];

export const Community = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Join Our Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow learners, share experiences, and grow together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {discussions.map((discussion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={discussion.avatar}
                  alt={discussion.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{discussion.title}</h3>
                  <p className="text-sm text-muted-foreground">by {discussion.author}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>{discussion.replies} replies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>{discussion.likes} likes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};