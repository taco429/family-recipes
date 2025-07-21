import { Recipe } from '../types';
import { grandmasApplePie } from './grandmas-apple-pie';
import { unclesBbqRibs } from './uncles-bbq-ribs';
import { momsChickenSoup } from './moms-chicken-soup';
import { dadsPancakes } from './dads-pancakes';
import { nanasLasagna } from './nanas-lasagna';
import { grandpasChili } from './grandpas-chili';

export const recipes: Recipe[] = [
  grandmasApplePie,
  unclesBbqRibs,
  momsChickenSoup,
  dadsPancakes,
  nanasLasagna,
  grandpasChili,
];

// Export individual recipes for direct import if needed
export {
  grandmasApplePie,
  unclesBbqRibs,
  momsChickenSoup,
  dadsPancakes,
  nanasLasagna,
  grandpasChili,
};
