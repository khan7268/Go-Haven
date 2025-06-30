import React from 'react';
import { FaSprayCanSparkles } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import Reviews from './Reviews';

const Ratings = () => {
  // Dummy data for demonstration.  In a real app, this would come
  // from the place data, likely via props.
  const placeRating = 4.8;
  const cleanlinessRating = 4.7;
  const accuracyRating = 4.8;
  const checkinRating = 5.0;
  const communicationRating = 4.8;
  const locationRating = 4.9;
  const valueRating = 4.9;

  return (
    <div className="px-4"> {/* Removed hardcoded 40px padding */}
      {/* Your existing rating summary */}
      <div className="mx-auto max-w-7xl text-center py-8 px-4"> {/* Added max-w-7xl and padding */}
        {/* Top Section */}
        <div className="flex flex-col items-center mb-6"> {/* Added mb-6 */}
          <div className="flex items-center space-x-2 mb-4">
            {/* You can add your leaf/wreath icons here */}
            <span>🌿</span>
            <h1 className="text-4xl font-bold text-[#F5385D]">{placeRating}</h1> {/* Made heading color consistent */}
            <span>🌿</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Guest favourite</h2> {/* Made color consistent */}
          <p className="text-gray-500 max-w-md">
            This home is a guest favourite based on ratings, reviews and reliability
          </p>
        </div>

        {/* Rating Bars */}
        <div className="flex flex-col md:flex-row justify-center items-center border-b border-gray-300 pb-8 mb-8 md:mb-16"> {/* Added justify-center for large screens and md:mb-16 */}
          {/* Left side */}
          <div className="text-left w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="font-semibold mb-4 text-gray-800">Overall rating</h3> {/* Made color consistent */}
            {[5, 4, 3, 2, 1].map((num) => (
              <div key={num} className="flex items-center space-x-2 mb-2">
                <span className="w-4 text-gray-700">{num}</span> {/* Made color consistent */}
                <div className="flex-1 bg-gray-200 h-2 relative">  {/* Changed h-1 to h-2 */}
                  {num === 5 && <div className="absolute bg-[#F5385D] h-2" style={{ width: `${placeRating * 20}%` }} />}  {/* Changed color and height, and width calculation */}
                  {num === 4 && <div className="absolute bg-[#F5385D] h-2" style={{ width: `${(placeRating - 4) * 100}%` }} />}
                  {num === 3 && <div className="absolute bg-[#F5385D] h-2" style={{ width: `${(placeRating - 3) * 33.33}%` }} />}
                </div>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex flex-wrap justify-center md:justify-start gap-8 w-full md:w-2/3 md:ml-80"> {/* Added md:ml-8 */}
             <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Cleanliness</p>
              <p className="text-xl font-bold text-[#F5385D]">{cleanlinessRating}</p>
              <FaSprayCanSparkles className="text-2xl mt-1 text-[#F5385D]" />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Accuracy</p>
              <p className="text-xl font-bold text-[#F5385D]">{accuracyRating}</p>
              <FaCheckCircle className="text-2xl mt-1 text-[#F5385D]" />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Check-in</p>
              <p className="text-xl font-bold text-[#F5385D]">{checkinRating}</p>
              <FaKey className="text-2xl mt-1 text-[#F5385D]" />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Communication</p>
              <p className="text-xl font-bold text-[#F5385D]">{communicationRating}</p>
              <FaCommentAlt className="text-2xl mt-1 text-[#F5385D]" />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Location</p>
              <p className="text-xl font-bold text-[#F5385D]">{locationRating}</p>
              <FaMapMarkedAlt className="text-2xl mt-1 text-[#F5385D]" />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold text-gray-700">Value</p>
              <p className="text-xl font-bold text-[#F5385D]">{valueRating}</p>
              <FaTags className="text-2xl mt-1 text-[#F5385D]" />
            </div>
          </div>
        </div>
      </div>

      {/* New Reviews Section */}
      <Reviews />
    </div>
  );
};

export default Ratings;
