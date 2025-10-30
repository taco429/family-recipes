# Shopping List Consolidation Examples

This document shows how the shopping list feature consolidates ingredients from multiple recipes in your weekly menu.

## How It Works

When you add multiple recipes to your weekly menu and generate a shopping list, the system:
1. Groups all ingredients by their item name (case-insensitive)
2. Adds up quantities that have the same unit
3. Displays nice fractions instead of decimals
4. Shows totals for each unique ingredient

## Example 1: Simple Consolidation

### Recipes in Menu:
- **Mom's Chicken Soup** needs: `2 onions, quartered`
- **Grandpa's Chili** needs: `2 onions, diced`
- **Nana's Lasagna** needs: `1 onion, diced`

### Shopping List Shows:
```
5 onions
```

**Note:** The preparation methods (quartered, diced) are excluded from the shopping list since you'll prepare them at home. The system just tells you to buy 5 onions total.

---

## Example 2: Same Item, Same Unit

### Recipes in Menu:
- **Grandma's Apple Pie** needs: `2.5 cups all-purpose flour`
- **Auntie's Cookies** needs: `2.25 cups all-purpose flour`
- **Cousin's Beef Stew** needs: `0.25 cups all-purpose flour`

### Shopping List Shows:
```
5 cups all-purpose flour
```

**Calculation:** 2.5 + 2.25 + 0.25 = 5 cups

---

## Example 3: Same Item, Different Units

### Recipes in Menu:
- **Dad's Pancakes** needs: `1/4 cup melted butter`
- **Sister's Banana Bread** needs: `1/3 cup melted butter`
- **Uncle's BBQ Ribs** needs: `3 tbsp butter (for basting)`

### Shopping List Shows:
```
1/4 cup butter
1/3 cup butter
3 tbsp butter
```

**Note:** Since the units are different (cups vs tbsp), they're shown separately. You can manually convert if needed, or just buy what's listed.

---

## Example 4: Multiple Items

### Recipes in Menu:
- **Mom's Chicken Soup** needs: `4 carrots, chopped`
- **Cousin's Beef Stew** needs: `4 large carrots, cut into chunks`

### Shopping List Shows:
```
8 carrots
```

**Note:** Even though one says "large carrots", the system consolidates by the base item name. The size descriptor is ignored for consolidation purposes.

---

## Example 5: Eggs (No Unit)

### Recipes in Menu:
- **Dad's Pancakes** needs: `2 eggs`
- **Auntie's Cookies** needs: `2 large eggs`
- **Sister's Banana Bread** needs: `1 egg, beaten`

### Shopping List Shows:
```
5 eggs
```

**Calculation:** 2 + 2 + 1 = 5 eggs

---

## Example 6: String Quantities

### Recipes in Menu:
- **Nana's Lasagna** needs: `to taste fresh basil and oregano`
- **Grandpa's Chili** needs: `1 tbsp oregano`
- **Mom's Chicken Soup** needs: `1/4 cup fresh parsley`

### Shopping List Shows:
```
to taste fresh basil and oregano
1 tbsp oregano
1/4 cup fresh parsley
```

**Note:** "To taste" quantities can't be added numerically, so they're shown as-is.

---

## Example 7: Nice Fraction Display

### Recipes in Menu:
- **Recipe A** needs: `0.5 cups sugar`
- **Recipe B** needs: `0.25 cups sugar`
- **Recipe C** needs: `1.25 cups sugar`

### Shopping List Shows:
```
2 cups sugar
```

**Calculation:** 0.5 + 0.25 + 1.25 = 2 cups (displayed as whole number)

### Alternative Example:
- **Recipe A** needs: `0.5 cups sugar`
- **Recipe B** needs: `0.75 cups sugar`

### Shows:
```
1 1/4 cups sugar
```

**Calculation:** 0.5 + 0.75 = 1.25 = 1 1/4 cups (displayed as mixed fraction)

---

## Example 8: Real Weekly Menu

Let's say you plan this week:
- **Monday Dinner:** Nana's Lasagna
- **Tuesday Dinner:** Grandpa's Chili  
- **Wednesday Breakfast:** Dad's Pancakes
- **Thursday Dinner:** Mom's Chicken Soup

### Consolidated Shopping List Might Include:
```
3 onions
8 cloves garlic
5 lbs ground meat (ground beef + Italian sausage + ground pork)
5 cans tomatoes (crushed + paste)
5 cups all-purpose flour
6 eggs
2 cups buttermilk
16 oz ricotta cheese
1 lb mozzarella
1 cup parmesan
12 lasagna noodles
3 cans kidney beans
1 bottle dark beer
... and more
```

---

## Tips for Best Results

1. **Use consistent naming**: "garlic cloves" vs "cloves garlic" - try to use the same format
2. **Separate by unit**: If you use different units (tsp vs tbsp vs cups), they won't consolidate automatically
3. **Check the total**: The shopping list shows the total count at the bottom
4. **Use the checkbox**: Check off items as you shop to track progress
5. **Copy to clipboard**: Use the copy button to paste the list into your notes app

---

## Future Enhancements

Possible improvements we could add:
- Unit conversion (automatically convert tbsp to cups when appropriate)
- Category grouping (dairy, produce, meat, pantry)
- Store aisle organization
- Price estimation
- Nutrition totals for the week

