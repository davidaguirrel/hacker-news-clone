import React from 'react'
import Loading from './Loading'
import { getKids } from '../utils/api'

export default class Post extends React.Component {
  state = {
    post: this.props.post,
    kids: []
  }

  componentDidMount() {
    getKids(this.state.post.kids)
      .then(data => {
        this.setState({
          kids: data
        })
      })
  }

  isLoading = () => {
    return this.state.kids.length === 0
  }

  render() {
    const { post } = this.state
    const { title, by, time, descendants } = post
    const date = new Date(time * 1000)
    .toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })

    return (
      <div className='post'>
        <h2>
          {post.title}
        </h2>
        <span>{`by ${by} on ${date} with ${descendants} comments `}</span>
        <p dangerouslySetInnerHTML={{__html: `${post.text}`}} />

        {this.isLoading() && <Loading text={'Fetching Comments'}/>}

        {this.state.kids.length > 0 &&
          <div>
            <h1>COMMENTS START HERE</h1>
            <ul>
              {this.state.kids.map((kid, index) => (
                <li key={index}>
                  {`Comment #${index}`}
                  <p dangerouslySetInnerHTML={{__html: `${kid.text}`}}></p>
                  }
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    )
  }
}