import React from 'react'
import { fetchUser, fetchPostsSubmitted } from '../utils/api'
import Loading from './Loading'
import { formatDate } from '../utils/helpers'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

export default class User extends React.Component {
  state = {
    user: {},
    postsSubmitted: []
  }

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search)

    fetchUser(id)
      .then(data => {
        this.setState({
          user: data
        })
        fetchPostsSubmitted(this.state.user.submitted)
          .then(data => {
            if(data) {
              this.setState({
                postsSubmitted: data
              })
            } else {
              this.setState({
                postsSubmitted: null
              })
            }
          })
      })

  }

  render() {
    const { user, postsSubmitted } = this.state

    return (
      <div>
        {user.karma &&
          <div>
            <h2>
              {user.id}
            </h2>
            <span>joined {formatDate(user.created)} has {user.karma.toLocaleString('en-US')} karma</span>
          </div>
        }

        {!postsSubmitted && <span>This user does not have any posts</span>}

        {postsSubmitted.length === 0
          ? <Loading text={'Fetching Posts'}/>
          : <div>
              <h3>POSTS</h3>
              <ul>
                {this.state.postsSubmitted.map((post, index) => (
                  <li key={index}>
                    {post.title}
                    <br/>
                    <span>by </span>
                    <Link to={{
                        pathname: '/user',
                        search: `?id=${user.id}`
                    }}>
                      {user.id}
                    </Link>
                    <span> on {formatDate(post.time)} with </span>
                    <Link to={{
                      pathname: '/post',
                      search: `?id=${post.id}`
                    }}>
                      {post.descendants}
                    </Link>
                    <span> comments</span>
                  </li>
                ))}
              </ul>
            </div>
        }
      </div>
    )
  }
}