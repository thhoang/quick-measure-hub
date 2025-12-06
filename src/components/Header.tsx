import { Calculator } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-header text-header-foreground py-4 px-6 shadow-soft">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <Calculator className="w-8 h-8" />
        <h1 className="text-2xl font-bold tracking-tight">
          Unit<span className="font-normal">Converter</span>
        </h1>
      </div>
    </header>
  );
}
