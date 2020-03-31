import React from 'react'
import { fetchTopPosts, fetchPost } from '../utils/api'
import PostList from './PostList'
import Post from './Post'
import Loading from './Loading'
import User from './User'

export default class Posts extends React.Component {
  state = {
    posts: [],
    error: null
  }

  componentDidMount() {
    console.log(this.props)
    fetchTopPosts(this.props.type)
      .then(data => {
        this.setState({
          posts: data
        })
      })
      .catch(() => {
        console.warn('Error fetching posts: ', this.state.error)

        this.setState({
          error: 'There was an error fetching posts'
        })
      })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.type !== this.props.type){
      fetchTopPosts(this.props.type)
        .then(data => {
          this.setState({
            posts: data
          })
        })
    }
  }

  isLoading = () => {
    return this.state.posts.length === 0 && this.state.error === null
  }

  render() {
    return(
      <div>
        {this.isLoading() && <Loading />}
        <ul>
          {this.state.posts.map((post, key) => (
            <li key={key}>
              <PostList post={post}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}