import React, { useState } from "react";
import axios from "axios";

import harryPotterPoster from "./curse_child.jpg";

const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("popular"); // Default genre
  const [bookResults, setBookResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This function fetches book recommendations from the backend
  const fetchBooks = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
  
    try {
      // Encode the query parameters
      const encodedTitle = encodeURIComponent(searchQuery.toLowerCase());
      const encodedGenre = encodeURIComponent(selectedGenre);
  
      const response = await fetch(`/recommend/?book_title=${encodedTitle}&genre=${encodedGenre}`);
      
      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message in plain text
        throw new Error(errorMessage || "Error fetching recommendations.");
      }
  
      const data = await response.json(); // Parse the JSON response
      setBookResults(data);
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };
  

  return (
    <div className="bg-black text-white p-8 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00df9a]">Books</h2>
      
      <div className="flex justify-center mb-8">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-lg text-black"
        />

        {/* Genre Dropdown */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 rounded-lg ml-4 text-black"
        >
          <option value="action">Action</option>
          <option value="popular">All</option>
          <option value="adventure">Adventure</option>
          <option value="drama">Drama</option>
          <option value="fantasy">Fantasy</option>
          <option value="horror">Horror</option>
          <option value="mystery">Mystery</option>
          <option value="poetry">Poetry</option>
          <option value="romance">Romance</option>
          <option value="thriller">Thriller</option>
        </select>

        {/* Search Button */}
        <button
          onClick={fetchBooks}
          className="bg-[#00df9a] text-black p-2 rounded-lg ml-4"
        >
          Search
        </button>
      </div>

      {/* Results Section */}
      {loading ? (
        <p className="text-center text-gray-400">Loading recommendations...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : bookResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bookResults.map((book, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 text-center">
              <img
                src={book.Thumbnail || harryPotterPoster} // Fallback image
                alt={book.Title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold">{book.Title}</h3>
              <p className="text-gray-400">Author: {book.Author}</p>
              <p className="text-gray-400">{book.Description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No books found for "{searchQuery}" in "{selectedGenre}" genre.
        </p>
      )}
    </div>
  );
};

export default BooksPage;
