import React from 'react'
import { Link } from 'react-router-dom';

const UserPostCard = ({id, title, content, user, date, loadPost}) => {

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
    <div
        className='flex flex-col gap-3 rounded-sm p-5 bg-slate-900 text-slate-300'
        to={`/post/${id}`}
        onClick={loadPost}
    >
        <div
            className='flex flex-col gap-2'
        >
            <h1
                className='font-bold text-xl text-slate-100'
            >
                {title}
            </h1>
            <p
                className='text-sm'
            >
                {truncateText(content, 150)}
            </p>
        </div>
        <div
            className='flex flex-row items-center justify-between w-full h-fit text-sm font-semibold'
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

export default UserPostCard