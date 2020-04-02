import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Posts from './components/Posts'
import Nav from './components/Nav'
import User from './components/User'
import Post from './components/Post'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme'

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <Route exact path='/' render={(props) => <Posts {...props} type='top'/>} />
              <Route path='/new' render={(props) => <Posts {...props} type='new' />} />
              <Route path='/user' component={User} />
              <Route path='/post' component={Post} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)