import React from 'react'
import Loading from './Loading'
import { getKids } from '../utils/api'
import Comment from './Comment'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'
import queryString from 'query-string'
import { fetchPost } from '../utils/api'
import { Link } from 'react-router-dom'

export default class Post extends React.Component {
  state = {
    post: {},
    kids: [],
    error: null
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    fetchPost(id)
      .then(post => {
        this.setState({
          post: post
        })

        if(this.state.post.kids) {
          getKids(this.state.post.kids)
            .then(data => {
              this.setState({
                kids: data
              })
            })
        } else {
          this.setState({
            kids: null
          })
        }
      })
      .catch(() => {
        console.warn('Error fetching this post: ', this.state.error)

        this.setState({
          error: 'There was an error fetching this post'
        })
      })
  }

  isLoading = () => {
    return this.state.kids.length === 0 && this.state.error === null
  }

  render() {
    const { post, kids } = this.state
    const { title, by, time, descendants, id, text, url } = post

    return (
      <div className='post'>
        <h2 className='title'>
          <a href={url}>{title}</a>
        </h2>
        <div className='metadata'>
          <span>by </span>
          <Link to={{
            pathname: '/user',
            search: `?id=${by}`
          }}>
            {by}
          </Link>
          <span> on {formatDate(time)} with </span>
          <Link to={{
            pathname: 'post',
            search: `?id=${id}`
          }}>
            {descendants}
          </Link>
          <span> comments</span>
        </div>
        {text && <p dangerouslySetInnerHTML={{__html: `${text}`}} />}

        {!kids && <span>This post does not have any comments yet</span>}

        {kids &&
          <React.Fragment>
            {this.isLoading() && <Loading text={'Fetching Comments'}/>}

            <div>
              <ul>
                {kids.map((kid, index) => (
                  <li
                    className='comment-item'
                    key={index}
                  >
                    <Comment comment={kid}/>
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}