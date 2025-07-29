import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import RepairServiceForm from '../pages/RepairServiceForm';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import LoginModal from '../components/auth/LoginModal';

const AppRoutes = ({openLoginModal}) => {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails openLoginModal={openLoginModal} />} />
      <Route path="/repair-service" element={<RepairServiceForm />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<LoginModal />} />
    </Routes>
  );
};

export default AppRoutes;
