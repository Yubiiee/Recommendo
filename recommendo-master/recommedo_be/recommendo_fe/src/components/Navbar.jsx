import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Import Link

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">RECOMMENDO.</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        <li className="p-4 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        
        <li className="p-4">
          <Link to="/about">About</Link>
        </li>
        <li className="p-4">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Mobile Hamburger Icon */}
      <div onClick={handleNav} className="md:hidden">
        {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`fixed left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] transition-transform duration-500 ease-in-out ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
        <h1 className="w-full text-3xl font-bold text-[#00df9a] p-4">RECOMMENDO.</h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600 cursor-pointer" onClick={handleNav}>
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 border-b border-gray-600" onClick={handleNav}>
            <Link to="/feedback">Feedback</Link>
          </li>
          <li className="p-4 border-b border-gray-600" onClick={handleNav}>
            <Link to="/about">About</Link>
          </li>
          <li className="p-4 border-b border-gray-600" onClick={handleNav}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
