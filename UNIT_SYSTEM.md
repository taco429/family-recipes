# Structured Unit Normalization System

## Overview

We've moved from ad-hoc string matching to a **structured unit system** that properly handles all measurement unit variations. This eliminates the need for endless edge case handling.

## The Problem We Solved

### Before (String Matching Hell):
```typescript
// Had to manually handle each variation
if (unit === 'cup' || unit === 'cups') { ... }
if (unit === 'lb' || unit === 'lbs' || unit === 'pound' || unit === 'pounds') { ... }
if (unit === 'tbsp' || unit === 'tablespoon' || unit === 'tablespoons') { ... }
// And so on... forever
```

**Issues:**
- ❌ Easy to miss variations (lb vs lbs vs pound vs pounds vs lb.)
- ❌ Hard to maintain as recipes grow
- ❌ No standardization
- ❌ Bugs when new variations appear

### After (Structured System):
```typescript
// Define once, use everywhere
{
  canonical: 'pound',
  variations: ['pound', 'pounds', 'lb', 'lbs', 'lb.', 'lbs.'],
  category: 'weight',
}
```

**Benefits:**
- ✅ All variations defined in one place
- ✅ Easy to add new units or variations
- ✅ Automatic normalization
- ✅ Smart singular/plural display
- ✅ Unit categorization (volume, weight, count)

## How It Works

### 1. Unit Definitions (`unitNormalizer.ts`)

Each unit has:
- **canonical**: The standard form (e.g., "cup", "pound", "tbsp")
- **variations**: All accepted forms (plural, singular, abbreviations)
- **category**: Type of measurement (volume, weight, count, other)

```typescript
{
  canonical: 'pound',
  variations: ['pound', 'pounds', 'lb', 'lbs', 'lb.', 'lbs.'],
  category: 'weight',
}
```

### 2. Fast Lookup Map

All variations are indexed for O(1) lookup:
```typescript
'lb' → { canonical: 'pound', ... }
'lbs' → { canonical: 'pound', ... }
'pound' → { canonical: 'pound', ... }
'pounds' → { canonical: 'pound', ... }
```

### 3. Core Functions

#### `normalizeUnit(unit: string): string`
Converts any variation to canonical form:
```typescript
normalizeUnit('cups') // → 'cup'
normalizeUnit('lbs') // → 'pound'
normalizeUnit('tablespoons') // → 'tbsp'
```

#### `getDisplayUnit(canonical: string, quantity: number): string`
Returns proper display form based on quantity:
```typescript
getDisplayUnit('cup', 1) // → 'cup'
getDisplayUnit('cup', 2) // → 'cups'
getDisplayUnit('tbsp', 5) // → 'tbsp' (abbreviations stay same)
getDisplayUnit('pound', 2.5) // → 'pounds'
```

#### `areUnitsEquivalent(unit1: string, unit2: string): boolean`
Checks if units are the same:
```typescript
areUnitsEquivalent('cup', 'cups') // → true
areUnitsEquivalent('lb', 'pounds') // → true
areUnitsEquivalent('cup', 'tbsp') // → false
```

## Supported Units

### Volume (US/Imperial)
- **cup**: cup, cups, c
- **tbsp**: tbsp, tbsps, tablespoon, tablespoons, T
- **tsp**: tsp, tsps, teaspoon, teaspoons, t
- **fluid ounce**: fl oz, fl. oz., fluid ounce, fluid ounces, floz
- **pint**: pint, pints, pt, pts
- **quart**: quart, quarts, qt, qts
- **gallon**: gallon, gallons, gal, gals

### Volume (Metric)
- **milliliter**: milliliter, milliliters, ml, mls
- **liter**: liter, liters, litre, litres, l

### Weight (US/Imperial)
- **ounce**: ounce, ounces, oz, ozs
- **pound**: pound, pounds, lb, lbs, lb., lbs.

### Weight (Metric)
- **gram**: gram, grams, g, gr
- **kilogram**: kilogram, kilograms, kg, kgs

### Count/Container
- **can**: can, cans
- **bottle**: bottle, bottles
- **jar**: jar, jars
- **package**: package, packages, pkg, pkgs
- **box**: box, boxes

### Food-Specific
- **clove**: clove, cloves (garlic)
- **piece**: piece, pieces, pc, pcs
- **slice**: slice, slices
- **head**: head, heads (lettuce, cabbage)
- **bunch**: bunch, bunches (herbs, greens)
- **stalk**: stalk, stalks (celery)
- **rack**: rack, racks (ribs)
- **square**: square, squares (chocolate)

### Other
- **pinch**: pinch, pinches
- **dash**: dash, dashes
- **to taste**: to taste

## Real-World Examples

### Example 1: Multiple Variations
**Recipes use:**
- `1 lb ground beef`
- `2 pounds Italian sausage`
- `3 lbs ground pork`

**Shopping List shows:**
```
6 pounds ground meat (consolidated!)
```

### Example 2: Cups
**Recipes use:**
- `2 cups all-purpose flour`
- `1 cup all-purpose flour`
- `2.5 cups all-purpose flour`

**Shopping List shows:**
```
5 1/2 cups all-purpose flour
```

### Example 3: Tablespoons
**Recipes use:**
- `2 tablespoons sugar`
- `1 tbsp sugar`
- `3 T sugar`

**Shopping List shows:**
```
6 tbsp sugar
```

## Adding New Units

To add a new unit, just add it to `UNIT_DEFINITIONS`:

```typescript
{
  canonical: 'sprig',
  variations: ['sprig', 'sprigs'],
  category: 'count',
}
```

That's it! The system automatically:
- Handles all variations
- Consolidates in shopping lists
- Displays properly (singular/plural)

## Benefits Over String Matching

| Aspect | String Matching | Structured System |
|--------|----------------|-------------------|
| **Maintainability** | Add if/else for each case | Add one definition |
| **Completeness** | Easy to miss variations | All variations in one place |
| **Performance** | O(n) string comparisons | O(1) hash lookup |
| **Extensibility** | Hard to add features | Easy to add categories, conversions |
| **Testability** | Hard to test all cases | Easy to test definitions |
| **Documentation** | Comments in code | Self-documenting data |

## Future Enhancements

With this structured system, we can easily add:

1. **Unit Conversion**
   ```typescript
   convertUnit('1/4 cup', 'tbsp') // → '4 tbsp'
   ```

2. **Smart Suggestions**
   ```typescript
   suggestBetterUnit(48, 'tsp') // → "Consider using 1 cup"
   ```

3. **Validation**
   ```typescript
   validateUnit('cupp') // → "Did you mean 'cup'?"
   ```

4. **Category-Based Filtering**
   ```typescript
   getIngredientsByCategory('weight') // All weight-based ingredients
   ```

5. **Import/Export**
   - Support different recipe formats
   - Handle international recipes
   - Convert between metric and imperial

## Migration Notes

**No recipe changes needed!** The system automatically normalizes existing recipes.

Your recipes can use ANY variation:
- `"lb"`, `"lbs"`, `"pound"`, or `"pounds"` - all work!
- `"cup"` or `"cups"` - both consolidate correctly!
- `"tbsp"`, `"tablespoon"`, or `"tablespoons"` - all the same!

The system handles everything transparently.

