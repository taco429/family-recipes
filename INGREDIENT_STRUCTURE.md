# Structured Ingredient System

## Overview

The recipe app now uses a well-structured, scalable ingredient system that separates ingredient data into logical components. This makes it easier to:
- Add new recipes consistently
- Generate shopping lists without preparation instructions
- Scale to hundreds or thousands of recipes
- Potentially integrate with nutrition APIs or ingredient databases

## Ingredient Interface

```typescript
export interface Ingredient {
  quantity: number | string;  // 1, 2, 0.5, "1/2", "to taste", "pinch"
  unit?: string;              // cup, tbsp, tsp, oz, lb, etc. (optional)
  item: string;               // The actual ingredient (onion, garlic, flour)
  preparation?: string;       // chopped, diced, minced, sliced (optional)
  notes?: string;             // Additional info like "cold", "room temperature" (optional)
}
```

## Field Guidelines

### `quantity`
- Use numbers for standard amounts: `1`, `2`, `0.5`, `0.25`
- Use strings for ranges or special cases: `"1/2"`, `"1/4 to 1/2"`, `"to taste"`, `"pinch"`

### `unit` (optional)
- Common units: `cup`, `tbsp`, `tsp`, `oz`, `lb`, `g`, `ml`, `can`, `bottle`, `cloves`
- Omit for items counted by piece: eggs, apples, onions (unless specific size)

### `item`
- The ingredient name in its base form
- Keep it simple and consistent
- Examples: `flour`, `sugar`, `onion`, `garlic`, `chicken breast`
- Do NOT include preparation here

### `preparation` (optional)
- How the ingredient should be prepared
- Examples: `chopped`, `diced`, `minced`, `sliced`, `grated`, `shredded`, `melted`, `beaten`
- This is SEPARATE from the item so shopping lists can exclude it

### `notes` (optional)
- Additional context or requirements
- Examples: `"cold"`, `"room temperature"`, `"divided"`, `"optional"`, `"day-old"`

## Examples

### Before (Old System)
```typescript
ingredients: [
  '2 onions, diced',
  '1 cup butter, softened',
  '3 very ripe bananas, mashed',
]
```

### After (New Structured System)
```typescript
ingredients: [
  { quantity: 2, item: 'onions', preparation: 'diced' },
  { quantity: 1, unit: 'cup', item: 'butter', notes: 'softened' },
  { quantity: 3, item: 'very ripe bananas', preparation: 'mashed' },
]
```

## Display Formatting

The system automatically formats ingredients for display:

**Recipe View (with preparation):**
- `"2 onions, diced"`
- `"1 cup butter (softened)"`
- `"3 very ripe bananas, mashed"`

**Shopping List (without preparation, consolidated):**
- If recipe A needs "2 onions" and recipe B needs "3 onions", shows: `"5 onions"`
- If recipe A needs "1 cup flour" and recipe B needs "2 cups flour", shows: `"3 cups flour"`
- If recipe A needs "2 tbsp butter" and recipe B needs "1/4 cup butter", shows both separately: `"2 tbsp butter"` and `"1/4 cup butter"` (different units)

### Smart Consolidation Features

1. **Quantity Totaling**: Automatically adds up quantities for the same item with the same unit
2. **Case-Insensitive Matching**: "Onion", "onion", and "ONION" are all treated as the same ingredient
3. **Fraction Formatting**: Displays nice fractions (1/2, 1/4, 3/4) instead of decimals when appropriate
4. **Unit Preservation**: Keeps original unit names (preserves "tbsp" vs "tablespoon")
5. **Mixed Quantities**: Handles whole + fraction combinations (e.g., "2 1/2 cups")

## Benefits for Scaling

1. **Consistency**: All recipes follow the same structure
2. **Reusability**: Can create a master ingredient database
3. **Smart Shopping Lists**: Automatically aggregates quantities by item
4. **Easy Filtering**: Can filter recipes by specific ingredients
5. **Nutrition Integration**: Easy to connect with nutrition APIs
6. **Search & Tagging**: Can search by ingredient names
7. **Substitutions**: Easier to implement ingredient substitution features

## Adding New Recipes

When adding new recipes, always separate:
- The ingredient itself (`item`)
- How much you need (`quantity` + `unit`)
- How to prepare it (`preparation`)
- Any special notes (`notes`)

### Good Examples
```typescript
{ quantity: 2, unit: 'lbs', item: 'ground beef' }
{ quantity: 4, unit: 'cloves', item: 'garlic', preparation: 'minced' }
{ quantity: 1, unit: 'cup', item: 'butter', preparation: 'melted', notes: 'unsalted' }
{ quantity: 2, item: 'eggs', notes: 'room temperature' }
{ quantity: 'to taste', item: 'salt' }
```

### Bad Examples (Don't Do This)
```typescript
{ quantity: 2, item: 'diced onions' }  // ❌ Preparation in item name
{ quantity: 1, item: 'softened butter' }  // ❌ Use notes field instead
{ quantity: '2 cups chopped', item: 'carrots' }  // ❌ Mixed up fields
```

## Utility Functions

Three helper functions are available in `src/utils/ingredientFormatter.ts`:

1. **`formatIngredient(ingredient)`** - Full display format with preparation
2. **`formatIngredientForShopping(ingredient)`** - Shopping format without preparation
3. **`aggregateIngredientsForShopping(recipes)`** - Smart aggregation for shopping lists

## Future Enhancements

With this structured system, you can easily add:
- Ingredient substitution suggestions
- Nutritional information per ingredient
- Dietary restriction filtering (vegetarian, gluten-free, etc.)
- Cost estimation
- Seasonal ingredient highlighting
- Pantry management features

