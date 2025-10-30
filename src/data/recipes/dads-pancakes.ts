import { Recipe } from '../types';

export const dadsPancakes: Recipe = {
  id: 'dads-pancakes',
  title: 'Fluffy Buttermilk Pancakes',
  description:
    'Fluffy buttermilk pancakes that are a weekend tradition. The secret is in the technique!',
  cookTime: '20 min',
  prepTime: '10 min',
  servings: 4,
  difficulty: 'Easy',
  style: 'American',
  category: 'Breakfast',
  ingredients: [
    { quantity: 2, unit: 'cups', item: 'all-purpose flour' },
    { quantity: 2, unit: 'tbsp', item: 'sugar' },
    { quantity: 2, unit: 'tsp', item: 'baking powder' },
    { quantity: 1, unit: 'tsp', item: 'baking soda' },
    { quantity: 0.5, unit: 'tsp', item: 'salt' },
    { quantity: 2, unit: 'cups', item: 'buttermilk' },
    { quantity: 2, item: 'eggs' },
    { quantity: 0.25, unit: 'cup', item: 'butter', preparation: 'melted' },
    { quantity: 1, unit: 'tsp', item: 'vanilla extract' },
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
