import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import LogoutForm from './components/logoutform'
import BlogForm from './components/blogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notifications'
import Togglable from './components/Togglable'

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
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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

  const createBlog = async (newObject) => {

    try {
      await blogService.createBlogPost(newObject)
      setBlogs(blogs.concat(newObject))
      setMessage(`a new blog ${newObject.title} by ${newObject.author} added`)
      setClassMessage('success')
      setTimeout(()=>{
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
      setMessage(`${exception.message}`)
      setClassMessage('error')
      setTimeout(()=> {
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (updatedObject, id) => {
    try {
      await blogService.updateLike(updatedObject, id)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedObject))
      setMessage(`updated blog ${updatedObject.title} by ${updatedObject.author}`)
      setClassMessage('success')
      setTimeout(()=>{
        setMessage(null)
        setClassMessage(null)
      }, 5000)
      
    } catch(exception) {
      console.log(exception)
      setMessage(`${exception.message}`)
      setClassMessage('error')
      setTimeout(()=>{
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    }
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

  const handleChange = (event) => {
    const value = event.target.value
    if(event.target.name === 'Username') {
      console.log(value)
      setUserName(value)
    } else if (event.target.name === 'Password') {
      console.log(value)
      setPassword(value)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="Create blog">
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )
  
  return (
    <div>
       <Notification message={message} class={classMessage}/>
      {user===null?
      <LoginForm 
        onSubmit={handleLogin} 
        user={username} 
        password={password} 
        onChange={handleChange} 
      />
      : <div>
       
        <h2>blogs</h2>
        <LogoutForm user= {user.username} onClick={handleLogout}/>
        <h2>Create new</h2>
       { blogForm()}
        <div>
        
        {blogs.map((blog, id) => <Blog key={id} blog={blog} updateBlog={updateBlog} />)}
        </div>
        </div>}
    </div>
  )
}

export default App