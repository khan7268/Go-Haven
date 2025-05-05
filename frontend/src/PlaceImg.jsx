import React from 'react'

function PlaceImg({place,className,index=0}) {
    if(!place.photos?.length) {
        return '';
    }
    if(!className) {
        className = 'object-cover';
    }
  return (
        <img className={className} src={'http://localhost:4000/uploads/' + place.photos[index]} alt='' />
  )
}

export default PlaceImg
