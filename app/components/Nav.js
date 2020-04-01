import React from 'react'
import { NavLink } from 'react-router-dom'

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default function Nav(props) {
  return(
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
    </div>
  )
}