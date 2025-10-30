import React, { useState, useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';

interface RandomMenuDialogProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (excludedDays: string[], excludedMeals: string[], excludedSlots: Set<string>) => void;
  days: string[];
  meals: readonly string[];
  existingMenu: Record<string, any>;
}

export const RandomMenuDialog: React.FC<RandomMenuDialogProps> = ({
  open,
  onClose,
  onGenerate,
  days,
  meals,
  existingMenu,
}) => {
  const [excludedDays, setExcludedDays] = useState<string[]>([]);
  const [excludedMeals, setExcludedMeals] = useState<string[]>([]);
  const [excludedSlots, setExcludedSlots] = useState<Set<string>>(new Set());

  const handleDayToggle = useCallback((day: string) => {
    setExcludedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      }
      return [...prev, day];
    });
  }, []);

  const handleMealToggle = useCallback((meal: string) => {
    setExcludedMeals((prev) => {
      if (prev.includes(meal)) {
        return prev.filter((m) => m !== meal);
      }
      return [...prev, meal];
    });
  }, []);

  const handleSlotToggle = useCallback((day: string, meal: string) => {
    const slotKey = `${day}-${meal}`;
    setExcludedSlots((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slotKey)) {
        newSet.delete(slotKey);
      } else {
        newSet.add(slotKey);
      }
      return newSet;
    });
  }, []);

  const isSlotExcluded = useCallback(
    (day: string, meal: string): boolean => {
      return (
        excludedDays.includes(day) ||
        excludedMeals.includes(meal) ||
        excludedSlots.has(`${day}-${meal}`)
      );
    },
    [excludedDays, excludedMeals, excludedSlots]
  );

  const hasExistingRecipe = useCallback(
    (day: string, meal: string): boolean => {
      return !!existingMenu[day]?.[meal];
    },
    [existingMenu]
  );

  const slotsToGenerate = useMemo(() => {
    let count = 0;
    days.forEach((day) => {
      meals.forEach((meal) => {
        if (!isSlotExcluded(day, meal) && !hasExistingRecipe(day, meal)) {
          count++;
        }
      });
    });
    return count;
  }, [days, meals, isSlotExcluded, hasExistingRecipe]);

  const handleGenerate = useCallback(() => {
    onGenerate(excludedDays, excludedMeals, excludedSlots);
    onClose();
    // Reset state
    setExcludedDays([]);
    setExcludedMeals([]);
    setExcludedSlots(new Set());
  }, [excludedDays, excludedMeals, excludedSlots, onGenerate, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
    // Reset state
    setExcludedDays([]);
    setExcludedMeals([]);
    setExcludedSlots(new Set());
  }, [onClose]);

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShuffleIcon />
          <Typography variant="h6">Generate Random Menu</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" paragraph>
          Select which days, meals, or specific slots to exclude from random generation. Existing
          recipes will be preserved.
        </Typography>

        {/* Exclude Entire Days */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Exclude Entire Days
          </Typography>
          <FormGroup row>
            {days.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={excludedDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                }
                label={day}
              />
            ))}
          </FormGroup>
        </Paper>

        {/* Exclude Entire Meals */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Exclude Entire Meals
          </Typography>
          <FormGroup row>
            {meals.map((meal) => (
              <FormControlLabel
                key={meal}
                control={
                  <Checkbox
                    checked={excludedMeals.includes(meal)}
                    onChange={() => handleMealToggle(meal)}
                  />
                }
                label={meal.charAt(0).toUpperCase() + meal.slice(1)}
              />
            ))}
          </FormGroup>
        </Paper>

        {/* Exclude Specific Slots */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Exclude Specific Meals on Specific Days
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Click on specific day/meal combinations to exclude them from generation
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {days.map((day) => (
              <Box key={day} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: 100, fontWeight: 'bold' }}>
                  {day}:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {meals.map((meal) => {
                    const isExcluded = isSlotExcluded(day, meal);
                    const hasRecipe = hasExistingRecipe(day, meal);
                    const isDirectlyExcluded = excludedSlots.has(`${day}-${meal}`);

                    return (
                      <Chip
                        key={`${day}-${meal}`}
                        label={meal.charAt(0).toUpperCase() + meal.slice(1)}
                        onClick={() => handleSlotToggle(day, meal)}
                        color={
                          hasRecipe
                            ? 'default'
                            : isDirectlyExcluded
                              ? 'error'
                              : isExcluded
                                ? 'warning'
                                : 'success'
                        }
                        variant={isExcluded || hasRecipe ? 'outlined' : 'filled'}
                        disabled={excludedDays.includes(day) || excludedMeals.includes(meal)}
                        size="small"
                        sx={{
                          cursor: 'pointer',
                          opacity: hasRecipe ? 0.6 : 1,
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip size="small" color="success" label="Will Generate" />
            <Chip size="small" color="error" variant="outlined" label="Excluded" />
            <Chip size="small" color="warning" variant="outlined" label="Excluded by Day/Meal" />
            <Chip
              size="small"
              color="default"
              variant="outlined"
              label="Has Recipe"
              sx={{ opacity: 0.6 }}
            />
          </Box>
        </Paper>

        {/* Summary */}
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle1">
            {slotsToGenerate} meal{slotsToGenerate !== 1 ? 's' : ''} will be randomly generated
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          variant="contained"
          startIcon={<ShuffleIcon />}
          onClick={handleGenerate}
          disabled={slotsToGenerate === 0}
        >
          Generate Menu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RandomMenuDialog;
