import { type Unit } from '@/data/conversionData';
import { cn } from '@/lib/utils';

interface UnitListProps {
  units: Unit[];
  selectedUnit: Unit;
  onSelectUnit: (unit: Unit) => void;
  label: string;
}

export function UnitList({ units, selectedUnit, onSelectUnit, label }: UnitListProps) {
  return (
    <div className="flex-1 min-w-0">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        {label}
      </label>
      <div className="border border-border rounded-lg overflow-hidden bg-card shadow-soft">
        <ul className="h-64 overflow-y-auto scrollbar-thin">
          {units.map((unit) => (
            <li key={unit.id}>
              <button
                onClick={() => onSelectUnit(unit)}
                className={cn(
                  'w-full px-4 py-2.5 text-left text-sm transition-colors',
                  'hover:bg-list-hover focus:outline-none focus:bg-list-hover',
                  selectedUnit.id === unit.id
                    ? 'bg-list-selected font-medium text-primary'
                    : 'text-foreground'
                )}
              >
                <span>{unit.name}</span>
                <span className="text-muted-foreground ml-2">({unit.symbol})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
