import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/AuthContext'
import UserPostCard from '../components/cards/UserPostCard'

const PostsPage = () => {
  const { user } = useAuth()
  const [userPosts, setUserPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // state
  const [selectedPostTitle, setSelectedPostTitle] = useState("")
  const [selectedPostContent, setSelectedPostContent] = useState("")
  const [postView, setPostView] = useState(0) // 0: no selected post, 1: new post 2: selected post

  const fetchUserPosts = async () => {
    if (!user?.id) {
      setError("User not available")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/users/${user.id}/posts`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Full API response:", data)
      
      // Extract posts from different possible response structures
      const posts = data.posts || data.data?.posts || data.data || []
      console.log("Extracted posts:", posts)
      
      setUserPosts(posts)
    }
    catch (error) {
      console.error("Error fetching posts:", error)
      setError("Failed to load posts")
      setUserPosts([])
    }
    finally {
      setLoading(false)
    }
  }

  const loadPost = (title, content) => {
    setSelectedPostTitle(title)
    set
  }

  const handleCreateNewPost = () => {
    
  }

  useEffect(() => {
    fetchUserPosts()
  }, [user?.id])

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-168">
          <p className="text-xl text-slate-200">Loading posts...</p>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-168">
          <p className="text-xl text-red-400">{error}</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='grid grid-cols-5 w-full h-168'>

        {/* editor */}
        
        {/* no selected post */}
        <div
          className={`${postView === 0 ? 'flex' : 'hidden'} text-2xl font-bold text-slate-200 items-center justify-center w-full h-full col-span-3 p-8`}
        >
          <div
            className='w-full h-full bg-slate-900 flex items-center justify-center rounded-sm'
          >
            No selected post
          </div>
        </div>

        {/* new post */}
        <div
          className={`${postView === 1 ? 'flex' : 'hidden'} gap-5 text-slate-200 flex-col items-start justify-start w-full h-full col-span-3 p-8`}
        >
          {/* title */}
          <input 
            type="text" 
            placeholder='Enter a title...'
            className='w-full h-fit outline-none bg-slate-900 p-2 pl-3 rounded-md text-xl font-semibold'
          />
          <textarea
            className='w-full h-full outline-none rounded-md font-medium bg-slate-900 resize-none p-4'
            placeholder='Enter some content...'
          ></textarea>
          <div
            className='w-full h-fit flex items-center justify-end'
          >
            <button
              className='p-2 rounded-full bg-emerald-500 '
            >
              <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                fill="#ffffff" viewBox="0 0 24 24" >
                <path d="M9 15.59 4.71 11.3 3.3 12.71l5 5c.2.2.45.29.71.29s.51-.1.71-.29l11-11-1.41-1.41L9.02 15.59Z"></path>
              </svg>
            </button>
          </div>
        </div>


        {/* cards */}
        <div className='flex flex-col w-full h-full p-8 col-span-2 gap-5'>
          <div
            className='w-full h-1/9 flex flex-row items-center justify-between'
          >
            <h1 className='text-3xl font-bold text-slate-200'>
              Your posts
            </h1>
            <button
              className='p-2 rounded-full bg-sky-500 hover:bg-sky-600 duration-200'
              onClick={() => setPostView(1)}
            >
              <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20"  
                fill="#ffffff" viewBox="0 0 24 24" >
                <path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path>
              </svg>
            </button>
          </div>
          
          <div className={`flex w-full h-8/9 ${!userPosts || userPosts.length === 0 ? "bg-slate-900 rounded-md items-center justify-center" : ""}`}>
            {!userPosts || userPosts.length === 0 ? (
              <p className='text-xl font-semibold text-slate-200'>
                You currently have no posts
              </p>
            ) : (
              <div className='flex flex-col gap-3 w-full h-136 overflow-y-auto no-scrollbar'>
                {userPosts.map((post) => (
                  <UserPostCard 
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    user={post.user}
                    date={post.published_at || post.created_at}
                    loadPost={() => {}}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostsPage