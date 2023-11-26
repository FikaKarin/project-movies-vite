import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PopularList } from './Screens/PopularList';
import { Details } from './Screens/Details';
import { GenreList } from './components/GenreList/GenreList'; // New import for GenreList
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
              {/* Nested Routes */}
              <Routes>
                <Route path='/' element={<PopularList selectedList={selectedList} />} />
                <Route path='genres/*' element={<GenreList />} />
              </Routes>
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
