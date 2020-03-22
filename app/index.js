import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Posts from './components/Posts'

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Posts></Posts>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)