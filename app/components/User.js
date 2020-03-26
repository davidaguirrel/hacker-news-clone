import React from 'react'
import { fetchUser, fetchPostsSubmitted } from '../utils/api'
import Loading from './Loading'
import { formatDate } from '../utils/helpers'

export default class User extends React.Component {
  state = {
    user: {},
    postsSubmitted: []
  }

  componentDidMount() {
    const by = 'soapdog'
    fetchUser(by)
      .then(data => {
        this.setState({
          user: data
        })
        fetchPostsSubmitted(this.state.user.submitted)
          .then(data => {
            this.setState({
              postsSubmitted: data
            })
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
              {this.state.user.id}
            </h2>
            <span>joined {formatDate(user.created)} has {user.karma.toLocaleString('en-US')} karma</span>
          </div>
        }
        {postsSubmitted.length === 0
          ? <Loading text={'Fetching Posts'}/>
          : <div>
              <h3>POSTS</h3>
              <ul>
                {this.state.postsSubmitted.map((post, index) => (
                  <li key={index}>
                    {post.title}
                    <br/>
                    <span>{`by ${user.id} on ${formatDate(post.time)} with `}</span>
                    <a href="">{post.descendants}</a>
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