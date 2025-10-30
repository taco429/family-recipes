import { Recipe } from '../types';

export const auntiesChocolateChipCookies: Recipe = {
  id: 'aunties-chocolate-chip-cookies',
  title: 'Perfect Chocolate Chip Cookies',
  description:
    'Soft, chewy chocolate chip cookies with crispy edges - the perfect balance of textures that made Auntie famous at every bake sale.',
  cookTime: '12 min',
  prepTime: '15 min',
  servings: 36,
  difficulty: 'Easy',
  style: 'American',
  category: 'Dessert',
  ingredients: [
    { quantity: 2.25, unit: 'cups', item: 'all-purpose flour' },
    { quantity: 1, unit: 'tsp', item: 'baking soda' },
    { quantity: 1, unit: 'tsp', item: 'salt' },
    { quantity: 1, unit: 'cup', item: 'butter', notes: 'softened' },
    { quantity: 0.75, unit: 'cup', item: 'granulated sugar' },
    { quantity: 0.75, unit: 'cup', item: 'brown sugar', notes: 'packed' },
    { quantity: 2, item: 'large eggs' },
    { quantity: 2, unit: 'tsp', item: 'vanilla extract' },
    { quantity: 2, unit: 'cups', item: 'chocolate chips' },
    { quantity: 1, unit: 'cup', item: 'walnuts', preparation: 'chopped', notes: 'optional' },
  ],
  instructions: [
    'Preheat oven to 375°F. Line baking sheets with parchment paper.',
    'In a medium bowl, whisk together flour, baking soda, and salt.',
    'In a large bowl, cream butter and both sugars until light and fluffy, about 3 minutes.',
    'Beat in eggs one at a time, then vanilla extract.',
    'Gradually mix in flour mixture until just combined.',
    'Stir in chocolate chips and walnuts if using.',
    'Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.',
    'Bake for 9-12 minutes until edges are golden but centers look slightly underbaked.',
    'Cool on baking sheet for 5 minutes before transferring to wire rack.',
  ],
};
