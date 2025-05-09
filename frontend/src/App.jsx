import React from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css'
import IndexPage from './components/IndexPage';
import LoginPage from './components/LoginPage';
import Layout from './Layout';
import RegisterPage from './components/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './components/ProfilePage';
import PlacesPage from './components/PlacesPage';
import PlacesFormPage from './components/PlacesFormPage';
import PlacePage from './components/PlacePage';
import BookingsPage from './components/BookingsPage';
import BookingPage from './components/BookingPage';

axios.defaults.baseURL = 'https://go-haven.onrender.com';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/bookings' element={<BookingsPage/>} />
          <Route path='/account/bookings/:id' element={<BookingPage/>} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App


