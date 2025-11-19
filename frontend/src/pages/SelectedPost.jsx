import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout/Layout'


const SelectedPost = () => {

  const { id } = useParams()

  // state
  const [post, setPost] = useState({})

  // toggles
  const [isLoading, setIsLoading] = useState(false)

  const fetchCurrentPost = async () => {

    try {
      const response = await fetch(`/api/posts/${id}`)
      const data = await response.json()
      setPost(data)
      setIsLoading(false)
    }
    catch (error) {
      console.log('error:', error)
      setIsLoading(false)
    }

  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  useEffect(() => {
    if (id) {
      fetchCurrentPost()
    }
  }, [])

  return (
    <Layout>
      <div
        className='flex items-center justify-center w-full h-3/4 px-80 p-10'
      >
        {
          isLoading
          ?   <div
                className='w-full text-white h-3/4 flex items-center justify-center'
              >
                <p
                  className=''
                >
                  Loading
                </p>
              </div>
          :   id !== null
              ? <div
                  className='flex flex-col gap-4 items-center '
                >
                  {/* title, date, author */}
                  <div
                    className='flex flex-col gap-2 w-full h-40'
                  > 
                    <h1
                      className='text-3xl font-bold text-slate-100 h-20'
                    >
                      {post.title}
                    </h1>
                    <div
                      className='flex flex-row items-center justify-between w-full h-fit'
                    >
                      <p
                        className='text-slate-200 font-medium'
                      >
                        {
                          post.user
                          ? post.user.name
                          : "Can't get name"
                        }
                      </p>
                      <p
                        className='text-slate-200 font-medium'
                      >
                        {formatDate(post.published_at)}
                      </p>
                    </div>
                  </div>
                  <p
                    className='text-slate-300'
                  >
                    {post.excerpt}
                  </p>
                  <p
                    className='text-slate-300'
                  >
                    {post.content}
                  </p>
                </div>
              : <div>
                  This post doesnt exist
                </div>
        }
      </div>
    </Layout>
  )
}

export default SelectedPost