/**
 * Utility functions for sharing recipes
 */

/**
 * Copies the recipe URL to clipboard
 */
export async function shareRecipeUrl(recipeId: string): Promise<boolean> {
  const url = `${window.location.origin}${window.location.pathname}#/recipe/${recipeId}`;

  try {
    if (navigator.share && navigator.clipboard) {
      // Try Web Share API first (mobile)
      await navigator.share({
        title: 'Check out this recipe!',
        url: url,
      });
      return true;
    } else if (navigator.clipboard) {
      // Fallback to clipboard API
      await navigator.clipboard.writeText(url);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  } catch (error) {
    console.error('Error sharing recipe:', error);
    return false;
  }
}

/**
 * Generates a shareable text for a recipe
 */
export function generateShareText(recipeTitle: string, recipeId: string): string {
  const url = `${window.location.origin}${window.location.pathname}#/recipe/${recipeId}`;
  return `Check out this recipe: ${recipeTitle}\n${url}`;
}
