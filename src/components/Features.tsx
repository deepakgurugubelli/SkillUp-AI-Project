import { motion } from "framer-motion";
import { Zap, Shield, Smartphone, Brain, Users, Globe } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized learning paths adapted to your style",
    gradient: "from-[#8B5CF6] to-[#D946EF]"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with peers and learn together",
    gradient: "from-[#F97316] to-[#FBBF24]"
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Learn in your preferred language",
    gradient: "from-[#0EA5E9] to-[#22D3EE]"
  },
  {
    icon: Zap,
    title: "Quick Progress",
    description: "Track your growth with instant feedback",
    gradient: "from-[#8B5CF6] to-[#D946EF]"
  },
  {
    icon: Shield,
    title: "Certified Learning",
    description: "Earn recognized certificates",
    gradient: "from-[#F97316] to-[#FBBF24]"
  },
  {
    icon: Smartphone,
    title: "Learn Anywhere",
    description: "Access courses on any device",
    gradient: "from-[#0EA5E9] to-[#22D3EE]"
  }
];

export const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 gradient-text"
          >
            Why Choose Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Discover the features that make our platform unique
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-4 mb-6`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};