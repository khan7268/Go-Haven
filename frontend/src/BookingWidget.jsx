import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import UserContext from './userContext';

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
            // If user is not logged in, redirect to login page
            setRedirect('/login');
            return;
        }

        try {
            const response = await axios.post('/bookings', {
                checkIn, checkOut, numberOfGuests, name, phone,
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
        <div>
            <div className='bg-white shadow p-4 rounded-2xl '>
                <div className='text-2xl font-semibold text-center '>Price: ${place.price} per night</div>
                <div className='border rounded-2xl mt-4'>
                    <div className="flex">
                        <div className='py-3 px-4 border-r'>
                            <label>Check-in: </label>
                            <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                        </div>
                        <div className='py-3 px-4'>
                            <label>Check-out: </label>
                            <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div className='py-3 px-4 border-t'>
                            <label>Number of guests: </label>
                            <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                        </div>
                    </div>
                    {numberOfNights > 0 && (
                        <div className='py-3 px-4 border-t'>
                            <label>Your Full Name: </label>
                            <input type="text" value={name} onChange={ev => setName(ev.target.value)} />

                            <label>Mobile Number: </label>
                            <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
                        </div>
                    )}
                </div>
                <button className='primary mt-4 mb-6 cursor-pointer' onClick={bookThisPlace}>
                    Book this place
                    {numberOfNights > 0 && (
                        <span className='ml-1'> ${numberOfNights * place.price}</span>
                    )}
                </button>
            </div>
        </div>
    );
}

export default BookingWidget;
