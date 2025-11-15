import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import PostCard from '../components/cards/PostCard'

const Home = () => {

    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchAllPosts = async () => {

        try {
            const response = await fetch('/api/posts')
            const data = await response.json()
            setPosts(data)
            setIsLoading(false)
        }
        catch (error) {
            console.log('error:', error)
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchAllPosts()
    }, [])

  return (
    <Layout>
        
        <div
            className='flex items-center justify-center w-full h-full px-64 p-5 pb-20'
        >
            <div
                className='flex flex-col gap-4 w-full h-3/4 overflow-y-scroll'
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
                    :   posts.length > 0
                        ?   posts.map((post) => (
                                <PostCard
                                    id={post.id}
                                    title={post.title}
                                    content={post.content}
                                    user={post.user}
                                    date={post.published_at}
                                />
                            ))
                        :   <p>
                                No posts
                            </p>
                }
            </div>
        </div>

    </Layout>
  )
}

export default Home