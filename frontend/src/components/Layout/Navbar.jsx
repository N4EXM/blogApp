import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
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
        <div
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
          <Link
            className='p-2 rounded-md bg-slate-900 text-sm text-slate-100 font-semibold px-4'
            to='/Dashboard'
          >
            Posts
          </Link>
        </div>
    </div>
  )
}

export default Navbar