import React from 'react'
import Navbar from './Navbar'


const Layout = ({children}) => {
  return (
    <div
      className='flex flex-col w-full h-full'
    >
      <Navbar/>
      {children}
    </div>
  )
}

export default Layout