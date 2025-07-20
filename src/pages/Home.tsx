import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../data/recipes';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredRecipes = recipes.slice(0, 3); // First 3 recipes as featured

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Family Recipes
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Preserve and share your cherished family recipes with loved ones.
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/recipes')}>
            Browse All Recipes
          </Button>
          <Button variant="outlined" onClick={() => navigate('/weekly-menu')}>
            Plan Weekly Menu
          </Button>
        </Box>
      </Box>
      
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Featured Recipes
      </Typography>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3
      }}>
        {featuredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>
    </Container>
  );
};

export default Home; 