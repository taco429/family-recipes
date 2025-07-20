import { test, expect } from '@playwright/test';

test.describe('Family Recipes App', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Family Recipes/);
  });

  test('displays welcome message', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Welcome to Family Recipes')).toBeVisible();
    await expect(page.getByText('Preserve and share your cherished family recipes')).toBeVisible();
  });

  test('navigation menu works on desktop', async ({ page, isMobile }) => {
    // Skip on mobile viewports
    if (isMobile) {
      test.skip();
    }

    await page.goto('/');
    
    // Check that menu icons are visible on desktop
    await expect(page.getByRole('button', { name: /menu/i })).not.toBeVisible();
    
    // Check that AppBar is visible
    const appBar = page.locator('header');
    await expect(appBar).toBeVisible();
  });

  test('mobile menu drawer works', async ({ page, isMobile }) => {
    // Only test on mobile
    if (!isMobile) {
      test.skip();
    }

    await page.goto('/');
    
    // Menu button should be visible on mobile
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();
    
    // Click menu button to open drawer
    await menuButton.click();
    
    // Check drawer menu items
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByText('All Recipes')).toBeVisible();
    await expect(page.getByText('Favorites')).toBeVisible();
    await expect(page.getByText('Add Recipe')).toBeVisible();
    
    // Click outside to close drawer
    await page.click('body', { position: { x: 300, y: 100 } });
    
    // Drawer should be closed
    await expect(page.getByRole('presentation')).not.toBeVisible();
  });

  test('responsive design adapts to viewport', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('button', { name: /menu/i })).not.toBeVisible();
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
  });

  test('app uses Material-UI theme colors', async ({ page }) => {
    await page.goto('/');
    
    // Check that the AppBar has the correct background color
    const appBar = page.locator('header');
    await expect(appBar).toHaveCSS('background-color', 'rgb(46, 125, 50)'); // #2e7d32 in RGB
  });
}); 