import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PopularList } from './components/PolularList/PopularList';
import { Details } from './components/Details/Details';
import { Header } from './components/Header/Header';

export const App = () => {
  const [selectedList, setSelectedList] = useState('popular');

  const handleListChange = (value) => {
    setSelectedList(value);
  };

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header
                selectedList={selectedList}
                handleListChange={handleListChange}
              />
              <PopularList
                selectedList={selectedList}
              />
            </>
          }
        />
        <Route
          path='/movies/:id'
          element={<Details />}
        />
      </Routes>
    </Router>
  );
};
