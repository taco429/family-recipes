import React, { useState, useMemo, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../data/recipes';
import { useDebounce } from '../hooks/useDebounce';
import { useFavoritesContext } from '../context/FavoritesContext';

const BrowseRecipes: React.FC = () => {
  const { favorites, isFavorite } = useFavoritesContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [styleFilter, setStyleFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoize static data for better performance
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(recipes.map((r) => r.category)))],
    []
  );
  const difficulties = useMemo(() => ['All', 'Easy', 'Medium', 'Hard'], []);
  const styles = useMemo(
    () => ['All', ...Array.from(new Set(recipes.map((r) => r.style))).sort()],
    []
  );
  const sortOptions = useMemo(
    () => [
      { value: 'title', label: 'Title' },
      { value: 'difficulty', label: 'Difficulty' },
      { value: 'category', label: 'Category' },
      { value: 'style', label: 'Style' },
      { value: 'cookTime', label: 'Cook Time' },
    ],
    []
  );

  // Memoize filtered recipes to avoid unnecessary recalculations
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || recipe.category === categoryFilter;
      const matchesDifficulty =
        difficultyFilter === 'All' || recipe.difficulty === difficultyFilter;
      const matchesStyle = styleFilter === 'All' || recipe.style === styleFilter;
      const matchesFavorite = !showFavoritesOnly || isFavorite(recipe.id);

      return (
        matchesSearch && matchesCategory && matchesDifficulty && matchesStyle && matchesFavorite
      );
    });
  }, [
    debouncedSearchTerm,
    categoryFilter,
    difficultyFilter,
    styleFilter,
    showFavoritesOnly,
    isFavorite,
  ]);

  // Memoize sorted recipes
  const sortedRecipes = useMemo(() => {
    const getMinutes = (time: string) => {
      const match = time.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };

    return [...filteredRecipes].sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'category':
          return a.category.localeCompare(b.category);
        case 'style':
          return a.style.localeCompare(b.style);
        case 'cookTime':
          return getMinutes(a.cookTime) - getMinutes(b.cookTime);
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }, [filteredRecipes, sortBy]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Browse Recipes
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          sx={{ flexGrow: 1, minWidth: 250 }}
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Difficulty"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {difficulties.map((difficulty) => (
            <MenuItem key={difficulty} value={difficulty}>
              {difficulty}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Style"
          value={styleFilter}
          onChange={(e) => setStyleFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {styles.map((style) => (
            <MenuItem key={style} value={style}>
              {style}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" color="text.secondary">
          Found {sortedRecipes.length} recipes
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              icon={<FavoriteIcon />}
              checkedIcon={<FavoriteIcon color="error" />}
            />
          }
          label="Show favorites only"
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {sortedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>
    </Container>
  );
};

export default BrowseRecipes;
