import { Ingredient } from '../data/types';
import { normalizeUnit, getDisplayUnit } from './unitNormalizer';
import { getConversionGroup, toBaseUnits, toBestDisplayUnit } from './unitConverter';

/**
 * Formats an ingredient object into a human-readable string for display
 * Example: { quantity: 2, unit: 'cups', item: 'flour', preparation: 'sifted' }
 * Returns: "2 cups flour, sifted"
 */
export function formatIngredient(ingredient: Ingredient): string {
  const parts: string[] = [];

  // Add quantity
  if (ingredient.quantity) {
    parts.push(ingredient.quantity.toString());
  }

  // Add unit
  if (ingredient.unit) {
    parts.push(ingredient.unit);
  }

  // Add item
  parts.push(ingredient.item);

  // Add preparation (as a suffix)
  if (ingredient.preparation) {
    parts.push(`, ${ingredient.preparation}`);
  }

  // Add notes (in parentheses)
  if (ingredient.notes) {
    parts.push(`(${ingredient.notes})`);
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * Formats an ingredient for shopping list (item name with quantity/unit only, no preparation)
 * Example: { quantity: 2, unit: 'cups', item: 'flour', preparation: 'sifted' }
 * Returns: "2 cups flour"
 */
export function formatIngredientForShopping(ingredient: Ingredient): string {
  const parts: string[] = [];

  // Add quantity
  if (ingredient.quantity) {
    parts.push(ingredient.quantity.toString());
  }

  // Add unit
  if (ingredient.unit) {
    parts.push(ingredient.unit);
  }

  // Add item
  parts.push(ingredient.item);

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * Gets just the item name from an ingredient (for grouping/deduplication)
 */
export function getIngredientItemName(ingredient: Ingredient): string {
  return ingredient.item;
}

/**
 * Formats a number to a nice fraction or decimal display
 */
function formatQuantity(quantity: number): string {
  // First check if it's a whole number (or very close to one)
  if (Math.abs(quantity - Math.round(quantity)) < 0.01) {
    return Math.round(quantity).toString();
  }

  // Common fractions to check (ordered by size for best matching)
  const fractions: Array<[number, string]> = [
    [0.125, '1/8'],
    [0.167, '1/6'],
    [0.25, '1/4'],
    [0.333, '1/3'],
    [0.375, '3/8'],
    [0.5, '1/2'],
    [0.625, '5/8'],
    [0.667, '2/3'],
    [0.75, '3/4'],
    [0.833, '5/6'],
    [0.875, '7/8'],
  ];

  // Check for whole + fraction combinations first
  const whole = Math.floor(quantity);
  const remainder = quantity - whole;

  if (remainder > 0.01) {
    for (const [decimal, fraction] of fractions) {
      if (Math.abs(remainder - decimal) < 0.01) {
        return whole > 0 ? `${whole} ${fraction}` : fraction;
      }
    }
  }

  // Check if it's just a fraction (no whole part)
  for (const [decimal, fraction] of fractions) {
    if (Math.abs(quantity - decimal) < 0.01) {
      return fraction;
    }
  }

  // Otherwise, return with minimal decimal places
  if (quantity < 10) {
    return quantity.toFixed(2).replace(/\.?0+$/, '');
  } else {
    return quantity.toFixed(1).replace(/\.?0+$/, '');
  }
}

/**
 * Aggregates ingredients from multiple recipes and formats them for shopping.
 *
 * Consolidation strategy:
 * 1. Group all ingredients by item name
 * 2. For each item, group quantities by *conversion group* (not just unit).
 *    This means "2 cups flour" + "4 tbsp flour" get combined because cups and
 *    tbsp are both US Volume units.
 * 3. Convert all quantities to the group's base unit, sum them, then convert
 *    back to the most readable display unit.
 * 4. Units that aren't part of any conversion group (e.g., "can", "package")
 *    are still consolidated by their canonical unit, as before.
 */
export function aggregateIngredientsForShopping(
  recipes: { ingredients: Ingredient[] }[]
): string[] {
  const ingredientMap = new Map<string, Ingredient[]>();

  // Group ingredients by item name (normalized to lowercase for matching)
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const itemKey = ingredient.item.toLowerCase().trim();
      if (!ingredientMap.has(itemKey)) {
        ingredientMap.set(itemKey, []);
      }
      ingredientMap.get(itemKey)!.push(ingredient);
    });
  });

  // Format each group with consolidated quantities
  const shoppingList: string[] = [];

  ingredientMap.forEach((ingredients) => {
    // Use the original casing from the first occurrence
    const displayName = ingredients[0].item;

    if (ingredients.length === 1) {
      // Single occurrence - show as-is
      shoppingList.push(formatIngredientForShopping(ingredients[0]));
    } else {
      // Multiple occurrences - consolidate by conversion group
      // Key format: "__group__<baseUnit>" for convertible units,
      //             "__unit__<canonical>" for non-convertible units,
      //             "__no_unit__" for unitless items
      const groups = new Map<
        string,
        { baseUnit: string | null; quantities: number[]; canonicalUnit: string }
      >();
      const stringQuantities: string[] = [];

      ingredients.forEach((ing) => {
        if (typeof ing.quantity === 'number') {
          if (ing.unit) {
            const canonical = normalizeUnit(ing.unit);
            const convGroup = getConversionGroup(canonical);

            if (convGroup) {
              // Unit belongs to a conversion group - convert to base units
              const groupKey = `__group__${convGroup.baseUnit}`;
              if (!groups.has(groupKey)) {
                groups.set(groupKey, {
                  baseUnit: convGroup.baseUnit,
                  quantities: [],
                  canonicalUnit: canonical,
                });
              }
              const base = toBaseUnits(ing.quantity, canonical);
              if (base) {
                groups.get(groupKey)!.quantities.push(base.quantity);
              }
            } else {
              // Not in a conversion group - group by canonical unit (e.g., "can", "package")
              const groupKey = `__unit__${canonical}`;
              if (!groups.has(groupKey)) {
                groups.set(groupKey, {
                  baseUnit: null,
                  quantities: [],
                  canonicalUnit: canonical,
                });
              }
              groups.get(groupKey)!.quantities.push(ing.quantity);
            }
          } else {
            // No unit (like eggs, apples)
            const groupKey = '__no_unit__';
            if (!groups.has(groupKey)) {
              groups.set(groupKey, { baseUnit: null, quantities: [], canonicalUnit: '' });
            }
            groups.get(groupKey)!.quantities.push(ing.quantity);
          }
        } else {
          // String quantities like "to taste", "pinch"
          stringQuantities.push(ing.quantity);
        }
      });

      // Format each consolidated group
      groups.forEach((group) => {
        const total = group.quantities.reduce((sum, q) => sum + q, 0);

        if (group.baseUnit) {
          // Convertible group: convert from base units to best display unit
          const best = toBestDisplayUnit(total, group.baseUnit);
          const formattedTotal = formatQuantity(best.quantity);
          const displayUnit = getDisplayUnit(best.unit, best.quantity);
          shoppingList.push(`${formattedTotal} ${displayUnit} ${displayName}`);
        } else if (group.canonicalUnit) {
          // Non-convertible unit: sum and display with canonical unit
          const formattedTotal = formatQuantity(total);
          const displayUnit = getDisplayUnit(group.canonicalUnit, total);
          shoppingList.push(`${formattedTotal} ${displayUnit} ${displayName}`);
        } else {
          // No unit
          const formattedTotal = formatQuantity(total);
          shoppingList.push(`${formattedTotal} ${displayName}`);
        }
      });

      // Add unique string quantities (to taste, pinch, etc.)
      const uniqueStringQuantities = Array.from(new Set(stringQuantities));
      uniqueStringQuantities.forEach((qty) => {
        shoppingList.push(`${qty} ${displayName}`);
      });
    }
  });

  return shoppingList.sort((a, b) => {
    // Extract item name (last part) for alphabetical sorting
    const getItemName = (str: string) => {
      const parts = str.split(' ');
      return parts[parts.length - 1].toLowerCase();
    };
    return getItemName(a).localeCompare(getItemName(b));
  });
}
