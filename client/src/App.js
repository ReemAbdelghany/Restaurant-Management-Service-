import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import NavbarLayout from './components/NavbarLayout';
import Customer from './components/Customer';
import Order from './components/order';
import User from './components/user';
import UserType from './components/userType';
import Feedback from './components/feedback';
import Menu from './components/menu';
import MenuType from './components/menuType';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the root URL ("/") */}
        <Route
          path="/"
          element={<NavbarLayout><Customer /></NavbarLayout>}
        />
        <Route
          path="/order"
          element={<NavbarLayout><Order /></NavbarLayout>}
        />
        <Route
          path="/user"
          element={<NavbarLayout><User /></NavbarLayout>}
        />
        <Route
          path="/userType"
          element={<NavbarLayout><UserType /></NavbarLayout>}
        />
        <Route
          path="/feedback"
          element={<NavbarLayout><Feedback /></NavbarLayout>}
        />
        <Route
          path="/menu"
          element={<NavbarLayout><Menu /></NavbarLayout>}
        />
        <Route
          path="/menuType"
          element={<NavbarLayout><MenuType /></NavbarLayout>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
