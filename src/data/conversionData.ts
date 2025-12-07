export type Category = 
  | 'length' | 'temperature' | 'area' | 'volume' | 'weight' | 'time'
  | 'speed' | 'energy' | 'pressure' | 'data' | 'angle' | 'fuel' | 'power' | 'force';

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
  definition?: string;
  history?: string;
  currentUse?: string;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: string;
  group: 'common' | 'engineering' | 'other';
}

export const categories: CategoryInfo[] = [
  { id: 'length', label: 'Length', icon: '📏', group: 'common' },
  { id: 'temperature', label: 'Temperature', icon: '🌡️', group: 'common' },
  { id: 'area', label: 'Area', icon: '⬛', group: 'common' },
  { id: 'volume', label: 'Volume', icon: '🧊', group: 'common' },
  { id: 'weight', label: 'Weight', icon: '⚖️', group: 'common' },
  { id: 'time', label: 'Time', icon: '⏱️', group: 'common' },
  { id: 'speed', label: 'Speed', icon: '🚀', group: 'engineering' },
  { id: 'energy', label: 'Energy', icon: '⚡', group: 'engineering' },
  { id: 'power', label: 'Power', icon: '💡', group: 'engineering' },
  { id: 'pressure', label: 'Pressure', icon: '🎯', group: 'engineering' },
  { id: 'force', label: 'Force', icon: '💪', group: 'engineering' },
  { id: 'data', label: 'Data Storage', icon: '💾', group: 'other' },
  { id: 'angle', label: 'Angle', icon: '📐', group: 'other' },
  { id: 'fuel', label: 'Fuel Economy', icon: '⛽', group: 'other' },
];

