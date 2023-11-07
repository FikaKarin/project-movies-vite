import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BackIcon } from '../Back';
import { StarIcon } from './Star.jsx';
import './style.css';

export const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=516db8fd137645c9d9dd6e6194f6ba01&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
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
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})
          `,
        }}
      >
        <div className='summary'>
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
