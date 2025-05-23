import React from 'react'

function PlaceImg({place,className,index=0}) {
    if(!place.photos?.length) {
        return '';
    }
    if(!className) {
        className = 'object-cover';
    }
   const backendBaseURL = 'https://go-haven.onrender.com';
  return (
        <img className={`w-full h-full object-cover rounded-xl ${className}`} src={`${backendBaseURL}/uploads/${place.photos[index]}`} alt='' />
  )
}

export default PlaceImg
