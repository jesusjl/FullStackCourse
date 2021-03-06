import React, { useState } from 'react'
import propTypes from 'prop-types'

const Togglable = (props) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className='togglableButton' onClick={toggleVisibility}> {props.buttonLabel} </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='togglableButton' onClick={toggleVisibility}> Cancel </button>
      </div>
    </div>
  )
}


Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
