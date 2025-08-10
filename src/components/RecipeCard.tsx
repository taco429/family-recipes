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
import RestaurantIcon from '@mui/icons-material/Restaurant';
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
    style,
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
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 },
        borderRadius: 3,
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: { xs: 180, sm: 200 }, objectFit: 'cover' }}
        image={imageUrl}
        alt={title}
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      />
      <CardContent
        sx={{ flexGrow: 1, cursor: 'pointer' }}
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      >
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          <Chip icon={<AccessTimeIcon />} label={cookTime} size="small" variant="outlined" />
          <Chip label={difficulty} size="small" color={getDifficultyColor(difficulty)} />
          <Chip icon={<RestaurantIcon />} label={style} size="small" color={getStyleColor(style)} />
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
