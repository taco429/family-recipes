import { Recipe } from '../types';

export const sistersBananaBread: Recipe = {
  id: 'sisters-banana-bread',
  title: 'Moist Banana Bread',
  description:
    "The most incredibly moist banana bread that uses up those overripe bananas perfectly. Sister's secret ingredient makes all the difference!",
  cookTime: '60 min',
  prepTime: '10 min',
  servings: 12,
  difficulty: 'Easy',
  style: 'American',
  category: 'Baked Goods',
  ingredients: [
    { quantity: 3, item: 'very ripe bananas', preparation: 'mashed' },
    { quantity: '1/3', unit: 'cup', item: 'butter', preparation: 'melted' },
    { quantity: 0.75, unit: 'cup', item: 'sugar' },
    { quantity: 1, item: 'egg', preparation: 'beaten' },
    { quantity: 1, unit: 'tsp', item: 'vanilla extract' },
    { quantity: 1, unit: 'tsp', item: 'baking soda' },
    { quantity: 'pinch', item: 'salt' },
    { quantity: 1.5, unit: 'cups', item: 'all-purpose flour' },
    { quantity: 0.5, unit: 'cup', item: 'sour cream', notes: 'the secret ingredient!' },
    { quantity: 0.5, unit: 'cup', item: 'chocolate chips or chopped walnuts', notes: 'optional' },
  ],
  instructions: [
    'Preheat oven to 350°F. Grease a 9x5 inch loaf pan.',
    'In a large mixing bowl, mash the ripe bananas with a fork until smooth.',
    'Mix in melted butter, then stir in sugar, egg, and vanilla.',
    'Sprinkle baking soda and salt over the mixture and stir.',
    "Add flour and sour cream alternately, mixing just until combined. Don't overmix.",
    'Fold in chocolate chips or walnuts if using.',
    'Pour batter into prepared loaf pan and smooth the top.',
    'Bake for 55-65 minutes, or until a toothpick inserted in center comes out clean.',
    'Cool in pan for 10 minutes, then turn out onto wire rack to cool completely.',
    'Slice and serve. Store wrapped in plastic wrap for up to 1 week.',
  ],
};
