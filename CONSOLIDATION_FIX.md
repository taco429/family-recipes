# Shopping List Consolidation Fix

## Issues Fixed

### 1. Unit Normalization (cup vs cups)
**Problem:** "1 cup buttermilk" and "2 cups buttermilk" were not consolidating because "cup" and "cups" were treated as different units.

**Solution:** Created `normalizeUnit()` function that treats singular and plural forms as the same unit:
- "cup" and "cups" → both normalize to "cup"
- "tbsp" and "tbsps" → both normalize to "tbsp"
- "can" and "cans" → both normalize to "can"

### 2. Improved Fraction Formatting
**Problem:** Mixed decimals and fractions appearing in output.

**Solution:** Enhanced `formatQuantity()` function with better logic:
- Checks whole numbers first
- Handles whole + fraction combinations (like 2 1/2)
- Better tolerance for floating point math (0.01 instead of 0.02)
- Improved fraction matching for 1/3 (0.333) and 2/3 (0.667)

## Expected Behavior

### Example 1: Unit Consolidation
**Recipe A:** `{ quantity: 1, unit: 'cup', item: 'buttermilk' }`  
**Recipe B:** `{ quantity: 2, unit: 'cups', item: 'buttermilk' }`  

**Shopping List:** `3 cups buttermilk` ✅

### Example 2: Fraction Display
**Recipe A:** `{ quantity: 2, unit: 'cups', item: 'flour' }`  
**Recipe B:** `{ quantity: 2.25, unit: 'cups', item: 'flour' }`  
**Recipe C:** `{ quantity: 0.5, unit: 'cups', item: 'flour' }`  

**Shopping List:** `4 3/4 cups flour` ✅

### Example 3: Multiple Ingredients
**Weekly Menu has:**
- Dad's Pancakes: `2 cups buttermilk`
- Mama's Cornbread: `1 cup buttermilk`
- Auntie's Cookies: `2.25 cups all-purpose flour`
- Grandma's Apple Pie: `2.5 cups all-purpose flour`
- Sister's Banana Bread: `1.5 cups all-purpose flour`

**Shopping List shows:**
```
6 1/4 cups all-purpose flour
3 cups buttermilk
```

## Testing

To verify the fix is working:
1. Add Dad's Pancakes (2 cups buttermilk) to weekly menu
2. Add Mama's Cornbread (1 cup buttermilk) to weekly menu
3. Open Shopping List
4. Should see: "3 cups buttermilk" (not two separate entries)

## Technical Details

### Structured Unit System

We've moved from ad-hoc string matching to a **structured unit normalization system** (see `UNIT_SYSTEM.md` for full details).

The system uses a comprehensive unit definition database that handles:
- ✅ All singular/plural variations: `lb` / `lbs` / `pound` / `pounds`
- ✅ Abbreviations: `tbsp` / `tablespoon` / `tablespoons` / `T`
- ✅ Multiple spellings: `liter` / `litre`
- ✅ With/without periods: `lb` / `lb.`

Each unit is defined once with all its variations:
```typescript
{
  canonical: 'pound',
  variations: ['pound', 'pounds', 'lb', 'lbs', 'lb.', 'lbs.'],
  category: 'weight',
}
```

### Key Functions from `unitNormalizer.ts`

**`normalizeUnit(unit)`** - Converts any variation to canonical form:
- `'lbs'` → `'pound'`
- `'cups'` → `'cup'`
- `'tablespoons'` → `'tbsp'`

**`getDisplayUnit(canonical, quantity)`** - Returns proper display form:
- `('pound', 1)` → `'pound'`
- `('pound', 2.5)` → `'pounds'`
- `('tbsp', 5)` → `'tbsp'` (abbreviations stay same)

### Smart Plural Display
The system automatically adds 's' back when displaying if the total quantity is > 1:
- `1 cup` (singular)
- `2 cups` (plural)
- `3 1/2 cups` (plural)

But keeps abbreviations without 's':
- `2 tbsp` (not "2 tbsps")
- `1 tsp` (not "1 tsps")

