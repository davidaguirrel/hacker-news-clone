import React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <div className='nav'>
          <ul className='row'>
            <li>
              <NavLink
                exact
                to='/'
                activeStyle={activeStyle}
                className='nav-link'
              >
                Top
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/new'
                activeStyle={activeStyle}
                className='nav-link'
              >
                New
              </NavLink>
            </li>
          </ul>
          <button
            className='theme-btn'
            style={{fontSize: 40}}
            onClick={toggleTheme}
            >
            {theme === 'light' ? '🔦' : '💡' }
          </button>
        </div>
      )}
    </ThemeConsumer>
  )
}