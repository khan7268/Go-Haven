import React, { useEffect, useState } from 'react';
import Perks from '../Perks';
import axios from 'axios';
import PhotosUploader from '../photosUploader';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';

function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [description, setDescription] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) return;

        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setPerks(data.perks);
            setDescription(data.description);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id])

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }
    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }


    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            perks, description, extraInfo,
            checkIn, checkOut, maxGuests, price
        }

        if (id) {
            //Update
            await axios.put('/places', { id, ...placeData });
            setRedirect(true);
        }
        else {
            //new place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Add some catchy title for your place')}
                {/* we can write this by calling function and by directly writing in the following way. */}
                {/* <h2 className='text-2xl mt-4'>Title</h2>
                  <p className='text-gray-500 text-sm'></p> */}
                <input type="text" placeholder='ex- My lovely apartment' value={title} onChange={ev => setTitle(ev.target.value)} />

                {preInput('Address', 'Address to this place')}
                {/* <h2 className='text-2xl mt-4'>Address</h2>
                  <p className='text-gray-500 text-sm'>Address to this place</p> */}
                <input type="text" placeholder='address' value={address} onChange={ev => setAddress(ev.target.value)} />

                {preInput('Photos', 'more = better')}
                {/* <h2 className='text-2xl mt-4'>Photos</h2>
                  <p className='text-gray-500 text-sm'>more = better</p> */}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />



                {preInput('Description', 'Write details of the place')}
                {/* <h2 className='text-2xl mt-4'>Description</h2>
                  <p className='text-gray-500 text-sm'>Write details of the place</p> */}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />


                {preInput('Perks', 'Select all the perks')}
                {/* <h2 className='text-2xl mt-4'>Perks</h2>
                  <p className='text-gray-500 text-sm'>Select all the perks</p> */}
                <div className='grid  mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>


                {preInput('Extra Info', 'house rules, etc')}
                {/* <h2 className='text-2xl mt-4'>Extra Info</h2>
                  <p className='text-gray-500 text-sm'>house rules, etc</p> */}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Check-in & check-out times', 'add check in and out times and number of guests')}
                {/* <h2 className='text-2xl mt-4'>Check-in & check-out times</h2>
                  <p className='text-gray-500 text-sm'>add check in and out times and number of guests</p> */}
                <div className='grid gap-4 sm:grid-cols-3'>
                    <div>
                        <h3 className='mt-2 mb-1'>Check-in time</h3>
                        <input type="text" placeholder='14:00' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 mb-1'>Check-out time</h3>
                        <input type="text" placeholder='20:00' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 mb-1'>Maximum guests</h3>
                        <input type="number" placeholder='2' value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 mb-1'>Price per night</h3>
                        <input type="number" placeholder='2' value={price} onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>

                <div>
                    <button className='primary my-4'>Save</button>
                </div>

            </form>

        </div>
    )
}

export default PlacesFormPage
