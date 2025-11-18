import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


const Navbar = () => {

  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/Login')
  }

  return (
    <div
      className='w-full h-fit p-5 px-10 flex flex-row items-center justify-between bg-slate-700 shadow-sm shadow-slate-900'
    >
        <Link
          className='text-slate-100 text-2xl font-semibold'
          to='/'
        >
          BlogApp
        </Link>
        {
          user === null
          ? <div
              className='w-fit h-fit flex flex-row items-center gap-2'
            >
              <Link
                className='p-2 rounded-md bg-slate-900 text-sm text-slate-100 font-semibold px-4'
                to='/Login'
              >
              Login
              </Link>
              <Link
                className='p-2 rounded-md bg-slate-900 text-sm text-slate-100 font-semibold px-4'
                to='/Register'
              >
                Register
              </Link>   
            </div>
          : <div
              className='w-fit h-fit flex flex-row-reverse items-center gap-2'
            >
              <button
                className='p-2 rounded-md bg-slate-900 text-sm text-slate-100 font-semibold px-4 cursor-pointer'
                onClick={() => handleLogout()}
              >
                Logout
              </button>
              <Link
                className='p-2 rounded-md bg-slate-900 text-sm text-slate-100 font-semibold px-4'
                to='/Dashboard'
              >
                Posts
              </Link>
            </div>
        }
    </div>
  )
}

export default Navbar