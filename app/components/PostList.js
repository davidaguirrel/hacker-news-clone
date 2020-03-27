import React from 'react'
import { formatDate } from '../utils/helpers'

export default function PostList ( {post} ) {
  const { by, title, time, descendants, url } = post



//AQUÍ TENDRÉ QUE METER LINK PARA LLEVAR A POST

  return (
    <div className='list-item'>
      <h3>
        {url
          ? <a href={url}>
              {post.title}
            </a>
          : <div>
              {post.title}
            </div>
        }
      </h3>
      <div>
        <span>by </span>
        <a href="">{by} </a>
        <span>on {formatDate(time)} with </span>
        <a href="">{descendants} </a>
        <span>comments</span>
      </div>
    </div>
  )
}