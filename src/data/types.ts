export interface RecipeIngredient {
  name: string;
  quantity?: number;
  unit?: string;
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
  category: string;
}
