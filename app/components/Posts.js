import React from 'react'
import { fetchTopPosts, fetchPost } from '../utils/api'

export default class Posts extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    fetchTopPosts()
      .then(data => {
        for(let i = 0; i < 50; i++){
          fetchPost(data[i])
            .then(result => {
              this.setState(({ posts }) => ({
                posts: posts.concat(result.title)
              }))
            })
        }
      })
  }

  render() {
    console.log(this.state.posts.length)
    return(
      <ul>
        {this.state.posts.map((post, key) => (
          <li key={key}>
            {post}
          </li>
        ))}
      </ul>
    )
  }
}