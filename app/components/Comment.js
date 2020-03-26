import React from 'react'
import PropTypes from 'prop-types'

export default function Comment ({ comment }) {
  const { by, time, text } = comment
  const date = new Date(time * 1000)
  .toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  })

//NEED TO ADD LINK FOR USER
  return (
    <div>
      <span>{`by ${by} on ${date}`}</span>
      <p dangerouslySetInnerHTML={{__html: `${comment.text}`}}></p>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}