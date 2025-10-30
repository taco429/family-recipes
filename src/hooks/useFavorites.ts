import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'family-recipes-favorites';

/**
 * Custom hook for managing favorite recipes with local storage persistence
 * @returns An object containing favorite recipe IDs and methods to manage them
 */
export function useFavorites() {
  // Initialize state from localStorage
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        return new Set(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
    return new Set();
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  // Toggle a recipe's favorite status
  const toggleFavorite = useCallback((recipeId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  }, []);

  // Check if a recipe is favorited
  const isFavorite = useCallback(
    (recipeId: string) => {
      return favorites.has(recipeId);
    },
    [favorites]
  );

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return {
    favorites: Array.from(favorites),
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.size,
  };
}
