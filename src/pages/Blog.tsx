import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";
import { useLanguage } from "@/contexts/LanguageContext";

const Blog = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t('blog.categories.all'));

  const categories = [
    t('blog.categories.all'), 
    t('blog.categories.health'), 
    t('blog.categories.fitness'), 
    t('blog.categories.remedies'), 
    t('blog.categories.lifestyle')
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags[language].some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === t('blog.categories.all') || post.category[language] === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "health":
        return "bg-health/10 text-health border-health/20 hover:bg-health/20";
      case "fitness":
        return "bg-fitness/10 text-fitness border-fitness/20 hover:bg-fitness/20";
      case "remedies":
        return "bg-remedies/10 text-remedies border-remedies/20 hover:bg-remedies/20";
      case "lifestyle":
        return "bg-lifestyle/10 text-lifestyle border-lifestyle/20 hover:bg-lifestyle/20";
      default:
        return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
              {t('blog.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={t('blog.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border focus:border-primary"
              />
            </div>
            <Button variant="outline" className="sm:w-auto w-full">
              <Filter className="w-4 h-4 mr-2" />
              {t('blog.filter')}
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-colors border ${
                    selectedCategory === category 
                      ? "bg-primary text-primary-foreground" 
                      : getCategoryColor(category)
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? t('blog.results') : t('blog.results.plural')} {t('blog.results.found')}
              {selectedCategory !== t('blog.categories.all') && ` ${t('blog.results.in')} ${selectedCategory}`}
              {searchQuery && ` ${t('blog.results.for')} "${searchQuery}"`}
            </p>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              {t('blog.no.results')}
            </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(t('blog.categories.all'));
                }}
              >
                {t('blog.clear.filters')}
              </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;