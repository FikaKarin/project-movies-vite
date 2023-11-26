import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/PolularList/style.css';

export const PopularList = ({ selectedList }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // Use navigate hook to navigate to different routes

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedList}?api_key=516db8fd137645c9d9dd6e6194f6ba01&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(`Error fetching ${selectedList} movies:`, error);
      }
    };

    fetchMovies();
  }, [selectedList]);

  // Function to navigate to GenreList
  const navigateToGenreList = () => {
    navigate('/genres'); // Navigate to the 'genres' path
  };

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
      {/* Button to navigate to GenreList */}
      <button onClick={navigateToGenreList}>Show Genres</button>
    </div>
  );
};
