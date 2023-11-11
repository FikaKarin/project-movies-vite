import { BackIcon } from '../Back';
import { Link } from 'react-router-dom';
import { DetailsContent } from './DetailsContent';
import './style.css';

export const Details = () => {
  

  return (
    <div className='detailPage'>
      <Link to='/' className='backLink'>
        <BackIcon />
        Movies
      </Link>
      <DetailsContent />
    </div>
  );
};
