import { Link } from 'react-router-dom';
import { type Category, units, categories } from '@/data/conversionData';

interface CompleteUnitListProps {
  category: Category;
}

export function CompleteUnitList({ category }: CompleteUnitListProps) {
  const categoryUnits = units[category];
  const categoryInfo = categories.find((c) => c.id === category);
  const categoryLabel = categoryInfo?.label || category;

  // Generate all possible conversion combinations
  const allConversions = categoryUnits.flatMap((fromUnit) =>
    categoryUnits
      .filter((toUnit) => toUnit.id !== fromUnit.id)
      .map((toUnit) => ({
        from: fromUnit,
        to: toUnit,
        url: `/${category}/${fromUnit.id}-to-${toUnit.id}`,
      }))
  );

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-foreground mb-4">
        Complete List of {categoryLabel} Unit Conversions
      </h2>
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {allConversions.map((conv, index) => (
            <Link
              key={index}
              to={conv.url}
              className="text-primary hover:text-primary/80 hover:underline font-medium text-sm py-1"
              title={`Convert ${conv.from.name} to ${conv.to.name} - ${categoryLabel} Conversion`}
            >
              {conv.from.symbol} to {conv.to.symbol}
            </Link>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground text-sm mt-3 font-medium">
        Total: {allConversions.length} {categoryLabel.toLowerCase()} conversions available
      </p>
    </section>
  );
}
