import React from 'react';
import './style.css';

export const DropDown = ({
    selectedList,
    setSelectedList,
    dropdownRef,
    isDropdownOpen,
  }) => {
    const handleListChange = (event) => {
      setSelectedList(event.target.value);
    };
  
    return (
        <div
          className={`dropdown ${isDropdownOpen ? 'open' : ''}`}
          ref={dropdownRef}
        >
          <div className='dropdown-menu'>
            <label htmlFor='movie-list'>Select movie list:</label>
            <select
              id='movie-list'
              value={selectedList}
              onChange={handleListChange}
            >
              <option value='popular'>Popular</option>
              <option value='upcoming'>Upcoming</option>
              <option value='now_playing'>Now Playing</option>
            </select>
          </div>
        </div>
    );
  };