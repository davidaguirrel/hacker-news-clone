import React from 'react'
import { formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'

export default function PostList ( { post } ) {
  const { by, title, time, descendants, url, id } = post

  return (
    <div className='list-item'>
      <h3 className='title'>
        {url
          ? <a href={url}>
              {title}
            </a>
          : <Link to={{
              pathname: '/post',
              search: `?id=${id}`
            }}>
              {title}
            </Link>
        }
      </h3>
      <div className='metadata'>
        <span>{`by `}</span>
        <Link
          to={{
            pathname: '/user',
            search: `?id=${by}`
          }}
        >
          {by}
        </Link>
        <span> on {formatDate(time)} with </span>
        <Link to={{
          pathname: '/post',
          search: `?id=${id}`
        }}>
          {descendants}
        </Link>
        <span> comments</span>
      </div>
    </div>
  )
}