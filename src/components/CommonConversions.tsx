import { memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { commonConversions, units, type Category } from '@/data/conversionData';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ConversionButton = memo(({ 
  category, 
  fromId, 
  toId, 
  fromSymbol, 
  toSymbol 
}: { 
  category: Category; 
  fromId: string; 
  toId: string; 
  fromSymbol: string; 
  toSymbol: string;
}) => (
  <Link
    to={`/${category}/${fromId}-to-${toId}`}
    className={cn(
      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium',
      'bg-card border border-border shadow-soft',
      'hover:bg-secondary hover:border-primary/30',
      'transition-all duration-200',
      'text-foreground/80 hover:text-foreground',
      'focus:outline-none focus:ring-2 focus:ring-primary/50'
    )}
    title={`Convert ${fromSymbol} to ${toSymbol}`}
  >
    <span className="font-semibold">{fromSymbol}</span>
    <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" aria-hidden="true" />
    <span className="font-semibold">{toSymbol}</span>
  </Link>
));

ConversionButton.displayName = 'ConversionButton';

export const CommonConversions = memo(() => {
  const conversionsWithSymbols = useMemo(() => 
    commonConversions.map((conv) => {
      const fromUnit = units[conv.category].find((u) => u.id === conv.from);
      const toUnit = units[conv.category].find((u) => u.id === conv.to);
      return {
        ...conv,
        fromSymbol: fromUnit?.symbol || conv.from,
        toSymbol: toUnit?.symbol || conv.to,
      };
    }),
    []
  );

  return (
    <section className="mt-8" aria-labelledby="common-conversions">
      <h2 id="common-conversions" className="text-xl font-bold text-foreground mb-4">
        Common Conversions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {conversionsWithSymbols.map((conv, index) => (
          <ConversionButton
            key={`${conv.from}-${conv.to}-${index}`}
            category={conv.category}
            fromId={conv.from}
            toId={conv.to}
            fromSymbol={conv.fromSymbol}
            toSymbol={conv.toSymbol}
          />
        ))}
      </div>
    </section>
  );
});

CommonConversions.displayName = 'CommonConversions';
