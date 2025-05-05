import React from 'react'
import Header from './components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import ExploreSection from './components/ExploreSection'

function Layout() {
  const location = useLocation();

  // Check if the current route is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  return (
    <div className='py-4 px-8 flex flex-col min-h-screen'>
      <Header/>
      <Outlet/>
      {!isAuthPage && (
        <>
          <ExploreSection />
          <Footer />
        </>
      )}
    </div>
  )
}

export default Layout
