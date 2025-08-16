import { Link } from "react-router-dom";
import { ArrowRight, Heart, Leaf, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";
import heroImage from "@/assets/hero-wellness.jpg";

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
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-fade-in">
            Nurturing Mind,
            <br />
            Body & Spirit
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-white/90 max-w-2xl mx-auto animate-fade-in [animation-delay:0.2s]">
            Discover your path to holistic wellness through mindful practices, 
            natural remedies, and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:0.4s]">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg"
            >
              <Link to="/blog">
                Explore Articles <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-4 text-lg"
            >
              <Link to="/about">
                About Sattva Space
              </Link>
            </Button>
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
            <div className="bg-gradient-card p-8 rounded-xl shadow-card border border-border/50">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4">
                Join Our Wellness Community
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get weekly wellness tips, natural remedies, and mindfulness practices 
                delivered straight to your inbox. Start your journey to better health today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button className="bg-gradient-hero hover:opacity-90 text-white px-6 py-3 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-3">
                No spam, unsubscribe anytime. Your wellness journey is sacred to us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;