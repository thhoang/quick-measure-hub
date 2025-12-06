import { useState, useMemo, useCallback } from 'react';
import { CategoryTabs } from './CategoryTabs';
import { UnitList } from './UnitList';
import { ConversionResult } from './ConversionResult';
import { CommonConversions } from './CommonConversions';
import { units, convert, type Category, type Unit } from '@/data/conversionData';

export function UnitConverter() {
  const [activeCategory, setActiveCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState<Unit>(units.length[0]);
  const [toUnit, setToUnit] = useState<Unit>(units.length[1]);
  const [inputValue, setInputValue] = useState<string>('1');

  const currentUnits = useMemo(() => units[activeCategory], [activeCategory]);

  const result = useMemo(() => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) return 0;
    return convert(numValue, fromUnit, toUnit);
  }, [inputValue, fromUnit, toUnit]);

  const handleCategoryChange = useCallback((category: Category) => {
    setActiveCategory(category);
    const newUnits = units[category];
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1]);
    setInputValue('1');
  }, []);

  const handleSwap = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }, [fromUnit, toUnit]);

  const handleCommonConversion = useCallback((category: Category, fromId: string, toId: string) => {
    setActiveCategory(category);
    const categoryUnits = units[category];
    const from = categoryUnits.find((u) => u.id === fromId);
    const to = categoryUnits.find((u) => u.id === toId);
    if (from && to) {
      setFromUnit(from);
      setToUnit(to);
      setInputValue('1');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl border border-border shadow-card p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Unit Converter
        </h2>

        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <UnitList
            units={currentUnits}
            selectedUnit={fromUnit}
            onSelectUnit={setFromUnit}
            label="From:"
          />
          <UnitList
            units={currentUnits}
            selectedUnit={toUnit}
            onSelectUnit={setToUnit}
            label="To:"
          />
        </div>
      </div>

      <ConversionResult
        inputValue={inputValue}
        result={result}
        fromUnit={fromUnit}
        toUnit={toUnit}
        onSwap={handleSwap}
        onInputChange={setInputValue}
      />

      <CommonConversions onSelect={handleCommonConversion} />
    </div>
  );
}
