import React from 'react'

const PostCard = ({id, title, content, user, date}) => {

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

  return (
    <div
        className='flex flex-col gap-3 rounded-sm p-5 bg-slate-900 text-slate-300'
    >
        <div
            className='flex flex-col gap-2'
        >
            <h1
                className='font-medium text-xl text-slate-100'
            >
                {title}
            </h1>
            <p
                className='text-sm'
            >
                {content}
            </p>
        </div>
        <div
            className='flex flex-row items-center justify-between w-full h-fit'
        >
            <h1>
                {user.name}
            </h1>
            <p>
                {formatDate(date)}
            </p>
        </div>
    </div>
  )
}

export default PostCard