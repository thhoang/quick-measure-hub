import { Link } from 'react-router-dom';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';
import { useState, useMemo } from 'react';
import { type Unit, type Category, formatNumber, convert, generateConversionTable, getConversionFactor, units } from '@/data/conversionData';
import { cn } from '@/lib/utils';
import { ConvertToOtherUnits } from './ConvertToOtherUnits';

interface ConversionPageContentProps {
  category: Category;
  fromUnit: Unit;
  toUnit: Unit;
}

export function ConversionPageContent({ category, fromUnit, toUnit }: ConversionPageContentProps) {
  const [inputValue, setInputValue] = useState<string>('1');
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) return 0;
    return convert(numValue, fromUnit, toUnit);
  }, [inputValue, fromUnit, toUnit]);

  const conversionTable = useMemo(() => generateConversionTable(fromUnit, toUnit), [fromUnit, toUnit]);
  const conversionFactor = useMemo(() => getConversionFactor(fromUnit, toUnit), [fromUnit, toUnit]);
  const reverseConversionFactor = useMemo(() => getConversionFactor(toUnit, fromUnit), [fromUnit, toUnit]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatNumber(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get related conversions
  const categoryUnits = units[category];
  const relatedConversions = categoryUnits
    .filter((u) => u.id !== fromUnit.id && u.id !== toUnit.id)
    .slice(0, 8)
    .flatMap((u) => [
      { from: fromUnit, to: u },
      { from: u, to: toUnit },
    ])
    .slice(0, 16);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        {' / '}
        <Link to={`/${category}`} className="hover:text-primary capitalize">{category} Conversion</Link>
        {' / '}
        <span className="text-foreground">Convert {fromUnit.symbol} to {toUnit.symbol}</span>
      </nav>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Convert {fromUnit.name} to {toUnit.name}
        </h1>
        <p className="text-foreground/80 font-medium">
          Please provide values below to convert {fromUnit.name.toLowerCase()} [{fromUnit.symbol}] to {toUnit.name.toLowerCase()} [{toUnit.symbol}], or{' '}
          <Link to={`/${category}/${toUnit.id}-to-${fromUnit.id}`} className="text-primary hover:underline font-semibold">
            vice versa
          </Link>.
        </p>
      </div>

      {/* Converter Card */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">From:</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={cn(
                  'flex-1 px-4 py-3 text-lg font-medium rounded-lg',
                  'bg-background border border-input',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
              />
              <span className="px-4 py-3 bg-secondary rounded-lg font-medium text-secondary-foreground">
                {fromUnit.symbol}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:hidden">
            <Link
              to={`/${category}/${toUnit.id}-to-${fromUnit.id}`}
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </Link>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-muted-foreground">To:</label>
              <Link
                to={`/${category}/${toUnit.id}-to-${fromUnit.id}`}
                className="hidden md:flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <ArrowRightLeft className="w-3 h-3" /> Swap
              </Link>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div className="px-4 py-3 text-lg font-medium rounded-lg bg-secondary text-secondary-foreground">
                  {inputValue ? formatNumber(result) : '—'}
                </div>
                {inputValue && (
                  <button
                    onClick={handleCopy}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-background/50 text-muted-foreground hover:text-foreground"
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
              <span className="px-4 py-3 bg-secondary rounded-lg font-medium text-secondary-foreground">
                {toUnit.symbol}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Unit Definitions */}
      {fromUnit.definition && (
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">{fromUnit.name}</h2>
          <div className="space-y-4 text-foreground/90">
            <p className="font-medium"><strong className="font-bold">Definition:</strong> {fromUnit.definition}</p>
            {fromUnit.history && <p className="font-medium"><strong className="font-bold">History/origin:</strong> {fromUnit.history}</p>}
            {fromUnit.currentUse && <p className="font-medium"><strong className="font-bold">Current use:</strong> {fromUnit.currentUse}</p>}
          </div>
        </section>
      )}

      {toUnit.definition && (
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">{toUnit.name}</h2>
          <div className="space-y-4 text-foreground/90">
            <p className="font-medium"><strong className="font-bold">Definition:</strong> {toUnit.definition}</p>
            {toUnit.history && <p className="font-medium"><strong className="font-bold">History/origin:</strong> {toUnit.history}</p>}
            {toUnit.currentUse && <p className="font-medium"><strong className="font-bold">Current use:</strong> {toUnit.currentUse}</p>}
          </div>
        </section>
      )}

      {/* Conversion Table */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-4">
          {fromUnit.name} to {toUnit.name} Conversion Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-soft">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-left font-bold text-foreground border-b border-border">
                  {fromUnit.name} [{fromUnit.symbol}]
                </th>
                <th className="px-4 py-3 text-left font-bold text-foreground border-b border-border">
                  {toUnit.name} [{toUnit.symbol}]
                </th>
              </tr>
            </thead>
            <tbody>
              {conversionTable.map((row, index) => (
                <tr key={index} className="hover:bg-list-hover transition-colors">
                  <td className="px-4 py-2 border-b border-border text-foreground font-medium">
                    {row.from} {fromUnit.symbol}
                  </td>
                  <td className="px-4 py-2 border-b border-border text-foreground font-medium">
                    {row.to} {toUnit.symbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to Convert */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-4">
          How to Convert {fromUnit.name} to {toUnit.name}
        </h2>
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <p className="text-foreground font-semibold">
            1 {fromUnit.symbol} = {conversionFactor} {toUnit.symbol}
          </p>
          <p className="text-foreground font-semibold">
            1 {toUnit.symbol} = {reverseConversionFactor} {fromUnit.symbol}
          </p>
          <div className="pt-4 border-t border-border">
            <p className="text-foreground/80 font-medium"><strong className="font-bold">Example:</strong> convert 15 {fromUnit.symbol} to {toUnit.symbol}:</p>
            <p className="text-foreground font-semibold mt-2">
              15 {fromUnit.symbol} = 15 × {conversionFactor} {toUnit.symbol} = {formatNumber(convert(15, fromUnit, toUnit))} {toUnit.symbol}
            </p>
          </div>
        </div>
      </section>

      {/* Convert to Other Units - From Unit */}
      <ConvertToOtherUnits category={category} fromUnit={fromUnit} excludeUnit={toUnit} />

      {/* Convert to Other Units - To Unit */}
      <ConvertToOtherUnits category={category} fromUnit={toUnit} excludeUnit={fromUnit} />

      {/* Related Conversions */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-4">
          Popular {category.charAt(0).toUpperCase() + category.slice(1)} Conversions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {relatedConversions.map((conv, index) => (
            <Link
              key={index}
              to={`/${category}/${conv.from.id}-to-${conv.to.id}`}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium',
                'bg-card border border-border shadow-soft',
                'hover:bg-secondary hover:border-primary/30',
                'transition-all duration-200',
                'text-primary hover:text-foreground'
              )}
              title={`Convert ${conv.from.name} to ${conv.to.name}`}
            >
              {conv.from.symbol} to {conv.to.symbol}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
