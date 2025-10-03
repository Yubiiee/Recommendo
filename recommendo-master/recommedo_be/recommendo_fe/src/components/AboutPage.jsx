import React from "react";
import { FaBook, FaFilm, FaMusic, FaPodcast } from "react-icons/fa";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-12">
      <div className="text-center max-w-3xl ">
        <h1 className="text-4xl font-bold mb-4 ">About Recommendo</h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to <span className="text-blue-500 font-semibold">Recommendo</span>! 🌟
          We've curated the ultimate collection of top picks to delight your senses and
          broaden your horizons. Dive into a world of discovery with personalized recommendations
          for <span className="text-yellow-500">books</span>, <span className="text-red-500">movies</span>,
          <span className="text-green-500"> songs</span>, and <span className="text-purple-500">podcasts</span>! 🎉
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Whether you're looking for the next page-turner, a blockbuster to binge-watch, a melody to
          vibe with, or an inspiring podcast, we've got you covered. Explore the diverse content we've
          tailored just for you. Recommendo is your gateway to unforgettable moments and stories. 🚀
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 animate-slideInUp">
        <div className="flex flex-col items-center">
          <FaBook className="text-yellow-500 text-6xl mb-2 animate-pulse" />
          <p className="text-center">Books</p>
        </div>
        <div className="flex flex-col items-center">
          <FaFilm className="text-red-500 text-6xl mb-2 animate-pulse" />
          <p className="text-center">Movies</p>
        </div>
        <div className="flex flex-col items-center">
          <FaMusic className="text-green-500 text-6xl mb-2 animate-pulse" />
          <p className="text-center">Songs</p>
        </div>
        <div className="flex flex-col items-center">
          <FaPodcast className="text-purple-500 text-6xl mb-2 animate-pulse" />
          <p className="text-center">Podcasts</p>
        </div>
      </div>
      <div className="mt-12 relative group">
        <img
          src="https://i.pinimg.com/736x/58/89/5a/58895a0f9e0342236423d36a8e5b72ef.jpg"
          alt="Content recommendation"
          className="rounded-lg shadow-lg max-w-full h-auto group-hover:opacity-75 transition-opacity duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
          <p className="text-white text-xl font-semibold">Choose from the Best</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;