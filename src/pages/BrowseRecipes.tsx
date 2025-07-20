import React, { useState } from 'react';
import { Container, Typography, Box, TextField, MenuItem, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from '../components/RecipeCard';
import { recipes, Recipe } from '../data/recipes';

const BrowseRecipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(recipes.map(r => r.category)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || recipe.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || recipe.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
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
          {categories.map(category => (
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
          {difficulties.map(difficulty => (
            <MenuItem key={difficulty} value={difficulty}>
              {difficulty}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Found {filteredRecipes.length} recipes
      </Typography>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3
      }}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>
    </Container>
  );
};

export default BrowseRecipes; 