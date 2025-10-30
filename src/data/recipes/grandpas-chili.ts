import { Recipe } from '../types';

export const grandpasChili: Recipe = {
  id: 'grandpas-chili',
  title: 'Award-Winning Chili',
  description:
    'This hearty chili recipe has won multiple cook-offs. The secret blend of spices makes all the difference.',
  cookTime: '2 hours',
  prepTime: '20 min',
  servings: 8,
  difficulty: 'Medium',
  style: 'American',
  category: 'Main Course',
  ingredients: [
    { quantity: 2, unit: 'lbs', item: 'ground beef' },
    { quantity: 1, unit: 'lb', item: 'ground pork' },
    { quantity: 2, item: 'onions', preparation: 'diced' },
    { quantity: 4, unit: 'cloves', item: 'garlic', preparation: 'minced' },
    { quantity: 3, unit: 'cans', item: 'kidney beans' },
    { quantity: 2, unit: 'cans', item: 'crushed tomatoes' },
    { quantity: 1, unit: 'can', item: 'tomato paste' },
    { quantity: 3, unit: 'tbsp', item: 'chili powder' },
    { quantity: 2, unit: 'tbsp', item: 'cumin' },
    { quantity: 1, unit: 'tbsp', item: 'oregano' },
    { quantity: 2, unit: 'tsp', item: 'cayenne pepper' },
    { quantity: 1, unit: 'bottle', item: 'dark beer' },
    { quantity: 2, unit: 'squares', item: 'dark chocolate' },
  ],
  instructions: [
    'Brown meat in large pot. Remove and set aside.',
    'Sauté onions and garlic in same pot until soft.',
    'Add all spices and cook 1 minute until fragrant.',
    'Return meat to pot with tomatoes, paste, and beer.',
    'Simmer on low for 1.5 hours, stirring occasionally.',
    'Add beans and chocolate. Simmer 30 more minutes.',
    'Adjust seasoning and serve with desired toppings.',
  ],
};
