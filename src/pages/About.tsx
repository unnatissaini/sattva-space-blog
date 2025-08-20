import { Heart, Leaf, Users, BookOpen, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-health" />,
      title: t('about.values.compassion'),
      description: t('about.values.compassion.desc')
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: t('about.values.wisdom'),
      description: t('about.values.wisdom.desc')
    },
    {
      icon: <Users className="w-8 h-8 text-fitness" />,
      title: t('about.values.community'),
      description: t('about.values.community.desc')
    },
    {
      icon: <BookOpen className="w-8 h-8 text-lifestyle" />,
      title: t('about.values.learning'),
      description: t('about.values.learning.desc')
    }
  ];

  const stats = [
    { number: "10K+", label: t('about.stats.members') },
    { number: "500+", label: t('about.stats.articles') },
    { number: "50+", label: t('about.stats.contributors') },
    { number: "25+", label: t('about.stats.countries') }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                {t('about.mission')}
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t('about.mission.desc')}
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  {t('about.mission.point1')}
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  {t('about.mission.point2')}
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  {t('about.mission.point3')}
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  {t('about.mission.point4')}
                </li>
              </ul>
            </div>
            <div className="bg-gradient-wellness p-8 rounded-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  {t('about.expertise')}
                </h3>
                <p className="text-muted-foreground">
                  {t('about.expertise.desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              {t('about.values')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.values.subtitle')}
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
                  {t('about.stats.title')}
                </h2>
                <p className="text-white/90 max-w-2xl mx-auto">
                  {t('about.stats.subtitle')}
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
              {t('about.story')}
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                {t('about.story.p1')}
              </p>
              <p>
                {t('about.story.p2')}
              </p>
              <p>
                {t('about.story.p3')}
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
                {t('about.join')}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t('about.join.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('about.join.placeholder')}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="bg-gradient-hero hover:opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-opacity">
                  {t('about.join.button')}
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