import React from 'react'

function PlaceImg({place,className,index=0}) {
    if(!place.photos?.length) {
        return '';
    }
    if(!className) {
        className = 'object-cover';
    }
   const backendBaseURL = 'https://airbnb-mern-sibb.onrender.com';
  return (
        <img className={className} src={`${backendBaseURL}/uploads/${place.photos[index]}`} alt='' />
  )
}

export default PlaceImg
