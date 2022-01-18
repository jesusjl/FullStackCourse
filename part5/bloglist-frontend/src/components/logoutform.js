import React from 'react'

const LogoutForm = (props) => (
  <div>
    {props.user} is logged in
    <button id='logoutButton' type="submit" onClick={props.onClick}>Logout</button>
  </div>
)

export default LogoutForm