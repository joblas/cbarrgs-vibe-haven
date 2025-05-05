import React from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
import SimplifiedApp from './SimplifiedApp.tsx'; // Use simplified app for debugging
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <SimplifiedApp />
  </React.StrictMode>
);
