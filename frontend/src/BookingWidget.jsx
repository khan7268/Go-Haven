import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    if (!user) {
      setRedirect('/login');
      return;
    }
    try {
      const response = await axios.post('/bookings', {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error('Booking error:', error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Price: ${place.price} / night
        </h2>

        {/* Dates */}
<div className="flex flex-wrap sm:flex-nowrap sm:space-x-4 mb-4">
  <div className="flex flex-col flex-1 min-w-0 mb-4 sm:mb-0">
    <label className="mb-1 font-medium">Check-in:</label>
    <input
      type="date"
      value={checkIn}
      onChange={(ev) => setCheckIn(ev.target.value)}
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-[200px] min-w-0"
    />
  </div>
  <div className="flex flex-col flex-1 min-w-0">
    <label className="mb-1 font-medium">Check-out:</label>
    <input
      type="date"
      value={checkOut}
      onChange={(ev) => setCheckOut(ev.target.value)}
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-[200px] min-w-0"
    />
  </div>
</div>


        {/* Guests */}
        <div className="mb-4">
          <label className="mb-1 font-medium block">Number of guests:</label>
          <input
            type="number"
            min={1}
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* User info - only if dates selected */}
        {numberOfNights > 0 && (
          <div className="space-y-4 mb-4">
            <div>
              <label className="mb-1 font-medium block">Your Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="mb-1 font-medium block">Mobile Number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        )}

        <button
          onClick={bookThisPlace}
          className="w-full primary cursor-pointer text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          Book this place
          {numberOfNights > 0 && (
            <span className="ml-2 font-normal">${numberOfNights * place.price}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default BookingWidget;
