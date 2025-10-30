import { Recipe } from '../types';

export const grandmasApplePie: Recipe = {
  id: 'grandmas-apple-pie',
  title: 'Classic Apple Pie',
  description:
    'A classic apple pie recipe passed down through generations, featuring a flaky crust and perfectly spiced apple filling.',
  cookTime: '60 min',
  prepTime: '30 min',
  servings: 8,
  difficulty: 'Medium',
  style: 'American',
  category: 'Dessert',
  ingredients: [
    { quantity: 2.5, unit: 'cups', item: 'all-purpose flour' },
    { quantity: 1, unit: 'tsp', item: 'salt' },
    { quantity: 1, unit: 'tbsp', item: 'sugar' },
    { quantity: 1, unit: 'cup', item: 'butter', preparation: 'cubed', notes: 'cold' },
    { quantity: '1/4 to 1/2', unit: 'cup', item: 'ice water' },
    { quantity: 8, unit: 'cups', item: 'apples', preparation: 'sliced' },
    { quantity: 0.5, unit: 'cup', item: 'sugar' },
    { quantity: 0.25, unit: 'cup', item: 'brown sugar' },
    { quantity: 2, unit: 'tbsp', item: 'flour' },
    { quantity: 1, unit: 'tsp', item: 'cinnamon' },
    { quantity: 0.25, unit: 'tsp', item: 'nutmeg' },
  ],
  instructions: [
    'Make the crust: Mix flour, salt, and sugar. Cut in butter until mixture resembles coarse crumbs.',
    'Add ice water gradually until dough comes together. Divide in half, wrap, and chill for 1 hour.',
    'Prepare filling: Mix apples with sugars, flour, and spices.',
    'Roll out bottom crust and place in pie pan. Add filling.',
    'Roll out top crust and place over filling. Seal edges and cut vents.',
    'Bake at 425°F for 15 minutes, then reduce to 350°F and bake 35-45 minutes until golden.',
  ],
};
