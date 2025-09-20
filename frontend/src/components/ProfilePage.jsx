import React, { useContext, useState } from 'react'
import UserContext from '../UserContext'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  // let { subpage } = useParams();
  // if (subpage == undefined) {
  //   subpage = 'profile';
  // }

  if (!ready) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }


  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }


  return (
      <div className="max-w-4xl mx-auto p-6">
      <AccountNav />

      <div className="bg-white shadow-md rounded-lg p-8 mt-12 flex flex-col md:flex-row items-center md:items-start">
        {/* Avatar */}
        <div className="w-32 h-32 mb-4 md:mb-0 md:mr-8">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128`}
            alt="User avatar"
            className="w-full h-full rounded-full object-cover border-4 border-primary"
          />
        </div>

        {/* User details */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>

          {/* Example extra details - replace with your user fields */}
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">About:</span> {user.bio || "This user hasn't added a bio yet."}</p>
            <p><span className="font-semibold">Joined:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}</p>
            {/* Add more fields as desired */}
          </div>

          <button
            onClick={logout}
            className="mt-6 px-6 py-2 bg-[#F5385D]  text-white cursor-pointer rounded-2xl hover:bg-primary-dark transition"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

