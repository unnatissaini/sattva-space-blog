import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BlogCard from "@/components/BlogCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { blogPosts } from "@/data/blogPosts";
import heroImage from "@/assets/hero-sattva-space.jpg";

const Home = () => {
  const featuredPosts = blogPosts.slice(0, 3);

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-health" />,
      title: "Holistic Wellness",
      description: "Nurturing your mind, body, and spirit through evidence-based practices and ancient wisdom."
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Natural Remedies",
      description: "Discover the healing power of nature with safe, effective natural remedies and herbs."
    },
    {
      icon: <Users className="w-8 h-8 text-fitness" />,
      title: "Community Support",
      description: "Join a growing community of wellness enthusiasts on the journey to better health."
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
            Welcome to Sattva Space
            <br />
            <span className="text-primary-glow">Where Wellness Meets Wisdom</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in [animation-delay:0.2s] leading-relaxed">
            Join thousands on their journey to holistic health. Discover evidence-based wellness practices, 
            natural healing remedies, and mindful living tips that transform your daily life from the inside out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:0.4s]">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg shadow-lg"
            >
              <Link to="/blog">
                Start Reading <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-white/80 bg-white/10 text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
            >
              <Link to="/about">
                Our Story
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm animate-fade-in [animation-delay:0.6s]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>1000+ Wellness Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50k+ Community Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              <span>Evidence-Based Content</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-wellness">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Your Wellness Journey Starts Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in a holistic approach to health that honors the connection 
              between mind, body, and spirit.
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
              Latest Wellness Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover evidence-based articles, natural remedies, and practical tips 
              for your wellness journey.
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
                View All Articles <ArrowRight className="w-4 h-4 ml-2" />
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
              Join Our Wellness Community
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get weekly wellness tips, natural remedies, and mindfulness practices 
              delivered straight to your inbox. Start your journey to better health today.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;