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
        <div className='h-full w-full col-span-3'>
          {/* Left side content */}
          hi
        </div>
        <div className='flex flex-col w-full h-full p-8 col-span-2'>
          <h1 className='text-3xl font-bold text-slate-200 h-1/9'>
            Your posts
          </h1>
          <div className={`flex w-full h-8/9 ${!userPosts || userPosts.length === 0 ? "bg-slate-900 rounded-md items-center justify-center" : ""}`}>
            {!userPosts || userPosts.length === 0 ? (
              <p className='text-xl font-semibold text-slate-200'>
                You currently have no posts
              </p>
            ) : (
              <div className='flex flex-col gap-2 w-full h-136 overflow-y-auto'>
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