interface CourseRecommendation {
  title: string;
  path: string;
  reason: string;
  confidence: number;
}

export const getRecommendedCourses = (
  strengths: string[] = [], 
  weaknesses: string[] = []
): CourseRecommendation[] => {
  const recommendations: CourseRecommendation[] = [];
  
  // Enhanced mapping of interests/weaknesses to relevant courses
  const courseMapping = {
    'programming': {
      courses: ['full-stack', 'python', 'mobile-dev'],
      description: 'software development and coding skills'
    },
    'mathematics': {
      courses: ['ai-ml', 'data-science', 'blockchain'],
      description: 'mathematical and analytical thinking'
    },
    'design': {
      courses: ['ui-ux', 'digital-marketing'],
      description: 'creative and design skills'
    },
    'security': {
      courses: ['cybersecurity', 'blockchain', 'cloud-native'],
      description: 'security and protection skills'
    },
    'analytics': {
      courses: ['data-science', 'data-engineering', 'ai-ml'],
      description: 'data analysis and insights'
    },
    'cloud': {
      courses: ['aws', 'cloud-native', 'devops'],
      description: 'cloud computing and infrastructure'
    },
    'communication': {
      courses: ['digital-marketing', 'ui-ux'],
      description: 'communication and presentation skills'
    },
    'problem solving': {
      courses: ['full-stack', 'ai-ml', 'data-science'],
      description: 'problem-solving abilities'
    },
    'networking': {
      courses: ['cybersecurity', 'aws', 'cloud-native'],
      description: 'networking and infrastructure skills'
    },
    'business': {
      courses: ['digital-marketing', 'blockchain', 'data-science'],
      description: 'business and entrepreneurship skills'
    }
  };

  // Recommend courses based on strengths to leverage them
  strengths.forEach(strength => {
    const mapping = courseMapping[strength.toLowerCase() as keyof typeof courseMapping];
    if (mapping) {
      mapping.courses.forEach(coursePath => {
        recommendations.push({
          title: coursePath.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          path: coursePath,
          reason: `Builds on your strength in ${mapping.description}`,
          confidence: 0.9
        });
      });
    }
  });

  // Recommend courses based on weaknesses to improve them
  weaknesses.forEach(weakness => {
    const mapping = courseMapping[weakness.toLowerCase() as keyof typeof courseMapping];
    if (mapping) {
      mapping.courses.forEach(coursePath => {
        recommendations.push({
          title: coursePath.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          path: coursePath,
          reason: `Helps improve your ${mapping.description}`,
          confidence: 0.8
        });
      });
    }
  });

  // Remove duplicates and sort by confidence
  const uniqueRecommendations = recommendations.reduce((acc, curr) => {
    const exists = acc.find(r => r.path === curr.path);
    if (!exists) acc.push(curr);
    return acc;
  }, [] as CourseRecommendation[]);

  return uniqueRecommendations
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5); // Limit to top 5 recommendations
};