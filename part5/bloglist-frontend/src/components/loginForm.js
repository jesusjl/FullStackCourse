import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, user, onChange, password }) => (
  <div className='loginForm'>
    <form onSubmit={onSubmit}>
    Name
      <input id='username' type="text" name='Username' value={user}  onChange={onChange}/>
    Password
      <input id='password' type="password" name='Password' value={password}  onChange={onChange} />
      <button id='loginButton' type="submit">Login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm