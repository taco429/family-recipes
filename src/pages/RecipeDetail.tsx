import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import PublicIcon from '@mui/icons-material/Public';
import { recipes } from '../data/recipes';
import { useFavorites } from '../hooks/useFavorites';
import { shareRecipeUrl } from '../utils/shareUtils';
import { useSnackbar } from '../components/SnackbarProvider';
import { formatIngredient } from '../utils/ingredientFormatter';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showSnackbar } = useSnackbar();

  const recipe = recipes.find((r) => r.id === id);
  const isFav = recipe ? isFavorite(recipe.id) : false;

  const handleFavoriteClick = useCallback(() => {
    if (recipe) {
      toggleFavorite(recipe.id);
      showSnackbar(isFav ? 'Removed from favorites' : 'Added to favorites', 'success');
    }
  }, [recipe, toggleFavorite, isFav, showSnackbar]);

  const handleShareClick = useCallback(async () => {
    if (recipe) {
      const success = await shareRecipeUrl(recipe.id);
      if (success) {
        showSnackbar('Recipe link copied to clipboard!', 'success');
      } else {
        showSnackbar('Failed to share recipe', 'error');
      }
    }
  }, [recipe, showSnackbar]);

  if (!recipe) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">Recipe not found</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/recipes')} sx={{ mt: 2 }}>
          Back to Recipes
        </Button>
      </Container>
    );
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Hard':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStyleColor = (recipeStyle: string) => {
    switch (recipeStyle.toLowerCase()) {
      case 'italian':
        return 'error';
      case 'mexican':
        return 'warning';
      case 'french':
        return 'info';
      case 'american':
        return 'primary';
      case 'southern':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
          backgroundColor: '#000000',
          color: '#FFFFFF',
          fontSize: '1rem',
          fontWeight: 900,
          '&:hover': {
            backgroundColor: '#333333',
          },
        }}
      >
        [[ GO_BACK ]]
      </Button>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              position: 'relative',
              border: '6px solid #000000',
              boxShadow: '8px 8px 0px #FF0000',
            }}
          >
            <img
              src={recipe.imageUrl || 'https://source.unsplash.com/random/600x400/?food'}
              alt={recipe.title}
              style={{
                width: '100%',
                display: 'block',
                filter: 'contrast(1.2) saturate(0.9)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                backgroundColor: '#FFFF00',
                border: '3px solid #000000',
                padding: '8px 16px',
                transform: 'rotate(3deg)',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 900 }}>
                {recipe.category.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Impact", "Arial Black", sans-serif',
              fontSize: { xs: '2rem', md: '2.5rem' },
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: 2,
              border: '4px solid #FF0000',
              marginBottom: 2,
              textShadow: '2px 2px 0px #FF0000',
            }}
          >
            {recipe.title}
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{
              fontFamily: '"Courier New", monospace',
              fontSize: '1rem',
              fontWeight: 600,
              backgroundColor: '#F0F0F0',
              padding: 2,
              border: '3px dashed #000000',
              marginBottom: 2,
            }}
          >
            &gt; {recipe.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip icon={<AccessTimeIcon />} label={`Prep: ${recipe.prepTime}`} variant="outlined" />
            <Chip icon={<RestaurantIcon />} label={`Cook: ${recipe.cookTime}`} variant="outlined" />
            <Chip icon={<GroupIcon />} label={`Serves: ${recipe.servings}`} variant="outlined" />
            <Chip label={recipe.difficulty} color={getDifficultyColor(recipe.difficulty)} />
            <Chip icon={<PublicIcon />} label={recipe.style} color={getStyleColor(recipe.style)} />
            <Chip label={recipe.category} variant="outlined" />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <IconButton
              aria-label="add to favorites"
              onClick={handleFavoriteClick}
              sx={{
                border: '3px solid #000000',
                borderRadius: 0,
                backgroundColor: isFav ? '#FF0000' : '#FFFFFF',
                color: isFav ? '#FFFFFF' : '#000000',
                '&:hover': {
                  backgroundColor: isFav ? '#CC0000' : '#FFB6C1',
                  transform: 'rotate(10deg) scale(1.1)',
                },
              }}
            >
              {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton
              aria-label="share"
              onClick={handleShareClick}
              sx={{
                border: '3px solid #000000',
                borderRadius: 0,
                backgroundColor: '#FFFF00',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#000000',
                  color: '#FFFF00',
                  transform: 'rotate(-10deg) scale(1.1)',
                },
              }}
            >
              <ShareIcon />
            </IconButton>
            <IconButton
              aria-label="print"
              onClick={() => window.print()}
              sx={{
                border: '3px solid #000000',
                borderRadius: 0,
                backgroundColor: '#00FF00',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#000000',
                  color: '#00FF00',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, mt: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Paper
          sx={{
            flex: 1,
            p: 3,
            border: '4px solid #000000',
            boxShadow: '6px 6px 0px #000000',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontFamily: '"Arial Black", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              backgroundColor: '#FF0000',
              color: '#FFFFFF',
              padding: '8px',
              marginBottom: 2,
              marginTop: -3,
              marginLeft: -3,
              marginRight: -3,
              border: '3px solid #000000',
            }}
          >
            === INGREDIENTS ===
          </Typography>
          <List>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem
                key={index}
                sx={{
                  py: 0.5,
                  '&::before': {
                    content: '"→"',
                    marginRight: 2,
                    fontWeight: 900,
                    fontSize: '1.2rem',
                  },
                }}
              >
                <ListItemText
                  primary={formatIngredient(ingredient)}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: '"Courier New", monospace',
                      fontWeight: 600,
                      fontSize: '1rem',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper
          sx={{
            flex: 2,
            p: 3,
            border: '4px solid #000000',
            boxShadow: '6px 6px 0px #000000',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontFamily: '"Arial Black", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              backgroundColor: '#000000',
              color: '#00FF00',
              padding: '8px',
              marginBottom: 2,
              marginTop: -3,
              marginLeft: -3,
              marginRight: -3,
              border: '3px solid #000000',
            }}
          >
            === INSTRUCTIONS ===
          </Typography>
          <List>
            {recipe.instructions.map((instruction, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        component="span"
                        sx={{
                          fontFamily: '"Arial Black", sans-serif',
                          fontSize: '1.1rem',
                          backgroundColor: '#FFFF00',
                          padding: '4px 8px',
                          border: '2px solid #000000',
                          display: 'inline-block',
                          marginBottom: 1,
                        }}
                      >
                        STEP #{index + 1}
                      </Typography>
                    }
                    secondary={instruction}
                    secondaryTypographyProps={{
                      sx: {
                        fontFamily: '"Courier New", monospace',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        marginTop: 1,
                      },
                    }}
                  />
                </ListItem>
                {index < recipe.instructions.length - 1 && (
                  <Divider
                    sx={{ borderWidth: 2, borderColor: '#000000', borderStyle: 'dashed', my: 2 }}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default RecipeDetail;
