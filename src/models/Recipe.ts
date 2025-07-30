import { Ingredient } from './Ingredient';

export interface RecipeData {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  prepTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  style: string;
  category: string;
  ingredients: string[];
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
  category!: string;
  ingredients!: string[];
  instructions!: string[];
  imageUrl?: string;

  constructor(data: RecipeData) {
    Object.assign(this, data);
  }

  static fromJSON(data: RecipeData | any): Recipe {
    return new Recipe(data as RecipeData);
  }

  /**
   * Convenience helper to return ingredient names without quantities/measurements.
   * This is naive and can be improved, but is useful for building an ingredient directory.
   */
  getIngredientNames(): string[] {
    return this.ingredients.map((line) => {
      // Remove leading quantity/fractions and measurement words (very naïve)
      return line.replace(/^[0-9]+\/?[0-9]*\s*(cups?|tbsp|tablespoons?|tsp|teaspoons?|lbs?|pounds?|oz|ounces?|grams?|ml|liters?|cloves?|slices?|pieces?)?\s*/i, '').trim();
    });
  }
}