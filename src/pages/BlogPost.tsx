import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, Clock, Tag, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import BlogCard from "@/components/BlogCard";
import { useLanguage } from "@/contexts/LanguageContext";
import type { BlogPost } from "@/types/blog";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        // Fetch the post by slug
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', id)
          .single();

        if (postError || !postData) {
          console.error('Error fetching post:', postError);
          setPost(null);
        } else {
          setPost(postData);
          
          // Fetch related posts
          const { data: relatedData, error: relatedError } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('category', postData.category)
            .neq('id', postData.id)
            .limit(3);

          if (!relatedError && relatedData) {
            setRelatedPosts(relatedData);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate read time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return language === 'hi' ? `${readTime} मिनट पढ़ें` : `${readTime} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t('blog.articleNotFound')}</h1>
          <p className="text-muted-foreground mb-6">
            {t('blog.articleNotFoundDesc')}
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('blog.backToBlog')}
            </Link>
          </Button>
        </div>
      </div>
    );
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

  const shareUrl = window.location.href;
  const shareText = `${t('blog.checkOutArticle')}: ${post.title}`;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('blog.backToArticles')}
          </Link>
        </Button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge
              variant="secondary"
              className={`${getCategoryColor(post.category)} border`}
            >
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {calculateReadTime(post.content)}
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            {language === 'hi' && post.title_hi ? post.title_hi : post.title}
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            {language === 'hi' && post.excerpt_hi ? post.excerpt_hi : post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{language === 'hi' ? 'लेखक:' : 'By'} {post.author}</p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">{t('blog.share')}:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.open(
                    `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                    'width=600,height=400'
                  );
                }}
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                    'width=600,height=400'
                  );
                }}
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  // You could add a toast notification here
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image_url && (
          <div className="mb-8">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-card"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div className="text-foreground leading-relaxed whitespace-pre-line">
            {language === 'hi' && post.content_hi ? post.content_hi : post.content}
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
              {t('blog.relatedArticles')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <Card className="mt-16 bg-gradient-wellness border-border/50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              {t('blog.lovedArticle')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('blog.weeklyInsights')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter.enterEmail')}
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="bg-gradient-hero hover:opacity-90 text-white px-6 py-3">
                {t('newsletter.subscribe')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;