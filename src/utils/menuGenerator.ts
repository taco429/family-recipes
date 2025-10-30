import { Recipe } from '../data/types';

export interface MenuGenerationOptions {
  excludedDays: string[];
  excludedMeals: string[];
  excludedSlots: Set<string>; // Format: "day-meal"
}

export interface DayMenu {
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
}

/**
 * Generates a random weekly menu based on the provided options
 * @param recipes - Array of available recipes
 * @param days - Array of day names
 * @param meals - Array of meal types
 * @param options - Options for excluding days, meals, or specific slots
 * @param existingMenu - Existing menu to preserve (only overwrite unoccupied slots)
 * @returns Generated menu
 */
export function generateRandomMenu(
  recipes: Recipe[],
  days: string[],
  meals: readonly string[],
  options: MenuGenerationOptions,
  existingMenu: Record<string, DayMenu> = {}
): Record<string, DayMenu> {
  const newMenu: Record<string, DayMenu> = { ...existingMenu };

  // Create a copy of recipes array to avoid modifying the original
  const availableRecipes = [...recipes];

  // Shuffle the recipes array for random selection
  const shuffledRecipes = shuffleArray(availableRecipes);
  let recipeIndex = 0;

  days.forEach((day) => {
    // Skip excluded days
    if (options.excludedDays.includes(day)) {
      return;
    }

    // Initialize day menu if it doesn't exist
    if (!newMenu[day]) {
      newMenu[day] = {};
    }

    meals.forEach((meal) => {
      const slotKey = `${day}-${meal}`;

      // Skip if meal is excluded globally or this specific slot is excluded
      if (options.excludedMeals.includes(meal) || options.excludedSlots.has(slotKey)) {
        return;
      }

      // Skip if slot is already occupied
      if (newMenu[day][meal as keyof DayMenu]) {
        return;
      }

      // Assign a random recipe
      if (recipeIndex < shuffledRecipes.length) {
        newMenu[day][meal as keyof DayMenu] = shuffledRecipes[recipeIndex];
        recipeIndex++;

        // If we run out of recipes, reshuffle and start over
        if (recipeIndex >= shuffledRecipes.length) {
          shuffleArray(shuffledRecipes);
          recipeIndex = 0;
        }
      }
    });
  });

  return newMenu;
}

/**
 * Fisher-Yates shuffle algorithm
 * @param array - Array to shuffle (modifies in place)
 * @returns The shuffled array
 */
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
