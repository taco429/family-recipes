# Family Recipes

A responsive web application for preserving and sharing family recipes, built with React, TypeScript, and Material-UI.

## Features

- 📱 Responsive design that works on desktop and mobile devices
- 🎨 Modern Material Design UI with MUI components
- 📝 TypeScript for type safety
- 🧪 E2E testing with Playwright
- 🚀 Automated deployment to GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/<username>/family-recipes.git
cd family-recipes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs unit tests
- `npm run test:e2e` - Runs Playwright E2E tests
- `npm run test:e2e:ui` - Opens Playwright test UI

## Deployment

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch.

### Setup for GitHub Pages Deployment

1. Before pushing to GitHub, add the `homepage` field to `package.json`:
```json
"homepage": "https://<your-username>.github.io/family-recipes"
```
Replace `<your-username>` with your actual GitHub username.

2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

3. Push to the main branch to trigger automatic deployment:
```bash
git add .
git commit -m "Initial commit with React TypeScript and MUI"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy your app to GitHub Pages.

## Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
# Run tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui
```

## Technologies Used

- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Material-UI](https://mui.com/) - React component library
- [Playwright](https://playwright.dev/) - E2E testing framework
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [GitHub Pages](https://pages.github.com/) - Hosting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
