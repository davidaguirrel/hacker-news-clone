import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'

export default function Comment ({ comment }) {
  const { by, time, text } = comment

//NEED TO ADD LINK FOR USER
  return (
    <div>
      <span>{`by ${by} on ${formatDate(time)}`}</span>
      <p dangerouslySetInnerHTML={{__html: `${comment.text}`}}></p>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
}