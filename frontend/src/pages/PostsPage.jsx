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
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: ''
  })
  const [selectedId, setSelectedId] = useState(null)
  const [postView, setPostView] = useState(0) // 0: no selected post, 1: new post 2: selected post

  // functions 

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

  const handleLoadNewPost = () => {
    setPostView(1)
    setFormData({
      title: '',
      excerpt: '',
      content: ''
    })
  }

  const handleLoadPost = (id, title, excerpt, content) => {
    setPostView(2)
    setSelectedId(id)

    const currentPost = {
      title: title,
      excerpt: excerpt,
      content: content
    }

    setFormData(currentPost)
    
  }

  const handleUpdatePost = async () => {

    try {

      const token = localStorage.getItem('token')
      const response = await fetch(`/api/posts/${selectedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }

      const data = await response.json()

      if (data.success) {
        fetchUserPosts()
      }
      else {
        console.log("failed to update post")
      }

    }
    catch (error) {

    }

  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateNewPost = async () => {
    
    const token = localStorage.getItem("token")
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create a post')
    }

    // const newPost = await response.json()

    fetchUserPosts()

  }

  useEffect(() => {
    fetchUserPosts()
  }, [user?.id])

  useEffect(() => {
    console.log(formData)
  }, [formData])

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
          className={`${postView === 1 || postView === 2 ? 'flex' : 'hidden'} gap-5 text-slate-200 flex-col items-start justify-start w-full h-full col-span-3 p-8`}
        >
          {/* title */}
          <input 
            type="text" 
            name='title'
            placeholder='Enter a title...'
            value={formData.title}
            onChange={handleChangeInput}
            className='w-full h-fit outline-none bg-slate-900 p-2 pl-3 rounded-md text-xl font-semibold'
            required
          />
          <textarea 
            type='text'
            name='excerpt'
            value={formData.excerpt}
            onChange={handleChangeInput}
            placeholder='Enter an excerpt'
            className='w-full h-40 resize-none outline-none rounded-md font-medium p-3 bg-slate-900'
            required
          ></textarea>
          <textarea
            type="text"
            name='content'
            value={formData.content}
            onChange={handleChangeInput}
            className='w-full h-full outline-none rounded-md font-medium bg-slate-900 resize-none p-4'
            placeholder='Enter some content...'
            required
          ></textarea>
          <div
            className='w-full h-fit flex items-center justify-end'
          >
            <button
              className='p-2 rounded-full bg-emerald-500 cursor-pointer hover:bg-emerald-600 duration-200'
              onClick={postView === 1 ? () => handleCreateNewPost() : () => handleUpdatePost()}
            >
              
              <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
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
              onClick={() => handleLoadNewPost()}
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
                    handleLoadPost={() => handleLoadPost(post.id, post.title, post.excerpt, post.content)}
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