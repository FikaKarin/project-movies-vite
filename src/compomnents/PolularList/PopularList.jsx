import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export const PopularList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=516db8fd137645c9d9dd6e6194f6ba01&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };
    fetchPopularMovies();
  }, []);
  
  return (
    <div className='movie-list'>
      {movies.map((movie) => (
        <div key={movie.id} className='movie-item'>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
            />
            <div className='overlay'>
              <div className='movie-title'>{movie.title}</div>
              <div className='movie-release-date'>{movie.release_date}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
