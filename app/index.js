import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Posts from './components/Posts'
import Nav from './components/Nav'

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
    console.log(this.state.type)
    return (
      <div className='container'>
        <Nav onPostTypeChange={this.postTypeChange}/>
        <Posts type={this.state.type}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)