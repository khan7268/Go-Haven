import React, { useState } from 'react'

function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className='relative bg-white inset-0 min-h-full'>
                <div className='flex justify-between items-center fixed top-0 left-0 bg-gray-100 h-20 w-full z-50'>
                    <button onClick={() => setShowAllPhotos(false)} className=' ml-4 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div className='flex items-center gap-x-4 mr-3'>
                        <button className='flex cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            <span className='font-semibold ml-2'>Share</span>
                        </button>
                        <button className='flex cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            <span className='font-semibold ml-2 '>Save</span>
                        </button>
                    </div>
                </div>
                <div className='mx-50 p-10 mt-3 grid gap-5'>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div className=''>
                            <img src={"http://localhost:4000/uploads/" + photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>

        )
    }


    return (
        <div className="relative  mt-4">
            <div className='grid grid-cols-[2fr_1fr] gap-2 rounded-3xl overflow-hidden'>
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={'http://localhost:4000/uploads/' + place.photos[0]} alt='' />
                        </div>
                    )}
                </div>
                <div className='grid '>
                    {place.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer' src={'http://localhost:4000/uploads/' + place.photos[1]} alt='' />
                    )}

                    <div className='overflow-hidden'>
                        {place.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className='aspect-square object-cover cursor-pointer relative top-2' src={'http://localhost:4000/uploads/' + place.photos[2]} alt='' />
                        )}
                    </div>
                </div>

            </div>
            <button onClick={() => setShowAllPhotos(true)} className='flex gap-1 bg-white absolute bottom-2 right-2 py-2 px-4 rounded-2xl shadow shadow-md shadow-gray-500 cursor-pointer flex gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                show all photos
            </button>
        </div>

    )
}

export default PlaceGallery
