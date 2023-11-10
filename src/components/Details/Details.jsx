import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BackIcon } from '../Back';
import { StarIcon } from './Star.jsx';
import { ClipLoader } from 'react-spinners';
import './style.css';

export const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=516db8fd137645c9d9dd6e6194f6ba01&language=en-US`
        );
        if (response.status === 404) {
          throw new Error('Movie not found');
        }
        const data = await response.json();
        console.log(data); // Log the movie data to inspect its structure
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) {
    return (
      <div className='error-message'>
        {error}
        <Link to='/' className='back-button'>
          Go back to Home
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='loading-message'>
        <ClipLoader size={35} color={'#123abc'} loading={loading} />
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className='error-message'>
        Movie not found
        <Link to='/' className='back-button'>
          Go back to Home
        </Link>
      </div>
    );
  }

  const formattedRating = movie.vote_average.toFixed(1); // Format rating to one decimal

  return (
    <div className='detailPage'>
      <Link to='/' className='backLink'>
        <BackIcon />
        Movies
      </Link>
      <div
        className='background'
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      >
        <div className='summary'>
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
              e.target.src = 'path/to/fallback-image.jpg'; // Set a fallback image source
            }}
          />
          <div className='details'>
            <div>
              <h1>
                {movie.title}
                <span className='rating'>
                  <span className='star'>
                    <StarIcon />
                  </span>
                  {formattedRating}
                </span>
              </h1>
              <p>{movie.overview}</p>
              <div className='production-companies'>
                <h3>Production Companies:</h3>
                {movie.production_companies.map((company, index) => (
                  <React.Fragment key={company.id}>
                    {index > 0 && ', '}{' '}
                    {/* Add a comma and space for companies after the first one */}
                    <Link id='link' to={`/production-company/${company.id}`}>
                      {company.name}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
