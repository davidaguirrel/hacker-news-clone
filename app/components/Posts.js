import React from 'react'
import { fetchTopPosts, fetchPost } from '../utils/api'
import PostList from './PostList'
import Post from './Post'
import Loading from './Loading'
import User from './User'

export default class Posts extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    fetchTopPosts()
      .then(data => {
        this.setState({
          posts: data
        })
      })
  }

  isLoading = () => {
    return this.state.posts.length === 0
  }

// render() {
//     return(
//       <div>
//         {this.isLoading() && <Loading text={'El que me da la gana'}/>}
//         <User />
//       </div>
//     )
//   }
// }

  render() {
    return(
      <div>
        {this.isLoading() && <Loading text={'El que me da la gana'}/>}
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

//   render() {
//     return(
//       <div>
//         {this.isLoading() && <Loading text={'El que me da la gana'}/>}
//         {this.state.posts.length > 0  && <Post post={this.state.posts[0]}/>}
//       </div>
//     )
//   }
// }