// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import AccountNav from '../AccountNav';
// import axios from 'axios';
// import PlaceImg from '../PlaceImg';


// function PlacesPage() {
//   const [places, setPlaces] = useState([]);
//   useEffect(() => {
//     axios.get('/user-places').then(({ data }) => {
//       setPlaces(data);
//     });
//   }, []);

//   return (
//     <div>
//       <AccountNav />
//       <div className='text-center'>
//         <Link className='inline-flex gap-1 bg-[#F5385D] text-white px-6 py-2 rounded-full' to={'/account/places/new'}>
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
//           </svg>
//           <span className='ml-2'>List Your Stay</span>
//         </Link>
//       </div>
//       <div className='mt-4'>
//         {places.length > 0 && places.map(place => (
//           <Link to={'/account/places/' + place._id} className='flex gap-4 bg-gray-100 p-3 rounded-2xl cursor-pointer'>
//             <div className='flex w-40 h-40 bg-gray-400 grow shrink-0'>
//               <PlaceImg place={place} />
//             </div>
//             <div className='grow-0 shrink'>
//               <h2 className='text-2xl'> {place.title} </h2>
//               <p className='mt-3 '>{place.description}</p>
//             </div>

//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default PlacesPage
// import React, { useEffect, useState } from 'react'
// import { Link ,useNavigate,useParams} from 'react-router-dom'
// import AccountNav from '../AccountNav';
// import axios from 'axios';
// import PlaceImg from '../PlaceImg';
// import CancelBooking from './CancelBooking';


// function PlacesPage() {
//   const { id } = useParams();
//   const [places, setPlaces] = useState([]);
//  const [showCancelModal, setShowCancelModal] = useState(false);
 
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('/user-places').then(({ data }) => {
//       setPlaces(data);
//     });
//   }, []);

//   const handleCancelBooking = () => {
//     setShowCancelModal(true); // Show the confirmation modal
//   };

//   // Handle booking cancellation after confirmation
//   const handleBookingCancelConfirm = async () => {
//     try {
//       if (!id) {
//         console.error("Booking ID is missing.");
//         return;
//       }

//       const response = await axios.delete(`/bookings/${id}`);
//       setShowCancelModal(false);
//       navigate('/account/bookings');
//     } catch (error) {
//       setShowCancelModal(false);
//     }
//   };

//   const handleCancelBookingClose = () => {
//     setShowCancelModal(false); // Simply hide the modal without doing anything
//   };

//   return (
//     <div>
//       <AccountNav />
//       <div className="mt-6 flex flex-col gap-6">
//         {places.length > 0 &&
//           places.map((place) => (
//             <div
//               key={place._id}
//               className="flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition"
//             >
//               <Link
//                 to={'/account/places/' + place._id}
//                 className="flex flex-col md:flex-row gap-4 flex-1"
//               >
//                 <div className="w-full md:w-40 h-40 bg-gray-400 rounded-lg overflow-hidden shrink-0">
//                   <PlaceImg place={place} className={"w-full h-full object-cover rounded-lg"} />
//                 </div>
//                 <div className="flex-1">
//                   <h2 className="text-xl font-semibold">{place.title}</h2>
//                   <p className="mt-2 text-gray-700 text-sm">{place.description}</p>
//                 </div>
//               </Link>

//               {/* Delete Button */}
//               <button
//                 onClick={handleCancelBooking}
//                 className="cursor-pointer self-end md:self-center text-sm bg-[#F5385D] hover:bg-[#e02649] text-white px-4 py-2 rounded-md transition"
//               >
//                 Delete
//               </button>
//               {showCancelModal && (
//               <CancelBooking
//                 booking={booking}
//                 onCancel={handleBookingCancelConfirm}
//                 onClose={handleCancelBookingClose}
//               />
//             )}
//             </div>
//           ))}
//       </div>

//     </div>
//   )
// }

// export default PlacesPage

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountNav from '../AccountNav';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import CancelBooking from './CancelBooking';
import DeleteBooking from './DeleteBooking';

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);


const handleDelete = (place) => {
    setSelectedPlace(place);        // Set the selected place to be deleted
    setShowDeleteModal(true);       // Show the confirmation modal
};

const handleDeleteConfirm = async () => {
  try {
    if (!selectedPlace?._id) {
      console.error("Place ID is missing.");
      return;
    }

    // Make a DELETE request to the correct API route
    await axios.delete(`/user-places/${selectedPlace._id}`); // Call delete API
    
    // Remove the deleted place from UI (if you want to update the UI immediately)
    setPlaces((prev) => prev.filter((p) => p._id !== selectedPlace._id));

    // After successful deletion, navigate to PlacesPage
    setShowDeleteModal(false); // Close the modal
    setSelectedPlace(null); // Reset selected place
    navigate('/account/places'); // Navigate back to PlacesPage.jsx

  } catch (error) {
    console.error("Delete failed:", error);
    setShowDeleteModal(false);
  }
};

const handleDeleteClose = () => {
  setShowDeleteModal(false); // Close the modal without any action
  setSelectedPlace(null); // Reset selected place
};


 return (
    <div>
      <AccountNav />
      <div className='text-center'>
        <Link className='inline-flex gap-1 bg-[#F5385D] text-white px-6 py-2 rounded-full' to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>           <span className='ml-2'>List Your Stay</span>
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-6">
        {places.length > 0 ? (
          places.map((place) => (
            <div
              key={place._id}
              className="flex flex-col md:flex-row gap-4 bg-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <Link
                to={`/account/places/${place._id}`}
                className="flex flex-col md:flex-row gap-4 flex-1"
              >
                <div className="w-full md:w-40 h-40 bg-gray-400 rounded-lg overflow-hidden shrink-0">
                  <PlaceImg place={place} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{place.title}</h2>
                  <p className="mt-2 text-gray-700 text-sm">{place.description}</p>
                </div>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(place)}
                className="cursor-pointer self-end md:self-center text-sm bg-[#F5385D] hover:bg-[#e02649] text-white px-4 py-2 rounded-md transition"
              >
                Delete
              </button>
            </div>
          ))) : (
          <div className="text-center mt-40">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              Looks like you haven’t listed any stays yet. Let’s get started!
            </h1>
          </div>
        )
        }
        {showDeleteModal && selectedPlace && (
          <DeleteBooking booking={selectedPlace}
            onCancel={handleDeleteConfirm}
            onClose={handleDeleteClose} />
        )}
      </div>
    </div>
  );
}

export default PlacesPage;

