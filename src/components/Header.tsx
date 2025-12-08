import { Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-header text-header-foreground py-4 px-6 shadow-soft">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <Calculator className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">
            Fast<span className="font-semibold">Converters</span>
          </h1>
        </Link>
      </div>
    </header>
  );
}
