import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon } from './Star.jsx';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { LoadingMessage } from '../LoadingMessage/LoadingMessage';
import { BackIcon } from '../Back.jsx';
import { GenreList } from '../GenreList/GenreList.jsx'; // Import GenreList

export const DetailsContent = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const formattedRating = movie.vote_average.toFixed(1);
  // Function to handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // IMDb link
  const imdbLink = `https://www.imdb.com/title/${movie.imdb_id}/?ref_=fn_al_tt_1`;

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
          {/* Conditionally render the image or a placeholder */}
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              alt={movie.title}
              onLoad={handleImageLoad}
              className='movie-poster'
            />
          ) : (
            <img
              src='https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg'
              alt='No Poster Available'
              className='movie-poster'
            />
          )}
          <div className='details'>
            <div>
              <h1>
                <a href={imdbLink} target='_blank' rel='noopener noreferrer'>
                  {movie.title}
                </a>
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
                    {company.name}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className='genre'>
              {/* Pass genres to GenreList */}
              <GenreList genres={movie.genres} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
