import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';



const EmailVerify = () => {
  axios.defaults.withCredentials = true

  const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext)
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value.trim();
    if (value.length > 0 && index < inputRefs.current.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus()
    }
  }

const handlePaste = (e) => {
  const paste = e.clipboardData.getData('text') 
  const pasteArray = paste.split('')
  pasteArray.forEach((char, index) => {
    if(inputRefs.current[index]){
      inputRefs.current[index].value = char
    }
  })
}

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    try {
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')
      const { data } = await axios.post(backendUrl + 'api/auth/verify-account', {otp})

      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate ('/')
  }, [isLoggedIn,userData])

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        alt="Logo" 
        className='absolute left-5 sm:left-20 top-5 w-10 sm:w-15 cursor-pointer'
      />
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the six digit code sent to your email.</p>
        <div onPaste={handlePaste} className='flex justify-between mb-8'>
          {Array(6).fill(0).map((_, index) => (
            <input 
              key={index}
              type="text"
              maxLength="1"
               
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
              ref={el => inputRefs.current[index] = el}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button type="submit" className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
          Verify Email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify
