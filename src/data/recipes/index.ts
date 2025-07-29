import { Recipe } from '../../models/Recipe';
import aunties from './json/aunties-chocolate-chip-cookies.json';
import brothers from './json/brothers-fish-tacos.json';
import cousins from './json/cousins-beef-stew.json';
import dads from './json/dads-pancakes.json';
import grandmas from './json/grandmas-apple-pie.json';
import grandpasChiliJson from './json/grandpas-chili.json';
import grandpasToast from './json/grandpas-french-toast.json';
import mamas from './json/mamas-cornbread.json';
import moms from './json/moms-chicken-soup.json';
import nanas from './json/nanas-lasagna.json';
import sisters from './json/sisters-banana-bread.json';
import uncles from './json/uncles-bbq-ribs.json';

const jsonRecipes = [
  aunties,
  brothers,
  cousins,
  dads,
  grandmas,
  grandpasChiliJson,
  grandpasToast,
  mamas,
  moms,
  nanas,
  sisters,
  uncles,
] as const;

export const recipes: Recipe[] = jsonRecipes.map((j) => Recipe.fromJSON(j));

export const recipeMap: Map<string, Recipe> = new Map(recipes.map((r) => [r.id, r]));
