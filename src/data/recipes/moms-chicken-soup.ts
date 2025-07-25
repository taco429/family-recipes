import { Recipe } from '../types';

export const momsChickenSoup: Recipe = {
  id: 'moms-chicken-soup',
  title: 'Hearty Chicken Soup',
  description:
    'The ultimate comfort food - a hearty chicken soup with vegetables that cures everything from colds to bad days.',
  cookTime: '30 min',
  prepTime: '15 min',
  servings: 6,
  difficulty: 'Easy',
  style: 'American',
  category: 'Soup',
  ingredients: [
    '1 whole chicken (3-4 lbs)',
    '12 cups water',
    '2 onions, quartered',
    '4 carrots, chopped',
    '4 celery stalks, chopped',
    '2 bay leaves',
    '1 tbsp salt',
    '1 tsp pepper',
    '1/4 cup fresh parsley',
    '2 cups egg noodles',
  ],
  instructions: [
    'Place chicken in large pot with water, 1 onion, 2 carrots, 2 celery stalks, bay leaves, salt, and pepper.',
    'Bring to boil, then simmer for 1.5 hours until chicken is cooked through.',
    'Remove chicken and strain broth. Let chicken cool and shred meat.',
    'Return broth to pot. Add remaining vegetables and simmer 15 minutes.',
    'Add noodles and cook 10 minutes. Return shredded chicken to pot.',
    'Season to taste and garnish with parsley before serving.',
  ],
};
