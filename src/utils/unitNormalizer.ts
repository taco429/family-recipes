/**
 * Unit Normalization System
 *
 * This module provides a structured approach to handling measurement units,
 * including variations, abbreviations, and singular/plural forms.
 */

export interface UnitDefinition {
  canonical: string; // The standard form to use (e.g., "cup")
  variations: string[]; // All accepted variations (singular, plural, abbreviations)
  category: 'volume' | 'weight' | 'count' | 'other';
}

/**
 * Comprehensive unit definitions with all common variations
 */
const UNIT_DEFINITIONS: UnitDefinition[] = [
  // Volume - US/Imperial
  {
    canonical: 'cup',
    variations: ['cup', 'cups', 'c'],
    category: 'volume',
  },
  {
    canonical: 'tbsp',
    variations: ['tbsp', 'tbsps', 'tablespoon', 'tablespoons', 'T'],
    category: 'volume',
  },
  {
    canonical: 'tsp',
    variations: ['tsp', 'tsps', 'teaspoon', 'teaspoons', 't'],
    category: 'volume',
  },
  {
    canonical: 'fluid ounce',
    variations: ['fl oz', 'fl. oz.', 'fluid ounce', 'fluid ounces', 'floz'],
    category: 'volume',
  },
  {
    canonical: 'pint',
    variations: ['pint', 'pints', 'pt', 'pts'],
    category: 'volume',
  },
  {
    canonical: 'quart',
    variations: ['quart', 'quarts', 'qt', 'qts'],
    category: 'volume',
  },
  {
    canonical: 'gallon',
    variations: ['gallon', 'gallons', 'gal', 'gals'],
    category: 'volume',
  },

  // Volume - Metric
  {
    canonical: 'milliliter',
    variations: ['milliliter', 'milliliters', 'ml', 'mls'],
    category: 'volume',
  },
  {
    canonical: 'liter',
    variations: ['liter', 'liters', 'litre', 'litres', 'l'],
    category: 'volume',
  },

  // Weight - US/Imperial
  {
    canonical: 'ounce',
    variations: ['ounce', 'ounces', 'oz', 'ozs'],
    category: 'weight',
  },
  {
    canonical: 'pound',
    variations: ['pound', 'pounds', 'lb', 'lbs', 'lb.', 'lbs.'],
    category: 'weight',
  },

  // Weight - Metric
  {
    canonical: 'gram',
    variations: ['gram', 'grams', 'g', 'gr'],
    category: 'weight',
  },
  {
    canonical: 'kilogram',
    variations: ['kilogram', 'kilograms', 'kg', 'kgs'],
    category: 'weight',
  },

  // Count/Container
  {
    canonical: 'can',
    variations: ['can', 'cans'],
    category: 'count',
  },
  {
    canonical: 'bottle',
    variations: ['bottle', 'bottles'],
    category: 'count',
  },
  {
    canonical: 'jar',
    variations: ['jar', 'jars'],
    category: 'count',
  },
  {
    canonical: 'package',
    variations: ['package', 'packages', 'pkg', 'pkgs'],
    category: 'count',
  },
  {
    canonical: 'box',
    variations: ['box', 'boxes'],
    category: 'count',
  },

  // Food-specific
  {
    canonical: 'clove',
    variations: ['clove', 'cloves'],
    category: 'count',
  },
  {
    canonical: 'piece',
    variations: ['piece', 'pieces', 'pc', 'pcs'],
    category: 'count',
  },
  {
    canonical: 'slice',
    variations: ['slice', 'slices'],
    category: 'count',
  },
  {
    canonical: 'head',
    variations: ['head', 'heads'],
    category: 'count',
  },
  {
    canonical: 'bunch',
    variations: ['bunch', 'bunches'],
    category: 'count',
  },
  {
    canonical: 'stalk',
    variations: ['stalk', 'stalks'],
    category: 'count',
  },
  {
    canonical: 'rack',
    variations: ['rack', 'racks'],
    category: 'count',
  },
  {
    canonical: 'square',
    variations: ['square', 'squares'],
    category: 'count',
  },

  // Other
  {
    canonical: 'pinch',
    variations: ['pinch', 'pinches'],
    category: 'other',
  },
  {
    canonical: 'dash',
    variations: ['dash', 'dashes'],
    category: 'other',
  },
  {
    canonical: 'to taste',
    variations: ['to taste'],
    category: 'other',
  },
];

