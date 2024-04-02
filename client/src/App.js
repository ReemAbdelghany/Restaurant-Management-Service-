import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import NavbarLayout from './components/NavbarLayout';
import Customer from './components/Customer';
import Order from './components/order';
import User from './components/user';
import UserType from './components/userType';
import Feedback from './components/feedback';
import Menu from './components/menu';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/customer"
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

        {/* Route for main page */}
        <Route
          path="/"
          element={<h1>Main Page</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
