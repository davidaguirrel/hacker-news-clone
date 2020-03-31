import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Posts from './components/Posts'
import Nav from './components/Nav'
import User from './components/User'
import Post from './components/Post'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  state = {
    type: 'top'
  }
  postTypeChange = (id) => {
    this.setState({
      type: id
    })
  }

  render() {
    console.log(this.props)
    return (
      <Router>
        <div className='container'>
          <Nav onPostTypeChange={this.postTypeChange}/>
          <Route exact path='/' render={(props) => <Posts {...props} type={this.state.type}/>} />
          <Route path='/new' render={(props) => <Posts {...props} type={this.state.type} />} />
          <Route path='/user' component={User} />
          <Route path='/post' component={Post} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)