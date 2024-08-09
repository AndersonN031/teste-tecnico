// routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/loginForm';
import Register from './components/register/registerForm';
import CreateProduct from './components/products/createProducts';
import PrivateRouter from './components/products/products';
import UpdateProduct from './components/products/updateProduct';



const AppRoutes = () => (
  <Routes>
    <Route path="/" element={Login} />
    <Route path="/register" element={<Register />} />
    <Route path="/products" element={PrivateRouter} />
    <Route path="/createProducts" element={CreateProduct} />
    <Route path='/updateProduct/:id' element={<UpdateProduct />} />

  </Routes>
);

export default AppRoutes;

