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
    kids: []
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
  }

  isLoading = () => {
    return this.state.kids.length === 0
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

        {!kids && null}

        {kids.length === 0
          ? this.isLoading() && <Loading text={'Fetching Comments'}/>
          : <div>
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
        }
      </div>
    )
  }
}