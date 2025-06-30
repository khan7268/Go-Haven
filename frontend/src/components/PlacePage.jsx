// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import BookingWidget from '../BookingWidget';
// import PlaceGallery from '../PlaceGallery';
// import AddressLink from '../AddressLink';
// import PerksDisplay from '../PerksDisplay';
// import Ratings from './Ratings';
// import LocationMap from './LocationMap';

// function PlacePage() {
//     const { id } = useParams();
//     const [place, setPlace] = useState(null);

//     useEffect(() => {

//         if (!id) return;

//         axios.get(`/places/${id}`).then(response => {
//             setPlace(response.data);
//         })
//     }, [id]);

//     if (!place) return '';

//     return (
//         <div className='mt-6 bg-gray-100 -mx-8 p-6'>
//             <div className='mx-50'>
//                 <h1 className='text-3xl '>{place.title}</h1>
//                <AddressLink>{place.address}</AddressLink>
//                 <PlaceGallery place={place}/>
//                 <div className='relative mt-8 gap-9 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
//                     <div>
//                         <h1 className='text-2xl font-semibold'> Room in {place.address}</h1>
//                         <p className='text-lg'>{place.maxGuests} beds. Dedicated Bathroom </p>

//                         <div className="border border-gray-800 rounded-2xl my-6 px-4 py-4 grid grid-cols-[1fr_2fr_0.7fr] items-center gap-4">
//                             <div className="flex flex-col items-center justify-center text-lg font-semibold text-center space-y-1">
//                                 <div className="flex items-center justify-center">
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         strokeWidth="1.5"
//                                         stroke="currentColor"
//                                         className="w-6 h-6"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
//                                         />
//                                     </svg>
//                                     <div className='ml-3'>
//                                         <div>Guest</div>
//                                         <div>Favourite</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="text-center text-lg font-semibold">
//                                 <div>One of the most loved homes on</div>
//                                 <div>GoHaven</div>
//                             </div>
//                             <div className='text-center text-lg font-semibold'>
//                                 <h2>4.9</h2>
//                                 <div className='grid grid-cols-5 '>
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
//                                         <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
//                                     </svg>
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
//                                         <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
//                                     </svg>
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
//                                         <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
//                                     </svg>
//                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
//                                         <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
//                                     </svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
//                                         <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
//                                     </svg>

//                                 </div>
//                             </div>
//                         </div>
//                         <hr className='border-gray-400' />

//                         <div className='my-4'>
//                             <h2 className='text-2xl font-semibold mb-2'>About this place</h2>
//                             {place.description}
//                         </div>
//                         <div>
//                             Check-in: {place.checkIn} <br />
//                             Check-out: {place.checkOut} <br />
//                             Maximum Guests: {place.maxGuests}
//                         </div>

//                         <div className='mt-4'>
//                             <h2 className='text-2xl font-semibold mb-2'>Extra Information</h2>
//                             <div className='text-sm text-gray-700 leading-4'>{place.extraInfo}</div>
//                         </div>
//                         <hr className='border-gray-400 mt-4' />
//                         <div className='my-3'>
//                             <PerksDisplay place={place}/>
//                         </div>

//                     </div>
//                     <div className='sticky top-24 self-start'>
//                         <BookingWidget place={place} />
//                     </div>
//                 </div>
//             </div>
//             <hr className='border-gray-400 mt-20' />
//             <Ratings/>
//             {/* <LocationMap>{place.address}</LocationMap> */}

//         </div>
//     )
// }

// export default PlacePage
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import AddressLink from '../AddressLink';
import PerksDisplay from '../PerksDisplay';
import Ratings from './Ratings';
import ExploreSection from '../components/ExploreSection'
import Footer from '../components/Footer';

import LocationMap from './LocationMap';

function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) return;
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        })
    }, [id]);

    if (!place) return '';

    return (
        <div className='mt-6 bg-gray-100 p-4'> {/* Adjusted padding for smaller screens */}
            <div className='mx-auto max-w-7xl'> {/* Added max-width for larger screens */}
                <h1 className='text-3xl font-bold mb-2'>{place.title}</h1> {/* Added mb-2 for spacing */}
                <AddressLink>{place.address}</AddressLink>
                <PlaceGallery place={place} />
                <div className='relative mt-8 gap-9 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>  {/* grid-cols-1 on small, md:grid-cols on larger */}
                    <div>
                        <h1 className='text-2xl font-semibold mb-2'> Room in {place.address}</h1> {/* Added mb-2 */}
                        <p className='text-lg mb-4'>{place.maxGuests} beds. Dedicated Bathroom </p> {/* Added mb-4 */}

                        <div className="border border-gray-200 rounded-2xl my-6 p-4 bg-white shadow-md">
                            <div className="flex flex-col md:flex-row items-center justify-around text-lg font-semibold text-center space-y-4 md:space-y-0 md:space-x-8">
                                <div className="flex flex-col items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6 text-[#F5385D]"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                                        />
                                    </svg>
                                    <div className='ml-3'>
                                        <div className="text-gray-700">Guest</div>
                                        <div className="text-gray-700">Favourite</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-gray-700">One of the most loved homes on</div>
                                    <div className="text-[#F5385D] font-bold">GoHaven</div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#F5385D]">4.9</h2>
                                    <div className='flex'>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 text-yellow-500">
                                                <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='border-gray-400 my-6' />

                        <div className='my-4'>
                            <h2 className='text-2xl font-semibold mb-2'>About this place</h2>
                            <p className='text-gray-700 leading-relaxed'>{place.description}</p>
                        </div>
                        <div className="text-gray-700">
                            <p><span className="font-semibold">Check-in:</span> {place.checkIn}</p>
                            <p><span className="font-semibold">Check-out:</span> {place.checkOut}</p>
                            <p><span className="font-semibold">Maximum Guests:</span> {place.maxGuests}</p>
                        </div>

                        <div className='mt-4'>
                            <h2 className='text-2xl font-semibold mb-2'>Extra Information</h2>
                            <div className='text-sm text-gray-700 leading-relaxed'>{place.extraInfo}</div>
                        </div>
                        <hr className='border-gray-400 mt-6' />
                        <div className='my-6'>
                            <PerksDisplay place={place} />
                        </div>

                    </div>
                    <div className='sticky top-24 self-start max-w-full md:max-w-[400px]'>
                        <BookingWidget place={place} />
                    </div>
                </div>
            </div>
            <hr className='border-gray-400 mt-12' />
            <Ratings />
            {/* <LocationMap>{place.address}</LocationMap> */}
            <ExploreSection />
            <Footer />
        </div>
    )
}

export default PlacePage

