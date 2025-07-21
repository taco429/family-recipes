import { Recipe } from '../types';

export const nanasLasagna: Recipe = {
  id: 'nanas-lasagna',
  title: "Nana's Lasagna",
  description:
    'A rich, meaty lasagna with layers of cheese and homemade sauce. Perfect for feeding a crowd.',
  cookTime: '45 min',
  prepTime: '30 min',
  servings: 8,
  difficulty: 'Medium',
  category: 'Main Course',
  ingredients: [
    '1 lb ground beef',
    '1 lb Italian sausage',
    '1 onion, diced',
    '4 cloves garlic, minced',
    '2 cans crushed tomatoes',
    '2 cans tomato paste',
    '2 tbsp sugar',
    'Fresh basil and oregano',
    '16 oz ricotta cheese',
    '2 eggs',
    '1 lb mozzarella, shredded',
    '1 cup parmesan, grated',
    '12 lasagna noodles',
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
