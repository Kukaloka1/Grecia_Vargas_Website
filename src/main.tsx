import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Evita saltos raros al navegar atrás/adelante
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
