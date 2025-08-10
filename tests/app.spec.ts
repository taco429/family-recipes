import { test, expect } from '@playwright/test';

test.describe('Family Recipes App', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Family Recipes/);
  });

  test('displays welcome message on home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Family Recipes')).toBeVisible();
  });

  test('navigation menu works on desktop', async ({ page, isMobile }) => {
    // Skip on mobile viewports
    if (isMobile) {
      test.skip();
    }

    await page.goto('/');
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check that menu button is not visible on desktop
    await expect(page.locator('[aria-label="menu"]')).not.toBeVisible();
    
    // Check that AppBar is visible
    const appBar = page.locator('header');
    await expect(appBar).toBeVisible();
    
    // Navigate to Browse Recipes (on desktop it's an icon button)
    await page.getByRole('link', { name: 'Browse Recipes' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Browse Recipes', { exact: true })).toBeVisible();
    
    // Navigate back to home
    await page.getByRole('link', { name: 'Family Recipes' }).click();
    await page.waitForLoadState('networkidle');
    
    // Navigate to Weekly Menu
    await page.getByRole('link', { name: 'Weekly Menu' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Weekly Menu Planner')).toBeVisible();
  });

  test('mobile menu drawer works', async ({ page, isMobile }) => {
    // Only test on mobile
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/');
    
    // Menu button should be visible on mobile
    const menuButton = page.locator('[aria-label="menu"]');
    await expect(menuButton).toBeVisible();
    
    // Click menu button to open drawer
    await menuButton.click();
    
    // Check drawer menu items
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Browse Recipes' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Weekly Menu' })).toBeVisible();
    
    // Click outside to close drawer
    await page.click('body', { position: { x: 300, y: 100 } });
    
    // Drawer should be closed
    await expect(page.getByRole('presentation')).not.toBeVisible();
  });

  test('browse recipes page functionality', async ({ page }) => {
    await page.goto('/#/recipes');
    
    // Check page title
    await expect(page.getByText('Browse Recipes', { exact: true })).toBeVisible();
    
    // Check search functionality
    const searchInput = page.getByPlaceholder('Search recipes...');
    await expect(searchInput).toBeVisible();
    
    await searchInput.fill('chicken');
    await expect(page.getByText("Hearty Chicken Soup", { exact: true })).toBeVisible();
    await expect(page.getByText("Classic Apple Pie")).not.toBeVisible();
  });

  test('recipe detail page displays correctly', async ({ page }) => {
    await page.goto('/#/recipe/moms-chicken-soup');
    
    // Check recipe title
    await expect(page.getByText("Hearty Chicken Soup", { exact: true })).toBeVisible();
    
    // Check sections
    await expect(page.getByText('Ingredients')).toBeVisible();
    await expect(page.getByText('Instructions')).toBeVisible();
    
    // Check back button
    await expect(page.getByRole('button', { name: /back/i })).toBeVisible();
  });

  test('weekly menu planner functionality', async ({ page }) => {
    await page.goto('/#/weekly-menu');
    
    // Check page title
    await expect(page.getByText('Weekly Menu Planner')).toBeVisible();
    
    // Check days of week are displayed
    await expect(page.getByText('Monday')).toBeVisible();
    await expect(page.getByText('Tuesday')).toBeVisible();
    await expect(page.getByText('Sunday')).toBeVisible();
    
    // Check meal type label (only Dinner should be present now)
    await expect(page.getByText('Dinner').first()).toBeVisible();
  });

  test('responsive design adapts to viewport', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('[aria-label="menu"]')).not.toBeVisible();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[aria-label="menu"]')).toBeVisible();
  });

  test('app uses Material-UI theme colors', async ({ page }) => {
    await page.goto('/');
    
    // Check that the AppBar has the correct background color
    const appBar = page.locator('header');
    await expect(appBar).toHaveCSS('background-color', 'rgb(46, 125, 50)'); // #2e7d32 in RGB
  });
}); 