import { Link } from "react-router-dom";
import { Calendar, Clock, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
}

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
  return (
    <Card className="group overflow-hidden hover:shadow-wellness transition-all duration-300 border-border/50 bg-gradient-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={post.image}
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
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>
        
        <h3 className="font-heading font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            By {post.author}
          </span>
          <Link
            to={`/blog/${post.id}`}
            className="text-primary hover:text-primary-glow font-medium text-sm transition-colors"
          >
            Read More →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;