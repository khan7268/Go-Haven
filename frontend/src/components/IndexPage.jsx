// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {Link} from 'react-router-dom';

// function IndexPage() {
//   const [places, setPlaces] = useState([]);
//   useEffect(() => {
//     axios.get("/places").then((response) => {
//       setPlaces(response.data);
//     });
//   }, []);

//   return (
//     <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       {places.length > 0 &&
//         places.map((place) => (
//           <Link to={'/place/' + place._id}>
//             <div className="bg-gray-500 mb-2 rounded-2xl flex">
//               {place.photos?.[0] && (
//                 <img
//                   className="rounded-2xl object-cover aspect-square"
//                   src={"https://go-haven.onrender.com/uploads/" + place.photos?.[0]}
//                   alt=""
//                 />
//               )}
//             </div>
//             <h1 className="text-lg font-bold">{place.address}</h1>
//             <h2 className="text-sm text-gray-500 ">{place.title}</h2>
//             <div className="mt-1">
//               <span className="font-bold"> $ {place.price} </span> per night
//             </div>
//           </Link>
//         ))}
//     </div>
//   );
// }

// export default IndexPage;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ExploreSection from '../components/ExploreSection'
import Footer from '../components/Footer';

function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/place/' + place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                   <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"https://go-haven.onrender.com/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h1 className="text-lg font-bold">{place.address}</h1>
              <h2 className="text-sm text-gray-500 ">{place.title}</h2>
              <div className="mt-1">
                <span className="font-bold"> $ {place.price} </span> per night
              </div>
            </Link>
          ))}
      </div>
      <ExploreSection/>
      <Footer/>
    </>
  );
}

export default IndexPage;
