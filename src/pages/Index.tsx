import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { UnitConverter } from '@/components/UnitConverter';
import { CommonConversions } from '@/components/CommonConversions';
import { Link } from 'react-router-dom';
import { categories } from '@/data/conversionData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            <UnitConverter />
            
            {/* Quick Category Links */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Browse All Converters
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/${cat.id}`}
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg shadow-soft hover:shadow-card hover:border-primary/30 transition-all group"
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {cat.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <CommonConversions />
          </main>
          <Sidebar className="lg:w-64 flex-shrink-0" />
        </div>
      </div>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>Fast, accurate unit conversions — all calculations done locally</p>
      </footer>
    </div>
  );
};

export default Index;
