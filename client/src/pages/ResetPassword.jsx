import React, { useContext } from 'react'
import { assets } from '../assets/assets' 
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const ResetPassword = () => {

  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
 
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

const onSubmitEmail = async (e) => {
  console.log('Form submission handler called');
  e.preventDefault();

  try {
    const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
    data.success ? toast.success(data.message) : toast.error(data.message);
    if (data.success) setIsEmailSent(true);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
}

  const onSubmitOtp= async (e) => {
    e.preventDefault()
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }


  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>

      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        alt="Logo" 
        className='absolute left-5 sm:left-20 top-5 w-10 sm:w-15 cursor-pointer'
      />

      {!isEmailSent && 
      
      <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your email address.</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py2.5 rounded-full bg-[#333A5c]'>
          <img src={assets.mail_icon} alt="" className='w-3 h-3'/>
          <input type="email" placeholder='email' className='bg-transparent outline-none p-3 text-white' value={email} onChange={e => setEmail(e.target.value)}/>
        </div> 
        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
      </form>
      }

      {!isOtpSubmitted && isEmailSent && 

      <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Passowrd OTP</h1>
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
        <button type="submit" className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
          Submit
        </button>
      </form>
      }

      
      {isOtpSubmitted && isEmailSent && 
      <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your new password below.</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py2.5 rounded-full bg-[#333A5c]'>
          <img src={assets.lock_icon} alt="" className='w-3 h-3'/>
          <input type="password" placeholder='New Password' className='bg-transparent outline-none p-3 text-white' value={newPassword} onChange={e => setNewPassword(e.target.value)}   />
        </div> 
        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
      </form>
      }
      
      

    </div>
  )
}

export default ResetPassword