/**
 * Create a fast lookup map for unit normalization
 */
const UNIT_LOOKUP_MAP = new Map<string, UnitDefinition>();
UNIT_DEFINITIONS.forEach((def) => {
  def.variations.forEach((variation) => {
    UNIT_LOOKUP_MAP.set(variation.toLowerCase(), def);
  });
});

/**
 * Normalizes a unit string to its canonical form
 *
 * @param unit - The unit string to normalize
 * @returns The canonical unit name, or the original if not found
 *
 * @example
 * normalizeUnit('cups') // returns 'cup'
 * normalizeUnit('lbs') // returns 'pound'
 * normalizeUnit('tablespoons') // returns 'tbsp'
 */
export function normalizeUnit(unit: string): string {
  const normalized = unit.toLowerCase().trim();
  const definition = UNIT_LOOKUP_MAP.get(normalized);
  return definition ? definition.canonical : normalized;
}

/**
 * Gets the display form of a unit based on quantity
 * Uses singular for 1, plural for other amounts
 *
 * @param canonicalUnit - The canonical unit name
 * @param quantity - The quantity (to determine singular/plural)
 * @returns The appropriate display form
 *
 * @example
 * getDisplayUnit('cup', 1) // returns 'cup'
 * getDisplayUnit('cup', 2) // returns 'cups'
 * getDisplayUnit('tbsp', 5) // returns 'tbsp' (abbreviations stay the same)
 */
export function getDisplayUnit(canonicalUnit: string, quantity: number): string {
  const definition = UNIT_DEFINITIONS.find((def) => def.canonical === canonicalUnit);

  if (!definition) {
    return canonicalUnit;
  }

  // For abbreviations (2-3 chars), don't pluralize
  const isAbbreviation = canonicalUnit.length <= 4 && !canonicalUnit.includes(' ');
  if (isAbbreviation) {
    return canonicalUnit;
  }

  // Use singular form for quantity of 1
  if (Math.abs(quantity - 1) < 0.01) {
    return canonicalUnit;
  }

  // Find the plural form from variations
  const pluralVariation = definition.variations.find(
    (v) => v !== canonicalUnit && v.endsWith('s') && !v.includes('.')
  );

  return pluralVariation || `${canonicalUnit}s`;
}

/**
 * Gets the category of a unit
 *
 * @param unit - The unit string (can be any variation)
 * @returns The category or 'other' if not found
 */
export function getUnitCategory(unit: string): 'volume' | 'weight' | 'count' | 'other' {
  const normalized = unit.toLowerCase().trim();
  const definition = UNIT_LOOKUP_MAP.get(normalized);
  return definition?.category || 'other';
}

/**
 * Checks if two units are equivalent (same canonical form)
 *
 * @param unit1 - First unit string
 * @param unit2 - Second unit string
 * @returns true if they normalize to the same canonical unit
 *
 * @example
 * areUnitsEquivalent('cup', 'cups') // returns true
 * areUnitsEquivalent('lb', 'pounds') // returns true
 * areUnitsEquivalent('cup', 'tbsp') // returns false
 */
export function areUnitsEquivalent(unit1: string, unit2: string): boolean {
  return normalizeUnit(unit1) === normalizeUnit(unit2);
}

/**
 * Gets all known unit variations (useful for validation)
 */
export function getAllKnownUnits(): string[] {
  return Array.from(UNIT_LOOKUP_MAP.keys());
}
