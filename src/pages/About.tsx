import { Heart, Leaf, Users, BookOpen, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-health" />,
      title: "Compassionate Care",
      description: "We approach wellness with empathy, understanding that every person's journey is unique and sacred."
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Natural Wisdom",
      description: "We honor traditional healing practices while embracing modern scientific understanding."
    },
    {
      icon: <Users className="w-8 h-8 text-fitness" />,
      title: "Community Connection",
      description: "Healing happens in community. We foster supportive connections and shared experiences."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-lifestyle" />,
      title: "Continuous Learning",
      description: "We're committed to ongoing education and sharing evidence-based wellness practices."
    }
  ];

  const stats = [
    { number: "10K+", label: "Community Members" },
    { number: "500+", label: "Articles Published" },
    { number: "50+", label: "Expert Contributors" },
    { number: "25+", label: "Countries Reached" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-6">
            About Sattva Space
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sattva Space is a sanctuary for holistic wellness, where ancient wisdom meets modern science 
            to nurture your mind, body, and spirit. We believe that true health encompasses more than 
            just the absence of illness—it's about thriving in all aspects of life.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                In Sanskrit, "Sattva" represents purity, balance, and harmony—the perfect state of 
                being where mind, body, and spirit exist in beautiful equilibrium. Our mission is 
                to guide you toward this state through:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  Evidence-based wellness content that honors both science and tradition
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  Practical tools and techniques for daily wellness practices
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  Natural remedies and holistic approaches to health challenges
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  A supportive community for sharing experiences and wisdom
                </li>
              </ul>
            </div>
            <div className="bg-gradient-wellness p-8 rounded-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Trusted Expertise
                </h3>
                <p className="text-muted-foreground">
                  Our content is created and reviewed by certified wellness practitioners, 
                  licensed healthcare providers, and experienced wellness coaches who are 
                  passionate about holistic health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and every piece of content we create.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="hover:shadow-card transition-all duration-300 border-border/50 bg-gradient-card"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-wellness rounded-lg flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <Card className="bg-gradient-hero text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Growing Together
                </h2>
                <p className="text-white/90 max-w-2xl mx-auto">
                  Join thousands of wellness enthusiasts on their journey to better health and inner peace.
                </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/80 text-sm sm:text-base">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Sattva Space was born from a simple realization: in our fast-paced, technology-driven 
                world, we had lost touch with the fundamental principles of holistic health that have 
                sustained human wellness for millennia.
              </p>
              <p>
                Founded by a team of wellness practitioners, researchers, and health enthusiasts, 
                we set out to create a space where ancient wisdom could meet modern science, where 
                natural remedies could complement conventional medicine, and where community support 
                could accelerate individual healing.
              </p>
              <p>
                Today, Sattva Space serves as a trusted resource for thousands of people worldwide 
                who are seeking a more balanced, mindful approach to health and wellness. We continue 
                to grow and evolve, always staying true to our core mission of nurturing mind, body, 
                and spirit.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-wellness border-border/50 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <Globe className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                Join Our Community
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you're just beginning your wellness journey or looking to deepen your practice, 
                you'll find a welcoming community and valuable resources here at Sattva Space.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="bg-gradient-hero hover:opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-opacity">
                  Join Us
                </button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;