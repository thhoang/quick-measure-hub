import { Link, useLocation } from 'react-router-dom';
import { categories, units, type Category } from '@/data/conversionData';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['common', 'engineering', 'other']);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const toggleCategory = (categoryId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    );
  };

  const groups = [
    { id: 'common', label: 'Common Converters' },
    { id: 'engineering', label: 'Engineering Converters' },
    { id: 'other', label: 'Other Converters' },
  ];

  // Get popular conversions for a category (first 5 units paired)
  const getPopularConversions = (categoryId: Category) => {
    const categoryUnits = units[categoryId];
    if (!categoryUnits || categoryUnits.length < 2) return [];
    
    const popular: { from: string; to: string; label: string }[] = [];
    const primaryUnits = categoryUnits.slice(0, 4);
    
    for (let i = 0; i < primaryUnits.length; i++) {
      for (let j = i + 1; j < primaryUnits.length && popular.length < 6; j++) {
        popular.push({
          from: primaryUnits[i].id,
          to: primaryUnits[j].id,
          label: `${primaryUnits[i].symbol} to ${primaryUnits[j].symbol}`,
        });
      }
    }
    return popular;
  };

  return (
    <aside className={cn('bg-card border border-border rounded-lg shadow-soft overflow-hidden', className)}>
      <div className="bg-primary text-primary-foreground px-4 py-3 font-bold">
        All Converters
      </div>
      <nav className="py-2">
        {groups.map((group) => {
          const groupCategories = categories.filter((c) => c.group === group.id);
          const isExpanded = expandedGroups.includes(group.id);

          return (
            <div key={group.id}>
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-foreground hover:bg-muted transition-colors"
              >
                <span>{group.label}</span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              {isExpanded && (
                <ul className="pb-2">
                  {groupCategories.map((category) => {
                    const isActive = location.pathname.includes(`/${category.id}`);
                    const isCategoryExpanded = expandedCategories.includes(category.id);
                    const popularConversions = getPopularConversions(category.id);

                    return (
                      <li key={category.id}>
                        <div className="flex items-center">
                          <Link
                            to={`/${category.id}`}
                            className={cn(
                              'flex-1 block px-6 py-1.5 text-sm font-medium transition-colors',
                              isActive
                                ? 'text-primary font-semibold bg-list-selected'
                                : 'text-foreground/80 hover:text-foreground hover:bg-list-hover'
                            )}
                          >
                            <span className="mr-2">{category.icon}</span>
                            {category.label}
                          </Link>
                          <button
                            onClick={(e) => toggleCategory(category.id, e)}
                            className="px-2 py-1.5 hover:bg-muted transition-colors"
                            aria-label={`Expand ${category.label} conversions`}
                          >
                            {isCategoryExpanded ? (
                              <ChevronDown className="w-3 h-3 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="w-3 h-3 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                        {isCategoryExpanded && (
                          <ul className="pl-8 pb-1">
                            {popularConversions.map((conv, index) => (
                              <li key={index}>
                                <Link
                                  to={`/${category.id}/${conv.from}-to-${conv.to}`}
                                  className="block py-1 text-xs font-medium text-primary hover:text-primary/80 hover:underline"
                                  title={`Convert ${conv.label}`}
                                >
                                  {conv.label}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                to={`/${category.id}`}
                                className="block py-1 text-xs font-semibold text-foreground/70 hover:text-foreground"
                              >
                                View all {category.label.toLowerCase()} →
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
