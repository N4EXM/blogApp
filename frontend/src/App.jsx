import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'


function App() {
  
  return (

    <div
      className='bg-slate-800 w-full min-h-screen'
    >
      
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home/>}        
          />
        </Routes>
      </BrowserRouter>

    </div>

  )

}

export default App
