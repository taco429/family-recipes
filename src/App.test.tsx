import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app without crashing', () => {
  render(<App />);
});

test('renders the app header with site title', () => {
  render(<App />);
  const titleElement = screen.getByRole('link', { name: /^\[\s*recipes\s*\]$/i });
  expect(titleElement).toBeInTheDocument();
});

test('renders the home page welcome message', async () => {
  render(<App />);
  const welcomeElement = await screen.findByText(/welcome to recipes/i);
  expect(welcomeElement).toBeInTheDocument();
});
