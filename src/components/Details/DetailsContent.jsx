import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon } from './Star.jsx';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { LoadingMessage } from '../LoadingMessage/LoadingMessage';
import { BackIcon } from '../Back.jsx';

export const DetailsContent = () => {
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
    return <ErrorMessage message={error} />;
  }

  if (loading) {
    return <LoadingMessage />;
  }

  const formattedRating = movie.vote_average.toFixed(1); // Format rating to one decimal

  return (
    <div>
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
        <div className='overlay'></div>
        <div className='summary'>
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
              e.target.src = '../../assets/fallBack.jpeg'; // Set a fallback image source
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
                    {index > 0 && ', '}
                    {/* Add a comma and space for companies after the first one */}
                    {company.name}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className='genre'>
              <h3>Genre:</h3>
              {movie.genres.map((genre) => (
                <h5 key={genre.id}>{genre.name}</h5>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
