import React from "react";
import { useNavigate } from "react-router-dom"; // Correct import
import { ReactTyped } from "react-typed"; // Correct import

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2 uppercase">Curated Picks, Just for You</p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">EXPLORE WITH US.</h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Find Your Next Favorite
          </p>
          <ReactTyped
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            strings={['Music', 'Books', 'Podcasts', 'Movies']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          From tunes to tales, Recommendo’s got the perfect picks just for you!
        </p>
        <button
          onClick={() => navigate("/recommendations")} // navigate function works now
          className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
