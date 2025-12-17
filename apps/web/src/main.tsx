import { Colors } from "@pickandtag/domain";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { applyTheme } from './applyTheme.ts';
import './index.css';

applyTheme(Colors);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
