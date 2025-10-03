import React from "react";
import { FaEnvelope } from "react-icons/fa";

function ContactPage() {
  const creators = [
    {
      name: "Shreya Sharan",
      role: "Frontend Fanatic",
      contribution:
        "Shreya is a fanatic of frontend development with an interest in AI/ML. She built the movie recommendation feature of this website, blending creativity and technical expertise.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQESQGAsvrcpVg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1681145640215?e=1738195200&v=beta&t=5t9ShaCVuepuTAa8ArBbIdt_uJj2ul64ig2TQwawx70",
      linkedin: "inkedin.com/in/shreya-sharan-a7b507253/",
    },
    {
      name: "Shradha Gadia",
      role: "AI/ML Prodigy",
      contribution:
        "Shradha is proficient in AI/ML and backend technologies. She developed the book recommendation feature and seamlessly integrated the front and backend systems.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQGyc7nfoYBQ9w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1692373658385?e=1738195200&v=beta&t=JWdzqvw6SWuBvDj9O3KxUrH2z6IwEsCR2I6SUqrXycQ",
      linkedin: "https://www.linkedin.com/in/shradha-gadia-324179256/",
    },
    {
      name: "Yubika Singh",
      role: "Frontend Explorer",
      contribution:
        "Yubika, an explorer of frontend development, crafted the podcast recommendation feature of this website, ensuring an intuitive user experience.",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQEfA9JOGhn8-A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696878727152?e=1738195200&v=beta&t=D7iA-AnREd7qe-HwRlni4-XwUdoyqjJsWfw_X2NWREs",
      linkedin: "https://www.linkedin.com/in/yubika-singh-6b9b29287/",
    },
    {
      name: "Saloni Saini",
      role: "AI/ML Enthusiast",
      contribution:
        "Saloni is exploring the field of AI/ML and is a Python enthusiast. She developed the song recommendation feature, adding a harmonious touch to the platform.",
      image: "https://media.licdn.com/dms/image/v2/D5635AQGftjMicJtXfg/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1718639380761?e=1733245200&v=beta&t=_t8pmwr2ZzrIEgx4ndqHBXo7VrLsyf7vBXKwMmy6OII",
      linkedin: "https://www.linkedin.com/in/saloni-saini-aa7133252/",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Meet the Creators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {creators.map((creator, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={creator.image}
              alt={creator.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold mb-4">{creator.name}</h2>
            <p className="text-yellow-500 font-medium mb-2">{creator.role}</p>
            <p className="text-sm leading-relaxed mb-4">{creator.contribution}</p>
            <a
              href={creator.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              LinkedIn Profile
            </a>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col items-center">
        <a
          href="mailto:contact@recommendo.com"
          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 rounded-full p-4 shadow-lg transform transition-transform duration-300 hover:scale-110 flex items-center justify-center w-16 h-16"
          aria-label="Email Us"
        >
          <FaEnvelope className="text-4xl" />
        </a>
        <p className="text-base mt-4 text-center font-semibold">
          Contact us via <span className="text-yellow-500">Gmail</span>
        </p>
      </div>
    </div>
  );
}

export default ContactPage;