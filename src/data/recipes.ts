export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  prepTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl?: string;
  ingredients: string[];
  instructions: string[];
  category: string;
}

export const recipes: Recipe[] = [
  {
    id: 'grandmas-apple-pie',
    title: "Grandma's Apple Pie",
    description: "A classic apple pie recipe passed down through generations, featuring a flaky crust and perfectly spiced apple filling.",
    cookTime: "60 min",
    prepTime: "30 min",
    servings: 8,
    difficulty: "Medium",
    category: "Dessert",
    ingredients: [
      "2 1/2 cups all-purpose flour",
      "1 tsp salt",
      "1 tbsp sugar",
      "1 cup cold butter, cubed",
      "1/4 to 1/2 cup ice water",
      "8 cups sliced apples",
      "1/2 cup sugar",
      "1/4 cup brown sugar",
      "2 tbsp flour",
      "1 tsp cinnamon",
      "1/4 tsp nutmeg"
    ],
    instructions: [
      "Make the crust: Mix flour, salt, and sugar. Cut in butter until mixture resembles coarse crumbs.",
      "Add ice water gradually until dough comes together. Divide in half, wrap, and chill for 1 hour.",
      "Prepare filling: Mix apples with sugars, flour, and spices.",
      "Roll out bottom crust and place in pie pan. Add filling.",
      "Roll out top crust and place over filling. Seal edges and cut vents.",
      "Bake at 425°F for 15 minutes, then reduce to 350°F and bake 35-45 minutes until golden."
    ]
  },
  {
    id: 'uncles-bbq-ribs',
    title: "Uncle's BBQ Ribs",
    description: "Tender, fall-off-the-bone ribs with a secret family BBQ sauce that's been perfected over decades.",
    cookTime: "3 hours",
    prepTime: "20 min",
    servings: 4,
    difficulty: "Hard",
    category: "Main Course",
    ingredients: [
      "2 racks baby back ribs",
      "1/4 cup brown sugar",
      "2 tbsp paprika",
      "1 tbsp black pepper",
      "1 tbsp salt",
      "1 tbsp chili powder",
      "1 tbsp garlic powder",
      "1 tsp cayenne pepper",
      "2 cups BBQ sauce"
    ],
    instructions: [
      "Remove membrane from ribs and pat dry.",
      "Mix all dry ingredients to make the rub. Apply generously to both sides of ribs.",
      "Wrap ribs in foil and refrigerate for at least 2 hours or overnight.",
      "Preheat oven to 275°F. Place wrapped ribs on baking sheet.",
      "Bake for 2.5 hours. Remove foil and brush with BBQ sauce.",
      "Increase heat to 350°F and bake uncovered for 30 minutes, basting with sauce every 10 minutes."
    ]
  },
  {
    id: 'moms-chicken-soup',
    title: "Mom's Chicken Soup",
    description: "The ultimate comfort food - a hearty chicken soup with vegetables that cures everything from colds to bad days.",
    cookTime: "30 min",
    prepTime: "15 min",
    servings: 6,
    difficulty: "Easy",
    category: "Soup",
    ingredients: [
      "1 whole chicken (3-4 lbs)",
      "12 cups water",
      "2 onions, quartered",
      "4 carrots, chopped",
      "4 celery stalks, chopped",
      "2 bay leaves",
      "1 tbsp salt",
      "1 tsp pepper",
      "1/4 cup fresh parsley",
      "2 cups egg noodles"
    ],
    instructions: [
      "Place chicken in large pot with water, 1 onion, 2 carrots, 2 celery stalks, bay leaves, salt, and pepper.",
      "Bring to boil, then simmer for 1.5 hours until chicken is cooked through.",
      "Remove chicken and strain broth. Let chicken cool and shred meat.",
      "Return broth to pot. Add remaining vegetables and simmer 15 minutes.",
      "Add noodles and cook 10 minutes. Return shredded chicken to pot.",
      "Season to taste and garnish with parsley before serving."
    ]
  },
  {
    id: 'dads-pancakes',
    title: "Dad's Famous Pancakes",
    description: "Fluffy buttermilk pancakes that are a weekend tradition. The secret is in the technique!",
    cookTime: "20 min",
    prepTime: "10 min",
    servings: 4,
    difficulty: "Easy",
    category: "Breakfast",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "2 cups buttermilk",
      "2 eggs",
      "1/4 cup melted butter",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Mix dry ingredients in a large bowl.",
      "Whisk wet ingredients in separate bowl.",
      "Make a well in dry ingredients and pour in wet ingredients.",
      "Stir just until combined - lumps are okay!",
      "Heat griddle to 375°F. Pour 1/4 cup batter per pancake.",
      "Cook until bubbles form and pop, then flip. Cook until golden brown."
    ]
  },
  {
    id: 'nanas-lasagna',
    title: "Nana's Lasagna",
    description: "A rich, meaty lasagna with layers of cheese and homemade sauce. Perfect for feeding a crowd.",
    cookTime: "45 min",
    prepTime: "30 min",
    servings: 8,
    difficulty: "Medium",
    category: "Main Course",
    ingredients: [
      "1 lb ground beef",
      "1 lb Italian sausage",
      "1 onion, diced",
      "4 cloves garlic, minced",
      "2 cans crushed tomatoes",
      "2 cans tomato paste",
      "2 tbsp sugar",
      "Fresh basil and oregano",
      "16 oz ricotta cheese",
      "2 eggs",
      "1 lb mozzarella, shredded",
      "1 cup parmesan, grated",
      "12 lasagna noodles"
    ],
    instructions: [
      "Brown meat with onion and garlic. Add tomatoes, paste, sugar, and herbs. Simmer 30 minutes.",
      "Cook lasagna noodles according to package directions.",
      "Mix ricotta with eggs and half the mozzarella.",
      "Layer: sauce, noodles, ricotta mixture, meat sauce, repeat.",
      "Top with remaining mozzarella and parmesan.",
      "Cover with foil and bake at 375°F for 25 minutes. Uncover and bake 25 more minutes.",
      "Let rest 15 minutes before serving."
    ]
  },
  {
    id: 'grandpas-chili',
    title: "Grandpa's Award-Winning Chili",
    description: "This hearty chili recipe has won multiple cook-offs. The secret blend of spices makes all the difference.",
    cookTime: "2 hours",
    prepTime: "20 min",
    servings: 8,
    difficulty: "Medium",
    category: "Main Course",
    ingredients: [
      "2 lbs ground beef",
      "1 lb ground pork",
      "2 onions, diced",
      "4 cloves garlic, minced",
      "3 cans kidney beans",
      "2 cans crushed tomatoes",
      "1 can tomato paste",
      "3 tbsp chili powder",
      "2 tbsp cumin",
      "1 tbsp oregano",
      "2 tsp cayenne pepper",
      "1 bottle dark beer",
      "2 squares dark chocolate"
    ],
    instructions: [
      "Brown meat in large pot. Remove and set aside.",
      "Sauté onions and garlic in same pot until soft.",
      "Add all spices and cook 1 minute until fragrant.",
      "Return meat to pot with tomatoes, paste, and beer.",
      "Simmer on low for 1.5 hours, stirring occasionally.",
      "Add beans and chocolate. Simmer 30 more minutes.",
      "Adjust seasoning and serve with desired toppings."
    ]
  }
]; 