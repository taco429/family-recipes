export interface Ingredient {
  quantity: number | string; // Can be number (1, 2, 0.5) or string ("1/2", "to taste")
  unit?: string; // cup, tbsp, tsp, oz, lb, etc. (optional for items like "eggs")
  item: string; // The actual ingredient name (onion, garlic, chicken, etc.)
  preparation?: string; // chopped, diced, minced, sliced, etc.
  notes?: string; // Additional notes (optional, e.g., "room temperature", "divided")
}

export enum RecipeCategory {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Dessert = 'dessert',
  Side = 'side',
  Condiment = 'condiment',
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  prepTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  style: string;
  imageUrl?: string;
  ingredients: Ingredient[];
  instructions: string[];
  category: RecipeCategory | string; // Allow both enum and string for flexibility
}
