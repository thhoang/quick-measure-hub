import { useParams, Navigate } from 'react-router-dom';
import { memo, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ConversionPageContent } from '@/components/ConversionPageContent';
import { SEOHead, getConversionSEO } from '@/components/SEOHead';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { units, type Category, getConversionFactor } from '@/data/conversionData';

const ConversionPage = memo(() => {
  const { category, conversion } = useParams<{ category: string; conversion: string }>();

  const parsedData = useMemo(() => {
    if (!category || !conversion) return null;

    const match = conversion.match(/^(.+)-to-(.+)$/);
    if (!match) return null;

    const [, fromId, toId] = match;
    const categoryUnits = units[category as Category];
    if (!categoryUnits) return null;

    const fromUnit = categoryUnits.find((u) => u.id === fromId);
    const toUnit = categoryUnits.find((u) => u.id === toId);
    if (!fromUnit || !toUnit) return null;

    return { fromUnit, toUnit, categoryUnits };
  }, [category, conversion]);

  if (!category || !conversion) {
    return <Navigate to="/" replace />;
  }

  if (!parsedData) {
    return <Navigate to={`/${category}`} replace />;
  }

  const { fromUnit, toUnit } = parsedData;
  const seo = getConversionSEO(category as Category, fromUnit, toUnit);
  const conversionFactor = getConversionFactor(fromUnit, toUnit);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seo} />
      <SchemaMarkup
        type="conversion"
        category={category as Category}
        fromUnit={fromUnit}
        toUnit={toUnit}
        conversionFactor={conversionFactor}
      />
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            <ConversionPageContent
              category={category as Category}
              fromUnit={fromUnit}
              toUnit={toUnit}
            />
          </main>
          <Sidebar className="lg:w-64 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
});

ConversionPage.displayName = 'ConversionPage';

export default ConversionPage;
