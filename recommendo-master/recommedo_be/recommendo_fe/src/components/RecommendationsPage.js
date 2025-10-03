import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import booksImage from "./books.jpeg";
import moviesImage from "./movies.jpeg";
import podcastsImage from "./podcast.jpeg";
import songsImage from "./song.jpeg";

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { title: "Books", image: booksImage, route: "/books" },
    { title: "Movies", image: moviesImage, route: "/movies" },
    { title: "Podcasts", image: podcastsImage, route: "/podcasts" },
    { title: "Songs", image: songsImage, route: "/songs" },
  ];

  const handleNavigate = (route) => {
    setLoading(true);
    try {
      navigate(route);
      setLoading(false);
    } catch (err) {
      setError("Failed to navigate.");
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-8 bg-[#000300] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00df9a]">Explore Our Recommendations</h2>

      {loading && <div className="text-center text-[#00df9a]">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div
            key={category.title}
            onClick={() => handleNavigate(category.route)}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300 cursor-pointer hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00df9a]"
            tabIndex="0"
            role="button"
            aria-label={`Navigate to ${category.title}`}
          >
            <img
              src={category.image || "defaultImage.jpg"}
              alt={`${category.title} recommendations`}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold">{category.title}</h3>
              <p className="text-gray-400">Discover our curated picks for {category.title}.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;
