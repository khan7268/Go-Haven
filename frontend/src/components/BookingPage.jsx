import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom'
import AddressLink from '../AddressLink';
import PlaceGallery from '../PlaceGallery';
import BookingDates from '../BookingDates';
import UserContext from '../UserContext';

function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      })
    }

  }, [id]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!booking) {
    return '';
  }

  return (
    <div className='my-8 mx-50'>
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className='bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between'>
        <div>
          <h2 className='text-2xl mb-4'>Your booking information: </h2>
          <BookingDates booking={booking} />
        </div>
        <div className='bg-[#F5385D] p-5 rounded-2xl text-white'>
          <div>Total Price: </div>
          <div className='text-3xl'>${booking.price}</div>

        </div>
      </div>
      <PlaceGallery place={booking.place} />
      <div className='relative mt-8 gap-9 grid grid-cols-1 '>
                    <div>
                        <h1 className='text-2xl font-semibold'> Room in {booking.place.address}</h1>
                        <p className='text-lg'>{booking.place.maxGuests} beds. Dedicated Bathroom </p>

                        <div className="border border-gray-800 rounded-2xl my-6 px-4 py-4 grid grid-cols-[1fr_2fr_0.7fr] items-center gap-4">
                            <div className="flex flex-col items-center justify-center text-lg font-semibold text-center space-y-1">
                                <div className="flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                                        />
                                    </svg>
                                    <div className='ml-3'>
                                        <div>Guest</div>
                                        <div>Favourite</div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center text-lg font-semibold">
                                <div>One of the most loved homes on</div>
                                <div>GoHaven</div>
                            </div>
                            <div className='text-center text-lg font-semibold'>
                                <h2>4.9</h2>
                                <div className='grid grid-cols-5 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                    </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <hr className='border-gray-400' />

                        <div className='my-4'>
                            <h2 className='text-2xl font-semibold mb-2'>About this place</h2>
                            {booking.place.description}
                        </div>
                        <div>
                            Check-in: {booking.place.checkIn} <br />
                            Check-out: {booking.place.checkOut} <br />
                            Maximum Guests: {booking.place.maxGuests}
                        </div>

                        <div className='mt-3'>
                            <h2 className='text-2xl font-semibold mb-2'>Extra Information</h2>
                            <div className='text-sm text-gray-700 leading-4'>{booking.place.extraInfo}</div>
                        </div>
                    </div>

                </div>
    </div>
  )
}

export default BookingPage
