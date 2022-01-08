import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import LogoutForm from './components/logoutform'
import BlogForm from './components/blogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [classMessage, setClassMessage] = useState(null)

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

     
      setMessage("wrong username or password")
      setClassMessage('error')
      setTimeout(()=> {
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    }
   
    console.log('logging with', username, password)
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setMessage('You have logout')
    setClassMessage('success')
    setTimeout(()=>{
      setMessage(null)
      setClassMessage(null)
    }, 5000)
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
       <Notification message={message} class={classMessage}/>
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
        <BlogForm />
        {blogs.map(blog =>  <Blog key={blog.id} blog={blog} />)}
        </div>}
    </div>
  )
}

export default App