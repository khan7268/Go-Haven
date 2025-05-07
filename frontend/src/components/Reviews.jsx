import React from 'react';

const reviews = [
  {
    name: "Saakshi",
    years: "6 years on GoHaven",
    daysAgo: "2 days ago",
    rating: 4,
    review: "Great place to stay",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
  },
  {
    name: "Prateek",
    years: "8 years on GoHaven",
    daysAgo: "4 days ago",
    rating: 5,
    review: "Spacious, cozy, and a beautiful place. I would recommend this to people.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Paras",
    years: "2 years on GoHaven",
    daysAgo: "2 weeks ago",
    rating: 5,
    review: "Great place to stay",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Naina",
    years: "2 years on GoHaven",
    daysAgo: "3 weeks ago",
    rating: 3,
    review: "The location was good, and the check-in process was smooth. However, based on my hygiene standards, this place didn't meet my expectations. Although the photos made it appear ...",
    image: "https://randomuser.me/api/portraits/women/80.jpg",
  },
  {
    name: "Joshin",
    years: "8 years on GoHaven",
    daysAgo: "March 2025",
    rating: 4,
    review: "nice place.. amazing people.",
    image: "https://randomuser.me/api/portraits/men/82.jpg",
  },
  {
    name: "Ankur",
    years: "10 months on GoHaven",
    daysAgo: "March 2025",
    rating: 5,
    review: "nice place",
    image: null, // Only A letter shown
  },
];

const Reviews = () => {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="flex gap-4">
            {review.image ? (
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                {review.name.charAt(0)}
              </div>
            )}

            <div>
              <div className="font-semibold">{review.name}</div>
              <div className="text-gray-500 text-sm">{review.years}</div>
              <div className="flex items-center gap-1 mt-1">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                <span className="text-sm text-gray-600 ml-2">{review.daysAgo}</span>
              </div>
              <div className="mt-1">{review.review}</div>

              {review.review.length > 100 && (
                <button className="text-black underline text-sm mt-1">Show more</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button className="px-4 py-2 border rounded-lg">Show all 15 reviews</button>
        <button className="text-gray-500 underline">Learn how reviews work</button>
      </div>
    </div>
  );
};

export default Reviews;
