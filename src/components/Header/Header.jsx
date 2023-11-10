import React from 'react';
import { DropDown } from '../DropDown/DropDown';
import './style.css';

export const Header = ({
  selectedList,
  handleListChange,
  dropdownRef,
  isDropdownOpen,
}) => {
  return (
    <div className='header-container'>
      <h1>KAKANS's MOVIE HUB</h1>
      <DropDown
        selectedList={selectedList}
        setSelectedList={handleListChange}
        dropdownRef={dropdownRef}
        isDropdownOpen={isDropdownOpen}
      />
    </div>
  );
};
