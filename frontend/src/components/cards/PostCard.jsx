import React from 'react'
import { Link } from 'react-router-dom';

const PostCard = ({id, title, content, user, date}) => {

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-UK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function truncateText(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    }

  return (
    <Link
        className='flex flex-col gap-3 rounded-sm p-5 bg-slate-900 text-slate-300'
        to={`/post/${id}`}
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
    </Link>
  )
}

export default PostCard