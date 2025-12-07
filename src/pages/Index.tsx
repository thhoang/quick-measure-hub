import { memo } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { UnitConverter } from '@/components/UnitConverter';
import { CommonConversions } from '@/components/CommonConversions';
import { Link } from 'react-router-dom';
import { categories } from '@/data/conversionData';
import { SEOHead, getHomeSEO } from '@/components/SEOHead';
import { SchemaMarkup } from '@/components/SchemaMarkup';

const CategoryCard = memo(({ cat }: { cat: typeof categories[0] }) => (
  <Link
    key={cat.id}
    to={`/${cat.id}`}
    className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg shadow-soft hover:shadow-card hover:border-primary/30 transition-all group"
  >
    <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
      {cat.label}
    </span>
  </Link>
));

CategoryCard.displayName = 'CategoryCard';

const Index = () => {
  const seo = getHomeSEO();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seo} />
      <SchemaMarkup type="website" />
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            <h1 className="sr-only">Free Online Unit Converter</h1>
            <UnitConverter />
            
            {/* Quick Category Links */}
            <section className="mt-8" aria-labelledby="browse-converters">
              <h2 id="browse-converters" className="text-xl font-bold text-foreground mb-4">
                Browse All Converters
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <CategoryCard key={cat.id} cat={cat} />
                ))}
              </div>
            </section>

            <CommonConversions />
          </main>
          <Sidebar className="lg:w-64 flex-shrink-0" />
        </div>
      </div>
      <footer className="py-6 text-center text-sm font-medium text-foreground/70 border-t border-border">
        <p>Fast, accurate unit conversions — all calculations done locally for speed</p>
      </footer>
    </div>
  );
};

export default Index;
