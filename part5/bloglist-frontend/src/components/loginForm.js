import React from 'react'

const LoginForm = (props) => (
  <div>
  <form onSubmit={props.onSubmit}>
    Name
    <input type="text" name='Username' value={props.user}  onChange={props.onChange}/>
    Password
    <input type="password" name='Password' value={props.password}  onChange={props.onChange} />
    <button type="submit">Login</button>
  </form>
</div>
)

export default LoginForm