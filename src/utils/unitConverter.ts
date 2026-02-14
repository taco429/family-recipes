/**
 * Unit Conversion System for Shopping List Consolidation
 *
 * Converts compatible units to a common base so quantities of the same
 * ingredient can be combined (e.g., "2 cups butter" + "4 tbsp butter"
 * becomes "2 1/4 cups butter").
 *
 * Conversion groups:
 * - US Volume: tsp, tbsp, fluid ounce, cup, pint, quart, gallon
 * - Metric Volume: milliliter, liter
 * - US/Imperial Weight: ounce, pound
 * - Metric Weight: gram, kilogram
 *
 * Units from different groups are NOT cross-converted (e.g., cups and grams
 * stay separate since that requires ingredient-specific density).
 */

import { normalizeUnit } from './unitNormalizer';

/** A group of units that can be converted between each other */
interface ConversionGroup {
  /** The smallest unit used as the base for internal math */
  baseUnit: string;
  /** Map of canonical unit name → how many base units it equals */
  conversions: Map<string, number>;
  /** Units ordered from largest to smallest, for choosing display unit */
  displayOrder: string[];
}

const US_VOLUME: ConversionGroup = {
  baseUnit: 'tsp',
  conversions: new Map([
    ['tsp', 1],
    ['tbsp', 3],
    ['fluid ounce', 6],
    ['cup', 48],
    ['pint', 96],
    ['quart', 192],
    ['gallon', 768],
  ]),
  displayOrder: ['gallon', 'quart', 'pint', 'cup', 'tbsp', 'tsp'],
};

const METRIC_VOLUME: ConversionGroup = {
  baseUnit: 'milliliter',
  conversions: new Map([
    ['milliliter', 1],
    ['liter', 1000],
  ]),
  displayOrder: ['liter', 'milliliter'],
};

const US_WEIGHT: ConversionGroup = {
  baseUnit: 'ounce',
  conversions: new Map([
    ['ounce', 1],
    ['pound', 16],
  ]),
  displayOrder: ['pound', 'ounce'],
};

const METRIC_WEIGHT: ConversionGroup = {
  baseUnit: 'gram',
  conversions: new Map([
    ['gram', 1],
    ['kilogram', 1000],
  ]),
  displayOrder: ['kilogram', 'gram'],
};

const CONVERSION_GROUPS: ConversionGroup[] = [US_VOLUME, METRIC_VOLUME, US_WEIGHT, METRIC_WEIGHT];

/** Fast lookup: canonical unit → its conversion group */
const UNIT_GROUP_MAP = new Map<string, ConversionGroup>();
CONVERSION_GROUPS.forEach((group) => {
  group.conversions.forEach((_, unit) => {
    UNIT_GROUP_MAP.set(unit, group);
  });
});

/**
 * Gets the conversion group for a unit (normalizes the unit first).
 * Returns undefined if the unit isn't part of any conversion group.
 */
export function getConversionGroup(unit: string): ConversionGroup | undefined {
  const canonical = normalizeUnit(unit);
  return UNIT_GROUP_MAP.get(canonical);
}

/**
 * Checks if two units can be converted between each other
 * (i.e., they belong to the same conversion group).
 *
 * @example
 * areUnitsConvertible('cup', 'tbsp')    // true  (both US volume)
 * areUnitsConvertible('cup', 'gram')    // false (volume vs weight)
 * areUnitsConvertible('lb', 'ounce')    // true  (both US weight)
 */
export function areUnitsConvertible(unit1: string, unit2: string): boolean {
  const group1 = getConversionGroup(unit1);
  const group2 = getConversionGroup(unit2);
  return group1 !== undefined && group1 === group2;
}

/**
 * Converts a quantity from one unit to the group's base unit.
 * Returns undefined if the unit isn't in any conversion group.
 *
 * @example
 * toBaseUnits(2, 'cup')   // { quantity: 96, baseUnit: 'tsp' }
 * toBaseUnits(1, 'pound')  // { quantity: 16, baseUnit: 'ounce' }
 */
export function toBaseUnits(
  quantity: number,
  unit: string
): { quantity: number; baseUnit: string } | undefined {
  const canonical = normalizeUnit(unit);
  const group = UNIT_GROUP_MAP.get(canonical);
  if (!group) return undefined;

  const factor = group.conversions.get(canonical);
  if (factor === undefined) return undefined;

  return { quantity: quantity * factor, baseUnit: group.baseUnit };
}

/**
 * Given a quantity in base units, finds the most human-friendly display unit.
 *
 * Strategy: pick the largest unit where the converted value is >= 1.
 * This avoids awkward results like "0.0625 cups" (shows "1 tbsp" instead).
 *
 * @example
 * toBestDisplayUnit(54, 'tsp')    // { quantity: 1.125, unit: 'cup' }  → "1 1/8 cups"
 * toBestDisplayUnit(24, 'ounce')  // { quantity: 1.5, unit: 'pound' }  → "1 1/2 pounds"
 * toBestDisplayUnit(2, 'tsp')     // { quantity: 2, unit: 'tsp' }      → "2 tsp"
 */
export function toBestDisplayUnit(
  baseQuantity: number,
  baseUnit: string
): { quantity: number; unit: string } {
  const group = UNIT_GROUP_MAP.get(baseUnit);
  if (!group) return { quantity: baseQuantity, unit: baseUnit };

  // Try each unit from largest to smallest
  for (const displayUnit of group.displayOrder) {
    const factor = group.conversions.get(displayUnit)!;
    const converted = baseQuantity / factor;
    if (converted >= 1) {
      return { quantity: converted, unit: displayUnit };
    }
  }

  // Fall back to base unit (for very small quantities)
  return { quantity: baseQuantity, unit: baseUnit };
}
