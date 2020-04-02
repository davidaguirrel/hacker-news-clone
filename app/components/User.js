import React from 'react'
import { fetchUser, fetchPostsSubmitted } from '../utils/api'
import Loading from './Loading'
import { formatDate } from '../utils/helpers'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

export default class User extends React.Component {
  state = {
    user: {},
    postsSubmitted: [],
    error: null
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
      .catch(() => {
        console.warn('Error fetching this user :', this.state.error)

        this.setState({
          error: 'There was an error fetching this user'
        })
      })
  }

  isLoading = () => {
    return this.state.postsSubmitted.length === 0 && this.state.error === null
  }

  render() {
    const { user, postsSubmitted } = this.state
    const { id } = queryString.parse(this.props.location.search)

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div className='user'>
            <div>
              <h2 className={`title-${theme}`}>
                {id}
              </h2>
              {user.karma &&
                <span className={`metadata-${theme}`}>
                  joined {formatDate(user.created)} has {user.karma.toLocaleString('en-US')} karma
                </span>
              }
            </div>

            {!postsSubmitted && <span>This user does not have any posts</span>}

            {postsSubmitted &&
              <React.Fragment>
                {this.isLoading() && <Loading text={'Fetching Posts'}/>}

                <div>
                  <h3>POSTS</h3>
                  <ul>
                    {this.state.postsSubmitted.map((post, index) => (
                      <li key={index} className='list-item'>
                        <h3 className={`title-${theme}`}>
                          <a href={post.url}>{post.title}</a>
                        </h3>

                        <div className={`metadata-${theme}`}>
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
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            }
          </div>
        )}
      </ThemeConsumer>
    )
  }
}