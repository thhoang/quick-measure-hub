import { categories, type Category } from '@/data/conversionData';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-1 p-1 bg-muted rounded-lg">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            activeCategory === category.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
          )}
        >
          <span className="mr-1.5">{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  );
}
