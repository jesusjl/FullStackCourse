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
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)
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

  const handleBlogForm = async (event) => {
    event.preventDefault()

    const newObject = {
      "title": title,
      "author": author,
      "url": url
    }

    try {
      await blogService.createBlogPost(newObject)
      setBlogs(blogs.concat(newObject))
      setMessage(`a new blog ${newObject.message} by ${newObject.author} added`)
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

  const changeValue = (event) => {
    const value = event.target.value
    if(event.target.name === 'Username') {
      console.log(value)
      setUserName(value)
    } else if (event.target.name === 'Password') {
      console.log(value)
      setPassword(value)
    } else if (event.target.name === 'Title') {
      console.log(value)
      setTitle(value)
    } else if (event.target.name === 'Author') {
      console.log(value)
      setAuthor(value)
    } else if (event.target.name === 'Url') {
      console.log(value)
      setUrl(value)
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
        <h2>Create new</h2>
       <BlogForm  onChange={changeValue}  onSubmit={handleBlogForm} />
        <div>
        {blogs.map((blog, id) => <Blog key={id} blog={blog} />)}
        </div>
        </div>}
    </div>
  )
}

export default App