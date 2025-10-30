import { Recipe } from '../types';

export const nanasLasagna: Recipe = {
  id: 'nanas-lasagna',
  title: 'Classic Meat Lasagna',
  description:
    'A rich, meaty lasagna with layers of cheese and homemade sauce. Perfect for feeding a crowd.',
  cookTime: '45 min',
  prepTime: '30 min',
  servings: 8,
  difficulty: 'Medium',
  style: 'Italian',
  category: 'Main Course',
  ingredients: [
    { quantity: 1, unit: 'lb', item: 'ground beef' },
    { quantity: 1, unit: 'lb', item: 'Italian sausage' },
    { quantity: 1, item: 'onion', preparation: 'diced' },
    { quantity: 4, unit: 'cloves', item: 'garlic', preparation: 'minced' },
    { quantity: 2, unit: 'cans', item: 'crushed tomatoes' },
    { quantity: 2, unit: 'cans', item: 'tomato paste' },
    { quantity: 2, unit: 'tbsp', item: 'sugar' },
    { quantity: 'to taste', item: 'fresh basil and oregano' },
    { quantity: 16, unit: 'oz', item: 'ricotta cheese' },
    { quantity: 2, item: 'eggs' },
    { quantity: 1, unit: 'lb', item: 'mozzarella', preparation: 'shredded' },
    { quantity: 1, unit: 'cup', item: 'parmesan', preparation: 'grated' },
    { quantity: 12, item: 'lasagna noodles' },
  ],
  instructions: [
    'Brown meat with onion and garlic. Add tomatoes, paste, sugar, and herbs. Simmer 30 minutes.',
    'Cook lasagna noodles according to package directions.',
    'Mix ricotta with eggs and half the mozzarella.',
    'Layer: sauce, noodles, ricotta mixture, meat sauce, repeat.',
    'Top with remaining mozzarella and parmesan.',
    'Cover with foil and bake at 375°F for 25 minutes. Uncover and bake 25 more minutes.',
    'Let rest 15 minutes before serving.',
  ],
};
