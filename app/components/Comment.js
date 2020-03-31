import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'

export default function Comment ({ comment = {} }) {
  const { by, time, text } = comment

  return (
    <React.Fragment>
      <div className='metadata'>
        <span>by </span>
        <Link to={{
          pathname: '/user',
          search: `?id=${by}`
        }}>
          {by}
        </Link>
        <span> on {formatDate(time)}</span>
      </div>
      <div>
        <p
          className='comment'
          dangerouslySetInnerHTML={{__html: `${comment.text}`}}>
        </p>
      </div>
    </React.Fragment>
  )
}

Comment.propTypes = {
  comment: PropTypes.object
}