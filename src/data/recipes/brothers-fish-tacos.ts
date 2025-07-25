import { Recipe } from '../types';

export const brothersFishTacos: Recipe = {
  id: 'brothers-fish-tacos',
  title: 'Crispy Fish Tacos',
  description:
    'Fresh and vibrant fish tacos with crispy beer-battered fish, tangy slaw, and a zesty lime crema that tastes like vacation.',
  cookTime: '20 min',
  prepTime: '25 min',
  servings: 4,
  difficulty: 'Medium',
  style: 'Mexican',
  category: 'Main Course',
  ingredients: [
    '1 lb white fish fillets (mahi-mahi or cod)',
    '1 cup all-purpose flour',
    '1 tsp baking powder',
    '1 tsp salt',
    '1/2 tsp cumin',
    '1/4 tsp cayenne pepper',
    '1 cup cold beer',
    'Vegetable oil for frying',
    '8 small corn tortillas',
    '2 cups shredded cabbage',
    '1/4 cup mayonnaise',
    '2 tbsp lime juice',
    '1/2 cup sour cream',
    '1 jalapeño, finely diced',
    '1/4 cup cilantro, chopped',
    '1 avocado, sliced',
    'Lime wedges for serving',
  ],
  instructions: [
    'Cut fish into 3-inch strips and pat dry. Season with salt and pepper.',
    'In a bowl, whisk together flour, baking powder, salt, cumin, and cayenne.',
    'Gradually whisk in cold beer until batter is smooth. Let rest 10 minutes.',
    'Make slaw: Mix cabbage with 2 tbsp mayonnaise and 1 tbsp lime juice. Season with salt.',
    'Make crema: Combine sour cream, remaining lime juice, jalapeño, and cilantro.',
    'Heat oil to 375°F in a large pot or deep fryer.',
    'Dip fish pieces in batter, letting excess drip off. Fry in batches for 3-4 minutes until golden.',
    'Drain on paper towels and season with salt immediately.',
    'Warm tortillas in a dry skillet or over an open flame.',
    'Assemble tacos: Place fish in tortillas, top with slaw, avocado, and crema.',
    'Serve immediately with lime wedges.',
  ],
};
