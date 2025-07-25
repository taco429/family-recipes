import { Recipe } from '../types';

export const unclesBbqRibs: Recipe = {
  id: 'uncles-bbq-ribs',
  title: 'Smoky BBQ Ribs',
  description:
    "Tender, fall-off-the-bone ribs with a secret family BBQ sauce that's been perfected over decades.",
  cookTime: '3 hours',
  prepTime: '20 min',
  servings: 4,
  difficulty: 'Hard',
  style: 'American',
  category: 'Main Course',
  ingredients: [
    '2 racks baby back ribs',
    '1/4 cup brown sugar',
    '2 tbsp paprika',
    '1 tbsp black pepper',
    '1 tbsp salt',
    '1 tbsp chili powder',
    '1 tbsp garlic powder',
    '1 tsp cayenne pepper',
    '2 cups BBQ sauce',
  ],
  instructions: [
    'Remove membrane from ribs and pat dry.',
    'Mix all dry ingredients to make the rub. Apply generously to both sides of ribs.',
    'Wrap ribs in foil and refrigerate for at least 2 hours or overnight.',
    'Preheat oven to 275°F. Place wrapped ribs on baking sheet.',
    'Bake for 2.5 hours. Remove foil and brush with BBQ sauce.',
    'Increase heat to 350°F and bake uncovered for 30 minutes, basting with sauce every 10 minutes.',
  ],
};
