import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'

export default function Comment ({ comment = {} }) {
  const { by, time, text } = comment

  return (
    <div>
      <span>by </span>
      <Link to={{
        pathname: '/user',
        search: `?id=${by}`
      }}>
        {by}
      </Link>
      <span> on {formatDate(time)}</span>
      <p dangerouslySetInnerHTML={{__html: `${comment.text}`}}></p>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object
}