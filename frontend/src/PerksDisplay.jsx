// import React, { useState } from 'react'

// function PerksDisplay({ place }) {
//     const [showPerks, setShowPerks] = useState(false);
//     if (!place.perks?.length) {
//         return '';
//     }



//     return (
//         <div>
//             <h1 className='text-2xl font-semibold'>What this place offers</h1>
//             <div>
//             {place.perks.map((perk, index) => (
//             <div key={index}>   
                
//                 {perk}
//             </div>
//         ))}
//             </div>
//         </div>
//     )
// }

// export default PerksDisplay
import { Wifi, ParkingCircle, Tv, Utensils, Snowflake, Dog } from 'lucide-react';

const perkIcons = {
  'Free WiFi': <Wifi className="w-5 h-5 mr-2" />,
  'Free Parking': <ParkingCircle className="w-5 h-5 mr-2" />,
  'TV': <Tv className="w-5 h-5 mr-2" />,
  'Kitchen': <Utensils className="w-5 h-5 mr-2" />,
  'Air Conditioning': <Snowflake className="w-5 h-5 mr-2" />,
  'Pet Friendly': <Dog className="w-5 h-5 mr-2" />,
};

const PlacePerks = ({ place }) => {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-4'>What this place offers</h1>
      <div className="grid grid-cols-2 gap-3">
        {place.perks.map((perk, index) => (
          <div key={index} className="flex items-center p-2 border rounded-lg shadow-sm">
            {perkIcons[perk] || <span className="w-5 h-5 mr-2">🌟</span>}
            <span>{perk}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacePerks;

