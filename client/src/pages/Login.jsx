import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'



const Login = () => {

const navigate = useNavigate()

const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext)

const [state, setState] = useState('Sign Up')
const [idNum, setIdNum] = useState('')
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
  
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + 'api/auth/register', { idNum, name, email, password });
        if (data.success) {
          toast("Registration Successful - Check you\'re mail 📫");
          setIsLoggedIn(true);
          getUserData()
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + 'api/auth/login', { email, password });
        if (data.success) {
          toast("Login Successful 🎉");
          setIsLoggedIn(true);
          getUserData()
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An unexpected error occurred");
    }
  };
  


  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-10 sm:w-15 cursor-pointer'/>
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className='text-center text-sm mb-6 text-white'>{state === 'Sign Up' ? 'Create Your Account' : 'Login To Your Account'}</p>

        <form onSubmit={onSubmitHandler}>
            {state === 'Sign Up' && (
            <><div className='mb-4 flex items-center gap-3 w-full px-5 py2.5 rounded-full bg-[#333a5c]'>
              <img className='w-6 h-6' src={assets.fingerprint_icon} alt="" />
              <input onChange={e => setIdNum(e.target.value)} value={idNum}
                className='bg-transparent outline-none p-3' type="text" placeholder='National ID number' />
            </div>
            
            <div className='mb-4 flex items-center gap-3 w-full px-5 py2.5 rounded-full bg-[#333a5c]'>
                <img src={assets.person_icon} alt="" />
                <input onChange={e => setName(e.target.value)} value={name}
                  className='bg-transparent outline-none p-3' type="text" placeholder='Full Name' />
              </div></>
            )}
            

            <div className='mb-4 flex items-center gap-3 w-full px-5 py2.5 rounded-full bg-[#333a5c]'>
                <img src={assets.mail_icon} alt="" />
                <input onChange={e => setEmail(e.target.value)} value={email} className='bg-transparent outline-none p-3' type="text" placeholder='Email Address'   />
            </div>

            <div className='mb-4 flex items-center gap-3 w-full px-5 py2.5 rounded-full bg-[#333a5c]'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={e => setPassword(e.target.value)} value={password} 
                className='bg-transparent outline-none p-3' type="password" placeholder='Password'   />
            </div>

            {state === 'Sign Up' ?
             null : <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p> }

            <button className='text-white font-medium w-full py2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 p-3'>{state}</button>
        </form>
        {state === 'Sign Up' ? (<p className='text-gray-400 text-center text-xs mt-4'>
            Already have an account? {' '} 
            <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login Here</span>
        </p>) : (<p className='text-gray-400 text-center text-xs mt-4'>
            Dont' have an account? {' '} 
            <span onClick={() => setState('Sign Up')}className='text-blue-400 cursor-pointer underline'>Sign Up</span>
        </p>
        )}
      </div>
    </div>
  )
}

export default Login
