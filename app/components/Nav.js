import React from 'react'
import { NavLink } from 'react-router-dom'

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default function Nav(props) {
  return(
    <div>
      <ul>
        <li>
          <NavLink
            exact
            to='/'
            activeStyle={activeStyle}
            onClick={() => props.onPostTypeChange('top')}
          >
            Top
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/new'
            activeStyle={activeStyle}
            onClick={() => props.onPostTypeChange('new')}
          >
            New
          </NavLink>
        </li>
      </ul>
    </div>
  )
}