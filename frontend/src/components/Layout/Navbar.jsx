import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div
        className='w-full h-fit p-5 px-10 bg-blue-600 shadow-sm shadow-slate-950'
    >
        <Link
            className='text-slate-100 text-2xl font-semibold'
            path='/'
        >
            BlogApp
        </Link>
        <div
            
        >

        </div>
    </div>
  )
}

export default Navbar