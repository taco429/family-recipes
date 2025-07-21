import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../data/types';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToMenu?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onAddToMenu }) => {
  const navigate = useNavigate();
  const {
    title,
    description,
    cookTime,
    difficulty,
    imageUrl = 'https://source.unsplash.com/random/400x300/?food',
  } = recipe;
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

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      />
      <CardContent
        sx={{ flexGrow: 1, cursor: 'pointer' }}
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Chip icon={<AccessTimeIcon />} label={cookTime} size="small" variant="outlined" />
          <Chip label={difficulty} size="small" color={getDifficultyColor(difficulty)} />
          <Chip label={recipe.category} size="small" variant="outlined" />
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {onAddToMenu && (
          <IconButton
            aria-label="add to menu"
            onClick={() => onAddToMenu(recipe)}
            sx={{ marginLeft: 'auto' }}
          >
            <AddIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
