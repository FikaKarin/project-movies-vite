import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorMessage = ({ message }) => (
  <div className='error-message'>
    {message}
    <Link to='/' className='back-button'>
      Go back to Home
    </Link>
  </div>
);

