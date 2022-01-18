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
      const user = await loginService.login({ username, password })
      console.log(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch(exception) {
      setMessage('wrong username or password')
      setClassMessage('error')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    }

    console.log('logging with', username, password)
  }

  const createBlog = async (newObject) => {

    try {
      const returnedObject = await blogService.createBlogPost(newObject)
      returnedObject.user = user // instead of default string id...
      setBlogs(blogs.concat(returnedObject))
      setMessage(`a new blog ${returnedObject.title} by ${returnedObject.author} added`)
      setClassMessage('success')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
      setMessage(`${exception.message}`)
      setClassMessage('error')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (updatedObject, id) => {
    try {
      await blogService.updateLike(updatedObject, id)
      const updatedBlogs = blogs.map(blog => blog.id !== id ? blog : updatedObject)
      setBlogs(updatedBlogs)
      /*  setBlogs(updatedBlogs.sort((a,b) => (a.likes - b.likes)).reverse()) */
      setMessage(`updated blog ${updatedObject.title} by ${updatedObject.author}`)
      setClassMessage('success')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000)

    } catch(exception) {
      console.log(exception)
      setMessage(`${exception.message}`)
      setClassMessage('error')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    }
  }

  const removePost = async (id) => {
    try {
      const deletedBlog = await blogService.deleteBlog(id)
      console.log(deletedBlog)
      setBlogs(blogs.filter(blog => blog.id !== id))
      /* setBlogs(blogs.map(blog => blog.id !== id ? blog : null)) */
      setMessage(`deleted blog ${deletedBlog.title} by ${deletedBlog.author}`)
      setClassMessage('success')
      setTimeout(() => {
        setMessage(null)
        setClassMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setMessage('You have logout')
    setClassMessage('success')
    setTimeout(() => {
      setMessage(null)
      setClassMessage(null)
    }, 5000)
  }

  const handleChange = (event) => {
    const value = event.target.value
    if(event.target.name === 'Username') {
      setUserName(value)
    } else if (event.target.name === 'Password') {
      setPassword(value)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="Create blog">
      <BlogForm createBlog={createBlog} user={user.id}/>
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
            {blogs.map((blog) => <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={removePost} />)}
          </div>
        </div>}
    </div>
  )
}

export default App