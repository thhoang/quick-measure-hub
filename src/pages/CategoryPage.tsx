import { useParams, Navigate, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { UnitConverter } from '@/components/UnitConverter';
import { PopularConversions } from '@/components/PopularConversions';
import { units, categories, type Category } from '@/data/conversionData';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const categoryInfo = categories.find((c) => c.id === category);
  const categoryUnits = units[category as Category];

  if (!categoryInfo || !categoryUnits) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              {' / '}
              <span className="text-foreground capitalize">{category} Conversion</span>
            </nav>

            <h1 className="text-3xl font-bold text-foreground mb-6">
              {categoryInfo.icon} {categoryInfo.label} Converter
            </h1>

            <UnitConverter initialCategory={category as Category} />
            <PopularConversions category={category as Category} />
          </main>
          <Sidebar className="lg:w-64 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
