export interface RecipeIngredient {
  name: string;
  quantity?: number;
  unit?: string;
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
  ingredients: RecipeIngredient[];
  instructions: string[];
  category: RecipeCategory;
}
