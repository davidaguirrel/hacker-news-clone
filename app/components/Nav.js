import React from 'react'

export default function Nav(props) {
  return(
    <div>
      <button
        onClick={() => props.onPostTypeChange('top')}
      >
        Top
      </button>
      <button
        onClick={() => props.onPostTypeChange('new')}
      >
        New
      </button>
    </div>
  )
}