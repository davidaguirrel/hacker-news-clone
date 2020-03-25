import React from 'react'

export default function PostList ( {post} ) {
  const { by, title, time, descendants, url } = post
  const date = new Date(time * 1000)
    .toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })


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
      <span>{`by ${by} on ${date} with ${descendants} comments `}</span>
    </div>
  )
}