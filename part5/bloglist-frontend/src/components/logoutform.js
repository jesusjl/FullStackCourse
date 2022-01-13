import React from 'react'

const LogoutForm = (props) => (
  <div>
    {props.user} is logged in
    <button type="submit" onClick={props.onClick}>Logout</button>
  </div>
)

export default LogoutForm