export const units: Record<Category, Unit[]> = {
  length: [
    { 
      id: 'meter', name: 'Meter', symbol: 'm', 
      toBase: (v) => v, fromBase: (v) => v,
      definition: 'A meter (symbol: m) is the base unit of length in the International System of Units (SI). It is defined as the length of the path travelled by light in vacuum during a time interval of 1/299,792,458 of a second.',
      history: 'The meter was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole along a great circle. It has been redefined several times, with the current definition adopted in 1983.',
      currentUse: 'The meter is used worldwide as the standard unit of length in most countries. It is used in science, engineering, and everyday measurements.'
    },
    { 
      id: 'kilometer', name: 'Kilometer', symbol: 'km', 
      toBase: (v) => v * 1000, fromBase: (v) => v / 1000,
      definition: 'A kilometer (symbol: km) is a unit of length equal to 1,000 meters. The prefix "kilo-" means one thousand.',
      history: 'The kilometer was introduced with the metric system in the 1790s as a convenient unit for measuring longer distances.',
      currentUse: 'Kilometers are commonly used to express distances between geographical locations on land in most countries.'
    },
    { 
      id: 'centimeter', name: 'Centimeter', symbol: 'cm', 
      toBase: (v) => v / 100, fromBase: (v) => v * 100,
      definition: 'A centimeter (symbol: cm) is a unit of length in the International System of Units (SI), equal to one hundredth of a meter.',
      history: 'The centimeter is based on the SI unit meter, and as the prefix "centi" indicates, is equal to one hundredth of a meter.',
      currentUse: 'The centimeter is used in all sorts of applications worldwide where a smaller denomination of the meter is required. Height is commonly measured in centimeters outside of countries like the United States.'
    },
    { 
      id: 'millimeter', name: 'Millimeter', symbol: 'mm', 
      toBase: (v) => v / 1000, fromBase: (v) => v * 1000,
      definition: 'A millimeter (symbol: mm) is a unit of length equal to one thousandth of a meter.',
      history: 'The millimeter is part of the metric system, introduced in France in the 1790s.',
      currentUse: 'Millimeters are commonly used for small-scale measurements in engineering, manufacturing, and construction.'
    },
    { id: 'micrometer', name: 'Micrometer', symbol: 'μm', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    { id: 'nanometer', name: 'Nanometer', symbol: 'nm', toBase: (v) => v / 1000000000, fromBase: (v) => v * 1000000000 },
    { 
      id: 'mile', name: 'Mile', symbol: 'mi', 
      toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344,
      definition: 'A mile is a unit of length equal to 5,280 feet, 1,760 yards, or exactly 1,609.344 meters.',
      history: 'The mile is derived from the Roman "mille passus" (thousand paces), which was about 1,480 meters. The modern international mile was standardized in 1959.',
      currentUse: 'The mile is primarily used in the United States, United Kingdom, and other countries that use the imperial system for road distances and speed limits.'
    },
    { 
      id: 'yard', name: 'Yard', symbol: 'yd', 
      toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144,
      definition: 'A yard is a unit of length equal to 3 feet or exactly 0.9144 meters.',
      history: 'The yard originated in England as the distance from the tip of the nose to the end of the thumb of King Henry I.',
      currentUse: 'Yards are commonly used in the United States for measuring distances in American football, golf, and fabric.'
    },
    { 
      id: 'foot', name: 'Foot', symbol: 'ft', 
      toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048,
      definition: 'A foot is a unit of length equal to 12 inches or exactly 0.3048 meters.',
      history: 'The foot was historically based on the length of a human foot. The international foot was defined in 1959 as exactly 0.3048 meters.',
      currentUse: 'Feet are commonly used in the United States for measuring height, altitude, and room dimensions.'
    },
    { 
      id: 'inch', name: 'Inch', symbol: 'in', 
      toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254,
      definition: 'An inch (symbol: in) is a unit of length in the imperial and US customary systems of measurement. An inch was defined to be equivalent to exactly 25.4 millimeters in 1959.',
      history: 'The term "inch" was derived from the Latin unit "uncia" which equated to "one-twelfth" of a Roman foot. One of the earliest definitions was based on barleycorns, where an inch was equal to the length of three grains of dry, round barley placed end-to-end.',
      currentUse: 'The inch is mostly used in the United States, Canada, and the United Kingdom. It is also sometimes used in Japan in relation to electronic parts, like the size of display screens.'
    },
    { id: 'lightyear', name: 'Light Year', symbol: 'ly', toBase: (v) => v * 9.461e15, fromBase: (v) => v / 9.461e15 },
  ],
  temperature: [
    { 
      id: 'celsius', name: 'Celsius', symbol: '°C', 
      toBase: (v) => v, fromBase: (v) => v,
      definition: 'The Celsius scale is a temperature scale where 0°C is the freezing point of water and 100°C is the boiling point at standard atmospheric pressure.',
      history: 'The Celsius scale was first proposed by Swedish astronomer Anders Celsius in 1742. Originally, the scale was reversed with 100° as the freezing point.',
      currentUse: 'Celsius is used by most countries in the world for everyday temperature measurements and is the standard in scientific contexts.'
    },
    { 
      id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', 
      toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32,
      definition: 'The Fahrenheit scale is a temperature scale where 32°F is the freezing point of water and 212°F is the boiling point at standard atmospheric pressure.',
      history: 'The Fahrenheit scale was proposed by German physicist Daniel Gabriel Fahrenheit in 1724. He based it on three reference points including brine solution.',
      currentUse: 'Fahrenheit is primarily used in the United States for everyday temperature measurements, weather forecasts, and cooking.'
    },
    { 
      id: 'kelvin', name: 'Kelvin', symbol: 'K', 
      toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15,
      definition: 'Kelvin is the SI base unit of temperature. It is defined by setting the Boltzmann constant to exactly 1.380649×10−23 J/K.',
      history: 'Named after Lord Kelvin (William Thomson), who wrote of the need for an "absolute thermometric scale" in 1848.',
      currentUse: 'Kelvin is used in science and engineering, particularly in physics and chemistry, as it starts at absolute zero.'
    },
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
    { 
      id: 'kilogram', name: 'Kilogram', symbol: 'kg', 
      toBase: (v) => v, fromBase: (v) => v,
      definition: 'The kilogram (symbol: kg) is the base unit of mass in the International System of Units (SI). It is defined by setting the Planck constant h to exactly 6.62607015×10−34 J⋅s.',
      history: 'The kilogram was originally defined in 1795 as the mass of one liter of water. In 2019, it was redefined based on the Planck constant.',
      currentUse: 'The kilogram is used worldwide as the standard unit of mass in science, industry, and commerce.'
    },
    { id: 'gram', name: 'Gram', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { id: 'milligram', name: 'Milligram', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    { id: 'microgram', name: 'Microgram', symbol: 'μg', toBase: (v) => v / 1000000000, fromBase: (v) => v * 1000000000 },
    { id: 'metricton', name: 'Metric Ton', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { 
      id: 'pound', name: 'Pound', symbol: 'lb', 
      toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592,
      definition: 'A pound (symbol: lb) is a unit of mass used in the imperial and US customary systems of measurement. One pound is defined as exactly 0.45359237 kilograms.',
      history: 'The pound has origins in the Roman libra. The international avoirdupois pound was defined in 1959.',
      currentUse: 'The pound is commonly used in the United States for measuring body weight, groceries, and shipping.'
    },
    { 
      id: 'ounce', name: 'Ounce', symbol: 'oz', 
      toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495,
      definition: 'An ounce (symbol: oz) is a unit of mass equal to 1/16 of a pound, or approximately 28.35 grams.',
      history: 'The term ounce comes from the Latin word "uncia," meaning one twelfth part.',
      currentUse: 'Ounces are commonly used in the United States for food packaging, postal services, and cooking recipes.'
    },
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
  speed: [
    { id: 'mps', name: 'Meters per Second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
    { id: 'kph', name: 'Kilometers per Hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    { id: 'mph', name: 'Miles per Hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    { id: 'fps', name: 'Feet per Second', symbol: 'ft/s', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { id: 'knot', name: 'Knot', symbol: 'kn', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    { id: 'mach', name: 'Mach', symbol: 'Ma', toBase: (v) => v * 343, fromBase: (v) => v / 343 },
    { id: 'lightspeed', name: 'Speed of Light', symbol: 'c', toBase: (v) => v * 299792458, fromBase: (v) => v / 299792458 },
  ],
  energy: [
    { id: 'joule', name: 'Joule', symbol: 'J', toBase: (v) => v, fromBase: (v) => v },
    { id: 'kilojoule', name: 'Kilojoule', symbol: 'kJ', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: 'calorie', name: 'Calorie', symbol: 'cal', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
    { id: 'kilocalorie', name: 'Kilocalorie', symbol: 'kcal', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
    { id: 'wh', name: 'Watt Hour', symbol: 'Wh', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    { id: 'kwh', name: 'Kilowatt Hour', symbol: 'kWh', toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
    { id: 'ev', name: 'Electronvolt', symbol: 'eV', toBase: (v) => v * 1.602176634e-19, fromBase: (v) => v / 1.602176634e-19 },
    { id: 'btu', name: 'British Thermal Unit', symbol: 'BTU', toBase: (v) => v * 1055.06, fromBase: (v) => v / 1055.06 },
    { id: 'therm', name: 'Therm', symbol: 'thm', toBase: (v) => v * 105505600, fromBase: (v) => v / 105505600 },
  ],
  power: [
    { id: 'watt', name: 'Watt', symbol: 'W', toBase: (v) => v, fromBase: (v) => v },
    { id: 'kilowatt', name: 'Kilowatt', symbol: 'kW', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: 'megawatt', name: 'Megawatt', symbol: 'MW', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
    { id: 'horsepower', name: 'Horsepower', symbol: 'hp', toBase: (v) => v * 745.7, fromBase: (v) => v / 745.7 },
    { id: 'btuperhour', name: 'BTU/hour', symbol: 'BTU/h', toBase: (v) => v * 0.293071, fromBase: (v) => v / 0.293071 },
    { id: 'footpoundpermin', name: 'Foot-pound/minute', symbol: 'ft⋅lbf/min', toBase: (v) => v * 0.0225970, fromBase: (v) => v / 0.0225970 },
  ],
  pressure: [
    { id: 'pascal', name: 'Pascal', symbol: 'Pa', toBase: (v) => v, fromBase: (v) => v },
    { id: 'kilopascal', name: 'Kilopascal', symbol: 'kPa', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: 'bar', name: 'Bar', symbol: 'bar', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
    { id: 'psi', name: 'PSI', symbol: 'psi', toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
    { id: 'atm', name: 'Atmosphere', symbol: 'atm', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
    { id: 'torr', name: 'Torr', symbol: 'Torr', toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
    { id: 'mmhg', name: 'Millimeters of Mercury', symbol: 'mmHg', toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
  ],
  force: [
    { id: 'newton', name: 'Newton', symbol: 'N', toBase: (v) => v, fromBase: (v) => v },
    { id: 'kilonewton', name: 'Kilonewton', symbol: 'kN', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { id: 'dyne', name: 'Dyne', symbol: 'dyn', toBase: (v) => v * 0.00001, fromBase: (v) => v / 0.00001 },
    { id: 'poundforce', name: 'Pound-force', symbol: 'lbf', toBase: (v) => v * 4.44822, fromBase: (v) => v / 4.44822 },
    { id: 'kgf', name: 'Kilogram-force', symbol: 'kgf', toBase: (v) => v * 9.80665, fromBase: (v) => v / 9.80665 },
  ],
  data: [
    { id: 'bit', name: 'Bit', symbol: 'b', toBase: (v) => v, fromBase: (v) => v },
    { id: 'byte', name: 'Byte', symbol: 'B', toBase: (v) => v * 8, fromBase: (v) => v / 8 },
    { id: 'kilobyte', name: 'Kilobyte', symbol: 'KB', toBase: (v) => v * 8000, fromBase: (v) => v / 8000 },
    { id: 'megabyte', name: 'Megabyte', symbol: 'MB', toBase: (v) => v * 8000000, fromBase: (v) => v / 8000000 },
    { id: 'gigabyte', name: 'Gigabyte', symbol: 'GB', toBase: (v) => v * 8000000000, fromBase: (v) => v / 8000000000 },
    { id: 'terabyte', name: 'Terabyte', symbol: 'TB', toBase: (v) => v * 8000000000000, fromBase: (v) => v / 8000000000000 },
    { id: 'petabyte', name: 'Petabyte', symbol: 'PB', toBase: (v) => v * 8000000000000000, fromBase: (v) => v / 8000000000000000 },
    { id: 'kibibyte', name: 'Kibibyte', symbol: 'KiB', toBase: (v) => v * 8192, fromBase: (v) => v / 8192 },
    { id: 'mebibyte', name: 'Mebibyte', symbol: 'MiB', toBase: (v) => v * 8388608, fromBase: (v) => v / 8388608 },
    { id: 'gibibyte', name: 'Gibibyte', symbol: 'GiB', toBase: (v) => v * 8589934592, fromBase: (v) => v / 8589934592 },
  ],
  angle: [
    { id: 'degree', name: 'Degree', symbol: '°', toBase: (v) => v, fromBase: (v) => v },
    { id: 'radian', name: 'Radian', symbol: 'rad', toBase: (v) => v * (180 / Math.PI), fromBase: (v) => v * (Math.PI / 180) },
    { id: 'gradian', name: 'Gradian', symbol: 'gon', toBase: (v) => v * 0.9, fromBase: (v) => v / 0.9 },
    { id: 'arcminute', name: 'Arcminute', symbol: "'", toBase: (v) => v / 60, fromBase: (v) => v * 60 },
    { id: 'arcsecond', name: 'Arcsecond', symbol: '"', toBase: (v) => v / 3600, fromBase: (v) => v * 3600 },
    { id: 'revolution', name: 'Revolution', symbol: 'rev', toBase: (v) => v * 360, fromBase: (v) => v / 360 },
  ],
  fuel: [
    { id: 'kmperliter', name: 'Kilometers per Liter', symbol: 'km/L', toBase: (v) => v, fromBase: (v) => v },
    { id: 'mpg', name: 'Miles per Gallon (US)', symbol: 'mpg', toBase: (v) => v * 0.425144, fromBase: (v) => v / 0.425144 },
    { id: 'mpgimp', name: 'Miles per Gallon (Imp)', symbol: 'mpg (imp)', toBase: (v) => v * 0.354006, fromBase: (v) => v / 0.354006 },
    { id: 'lper100km', name: 'Liters per 100km', symbol: 'L/100km', toBase: (v) => 100 / v, fromBase: (v) => 100 / v },
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
  { from: 'kph', to: 'mph', category: 'speed' },
  { from: 'mph', to: 'kph', category: 'speed' },
  { from: 'kilocalorie', to: 'joule', category: 'energy' },
  { from: 'joule', to: 'kilocalorie', category: 'energy' },
  { from: 'megabyte', to: 'gigabyte', category: 'data' },
  { from: 'gigabyte', to: 'megabyte', category: 'data' },
  { from: 'degree', to: 'radian', category: 'angle' },
  { from: 'radian', to: 'degree', category: 'angle' },
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

export function generateConversionTable(fromUnit: Unit, toUnit: Unit): { from: number; to: string }[] {
  const values = [0.01, 0.1, 1, 2, 3, 5, 10, 20, 50, 100, 1000];
  return values.map((v) => ({
    from: v,
    to: formatNumber(convert(v, fromUnit, toUnit)),
  }));
}

export function getConversionFactor(fromUnit: Unit, toUnit: Unit): string {
  const factor = convert(1, fromUnit, toUnit);
  return formatNumber(factor);
}
