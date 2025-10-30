import React, { useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Box,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import { Recipe } from '../data/types';
import { useSnackbar } from './SnackbarProvider';
import { aggregateIngredientsForShopping } from '../utils/ingredientFormatter';

interface ShoppingListProps {
  open: boolean;
  onClose: () => void;
  recipes: Recipe[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ open, onClose, recipes }) => {
  const [checkedItems, setCheckedItems] = React.useState<Set<string>>(new Set());
  const { showSnackbar } = useSnackbar();

  const shoppingList = useMemo(() => {
    return aggregateIngredientsForShopping(recipes);
  }, [recipes]);

  const totalRecipes = recipes.length;

  const handleToggle = (ingredient: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ingredient)) {
        newSet.delete(ingredient);
      } else {
        newSet.add(ingredient);
      }
      return newSet;
    });
  };

  const handleCopy = async () => {
    const listText = shoppingList.join('\n');
    try {
      await navigator.clipboard.writeText(listText);
      showSnackbar('Shopping list copied to clipboard!', 'success');
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = listText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showSnackbar('Shopping list copied to clipboard!', 'success');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSelectAll = () => {
    if (checkedItems.size === shoppingList.length) {
      setCheckedItems(new Set());
    } else {
      setCheckedItems(new Set(shoppingList));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">Shopping List</Typography>
            <Typography variant="caption" color="text.secondary">
              Consolidated from {totalRecipes} recipe{totalRecipes !== 1 ? 's' : ''}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleCopy} aria-label="copy">
              <ContentCopyIcon />
            </IconButton>
            <IconButton onClick={handlePrint} aria-label="print">
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {shoppingList.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No items in shopping list. Add recipes to your weekly menu to generate a shopping list.
          </Typography>
        ) : (
          <>
            <Box sx={{ mb: 2 }}>
              <Button size="small" onClick={handleSelectAll}>
                {checkedItems.size === shoppingList.length ? 'Deselect All' : 'Select All'}
              </Button>
            </Box>
            <Paper variant="outlined" sx={{ maxHeight: 400, overflow: 'auto' }}>
              <List dense>
                {shoppingList.map((ingredient) => (
                  <ListItem key={ingredient} disablePadding>
                    <ListItemButton
                      onClick={() => handleToggle(ingredient)}
                      sx={{
                        textDecoration: checkedItems.has(ingredient) ? 'line-through' : 'none',
                        opacity: checkedItems.has(ingredient) ? 0.6 : 1,
                      }}
                    >
                      <Checkbox checked={checkedItems.has(ingredient)} />
                      <ListItemText primary={ingredient} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>{shoppingList.length}</strong> unique ingredient
                {shoppingList.length !== 1 ? 's' : ''} needed
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Quantities are consolidated and totaled for all recipes
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShoppingList;
