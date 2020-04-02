import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

export default function Comment ({ comment = {} }) {
  const { by, time, text } = comment

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <React.Fragment>
          <div className={`metadata-${theme}`}>
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
      )}
    </ThemeConsumer>
  )
}

Comment.propTypes = {
  comment: PropTypes.object
}