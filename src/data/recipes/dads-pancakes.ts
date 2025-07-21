import { Recipe } from '../types';

export const dadsPancakes: Recipe = {
  id: 'dads-pancakes',
  title: "Dad's Famous Pancakes",
  description:
    'Fluffy buttermilk pancakes that are a weekend tradition. The secret is in the technique!',
  cookTime: '20 min',
  prepTime: '10 min',
  servings: 4,
  difficulty: 'Easy',
  category: 'Breakfast',
  ingredients: [
    '2 cups all-purpose flour',
    '2 tbsp sugar',
    '2 tsp baking powder',
    '1 tsp baking soda',
    '1/2 tsp salt',
    '2 cups buttermilk',
    '2 eggs',
    '1/4 cup melted butter',
    '1 tsp vanilla extract',
  ],
  instructions: [
    'Mix dry ingredients in a large bowl.',
    'Whisk wet ingredients in separate bowl.',
    'Make a well in dry ingredients and pour in wet ingredients.',
    'Stir just until combined - lumps are okay!',
    'Heat griddle to 375°F. Pour 1/4 cup batter per pancake.',
    'Cook until bubbles form and pop, then flip. Cook until golden brown.',
  ],
};
