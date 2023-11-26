import React from 'react';

export const GenreList = ({ genres }) => {
  return (
    <div>
      <h3>Genre:</h3>
      {genres.map((genre) => (
        <h5 key={genre.id}>{genre.name}</h5>
      ))}
    </div>
  );
};
