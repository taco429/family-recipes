import React, { useState, useMemo } from 'react';
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
  const { isFavorite } = useFavoritesContext();
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
      <Box
        sx={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: 3,
          marginBottom: 4,
          border: '6px solid #FF0000',
          transform: 'skewX(-1deg)',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontFamily: '"Impact", "Arial Black", sans-serif',
            fontSize: { xs: '2rem', md: '3rem' },
            letterSpacing: '0.1em',
            textShadow: '3px 3px 0px #FF0000, 6px 6px 0px #FFFF00',
            transform: 'skewX(1deg)',
          }}
        >
          Browse Recipes
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 4,
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          backgroundColor: '#FFFF00',
          border: '4px solid #000000',
          padding: 2,
          position: 'relative',
          '&::before': {
            content: '"FILTERS:"',
            position: 'absolute',
            top: '-16px',
            left: '16px',
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            padding: '2px 8px',
            fontSize: '0.875rem',
            fontWeight: 900,
            border: '3px solid #000000',
          },
        }}
      >
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

      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: 2,
          border: '3px solid #000000',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: '"Courier New", monospace',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#00FF00',
          }}
        >
          &gt; FOUND [{sortedRecipes.length}] RECIPES
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              icon={<FavoriteIcon />}
              checkedIcon={<FavoriteIcon color="error" />}
              sx={{
                color: '#FFFFFF',
                '&.Mui-checked': {
                  color: '#FF0000',
                },
              }}
            />
          }
          label="[FAVORITES_ONLY]"
          sx={{
            fontFamily: '"Courier New", monospace',
            fontWeight: 700,
            color: '#FFFF00',
            '& .MuiFormControlLabel-label': {
              marginLeft: 1,
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          padding: 3,
          backgroundColor: '#FFFFFF',
          border: '4px dashed #000000',
          position: 'relative',
          '&::before': {
            content: '">>>"',
            position: 'absolute',
            top: '8px',
            left: '8px',
            fontSize: '1.5rem',
            fontWeight: 900,
            color: '#FF0000',
          },
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
