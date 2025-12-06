import { ArrowRightLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { type Unit, formatNumber } from '@/data/conversionData';
import { cn } from '@/lib/utils';

interface ConversionResultProps {
  inputValue: string;
  result: number;
  fromUnit: Unit;
  toUnit: Unit;
  onSwap: () => void;
  onInputChange: (value: string) => void;
}

export function ConversionResult({
  inputValue,
  result,
  fromUnit,
  toUnit,
  onSwap,
  onInputChange,
}: ConversionResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatNumber(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card animate-fade-in">
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        {/* From Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            From ({fromUnit.symbol})
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter value"
            className={cn(
              'w-full px-4 py-3 text-lg font-medium rounded-lg',
              'bg-background border border-input',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
              'transition-all duration-200'
            )}
          />
          <p className="mt-2 text-sm text-muted-foreground">{fromUnit.name}</p>
        </div>

        {/* Swap Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={onSwap}
            className={cn(
              'p-3 rounded-full bg-primary/10 text-primary',
              'hover:bg-primary hover:text-primary-foreground',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary/50'
            )}
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        {/* To Result */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            To ({toUnit.symbol})
          </label>
          <div className="relative">
            <div
              className={cn(
                'w-full px-4 py-3 text-lg font-medium rounded-lg',
                'bg-secondary border border-transparent',
                'text-secondary-foreground'
              )}
            >
              {inputValue ? formatNumber(result) : '—'}
            </div>
            {inputValue && (
              <button
                onClick={handleCopy}
                className={cn(
                  'absolute right-2 top-1/2 -translate-y-1/2',
                  'p-2 rounded-md hover:bg-background/50 transition-colors',
                  'text-muted-foreground hover:text-foreground'
                )}
                aria-label="Copy result"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{toUnit.name}</p>
        </div>
      </div>

      {/* Formula */}
      {inputValue && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-medium text-foreground">{inputValue} {fromUnit.symbol}</span>
            {' = '}
            <span className="font-medium text-primary">{formatNumber(result)} {toUnit.symbol}</span>
          </p>
        </div>
      )}
    </div>
  );
}
