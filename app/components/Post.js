import React from 'react'
import Loading from './Loading'
import { getKids } from '../utils/api'

export default class Post extends React.Component {
  state = {
    post: this.props.post,
    kids: ['a', 'b', 'c']
  }

  componentDidMount() {
    // getKids(this.state.post.kids)
    //   .then(data => console.log(data))
  }

  render() {
    const { post } = this.state
    const { title, by, time, descendants } = post
    const date = new Date(time * 1000)
    .toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })
    console.log(post)
    return (
      <div className='post'>
        <h2>
          {post.title}
        </h2>
        <span>{`by ${by} on ${date} with ${descendants} comments `}</span>
        <p dangerouslySetInnerHTML={{__html: `${post.text}`}} />
        {this.state.kids.length > 0 &&
          <div>
            <ul>
              {this.state.kids.map((kid, index) => (
                <li key={index}>
                  {kid}
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    )
  }
}