import React, { useState } from "react";
import axios from "axios";

const SongRecommendationPage = () => {
  const [songName, setSongName] = useState("");
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      // Send GET request with song_name and number_songs as query parameters
      const response = await axios.get("/recommendations/", {
        params: {
          song_name: songName,
          number_songs: 4,  // Number of recommendations
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      // Make sure response.data.recommendations is an array before updating the state
      if (Array.isArray(response.data.recommendations)) {
        setRecommendedSongs(response.data.recommendations);
      } else {
        setRecommendedSongs([]); // In case recommendations is not an array
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Song Recommendations</h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          placeholder="Enter song name..."
          className="p-2 rounded-lg text-black"
        />

        <button
          onClick={fetchRecommendations}
          className="bg-[#00df9a] text-black p-2 rounded-lg ml-4"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-400">Loading recommendations...</p>}

      {error && <p className="text-center text-red-400">{error}</p>}

      {recommendedSongs && recommendedSongs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recommendedSongs.map((song, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 text-center">
              <h3 className="text-xl font-bold">{song.track_name}</h3>
              <p className="text-gray-400">Artist: {song.artist}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-400">No recommendations found.</p>
      )}
    </div>
  );
};

export default SongRecommendationPage;
