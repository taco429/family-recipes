import React from 'react';
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
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import PublicIcon from '@mui/icons-material/Public';
import { recipes } from '../data/recipes';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.id === id);

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
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <img
            src={recipe.imageUrl || 'https://source.unsplash.com/random/600x400/?food'}
            alt={recipe.title}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {recipe.title}
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            {recipe.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip icon={<AccessTimeIcon />} label={`Prep: ${recipe.prepTime}`} variant="outlined" />
            <Chip icon={<RestaurantIcon />} label={`Cook: ${recipe.cookTime}`} variant="outlined" />
            <Chip icon={<GroupIcon />} label={`Serves: ${recipe.servings}`} variant="outlined" />
            <Chip label={recipe.difficulty} color={getDifficultyColor(recipe.difficulty)} />
            <Chip icon={<PublicIcon />} label={recipe.style} color={getStyleColor(recipe.style)} />
            <Chip label={recipe.category} variant="outlined" />
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="print" onClick={() => window.print()}>
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, mt: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Paper sx={{ flex: 1, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <List>
            {recipe.ingredients.map((ingredient, index) => {
              const qty = ingredient.quantity !== undefined ? `${ingredient.quantity} ` : '';
              const unit = ingredient.unit ? `${ingredient.unit} ` : '';
              const primary = `${qty}${unit}${ingredient.name}`.trim();
              return (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText primary={primary} />
                </ListItem>
              );
            })}
          </List>
        </Paper>

        <Paper sx={{ flex: 2, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <List>
            {recipe.instructions.map((instruction, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" component="span">
                        Step {index + 1}
                      </Typography>
                    }
                    secondary={instruction}
                  />
                </ListItem>
                {index < recipe.instructions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default RecipeDetail;
