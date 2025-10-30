import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { SnackbarProvider } from './components/SnackbarProvider';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const BrowseRecipes = lazy(() => import('./pages/BrowseRecipes'));
const RecipeDetail = lazy(() => import('./pages/RecipeDetail'));
const WeeklyMenu = lazy(() => import('./pages/WeeklyMenu'));

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FF0000',
    },
    background: {
      default: '#F0F0F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    error: {
      main: '#FF0000',
    },
    warning: {
      main: '#FFA500',
    },
    info: {
      main: '#0000FF',
    },
    success: {
      main: '#00FF00',
    },
  },
  typography: {
    fontFamily: '"Courier New", "Roboto Mono", monospace',
    h1: {
      fontFamily: '"Impact", "Arial Black", sans-serif',
      fontWeight: 900,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: '"Arial Black", "Impact", sans-serif',
      fontWeight: 900,
      letterSpacing: '-0.01em',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: '"Arial Black", "Impact", sans-serif',
      fontWeight: 900,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Arial Black", "Impact", sans-serif',
      fontWeight: 900,
      textTransform: 'uppercase',
    },
    h5: {
      fontFamily: '"Arial Black", "Impact", sans-serif',
      fontWeight: 900,
      textTransform: 'uppercase',
    },
    h6: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: '"Courier New", monospace',
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body2: {
      fontFamily: '"Courier New", monospace',
      fontSize: '0.875rem',
    },
    button: {
      fontFamily: '"Arial Black", sans-serif',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '4px 4px 0px #000000',
          border: '3px solid #000000',
          transition: 'all 0.1s ease-in-out',
          '&:hover': {
            boxShadow: '6px 6px 0px #000000',
            transform: 'translate(-2px, -2px)',
          },
          '&:active': {
            boxShadow: '2px 2px 0px #000000',
            transform: 'translate(2px, 2px)',
          },
        },
        contained: {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#333333',
          },
        },
        outlined: {
          backgroundColor: '#FFFFFF',
          borderWidth: '3px',
          '&:hover': {
            borderWidth: '3px',
            backgroundColor: '#F0F0F0',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '4px solid #000000',
          boxShadow: '8px 8px 0px #000000',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': {
              borderWidth: '3px',
              borderColor: '#000000',
            },
            '&:hover fieldset': {
              borderWidth: '3px',
              borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '4px',
              borderColor: '#000000',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderWidth: '2px',
          fontWeight: 700,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 0px #000000',
          borderBottom: '4px solid #000000',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          borderRight: '4px solid #000000',
        },
      },
    },
  },
});

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Browse Recipes', icon: <BookIcon />, path: '/recipes' },
  { text: 'Weekly Menu', icon: <CalendarTodayIcon />, path: '/weekly-menu' },
];

function AppContent() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

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
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
        <Toolbar sx={{ minHeight: '80px!important' }}>
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
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontFamily: '"Impact", "Arial Black", sans-serif',
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              letterSpacing: '0.05em',
              textShadow: '3px 3px 0px #FF0000',
              '&:hover': {
                textShadow: '4px 4px 0px #FF0000, 8px 8px 0px #FFA500',
              },
            }}
          >
            [ FAMILY_RECIPES ]
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <IconButton
                  key={item.text}
                  color="inherit"
                  size="large"
                  component={Link}
                  to={item.path}
                  aria-label={item.text}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      <Suspense
        fallback={
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<BrowseRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/weekly-menu" element={<WeeklyMenu />} />
        </Routes>
      </Suspense>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <FavoritesProvider>
          <Router>
            <AppContent />
          </Router>
        </FavoritesProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
