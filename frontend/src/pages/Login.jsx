import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  
  // toggles
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  return (
    <div
      className='flex items-center justify-center w-full h-screen'
    >
      
      {/* form */}
      <form
        className='flex flex-col p-8 gap-10 bg-slate-900 shadow-md shadow-slate-950 border-2 border-slate-700 rounded-sm h-120 w-md'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >

        {/* title */}
        <div
          className='flex flex-col gap-2 w-full'
        >
          <h1
            className='text-4xl font-extrabold text-slate-100'
          >
            Login
          </h1>
          <p
            className='text-slate-200 text-sm pr-10'
          >
            Enter your details into the fields to sign into your account
          </p>
        </div>

        {/* fields */}
        <div
          className='flex flex-col gap-5 w-full h-fit'
        >
          {/* email */}
          <div
            className='flex flex-col gap-2 w-full h-fit'
          >
            <label 
              htmlFor="email"
              className='text-slate-200 text-sm pl-2 font-medium'
            >
              Email:
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Enter your email...'
              className='w-full h-fit p-2 pl-3 rounded-md border-2 text-sm text-slate-200 outline-none border-slate-700 bg-slate-950' 
            />
          </div>

          {/* password */}
          <div
            className='flex flex-col gap-2 w-full h-fit relative'
          >
            <label 
              htmlFor="password"
              className='text-slate-200 text-sm pl-2 font-medium'
            >
              password:
            </label>
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter your email...'
              className='w-full h-fit p-2 pl-3 rounded-md border-2 text-sm text-slate-200 outline-none border-slate-700 bg-slate-950' 
            />
            <button
              className='absolute text-slate-200 top-9 font-medium right-3 text-sm'
              onClick={() => setShowPassword(!showPassword)}
              type='button'
            >
              {
                showPassword
                ? "Show"
                : "Hide"
              }
            </button>
          </div>

        </div>


      </form>

    </div>
  )
}

export default Login