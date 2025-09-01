import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <img 
                  src={lotusLogo} 
                  alt="Sattva Space Lotus Logo" 
                  className="w-8 h-8"
                />
              </div>
              <span className="text-xl font-heading font-semibold text-foreground">
                Sattva Space
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              {t('footer.links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.articles')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              {t('footer.newsletter')}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('footer.newsletter.desc')}
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="bg-background border-border focus:border-primary"
              />
              <Button className="w-full bg-gradient-hero hover:opacity-90 text-white">
                {t('footer.newsletter.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Sattva Space. {t('footer.rights')}
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-2 sm:mt-0">
            {t('footer.made')} <Heart className="w-4 h-4 text-red-500" /> {t('footer.wellness')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
