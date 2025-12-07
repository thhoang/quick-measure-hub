import { useParams, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ConversionPageContent } from '@/components/ConversionPageContent';
import { units, type Category } from '@/data/conversionData';

const ConversionPage = () => {
  const { category, conversion } = useParams<{ category: string; conversion: string }>();

  if (!category || !conversion) {
    return <Navigate to="/" replace />;
  }

  // Parse the conversion (e.g., "cm-to-inches" -> from: "cm", to: "inches")
  const match = conversion.match(/^(.+)-to-(.+)$/);
  if (!match) {
    return <Navigate to={`/${category}`} replace />;
  }

  const [, fromId, toId] = match;
  const categoryUnits = units[category as Category];

  if (!categoryUnits) {
    return <Navigate to="/" replace />;
  }

  const fromUnit = categoryUnits.find((u) => u.id === fromId);
  const toUnit = categoryUnits.find((u) => u.id === toId);

  if (!fromUnit || !toUnit) {
    return <Navigate to={`/${category}`} replace />;
  }

  return (
    <div className="min-h-screen bg-background">
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
};

export default ConversionPage;
