// routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/loginForm';
import Register from './components/register/registerForm';
import Products from './components/products/products';



const AppRoutes = () => (
  <Routes>
    <Route path="/" Component={Login} />
    <Route path="/register" element={<Register />} />
    <Route path="/products" Component={Products} />
  </Routes>
);

export default AppRoutes;

