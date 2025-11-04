import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../data/recipes';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredRecipes = recipes.slice(0, 3); // First 3 recipes as featured

  return (
    <Container maxWidth="lg" sx={{ mt: 0, mb: 4 }}>
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          backgroundColor: '#FFFF00',
          border: '6px solid #000000',
          marginTop: 4,
          marginBottom: 4,
          position: 'relative',
          '&::before': {
            content: '"//"',
            position: 'absolute',
            top: '8px',
            left: '8px',
            fontSize: '2rem',
            fontWeight: 900,
            color: '#000000',
          },
          '&::after': {
            content: '"//"',
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            fontSize: '2rem',
            fontWeight: 900,
            color: '#000000',
            transform: 'rotate(180deg)',
          },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: '"Impact", "Arial Black", sans-serif',
            fontSize: { xs: '2rem', md: '3.5rem' },
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#000000',
            textShadow: '4px 4px 0px #FF0000',
            marginBottom: 2,
            transform: 'skewY(-2deg)',
          }}
        >
          [[ WELCOME TO FAMILY RECIPES ]]
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            fontFamily: '"Courier New", monospace',
            fontSize: '1.1rem',
            fontWeight: 700,
            backgroundColor: '#000000',
            color: '#00FF00',
            padding: 2,
            border: '3px solid #000000',
            maxWidth: '600px',
            margin: '0 auto 24px',
            boxShadow: '4px 4px 0px #FF0000',
          }}
        >
          &gt;&gt; PRESERVE AND SHARE YOUR CHERISHED FAMILY RECIPES WITH LOVED ONES &lt;&lt;
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate('/recipes')}
            sx={{
              fontSize: '1.2rem',
              padding: '12px 24px',
              backgroundColor: '#FF0000',
              '&:hover': {
                backgroundColor: '#CC0000',
              },
            }}
          >
            [ BROWSE_ALL_RECIPES ]
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/weekly-menu')}
            sx={{
              fontSize: '1.2rem',
              padding: '12px 24px',
              backgroundColor: '#00FF00',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#00CC00',
              },
            }}
          >
            [ PLAN_WEEKLY_MENU ]
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: 2,
          marginTop: 4,
          marginBottom: 3,
          border: '4px solid #FF0000',
          position: 'relative',
          '&::before': {
            content: '"*"',
            position: 'absolute',
            left: '16px',
            fontSize: '2rem',
            color: '#FFFF00',
          },
          '&::after': {
            content: '"*"',
            position: 'absolute',
            right: '16px',
            fontSize: '2rem',
            color: '#FFFF00',
          },
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: 'center',
            fontSize: { xs: '1.5rem', md: '2.5rem' },
            letterSpacing: '0.2em',
          }}
        >
          === FEATURED_RECIPES ===
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          padding: 2,
          backgroundColor: '#FFFFFF',
          border: '4px dashed #000000',
        }}
      >
        {featuredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>
    </Container>
  );
};

export default Home;
