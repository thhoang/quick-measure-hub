import { Link, useLocation } from 'react-router-dom';
import { categories, type Category } from '@/data/conversionData';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['common', 'engineering', 'other']);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const groups = [
    { id: 'common', label: 'Common Converters' },
    { id: 'engineering', label: 'Engineering Converters' },
    { id: 'other', label: 'Other Converters' },
  ];

  return (
    <aside className={cn('bg-card border border-border rounded-lg shadow-soft overflow-hidden', className)}>
      <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold">
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
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
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
                    return (
                      <li key={category.id}>
                        <Link
                          to={`/${category.id}`}
                          className={cn(
                            'block px-6 py-1.5 text-sm transition-colors',
                            isActive
                              ? 'text-primary font-medium bg-list-selected'
                              : 'text-muted-foreground hover:text-foreground hover:bg-list-hover'
                          )}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.label}
                        </Link>
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
