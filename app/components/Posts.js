import React from 'react'
import { fetchTopPosts, fetchPost } from '../utils/api'
import PostList from './PostList'
import Post from './Post'
import Loading from './Loading'

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


//   render() {
//     return(
//       <ul>
//         {this.state.posts.map((post, key) => (
//           <li key={key}>
//             <PostList post={post}/>
//           </li>
//         ))}
//       </ul>
//     )
//   }
// }

  render() {
    return(
      <div>
        {this.isLoading() && <Loading text={'El que me da la gana'}/>}
        {this.state.posts.length > 0  && <Post post={this.state.posts[0]}/>}
      </div>
    )
  }
}