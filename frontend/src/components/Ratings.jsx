import React from 'react';
import { FaSprayCanSparkles } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import Reviews from './Reviews';

const Ratings = () => {
  return (
    <div className="px-40">
    {/* Your existing rating summary */}
    <div className="max-w-6xl mx-auto text-center py-12 px-4">
      {/* Top Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center space-x-2 mb-4">
          {/* You can add your leaf/wreath icons here */}
          <span>🌿</span>
          <h1 className="text-5xl font-bold">4.8</h1>
          <span>🌿</span>
        </div>
        <h2 className="text-lg font-semibold mb-2">Guest favourite</h2>
        <p className="text-gray-500 max-w-md">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
      </div>

      {/* Rating Bars */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-300 pb-8 mb-8">
        {/* Left side */}
        <div className="text-left w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="font-semibold mb-4">Overall rating</h3>
          {[5, 4, 3, 2, 1].map((num) => (
            <div key={num} className="flex items-center space-x-2 mb-2">
              <span className="w-4">{num}</span>
              <div className="flex-1 bg-gray-200 h-1 relative">
                {num === 5 && <div className="absolute bg-black h-1" style={{ width: '90%' }} />}
                {num === 4 && <div className="absolute bg-black h-1" style={{ width: '5%' }} />}
                {num === 3 && <div className="absolute bg-black h-1" style={{ width: '3%' }} />}
              </div>
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex flex-wrap justify-center md:justify-start gap-8 w-full md:w-2/3">
          <div className="flex flex-col items-center">
            <p className="font-semibold">Cleanliness</p>
            <p className="text-xl font-bold">4.7</p>
            <FaSprayCanSparkles className="text-2xl mt-1" />
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Accuracy</p>
            <p className="text-xl font-bold">4.8</p>
            <FaCheckCircle className="text-2xl mt-1" />
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Check-in</p>
            <p className="text-xl font-bold">5.0</p>
            <FaKey className="text-2xl mt-1" />
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Communication</p>
            <p className="text-xl font-bold">4.8</p>
            <FaCommentAlt className="text-2xl mt-1" />
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Location</p>
            <p className="text-xl font-bold">4.9</p>
            <FaMapMarkedAlt className="text-2xl mt-1" />
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold">Value</p>
            <p className="text-xl font-bold">4.9</p>
            <FaTags className="text-2xl mt-1" />
          </div>
        </div>
      </div>
    </div>
    
    {/* New Reviews Section */}
    <Reviews/>
  </div>
  );
};

export default Ratings;
