import React, { useState } from 'react';
import axios from 'axios';

const MoviesPage = () => {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovieRecommendations = async () => {
    if (!movieName.trim()) {
      setError('Please enter a movie name.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/moviesrec/?movie_name=${encodeURIComponent(movieName)}`
      );

      if (response.data.recommendations) {
        setMovies(response.data.recommendations);
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (err) {
      console.error('Failed to fetch movie recommendations:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-8 bg-[#000300] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00df9a]">Movie Recommendations</h2>

      {/* Movie Search Input */}
      <div className="mb-8 text-center">
        <input
          type="text"
          className="p-2 w-full md:w-1/2 rounded-lg text-black"
          placeholder="Enter a movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button
          className="ml-4 bg-[#00df9a] text-black font-bold py-2 px-4 rounded-lg"
          onClick={fetchMovieRecommendations}
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Loading State */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Recommendations Grid */}
      {!loading && movies && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {Object.values(movies).map((movie, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4"
            >
              <h3 className="text-xl font-bold mb-2 text-[#00df9a]">{movie.title}</h3>
              <p className="text-gray-400 mb-2">
                <strong>Overview:</strong> {movie.overview || 'No overview available'}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Cast:</strong> {movie.cast ? movie.cast.join(', ') : 'No cast data available'}
              </p>
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  Visit Homepage
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Recommendations Message */}
      {!loading && movies.length === 0 && !error && (
        <p className="text-center text-gray-400">No recommendations found.</p>
      )}
    </div>
  );
};

export default MoviesPage;
