import { Link } from 'react-router-dom';
import { units, type Category } from '@/data/conversionData';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PopularConversionsProps {
  category: Category;
}

export function PopularConversions({ category }: PopularConversionsProps) {
  const categoryUnits = units[category];
  
  // Generate popular conversion pairs
  const popularPairs: { from: string; to: string }[] = [];
  const mainUnits = categoryUnits.slice(0, 6);
  
  for (let i = 0; i < mainUnits.length; i++) {
    for (let j = 0; j < mainUnits.length; j++) {
      if (i !== j && popularPairs.length < 20) {
        popularPairs.push({ from: mainUnits[i].id, to: mainUnits[j].id });
      }
    }
  }

  const getUnit = (id: string) => categoryUnits.find((u) => u.id === id);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-foreground mb-4">
        Popular {category.charAt(0).toUpperCase() + category.slice(1)} Conversions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {popularPairs.map((pair, index) => {
          const fromUnit = getUnit(pair.from);
          const toUnit = getUnit(pair.to);
          if (!fromUnit || !toUnit) return null;
          
          return (
            <Link
              key={`${pair.from}-${pair.to}-${index}`}
              to={`/${category}/${pair.from}-to-${pair.to}`}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium',
                'bg-card border border-border shadow-soft',
                'hover:bg-secondary hover:border-primary/30',
                'transition-all duration-200',
                'text-foreground/80 hover:text-foreground'
              )}
              title={`Convert ${fromUnit.name} to ${toUnit.name}`}
            >
              <span className="font-semibold">{fromUnit.symbol}</span>
              <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="font-semibold">{toUnit.symbol}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
