import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import LogoutForm from './components/logoutform'
import BlogForm from './components/blogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

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

  }, [{blogs}])

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
    } catch(exception) {
      console.log(exception)
    }
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
       <BlogForm onChange={changeValue}  onSubmit={handleBlogForm} />
        {blogs.map(blog =>  <Blog key={blog.id} blog={blog} />)}
        </div>}
    </div>
  )
}

export default App