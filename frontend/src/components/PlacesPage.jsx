import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountNav from '../AccountNav';
import axios from 'axios';
import PlaceImg from '../PlaceImg';


function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className='text-center'>
        <Link className='inline-flex gap-1 bg-[#F5385D] text-white px-6 py-2 rounded-full' to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className='ml-2'>List Your Stay</span>
        </Link>
      </div>
      <div className='mt-4'>
        {places.length > 0 && places.map(place => (
          <Link to={'/account/places/' + place._id} className='flex gap-4 bg-gray-100 p-3 rounded-2xl cursor-pointer'>
            <div className='flex w-40 h-40 bg-gray-400 grow shrink-0'>
              <PlaceImg place={place} />
            </div>
            <div className='grow-0 shrink'>
              <h2 className='text-2xl'> {place.title} </h2>
              <p className='mt-3 '>{place.description}</p>
            </div>

          </Link>
        ))}
      </div>
    </div>
  )
}

export default PlacesPage
