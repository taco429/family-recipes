import React, { useCallback } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../data/types';
import { useFavoritesContext } from '../context/FavoritesContext';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToMenu?: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = React.memo(({ recipe, onAddToMenu }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const {
    id,
    title,
    description,
    cookTime,
    difficulty,
    style,
    imageUrl = 'https://source.unsplash.com/random/400x300/?food',
  } = recipe;

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(id);
    },
    [id, toggleFavorite]
  );

  // Removed unused color functions - now using inline styles for brutalist design

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          transform: 'rotate(-1deg) scale(1.02)',
          boxShadow: '12px 12px 0px #000000',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          backgroundColor:
            recipe.style === 'Italian'
              ? '#FF0000'
              : recipe.style === 'Mexican'
                ? '#FFA500'
                : recipe.style === 'French'
                  ? '#0000FF'
                  : recipe.style === 'American'
                    ? '#000080'
                    : '#000000',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={title}
          sx={{
            cursor: 'pointer',
            filter: 'contrast(1.2) saturate(0.9)',
            borderBottom: '4px solid #000000',
          }}
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: '#FFFF00',
            border: '3px solid #000000',
            padding: '4px 8px',
            transform: 'rotate(-3deg)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 900, fontSize: '0.75rem' }}>
            {recipe.category.toUpperCase()}
          </Typography>
        </Box>
      </Box>
      <CardContent
        sx={{ flexGrow: 1, cursor: 'pointer' }}
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontFamily: '"Arial Black", sans-serif',
            fontSize: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            lineHeight: 1.2,
            borderBottom: '3px solid #000000',
            paddingBottom: 1,
            marginBottom: 2,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
          sx={{
            fontFamily: '"Courier New", monospace',
            fontSize: '0.875rem',
            lineHeight: 1.4,
            backgroundColor: '#F0F0F0',
            padding: 1,
            border: '2px dashed #000000',
          }}
        >
          {description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<AccessTimeIcon />}
            label={cookTime}
            size="small"
            variant="outlined"
            sx={{
              borderWidth: '2px',
              fontWeight: 700,
              backgroundColor: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#000000',
                color: '#FFFFFF',
              },
            }}
          />
          <Chip
            label={difficulty.toUpperCase()}
            size="small"
            sx={{
              backgroundColor:
                difficulty === 'Easy' ? '#00FF00' : difficulty === 'Medium' ? '#FFA500' : '#FF0000',
              color: '#000000',
              border: '2px solid #000000',
              fontWeight: 900,
            }}
          />
          <Chip
            icon={<RestaurantIcon />}
            label={style.toUpperCase()}
            size="small"
            sx={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '2px solid #000000',
              fontWeight: 700,
            }}
          />
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          borderTop: '3px solid #000000',
          backgroundColor: '#F0F0F0',
          padding: 2,
        }}
      >
        <IconButton
          aria-label={isFavorite(id) ? 'remove from favorites' : 'add to favorites'}
          onClick={handleFavoriteClick}
          sx={{
            border: '3px solid #000000',
            borderRadius: 0,
            backgroundColor: isFavorite(id) ? '#FF0000' : '#FFFFFF',
            color: isFavorite(id) ? '#FFFFFF' : '#000000',
            '&:hover': {
              backgroundColor: isFavorite(id) ? '#FF3333' : '#FFB6C1',
              transform: 'rotate(10deg) scale(1.1)',
            },
          }}
        >
          {isFavorite(id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton
          aria-label="share"
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
        {onAddToMenu && (
          <IconButton
            aria-label="add to menu"
            onClick={() => onAddToMenu(recipe)}
            sx={{
              marginLeft: 'auto',
              border: '3px solid #000000',
              borderRadius: 0,
              backgroundColor: '#00FF00',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#000000',
                color: '#00FF00',
                transform: 'scale(1.2)',
              },
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
});

RecipeCard.displayName = 'RecipeCard';

export default RecipeCard;
