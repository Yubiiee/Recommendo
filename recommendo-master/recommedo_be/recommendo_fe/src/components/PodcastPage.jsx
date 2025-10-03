import React, { useState } from 'react';
import axios from 'axios';

const PodcastPage = () => {
  const [podcastName, setPodcastName] = useState('');
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPodcastRecommendations = async () => {
    if (!podcastName.trim()) {
      setError('Please enter a podcast name.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/podcastsrec/?podcast_name=${encodeURIComponent(podcastName)}`
      );

      if (response.data.recommendations) {
        setPodcasts(response.data.recommendations);
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (err) {
      console.error('Failed to fetch podcast recommendations:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-8 bg-[#000300] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00df9a]">Podcast Recommendations</h2>

      {/* Podcast Search Input */}
      <div className="mb-8 text-center">
        <input
          type="text"
          className="p-2 w-full md:w-1/2 rounded-lg text-black"
          placeholder="Enter a podcast name"
          value={podcastName}
          onChange={(e) => setPodcastName(e.target.value)}
        />
        <button
          className="ml-4 bg-[#00df9a] text-black font-bold py-2 px-4 rounded-lg"
          onClick={fetchPodcastRecommendations}
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Loading State */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Recommendations Grid */}
      {!loading && podcasts && podcasts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {podcasts.map((podcast, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4"
            >
              <h3 className="text-xl font-bold mb-2 text-[#00df9a]">{podcast.Title}</h3>
              <p className="text-gray-400 mb-2">
                <strong>Host(s):</strong> {podcast['Host(s)'] || 'No host data available'}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Description:</strong> {podcast.Description || 'No description available'}
              </p>
              {podcast['Thumbnail URL'] && (
                <img src={podcast['Thumbnail URL']} alt="Podcast Thumbnail" className="mb-2 w-full h-auto" />
              )}
              {/* Displaying Platform URL */}
              {podcast['Platforms URL'] && (
                <a
                  href={podcast['Platforms URL']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  Listen on Platform
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Recommendations Message */}
      {!loading && podcasts.length === 0 && !error && (
        <p className="text-center text-gray-400">No recommendations found.</p>
      )}
    </div>
  );
};

export default PodcastPage;