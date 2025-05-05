import React from 'react';

const ExploreSection = () => {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-medium mb-4">Continue exploring amazing pools</h2>
      <button className="bg-black text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-gray-800">
        Show more
      </button>

      <div className="bg-gray-100 mt-10 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6 text-left">Inspiration for future getaways</h2>

          <div className="flex border-b border-gray-300 mb-6">
            <button className="text-black font-semibold border-b-2 border-black pb-2 mr-6">Unique stays</button>
            <button className="text-gray-500 pb-2">Categories</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-left text-sm">
            <div>
              <p className="font-semibold">Yurt Rentals</p>
              <p className="text-gray-500">United States</p>
            </div>
            <div>
              <p className="font-semibold">Yurt Rentals</p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
            <div>
              <p className="font-semibold">Castle Rentals</p>
              <p className="text-gray-500">United States</p>
            </div>
            <div>
              <p className="font-semibold">Houseboats</p>
              <p className="text-gray-500">United States</p>
            </div>
            <div>
              <p className="font-semibold">Holiday Caravans</p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
            <div>
              <p className="font-semibold">Private Island Rentals</p>
              <p className="text-gray-500">United States</p>
            </div>
            <div>
              <p className="font-semibold">Farm Houses</p>
              <p className="text-gray-500">United States</p>
            </div>
            <div>
              <p className="font-semibold">Farm Cottages</p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
            <div>
              <p className="font-semibold">Cabin Rentals</p>
              <p className="text-gray-500">Australia</p>
            </div>
            <div>
              <p className="font-semibold">Luxury Cabins</p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
            <div>
              <p className="font-semibold">Luxury Cabins</p>
              <p className="text-gray-500">United States</p>
            </div>
            <div>
              <p className="font-semibold">Holiday Chalets</p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
            <div>
              <p className="font-semibold">Cottage Rentals</p>
              <p className="text-gray-500">United States</p>
            </div>
            <div>
              <p className="font-semibold">Holiday Cottages</p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
            <div>
              <p className="font-semibold">Mansion Rentals</p>
              <p className="text-gray-500">United States</p>
            </div>
            <div>
              <p className="font-semibold">Villa Rentals</p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
            <div>
              <p className="font-semibold">Holiday Bungalows</p>
              <p className="text-gray-500">United Kingdom</p>
            </div>
            <div>
              <p className="font-semibold">Show more ⌄</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExploreSection;