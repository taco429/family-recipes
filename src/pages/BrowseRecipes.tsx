import React, { useState } from 'react';
import { Container, Typography, Box, TextField, MenuItem, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../data/recipes';

const BrowseRecipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [styleFilter, setStyleFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  const categories = ['All', ...Array.from(new Set(recipes.map((r) => r.category)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const styles = ['All', ...Array.from(new Set(recipes.map((r) => r.style))).sort()];
  const sortOptions = [
    { value: 'title', label: 'Title' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'category', label: 'Category' },
    { value: 'style', label: 'Style' },
    { value: 'cookTime', label: 'Cook Time' },
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || recipe.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || recipe.difficulty === difficultyFilter;
    const matchesStyle = styleFilter === 'All' || recipe.style === styleFilter;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStyle;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'difficulty':
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'category':
        return a.category.localeCompare(b.category);
      case 'style':
        return a.style.localeCompare(b.style);
      case 'cookTime':
        // Extract numeric value from cook time for sorting
        const getMinutes = (time: string) => {
          const match = time.match(/(\d+)/);
          return match ? parseInt(match[1]) : 0;
        };
        return getMinutes(a.cookTime) - getMinutes(b.cookTime);
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });

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

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Found {sortedRecipes.length} recipes
      </Typography>

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
