// Re-export everything from the new structure for backward compatibility
export type { Recipe } from './types';
export { recipes } from './recipes/index';

// Re-export individual recipes if needed
export * from './recipes/index';
