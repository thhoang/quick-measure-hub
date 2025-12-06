export type Category = 'length' | 'temperature' | 'area' | 'volume' | 'weight' | 'time';

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'length', label: 'Length', icon: '📏' },
  { id: 'temperature', label: 'Temperature', icon: '🌡️' },
  { id: 'area', label: 'Area', icon: '⬛' },
  { id: 'volume', label: 'Volume', icon: '🧊' },
  { id: 'weight', label: 'Weight', icon: '⚖️' },
  { id: 'time', label: 'Time', icon: '⏱️' },
];

export const units: Record<Category, Unit[]> = {
  length: [
    { id: 'meter', name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
    { id: 'kilometer', name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: 'centimeter', name: 'Centimeter', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { id: 'millimeter', name: 'Millimeter', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { id: 'micrometer', name: 'Micrometer', symbol: 'μm', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    { id: 'nanometer', name: 'Nanometer', symbol: 'nm', toBase: (v) => v / 1000000000, fromBase: (v) => v * 1000000000 },
    { id: 'mile', name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    { id: 'yard', name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { id: 'foot', name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { id: 'inch', name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    { id: 'lightyear', name: 'Light Year', symbol: 'ly', toBase: (v) => v * 9.461e15, fromBase: (v) => v / 9.461e15 },
  ],
  temperature: [
    { id: 'celsius', name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
    { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
    { id: 'kelvin', name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    { id: 'rankine', name: 'Rankine', symbol: '°R', toBase: (v) => (v - 491.67) * 5/9, fromBase: (v) => v * 9/5 + 491.67 },
  ],
  area: [
    { id: 'sqmeter', name: 'Square Meter', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
    { id: 'sqkilometer', name: 'Square Kilometer', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
    { id: 'sqcentimeter', name: 'Square Centimeter', symbol: 'cm²', toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
    { id: 'sqmillimeter', name: 'Square Millimeter', symbol: 'mm²', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    { id: 'sqmile', name: 'Square Mile', symbol: 'mi²', toBase: (v) => v * 2589988.11, fromBase: (v) => v / 2589988.11 },
    { id: 'sqyard', name: 'Square Yard', symbol: 'yd²', toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
    { id: 'sqfoot', name: 'Square Foot', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    { id: 'sqinch', name: 'Square Inch', symbol: 'in²', toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
    { id: 'hectare', name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    { id: 'acre', name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
  ],
  volume: [
    { id: 'liter', name: 'Liter', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
    { id: 'milliliter', name: 'Milliliter', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { id: 'cubicmeter', name: 'Cubic Meter', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: 'cubiccentimeter', name: 'Cubic Centimeter', symbol: 'cm³', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { id: 'gallon', name: 'Gallon (US)', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    { id: 'quart', name: 'Quart (US)', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    { id: 'pint', name: 'Pint (US)', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
    { id: 'cup', name: 'Cup (US)', symbol: 'cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    { id: 'fluidounce', name: 'Fluid Ounce (US)', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    { id: 'tablespoon', name: 'Tablespoon', symbol: 'tbsp', toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
    { id: 'teaspoon', name: 'Teaspoon', symbol: 'tsp', toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
  ],
  weight: [
    { id: 'kilogram', name: 'Kilogram', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
    { id: 'gram', name: 'Gram', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { id: 'milligram', name: 'Milligram', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    { id: 'microgram', name: 'Microgram', symbol: 'μg', toBase: (v) => v / 1000000000, fromBase: (v) => v * 1000000000 },
    { id: 'metricton', name: 'Metric Ton', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: 'pound', name: 'Pound', symbol: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { id: 'ounce', name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    { id: 'stone', name: 'Stone', symbol: 'st', toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
    { id: 'uston', name: 'US Ton', symbol: 'ton', toBase: (v) => v * 907.185, fromBase: (v) => v / 907.185 },
    { id: 'imperialton', name: 'Imperial Ton', symbol: 'long ton', toBase: (v) => v * 1016.05, fromBase: (v) => v / 1016.05 },
  ],
  time: [
    { id: 'second', name: 'Second', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
    { id: 'millisecond', name: 'Millisecond', symbol: 'ms', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { id: 'microsecond', name: 'Microsecond', symbol: 'μs', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    { id: 'nanosecond', name: 'Nanosecond', symbol: 'ns', toBase: (v) => v / 1000000000, fromBase: (v) => v * 1000000000 },
    { id: 'minute', name: 'Minute', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
    { id: 'hour', name: 'Hour', symbol: 'h', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    { id: 'day', name: 'Day', symbol: 'd', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
    { id: 'week', name: 'Week', symbol: 'wk', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
    { id: 'month', name: 'Month', symbol: 'mo', toBase: (v) => v * 2628000, fromBase: (v) => v / 2628000 },
    { id: 'year', name: 'Year', symbol: 'yr', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
  ],
};

export interface CommonConversion {
  from: string;
  to: string;
  category: Category;
}

export const commonConversions: CommonConversion[] = [
  { from: 'centimeter', to: 'inch', category: 'length' },
  { from: 'inch', to: 'centimeter', category: 'length' },
  { from: 'kilogram', to: 'pound', category: 'weight' },
  { from: 'pound', to: 'kilogram', category: 'weight' },
  { from: 'celsius', to: 'fahrenheit', category: 'temperature' },
  { from: 'fahrenheit', to: 'celsius', category: 'temperature' },
  { from: 'millimeter', to: 'inch', category: 'length' },
  { from: 'inch', to: 'millimeter', category: 'length' },
  { from: 'meter', to: 'foot', category: 'length' },
  { from: 'foot', to: 'meter', category: 'length' },
  { from: 'kilometer', to: 'mile', category: 'length' },
  { from: 'mile', to: 'kilometer', category: 'length' },
  { from: 'centimeter', to: 'foot', category: 'length' },
  { from: 'foot', to: 'centimeter', category: 'length' },
  { from: 'gram', to: 'ounce', category: 'weight' },
  { from: 'ounce', to: 'gram', category: 'weight' },
  { from: 'inch', to: 'foot', category: 'length' },
  { from: 'foot', to: 'inch', category: 'length' },
  { from: 'liter', to: 'gallon', category: 'volume' },
  { from: 'gallon', to: 'liter', category: 'volume' },
  { from: 'pound', to: 'ounce', category: 'weight' },
  { from: 'ounce', to: 'pound', category: 'weight' },
  { from: 'acre', to: 'sqfoot', category: 'area' },
  { from: 'sqfoot', to: 'acre', category: 'area' },
  { from: 'milliliter', to: 'cup', category: 'volume' },
  { from: 'cup', to: 'milliliter', category: 'volume' },
];

export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
}

export function formatNumber(num: number): string {
  if (num === 0) return '0';
  if (Math.abs(num) < 0.000001 || Math.abs(num) > 999999999) {
    return num.toExponential(6);
  }
  if (Number.isInteger(num)) {
    return num.toLocaleString();
  }
  const precision = Math.abs(num) < 1 ? 8 : 6;
  return parseFloat(num.toPrecision(precision)).toLocaleString(undefined, {
    maximumFractionDigits: 10,
  });
}
