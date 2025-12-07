import { Link } from 'react-router-dom';
import { type Unit, type Category, units } from '@/data/conversionData';

interface ConvertToOtherUnitsProps {
  category: Category;
  fromUnit: Unit;
  excludeUnit?: Unit;
}

export function ConvertToOtherUnits({ category, fromUnit, excludeUnit }: ConvertToOtherUnitsProps) {
  const categoryUnits = units[category];
  const otherUnits = categoryUnits.filter(
    (u) => u.id !== fromUnit.id && u.id !== excludeUnit?.id
  );

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-foreground mb-4">
        Convert {fromUnit.name} to Other {category.charAt(0).toUpperCase() + category.slice(1)} Units
      </h2>
      <div className="bg-card rounded-lg border border-border p-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {otherUnits.map((unit) => (
            <li key={unit.id}>
              <Link
                to={`/${category}/${fromUnit.id}-to-${unit.id}`}
                className="text-primary hover:text-primary/80 hover:underline font-medium text-sm"
                title={`Convert ${fromUnit.name} to ${unit.name}`}
              >
                {fromUnit.name} to {unit.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
