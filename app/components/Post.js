import React from 'react'
import Loading from './Loading'
import { getKids } from '../utils/api'
import Comment from './Comment'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'

export default class Post extends React.Component {
  state = {
    post: this.props.post,
    kids: []
  }

  componentDidMount() {
    getKids(this.state.post.kids)
      .then(data => {
        this.setState({
          kids: data
        })
      })
  }

  isLoading = () => {
    return this.state.kids.length === 0
  }

  render() {
    const { post } = this.state
    const { title, by, time, descendants } = post

    return (
      <div className='post'>
        <h2>
          {post.title}
        </h2>
        <div>
          <span>by </span>
          <a href="">{by} </a>
          <span>on {formatDate(time)} with {descendants} comments</span>
        </div>
        {post.text && <p dangerouslySetInnerHTML={{__html: `${post.text}`}} />}

        {this.isLoading() && <Loading text={'Fetching Comments'}/>}

        {this.state.kids.length > 0 &&
          <div>
            <h1>COMMENTS START HERE</h1>
            <ul>
              {this.state.kids.map((kid, index) => (
                <li key={index}>
                  {`Comment #${index}`}
                  <Comment comment={kid}/>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}