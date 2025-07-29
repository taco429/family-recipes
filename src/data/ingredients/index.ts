import ingredientsJson from './ingredients.json';
import { Ingredient } from '../../models/Ingredient';

export const ingredients: Ingredient[] = (ingredientsJson as any).map((d: any) => Ingredient.fromJSON(d));

export const ingredientMap: Map<string, Ingredient> = new Map(
  ingredients.map((i) => [i.id, i])
);