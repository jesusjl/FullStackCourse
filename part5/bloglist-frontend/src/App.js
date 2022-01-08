import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import LogoutForm from './components/logoutform'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUserName('')
      setPassword('')
    } catch(exception) {
      console.log(exception)
    }
   
    console.log('logging with', username, password)
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const changeValue = (event) => {
    const value = event.target.value
    if(event.target.name === 'Username') {
      console.log(value)
      setUserName(value)
    } else if (event.target.name === 'Password') {
      console.log(value)
      setPassword(value)
    }

  }

  return (
    <div>
      {user===null?
      <LoginForm 
        onSubmit={handleLogin} 
        user={username} 
        password={password} 
        onChange={changeValue} 
      />
      : <div>
        <h2>blogs</h2>
       <LogoutForm user= {user.username} onClick={handleLogout}/>
       
        {blogs.map(blog =>  <Blog key={blog.id} blog={blog} />)}
        </div>}
    </div>
  )
}

export default App