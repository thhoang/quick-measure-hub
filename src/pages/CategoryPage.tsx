import { useParams, Navigate, Link } from 'react-router-dom';
import { memo } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { UnitConverter } from '@/components/UnitConverter';
import { PopularConversions } from '@/components/PopularConversions';
import { CompleteUnitList } from '@/components/CompleteUnitList';
import { SEOHead, getCategorySEO } from '@/components/SEOHead';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { units, categories, type Category } from '@/data/conversionData';

const CategoryPage = memo(() => {
  const { category } = useParams<{ category: string }>();

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const categoryInfo = categories.find((c) => c.id === category);
  const categoryUnits = units[category as Category];

  if (!categoryInfo || !categoryUnits) {
    return <Navigate to="/" replace />;
  }

  const seo = getCategorySEO(category as Category);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seo} />
      <SchemaMarkup type="category" category={category as Category} />
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="text-sm font-medium text-foreground/70 mb-4" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary">Home</Link>
              {' / '}
              <span className="text-foreground font-semibold capitalize">{category} Conversion</span>
            </nav>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              {categoryInfo.icon} {categoryInfo.label} Converter
            </h1>
            
            <p className="text-foreground/80 font-medium mb-6">
              Use our {categoryInfo.label.toLowerCase()} converter to convert between different {categoryInfo.label.toLowerCase()} units. 
              Select from {categoryUnits.length} available units and get instant, accurate conversions.
            </p>

            <UnitConverter initialCategory={category as Category} />
            <PopularConversions category={category as Category} />
            <CompleteUnitList category={category as Category} />
          </main>
          <Sidebar className="lg:w-64 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
});

CategoryPage.displayName = 'CategoryPage';

export default CategoryPage;
