import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SelectedPost from './pages/SelectedPost'


function App() {
  
  return (

    <div
      className='bg-slate-800 font-poppins w-full min-h-screen'
    >
      
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home/>}        
          />
          <Route
            path='/Login'
            element={<Login/>}        
          />
          <Route
            path='/Register'
            element={<Register/>}        
          />
          <Route
            path='/post/:id'
            element={<SelectedPost/>}
          />
        </Routes>
      </BrowserRouter>

    </div>

  )

}

export default App
