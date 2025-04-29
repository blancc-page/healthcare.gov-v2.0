import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'


const Header = () => {

const { userData, isLoggedIn } = useContext(AppContext)

const logInToast = () => {
  if(isLoggedIn){
    toast('That feature is still in development')
  } else {
    toast('You\'ll have to log in first')
  }
}

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6'/>
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'Guest'}! <img src={assets.hand_wave} alt="" className='w-8 aspect-square'/></h1>
      <h2 className='text-3xl sm;text-5xl font-semibold mb-4'>Welcome to Healthcare.gov</h2>
      <p className='mb-8 max-w-md'>Let's get to know you; first login, so we can recommend the best insurance package for you.</p>

      
      <button onClick={logInToast} className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100  transition-all'>Get Started</button>
    </div>
  )
}

export default Header
