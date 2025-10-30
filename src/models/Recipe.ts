import { Ingredient, RecipeCategory } from '../data/types';

export interface RecipeData {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  prepTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  style: string;
  category: RecipeCategory;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl?: string;
}

export class Recipe implements RecipeData {
  id!: string;
  title!: string;
  description!: string;
  cookTime!: string;
  prepTime!: string;
  servings!: number;
  difficulty!: 'Easy' | 'Medium' | 'Hard';
  style!: string;
  category!: RecipeCategory;
  ingredients!: Ingredient[];
  instructions!: string[];
  imageUrl?: string;

  constructor(data: RecipeData) {
    Object.assign(this, data);
  }

  private static parseQuantity(value: string): number | undefined {
    const fractionMatch = value.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (fractionMatch) {
      const whole = parseInt(fractionMatch[1], 10);
      const num = parseInt(fractionMatch[2], 10);
      const den = parseInt(fractionMatch[3], 10);
      return whole + num / den;
    }
    const simpleFraction = value.match(/^(\d+)\/(\d+)$/);
    if (simpleFraction) {
      const num = parseInt(simpleFraction[1], 10);
      const den = parseInt(simpleFraction[2], 10);
      return num / den;
    }
    const decimal = Number(value);
    return isNaN(decimal) ? undefined : decimal;
  }

  private static parseIngredientLine(line: string): Ingredient {
    // Remove parenthetical notes like (optional) or weights
    let cleaned = line.replace(/\([^)]*\)/g, '');
    // Keep only the part before a comma to drop preparation like ", chopped"
    cleaned = cleaned.split(',')[0];

    const descriptorWords = [
      'large',
      'small',
      'fresh',
      'chopped',
      'minced',
      'diced',
      'peeled',
      'grated',
      'sliced',
      'softened',
      'quartered',
      'shredded',
      'optional',
    ];

    const unitWords = [
      'cup',
      'cups',
      'tbsp',
      'tablespoon',
      'tablespoons',
      'tsp',
      'teaspoon',
      'teaspoons',
      'lb',
      'lbs',
      'pound',
      'pounds',
      'oz',
      'ounce',
      'ounces',
      'g',
      'gram',
      'grams',
      'kg',
      'kilogram',
      'kilograms',
      'ml',
      'milliliter',
      'milliliters',
      'l',
      'liter',
      'liters',
      'clove',
      'cloves',
      'slice',
      'slices',
      'piece',
      'pieces',
      'stalk',
      'stalks',
      'can',
      'cans',
      'package',
      'packages',
      'pinch',
      'dash',
      'whole',
      'head',
      'heads',
    ];

    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    // Tokenize
    const tokens = cleaned.split(' ');
    let quantity: number | undefined;
    let unit: string | undefined;

    if (tokens.length) {
      const first = tokens[0];
      const second = tokens[1];

      // Try to parse quantity (supports x, x/y, x y/z, x.y)
      let potentialQuantity = first;
      if (second && /\d+\/\d+/.test(second) && /^(\d+)$/.test(first)) {
        // Handle mixed number like "1 1/2"
        potentialQuantity = `${first} ${second}`;
        tokens.splice(0, 2);
        const mixed = potentialQuantity.split(' ');
        quantity = Recipe.parseQuantity(`${mixed[0]} ${mixed[1]}`);
      } else {
        quantity = Recipe.parseQuantity(potentialQuantity);
        if (!isNaN(Number(quantity))) {
          tokens.splice(0, 1);
        } else {
          quantity = undefined;
        }
      }

      // Try to parse unit if present and recognized
      if (tokens.length && unitWords.includes(tokens[0].toLowerCase())) {
        unit = tokens[0];
        tokens.splice(0, 1);
      }
    }

    // Remove descriptor words anywhere in the remaining tokens
    const remaining = tokens.filter((t) => !descriptorWords.includes(t.toLowerCase()));

    const name = remaining.join(' ').trim();

    // Fallback: if no quantity provided but unit was parsed erroneously as descriptor, push back to name
    return {
      item: name || cleaned,
      quantity: quantity ?? 1, // Default to 1 if no quantity specified
      unit,
    };
  }

  static fromJSON(data: any): Recipe {
    const ingredients: Ingredient[] = (data.ingredients || []).map((line: string) =>
      Recipe.parseIngredientLine(line)
    );
    const recipeData: RecipeData = {
      id: data.id,
      title: data.title,
      description: data.description,
      cookTime: data.cookTime,
      prepTime: data.prepTime,
      servings: data.servings,
      difficulty: data.difficulty,
      style: data.style,
      category: (data.category as RecipeCategory) ?? RecipeCategory.Dinner,
      ingredients,
      instructions: data.instructions,
      imageUrl: data.imageUrl,
    };
    return new Recipe(recipeData);
  }

  /**
   * Convenience helper to return ingredient names without quantities/measurements.
   * This is naive and can be improved, but is useful for building an ingredient directory.
   */
  getIngredientNames(): string[] {
    return this.ingredients.map((ing) => ing.item);
  }
}
