import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PopularList } from './compomnents/PolularList/PopularList';
import { Details } from './compomnents/Details/Details';

export const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<PopularList />} />
      <Route path='/movies/:id' element={<Details />} />
    </Routes>
  </Router>
);
