import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, user, onChange, password }) => (
  <div>
    <form onSubmit={onSubmit}>
    Name
      <input type="text" name='Username' value={user}  onChange={onChange}/>
    Password
      <input type="password" name='Password' value={password}  onChange={onChange} />
      <button type="submit">Login</button>
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