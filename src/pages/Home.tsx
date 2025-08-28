import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Heart, Leaf, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BlogCard from "@/components/BlogCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-sattva-space.jpg";
import { BlogPost } from "@/types/blog";

const Home = () => {
  const { t } = useLanguage();
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching featured posts:', error);
        } else {
          setFeaturedPosts(data || []);
        }
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      }
    };

    fetchFeaturedPosts();
  }, []);

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-health" />,
      title: t('features.mindfulness'),
      description: t('features.mindfulness.desc')
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: t('features.meditation'),
      description: t('features.meditation.desc')
    },
    {
      icon: <Users className="w-8 h-8 text-fitness" />,
      title: t('features.wisdom'),
      description: t('features.wisdom.desc')
    },
    {
      icon: <BookOpen className="w-8 h-8 text-lifestyle" />,
      title: "Expert Guidance",
      description: "Access trusted advice from certified wellness practitioners and health experts."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-glow/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 animate-fade-in leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in [animation-delay:0.2s] leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:0.4s]">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg shadow-lg"
            >
              <Link to="/blog">
                {t('hero.secondary')} <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-white/80 bg-white/10 text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
            >
              <Link to="/about">
                {t('hero.cta')}
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm animate-fade-in [animation-delay:0.6s]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>1000+ {t('stats.courses')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50k+ {t('stats.students')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              <span>95% {t('stats.success')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-wellness">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-card transition-all duration-300 border-border/50 bg-background/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-wellness rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-gradient-hero hover:opacity-90 text-white px-8 py-3">
              <Link to="/blog">
                {t('cta.secondary')} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('newsletter.subtitle')}
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;