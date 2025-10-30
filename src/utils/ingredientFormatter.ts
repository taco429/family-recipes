import { Ingredient } from '../data/types';
import { normalizeUnit, getDisplayUnit } from './unitNormalizer';

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

  // Common fractions to check
  const fractions: Array<[number, string]> = [
    [0.25, '1/4'],
    [0.333, '1/3'],
    [0.5, '1/2'],
    [0.667, '2/3'],
    [0.75, '3/4'],
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
 * Aggregates ingredients from multiple recipes and formats them for shopping
 * Consolidates quantities by item and unit, showing totals for the weekly menu
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

  ingredientMap.forEach((ingredients, itemKey) => {
    // Use the original casing from the first occurrence
    const displayName = ingredients[0].item;

    if (ingredients.length === 1) {
      // Single occurrence - show as-is
      shoppingList.push(formatIngredientForShopping(ingredients[0]));
    } else {
      // Multiple occurrences - consolidate by unit
      const byUnit = new Map<string, number[]>();
      const stringQuantities: string[] = [];
      const noUnit: number[] = [];

      ingredients.forEach((ing) => {
        if (typeof ing.quantity === 'number') {
          if (ing.unit) {
            // Normalize unit for matching (handles singular/plural)
            const unitKey = normalizeUnit(ing.unit);
            if (!byUnit.has(unitKey)) {
              byUnit.set(unitKey, []);
            }
            byUnit.get(unitKey)!.push(ing.quantity);
          } else {
            // No unit (like eggs, apples)
            noUnit.push(ing.quantity);
          }
        } else {
          // String quantities like "to taste", "pinch"
          stringQuantities.push(ing.quantity);
        }
      });

      // Format consolidated quantities with units
      byUnit.forEach((quantities, unitKey) => {
        const total = quantities.reduce((sum, q) => sum + q, 0);
        const formattedTotal = formatQuantity(total);
        // Get proper display form (handles singular/plural automatically)
        const displayUnit = getDisplayUnit(unitKey, total);
        shoppingList.push(`${formattedTotal} ${displayUnit} ${displayName}`);
      });

      // Format items without units
      if (noUnit.length > 0) {
        const total = noUnit.reduce((sum, q) => sum + q, 0);
        const formattedTotal = formatQuantity(total);
        shoppingList.push(`${formattedTotal} ${displayName}`);
      }

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
