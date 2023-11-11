import { BackIcon } from '../components/Back';
import { Link } from 'react-router-dom';
import { DetailsContent } from '../components/Details/DetailsContent';
import '../components/Details/style.css';

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
