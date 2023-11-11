import React from 'react';
import { ClipLoader } from 'react-spinners';

export const LoadingMessage = () => (
  <div className='loading-message'>
    <ClipLoader size={55} color={'#123abc'} loading={true} />
    Loading...
  </div>
);

