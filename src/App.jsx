// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';
import AuthGuard from './components/authGuard.jsx/authGuard';

function App() {
  return (
    <BrowserRouter>
      <AuthGuard />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

