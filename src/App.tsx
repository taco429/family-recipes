import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import RecipeCard from './components/RecipeCard';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#ff6f00',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'All Recipes', icon: <BookIcon />, path: '/recipes' },
  { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
  { text: 'Add Recipe', icon: <AddIcon />, path: '/add' },
];

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Family Recipes
            </Typography>
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {menuItems.map((item) => (
                  <IconButton key={item.text} color="inherit" size="large">
                    {item.icon}
                  </IconButton>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerContent}
        </Drawer>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Family Recipes
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Preserve and share your cherished family recipes with loved ones.
            </Typography>
          </Box>
          
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4, mb: 3 }}>
            Featured Recipes
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3
          }}>
            <RecipeCard
              title="Grandma's Apple Pie"
              description="A classic apple pie recipe passed down through generations, featuring a flaky crust and perfectly spiced apple filling."
              cookTime="90 min"
              difficulty="Medium"
            />
            <RecipeCard
              title="Uncle's BBQ Ribs"
              description="Tender, fall-off-the-bone ribs with a secret family BBQ sauce that's been perfected over decades."
              cookTime="4 hours"
              difficulty="Hard"
            />
            <RecipeCard
              title="Mom's Chicken Soup"
              description="The ultimate comfort food - a hearty chicken soup with vegetables that cures everything from colds to bad days."
              cookTime="45 min"
              difficulty="Easy"
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
