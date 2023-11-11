import React from 'react';
import { DropDown } from '../DropDown/DropDown';
import './style.css';

export const Header = ({
  selectedList,
  handleListChange,
  isDetailsOrErrorVisible,
}) => {
  return (
    <div className='header-container'>
      <h1>KAKANS's MOVIE HUB</h1>
      {!isDetailsOrErrorVisible && (
        <DropDown
          selectedList={selectedList}
          setSelectedList={handleListChange}
        />
      )}
    </div>
  );
};
