import React, { useState, useMemo, useCallback } from 'react';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Recipe } from '../data/types';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ShoppingList from '../components/ShoppingList';
import { useSnackbar } from '../components/SnackbarProvider';
import RandomMenuDialog from '../components/RandomMenuDialog';
import { generateRandomMenu } from '../utils/menuGenerator';

interface DayMenu {
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
}

const WeeklyMenu: React.FC = () => {
  const days = useMemo(
    () => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    []
  );
  const meals = useMemo(() => ['breakfast', 'lunch', 'dinner'] as const, []);
  const { showSnackbar } = useSnackbar();

  const [weekMenu, setWeekMenu] = useLocalStorage<Record<string, DayMenu>>('weekly-menu', {});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shoppingListOpen, setShoppingListOpen] = useState(false);
  const [randomMenuDialogOpen, setRandomMenuDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('dinner');

  const shoppingListRecipes = useMemo(() => {
    const recipeList: Recipe[] = [];
    Object.values(weekMenu).forEach((dayMenu) => {
      Object.values(dayMenu).forEach((recipe) => {
        if (recipe && !recipeList.find((r) => r.id === recipe.id)) {
          recipeList.push(recipe);
        }
      });
    });
    return recipeList;
  }, [weekMenu]);

  const handleAddRecipe = useCallback((day: string, meal: 'breakfast' | 'lunch' | 'dinner') => {
    setSelectedDay(day);
    setSelectedMeal(meal);
    setDialogOpen(true);
  }, []);

  const handleSelectRecipe = useCallback(
    (recipe: Recipe) => {
      setWeekMenu((prev) => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [selectedMeal]: recipe,
        },
      }));
      setDialogOpen(false);
      showSnackbar(`Added ${recipe.title} to ${selectedDay} ${selectedMeal}`, 'success');
    },
    [selectedDay, selectedMeal, setWeekMenu, showSnackbar]
  );

  const handleRemoveRecipe = useCallback(
    (day: string, meal: 'breakfast' | 'lunch' | 'dinner') => {
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
      showSnackbar('Recipe removed from menu', 'info');
    },
    [setWeekMenu, showSnackbar]
  );

  const handleGenerateRandomMenu = useCallback(
    (excludedDays: string[], excludedMeals: string[], excludedSlots: Set<string>) => {
      const generatedMenu = generateRandomMenu(
        recipes,
        days,
        meals,
        {
          excludedDays,
          excludedMeals,
          excludedSlots,
        },
        weekMenu
      );
      setWeekMenu(generatedMenu);
      showSnackbar('Random menu generated successfully!', 'success');
    },
    [days, meals, weekMenu, setWeekMenu, showSnackbar]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Weekly Menu Planner
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ShuffleIcon />}
            onClick={() => setRandomMenuDialogOpen(true)}
          >
            Random Generate
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
            Print Menu
          </Button>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={() => setShoppingListOpen(true)}
            disabled={shoppingListRecipes.length === 0}
          >
            Shopping List ({shoppingListRecipes.length})
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
              <Box
                key={recipe.id}
                onClick={() => handleSelectRecipe(recipe)}
                sx={{ cursor: 'pointer' }}
              >
                <RecipeCard recipe={recipe} />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      <ShoppingList
        open={shoppingListOpen}
        onClose={() => setShoppingListOpen(false)}
        recipes={shoppingListRecipes}
      />

      <RandomMenuDialog
        open={randomMenuDialogOpen}
        onClose={() => setRandomMenuDialogOpen(false)}
        onGenerate={handleGenerateRandomMenu}
        days={days}
        meals={meals}
        existingMenu={weekMenu}
      />

      {Object.keys(weekMenu).length > 0 && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Menu Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You have {shoppingListRecipes.length} recipe
            {shoppingListRecipes.length !== 1 ? 's' : ''} planned for this week.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default WeeklyMenu;
