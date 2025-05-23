import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect]= useState(false);
  const {setUser} =useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login',{
        email,
        password
      });
      setUser(data)
      alert("Logged in Successfully")
      setRedirect(true);
    } catch (error) {
      alert("Some error occured! Please try again")
    }
  }
  if(redirect) {
    return <Navigate to={'/'} />
  } 

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
          <input type="email" placeholder='Enter your email' value={email} onChange={ev => setEmail(ev.target.value)} />
          <input type="password" placeholder='Enter your password' value={password} onChange={ev => setPassword(ev.target.value)} />
          <button className='primary cursor-pointer'>Login</button>
          <div className='text-center py-2 text-gray-500'> Don't you have an account?
            <Link to={'/register'} className='underline text-black'> Register here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
