import { Link } from "react-router-dom";
import { Calendar, Clock, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "health":
      return "bg-health/10 text-health border-health/20";
    case "fitness":
      return "bg-fitness/10 text-fitness border-fitness/20";
    case "remedies":
      return "bg-remedies/10 text-remedies border-remedies/20";
    case "lifestyle":
      return "bg-lifestyle/10 text-lifestyle border-lifestyle/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

const BlogCard = ({ post }: BlogCardProps) => {
  const { language } = useLanguage();
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate read time (rough estimate: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return language === 'hi' ? `${readTime} मिनट पढ़ें` : `${readTime} min read`;
  };
  
  return (
    <Card className="group overflow-hidden hover:shadow-wellness transition-all duration-300 border-border/50 bg-gradient-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={post.image_url || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className={`${getCategoryColor(post.category)} border`}
            >
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.published_at)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {calculateReadTime(post.content)}
          </div>
        </div>
        
        <h3 className="font-heading font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {language === 'hi' ? 'लेखक:' : 'By'} {post.author}
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="text-primary hover:text-primary-glow font-medium text-sm transition-colors"
          >
            {language === 'hi' ? 'और पढ़ें →' : 'Read More →'}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;