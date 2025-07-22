import { Recipe } from '../types';

export const grandpasChili: Recipe = {
  id: 'grandpas-chili',
  title: "Award-Winning Chili",
  description:
    'This hearty chili recipe has won multiple cook-offs. The secret blend of spices makes all the difference.',
  cookTime: '2 hours',
  prepTime: '20 min',
  servings: 8,
  difficulty: 'Medium',
  category: 'Main Course',
  ingredients: [
    '2 lbs ground beef',
    '1 lb ground pork',
    '2 onions, diced',
    '4 cloves garlic, minced',
    '3 cans kidney beans',
    '2 cans crushed tomatoes',
    '1 can tomato paste',
    '3 tbsp chili powder',
    '2 tbsp cumin',
    '1 tbsp oregano',
    '2 tsp cayenne pepper',
    '1 bottle dark beer',
    '2 squares dark chocolate',
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
