import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component {
  state = {
    text: this.props.text
  }
  render() {
    return(
      <h2 className='center'>{this.state.text}</h2>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
}

Loading.defaultProps = {
  text: 'LOADING'
}