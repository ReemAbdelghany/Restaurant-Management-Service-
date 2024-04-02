import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Dashboard from './components/dashboard';
import Customer from './components/Customer';
import Order from './components/order';
import OrderType from './components/orderType';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderType" element={<OrderType />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
