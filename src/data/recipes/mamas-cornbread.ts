import { Recipe } from '../types';

export const mamasCornbread: Recipe = {
  id: 'mamas-cornbread',
  title: 'Southern Cornbread',
  description:
    'Golden, slightly sweet cornbread with crispy edges from baking in a cast-iron skillet. Perfect with chili, soup, or just butter and honey.',
  cookTime: '25 min',
  prepTime: '10 min',
  servings: 8,
  difficulty: 'Easy',
  style: 'Southern',
  category: 'Baked Goods',
  ingredients: [
    { quantity: 1, unit: 'cup', item: 'yellow cornmeal' },
    { quantity: 1, unit: 'cup', item: 'all-purpose flour' },
    { quantity: 0.25, unit: 'cup', item: 'sugar' },
    { quantity: 1, unit: 'tbsp', item: 'baking powder' },
    { quantity: 1, unit: 'tsp', item: 'salt' },
    { quantity: 1, unit: 'cup', item: 'buttermilk' },
    { quantity: 2, item: 'large eggs' },
    { quantity: '1/3', unit: 'cup', item: 'butter', preparation: 'melted' },
    { quantity: 2, unit: 'tbsp', item: 'vegetable oil' },
    { quantity: 'for serving', item: 'butter and honey' },
  ],
  instructions: [
    'Preheat oven to 425°F. Place a 10-inch cast-iron skillet in the oven to heat.',
    'In a large bowl, whisk together cornmeal, flour, sugar, baking powder, and salt.',
    'In another bowl, combine buttermilk, eggs, and melted butter.',
    "Pour wet ingredients into dry ingredients and stir just until combined. Don't overmix.",
    'Carefully remove hot skillet from oven and add vegetable oil, swirling to coat.',
    'Pour batter into the hot skillet - it should sizzle when it hits the oil.',
    'Bake for 20-25 minutes until golden brown and a toothpick comes out clean.',
    'Let cool in skillet for 5 minutes before cutting into wedges.',
    'Serve warm with butter and honey.',
    'Mama always said the secret is the hot skillet - it gives the best crust!',
  ],
};
