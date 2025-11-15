import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const Login = () => {

  // navigation
  const navigate = useNavigate()
  
  // context
  const { login } = useAuth()

  // toggles
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // functions
  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {

      await login(email, password)
      navigate('/')

    }
    catch (error) {
      setError(error.message)
    }
    finally {
      setIsLoading(false)
    }


  }
  
  return (
    <div
      className='flex items-center justify-center w-full h-screen'
    >
      
      {/* form */}
      <form
        className='flex flex-col p-8 gap-10 bg-slate-900 shadow-md shadow-slate-950 border-2 border-slate-700 rounded-sm min-h-120 h-fit w-md'
        onSubmit={(e) => handleSubmitLogin(e)}
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
          <p
            className='text-sm text-rose-500 text-center'
          >
            {error}
          </p>
          <button
            className='w-full bg-sky-500 font-semibold text-slate-200 p-2 rounded-md'
          >
            {
              isLoading
              ? "Submitting"
              : "Sign In"
            }
          </button>
          <Link
            className='w-full text-center text-slate-500 hover:text-sky-600 duration-200 text-xs'
            to={'/Register'}
          >
            Don't have an account? Make an account
          </Link>
        </div>


      </form>

    </div>
  )
}

export default Login