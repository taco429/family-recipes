import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Recipe } from '../data/types';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

interface DayMenu {
  dinner?: Recipe;
}

const WeeklyMenu: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // For now we only support dinner planning
  const meals = ['dinner'] as const;

  const [weekMenu, setWeekMenu] = useState<Record<string, DayMenu>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<'dinner'>('dinner');

  const handleAddRecipe = (day: string, meal: 'dinner') => {
    setSelectedDay(day);
    setSelectedMeal(meal);
    setDialogOpen(true);
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setWeekMenu((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedMeal]: recipe,
      },
    }));
    setDialogOpen(false);
  };

  const handleRemoveRecipe = (day: string, meal: 'dinner') => {
    setWeekMenu((prev) => {
      const newMenu = { ...prev };
      if (newMenu[day]) {
        delete newMenu[day][meal];
        if (Object.keys(newMenu[day]).length === 0) {
          delete newMenu[day];
        }
      }
      return newMenu;
    });
  };

  const getShoppingList = () => {
    const ingredients = new Set<string>();
    Object.values(weekMenu).forEach((dayMenu) => {
      Object.values(dayMenu).forEach((recipe) => {
        if (recipe) {
          recipe.ingredients.forEach((ing: string) => ingredients.add(ing));
        }
      });
    });
    return Array.from(ingredients);
  };

  // Helper to randomly assign dinners for the entire week
  const randomizeDinners = () => {
    setWeekMenu(() => {
      const newMenu: Record<string, DayMenu> = {};
      days.forEach((day) => {
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        newMenu[day] = { dinner: randomRecipe };
      });
      return newMenu;
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Weekly Menu Planner
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print Menu
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              const list = getShoppingList();
              const listText = list.join('\n');
              navigator.clipboard.writeText(listText);
              alert('Shopping list copied to clipboard!');
            }}
          >
            Generate Shopping List
          </Button>

          {/* New button to auto-plan dinners */}
          <Button
            variant="contained"
            color="secondary"
            onClick={randomizeDinners}
            startIcon={<ShuffleIcon />}
          >
            Randomize Dinners
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          // Responsive layout: 1 column on phones up to 7 columns on large desktops
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(7, 1fr)',
          },
        }}
      >
        {days.map((day) => (
          <Paper key={day} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
              {day}
            </Typography>

            {meals.map((meal) => {
              const recipe = weekMenu[day]?.[meal];
              return (
                <Card key={meal} sx={{ mb: 1, minHeight: 80 }}>
                  <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Typography variant="caption" color="text.secondary">
                      {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </Typography>
                    {recipe ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {recipe.title}
                        </Typography>
                        <IconButton size="small" onClick={() => handleRemoveRecipe(day, meal)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <IconButton size="small" onClick={() => handleAddRecipe(day, meal)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </Paper>
        ))}
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Select Recipe for {selectedDay} - {selectedMeal}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 2,
              mt: 2,
            }}
          >
            {recipes.map((recipe) => (
              <Box key={recipe.id} onClick={() => handleSelectRecipe(recipe)}>
                <RecipeCard recipe={recipe} />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      {Object.keys(weekMenu).length > 0 && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Shopping List Preview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getShoppingList().slice(0, 5).join(', ')}
            {getShoppingList().length > 5 && ` and ${getShoppingList().length - 5} more items...`}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default WeeklyMenu;
