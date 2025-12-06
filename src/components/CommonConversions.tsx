import { commonConversions, units, type Category } from '@/data/conversionData';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommonConversionsProps {
  onSelect: (category: Category, fromId: string, toId: string) => void;
}

export function CommonConversions({ onSelect }: CommonConversionsProps) {
  const getUnitName = (category: Category, unitId: string) => {
    const unit = units[category].find((u) => u.id === unitId);
    return unit?.symbol || unitId;
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Common Conversions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {commonConversions.map((conv, index) => (
          <button
            key={`${conv.from}-${conv.to}-${index}`}
            onClick={() => onSelect(conv.category, conv.from, conv.to)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
              'bg-card border border-border shadow-soft',
              'hover:bg-secondary hover:border-primary/30',
              'transition-all duration-200',
              'text-muted-foreground hover:text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary/50'
            )}
          >
            <span className="font-medium">{getUnitName(conv.category, conv.from)}</span>
            <ArrowRight className="w-3 h-3 text-primary" />
            <span className="font-medium">{getUnitName(conv.category, conv.to)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
