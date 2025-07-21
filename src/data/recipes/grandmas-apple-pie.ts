import { Recipe } from '../types';

export const grandmasApplePie: Recipe = {
  id: 'grandmas-apple-pie',
  title: "Grandma's Apple Pie",
  description:
    'A classic apple pie recipe passed down through generations, featuring a flaky crust and perfectly spiced apple filling.',
  cookTime: '60 min',
  prepTime: '30 min',
  servings: 8,
  difficulty: 'Medium',
  category: 'Dessert',
  ingredients: [
    '2 1/2 cups all-purpose flour',
    '1 tsp salt',
    '1 tbsp sugar',
    '1 cup cold butter, cubed',
    '1/4 to 1/2 cup ice water',
    '8 cups sliced apples',
    '1/2 cup sugar',
    '1/4 cup brown sugar',
    '2 tbsp flour',
    '1 tsp cinnamon',
    '1/4 tsp nutmeg',
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
