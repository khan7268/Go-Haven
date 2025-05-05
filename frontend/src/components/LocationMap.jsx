import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '450px',
  borderRadius: '10px',
  overflow: 'hidden',
};

const center = {
  lat: 26.8467,   // Jaipur approx coordinates
  lng: 75.8028,
};

const LocationMap = ({children}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Where you’ll be</h2>
      <p className="text-gray-600 mb-4">Jaipur, Rajasthan, India</p>

      <LoadScript googleMapsApiKey={children}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          <Marker position={center}>
            <InfoWindow position={center}>
              <div>
                <p>Exact location provided after booking.</p>
              </div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      </LoadScript>

      <div className="mt-4">
        <a href="#" className="text-black font-semibold underline">Show more</a>
      </div>
    </div>
  );
}

export default LocationMap;
