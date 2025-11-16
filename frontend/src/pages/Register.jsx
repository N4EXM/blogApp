import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

  // toggles
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  return (
    
    <div
      className='flex items-center justify-center w-full h-screen'
    >
      
      {/* form */}
      <form
        className='flex flex-col p-8 gap-10 bg-slate-900 shadow-md shadow-slate-950 border-2 border-slate-700 rounded-sm min-h-120 h-fit w-md'
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
            Register
          </h1>
          <p
            className='text-slate-200 text-sm pr-10'
          >
            Enter your details into the fields to create an account
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
              Name:
            </label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='Enter your name...'
              className='w-full h-fit p-2 pl-3 rounded-md border-2 text-sm text-slate-200 outline-none border-slate-700 bg-slate-950' 
            />
          </div>

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
              placeholder='Enter your password...'
              className='w-full h-fit p-2 pl-3 rounded-md border-2 text-sm text-slate-200 outline-none border-slate-700 bg-slate-950' 
            />
            <button
              className='absolute text-slate-500 top-[37.5px] font-medium right-3 text-sm'
              onClick={() => setShowPassword(!showPassword)}
              type='button'
            >
              {
                showPassword
                ? "Show"
                : "Hide"
              }
            </button>
            <div
              className='flex flex-row items-center gap-2 mt-2'
            >
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <p
                className='text-sm font-medium text-slate-600'
              >
                Remember me
              </p>
            </div>
          </div>

        </div>

        {/* submit and register link */}
        <div
          className='flex flex-col gap-5 w-full h-fit'
        >
          <button
            className='w-full bg-sky-500 font-semibold text-slate-200 p-2 rounded-md'
          >
            Sign Up
          </button>
          <Link
            className='w-full text-center text-slate-500 hover:text-sky-600 duration-200 text-xs'
            to={'/Login'}
          >
            Already have an account? Sign into your account
          </Link>
        </div>


      </form>

    </div>

  )
}

export default Register