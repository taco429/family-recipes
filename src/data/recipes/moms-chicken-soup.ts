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
    { quantity: 1, item: 'whole chicken', notes: '3-4 lbs' },
    { quantity: 12, unit: 'cups', item: 'water' },
    { quantity: 2, item: 'onions', preparation: 'quartered' },
    { quantity: 4, item: 'carrots', preparation: 'chopped' },
    { quantity: 4, item: 'celery stalks', preparation: 'chopped' },
    { quantity: 2, item: 'bay leaves' },
    { quantity: 1, unit: 'tbsp', item: 'salt' },
    { quantity: 1, unit: 'tsp', item: 'pepper' },
    { quantity: 0.25, unit: 'cup', item: 'fresh parsley' },
    { quantity: 2, unit: 'cups', item: 'egg noodles' },
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
